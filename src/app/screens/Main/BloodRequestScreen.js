import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { globalStyles } from '../../constants/Style';
import BloodRequest from '../../components/BloodRequest/BloodRequest';
const BloodRequestScreen = () => {
  return (
    <View style={globalStyles.wrapper}>
      <BloodRequest/>
    </View>
  )
}

export default BloodRequestScreen

const styles = StyleSheet.create({})