import React from 'react'
import { globalStyles } from '../../../constants/Style'
import { TextInput, View, Text } from 'react-native'
const Input = (props) => {
  return (
    
    !props.type ? <TextInput {...props} style={globalStyles.inputField} /> 
    : <TextInput {...props} style={[globalStyles.inputField, {position:'relative'}]} />
  
  )
}

export default Input
