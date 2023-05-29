import React from 'react'
import {View, StyleSheet, Text} from 'react-native';
import { colors } from '../../constants/Colors';
import Item from './Item';
import { images } from '../../constants/Images';

const Body = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manage</Text>
      <Item icon="water" title="Blood Group "/>
      <Item icon="calendar" title="Last Bleed "/>
      <Item icon="location" title="Address "/>
      <Item icon="call" title="Phone# "/>
      <Item icon="male-female-sharp" title="Gender "/>
      <Item icon="calendar" title="Date of Birth "/>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        paddingVertical:10,
        marginHorizontal:20,
    },
    heading:{
        color:colors.grey_200,
        fontFamily:'Kalam-Regular',
        marginTop:10,
        marginLeft:5,
        fontSize:16,        
    }
});

export default Body
