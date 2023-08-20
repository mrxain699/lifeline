import React, { useState, useEffect, useCallback, useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { globalStyles } from '../../constants/Style'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import { colors } from '../../constants/Colors'
import { messages_collection } from '../../database/Collections'
import { AppContext } from '../../api/AppContentApi';
import ImagePicker from 'react-native-image-crop-picker';
import Iconic from '../ui/Icons/Icons'
const Chat = ({ sender, receiver }) => {
  const {
    sendMessage,
    uploadMessageImage
  } = useContext(AppContext)
  const [messages, setMessages] = useState([])

  const fetchMessages = async () => {
    try {
      const senderReceiverSnapshot = await messages_collection
        .where('sender_id', '==', sender.id)
        .where('receiver_id', '==', receiver.id)
        .orderBy('createdAt', 'desc')
        .get();

      const receiverSenderSnapshot = await messages_collection
        .where('sender_id', '==', receiver.id)
        .where('receiver_id', '==', sender.id)
        .orderBy('createdAt', 'desc')
        .get();

      const senderReceiverMessages = senderReceiverSnapshot.docs.map((doc) => {
        const message = doc.data();
        return {
          _id: doc.id,
          text: message.text ? message.text : null,
          image:message.image ? message.image : null,
          createdAt: message.createdAt.toDate(),
          user: {
            _id: message.user._id,
            avatar: message.user.avatar,
          },
        };
      });

      const receiverSenderMessages = receiverSenderSnapshot.docs.map((doc) => {
        const message = doc.data();
        return {
          _id: doc.id,
          text: message.text,
          createdAt: message.createdAt.toDate(),
          user: {
            _id: message.user._id,
            avatar: message.user.avatar,
          },
        };
      });

      const allMessages = [...senderReceiverMessages, ...receiverSenderMessages];
      const sortedMessages = allMessages.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
      setMessages(sortedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };



  const onSend = useCallback((messages = []) => {
    let update_new_message = {};
    const new_message = messages.length > 0 && messages[0];
    if(!new_message.hasOwnProperty('image')) {
      update_new_message = {
        ...new_message,
        sender_id: sender.id,
        receiver_id: receiver.id,
      }
    }
    else{
      update_new_message = {
        ...new_message,
        sender_id: sender.id,
        receiver_id: receiver.id,

      }
    }
    sendMessage(update_new_message);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  const onGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
    })
      .then(async (image) => {
        try {
          const image_url = await uploadMessageImage(image.path);
          if (image_url) {
            console.log("URL", image_url);
            const image_message = [{
              _id: Math.round(Math.random() * 1000000).toString(),
              text: null,
              createdAt : new Date(),
              user:{
                _id: sender.id,
                avatar: sender.image,
              },
              image: image_url,
            }];
            onSend(image_message);
          }
          else {
            console.log("Sorry, something went wrong to send image");
          }
        } catch (error) {
          console.log(error);
        }

      })
      .catch(error => {
        console.log(error);
      })
  };


  useEffect(() => {
    fetchMessages();
    const interval = setInterval(() => {
      fetchMessages();
    }, 5000);

  }, [])





  return (
    <View style={globalStyles.wrapper}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: sender.id,
          avatar: sender.image,
        }}
        textInputProps={{
          autoFocus: true,
          multiline: true,
        }}
        textInputStyle={{
          color: colors.black,
          height: '100%',
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: colors.white,
                }
              }}
            />
          );
        }}
        renderActions={() => {
          return (
            <TouchableOpacity
              style={{ height: '100%', justifyContent: 'center', alignItems: 'center', marginLeft: 10, }}
            >
              <Iconic name={"image"} size={24} color={colors.red} onPress={() => { onGallery(); }} />
            </TouchableOpacity>
          );
        }}
        renderSend={(props) => {
          return (<Send {...props} >
            <View style={{ justifyContent: 'center', height: '100%', marginRight: 20 }}>
              <Text style={{ color: colors.red, fontWeight: 'bold', fontSize: 16, }}>Send</Text>
            </View>
          </Send>
          );
        }}
        isTyping={true}

      />
    </View>
  )
}

export default Chat;

