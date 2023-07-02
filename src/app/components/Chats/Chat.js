import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { globalStyles } from '../../constants/Style'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import { colors } from '../../constants/Colors'
import { messages_collection } from '../../database/Collections'
const Chat = ({ sender, receiver }) => {
  const [messages, setMessages] = useState([])


  useEffect(() => {
    const senderReceiverQuery = messages_collection
    .where('sender_id', '==', sender.id)
    .where('receiver_id', '==', receiver.id)
    .orderBy('createdAt', 'desc');

  const receiverSenderQuery = messages_collection
    .where('sender_id', '==', receiver.id)
    .where('receiver_id', '==', sender.id)
    .orderBy('createdAt', 'desc');

  Promise.all([senderReceiverQuery.get(), receiverSenderQuery.get()])
    .then((querySnapshots) => {
      const messages = [];
      querySnapshots.forEach((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          const message = documentSnapshot.data();
          const formattedMessage = {
            _id: message._id,
            text: message.text,
            createdAt: new Date(message.createdAt.toDate()),
            user: {
              _id: message.sender_id === sender.id ? sender.id : receiver.id,
              avatar: message.receiver_image,
            },
          };
          messages.push(formattedMessage);
        });
      });
      setMessages(messages);
    })
    .catch((error) => console.log(error));
  }, [])

  const onSend = useCallback((messages = []) => {
    const new_message = messages.length > 0 && messages[0];
    const update_new_message = {
      ...new_message,
      sender_id: sender.id,
      receiver_id: receiver.id,
      receiver_image: receiver.image
    }
    messages_collection.doc(update_new_message._id)
      .set({
        ...update_new_message
      })
      .then(() => {
        console.log('Message added!');
      })
      .catch(err => console.log(err));
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])



  return (
    <View style={globalStyles.wrapper}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: sender.id,
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

export default Chat

const styles = StyleSheet.create({})