import React from 'react'
import { globalStyles } from '../../../constants/Style'
import { Text } from 'react-native'
const Label = ({label}) => {
  return (
    <Text style={globalStyles.label}>{label}</Text>
  )
}

export default Label
