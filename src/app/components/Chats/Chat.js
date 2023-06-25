import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { globalStyles } from '../../constants/Style'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import { colors } from '../../constants/Colors'
import Iconic from '../ui/Icons/Icons'
const Chat = ({ sender, receiver }) => {
  const [messages, setMessages] = useState([])



  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, []);

  const onSend = useCallback((messages = []) => {
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
          _id: 1,
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
                  elevation: 2,
                }
              }}
            />
          );
        }}
        renderSend={(props) => {
          return (<Send {...props} >
            <View style={{ justifyContent: 'center', height: '100%', marginRight: 20 }}>
              <Text style={{color:colors.red, fontWeight: 'bold', fontSize:16,}}>Send</Text>
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