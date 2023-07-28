import React, { useState, useEffect, useCallback, useContext } from 'react'
import { View, Text } from 'react-native'
import { globalStyles } from '../../constants/Style'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import { colors } from '../../constants/Colors'
import { messages_collection } from '../../database/Collections'
import { AppContext } from '../../api/AppContentApi'

const Chat = ({ sender, receiver }) => {
  const {
    sendMessage,
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
          text: message.text,
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
    const new_message = messages.length > 0 && messages[0];
    const update_new_message = {
      ...new_message,
      sender_id: sender.id,
      receiver_id: receiver.id,
    }
    sendMessage(update_new_message);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])


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
          avatar:sender.image,
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

