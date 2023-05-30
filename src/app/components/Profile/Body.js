import React from 'react'
import {View, StyleSheet, Text} from 'react-native';
import { colors } from '../../constants/Colors';
import Item from './Item';
import { useNavigation } from '@react-navigation/native';

const Body = () => {
  const navigation  = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manage</Text>
      <Item icon="water" title="Blood Group " onPress={() => navigation.navigate('BloodGroup')} />
      <Item icon="calendar" title="Last Bleed " onPress={() => navigation.navigate('LastBleed')} />
      <Item icon="location" title="Address "  onPress={() => navigation.navigate('Address')}/>
      <Item icon="call" title="Phone# " onPress={() => navigation.navigate('PhoneNumber')}/>
      <Item icon="male-female-sharp" title="Gender " onPress={() => navigation.navigate('Gender')}/>
      <Item icon="calendar" title="Date of Birth " onPress={() => navigation.navigate('DateOfBirth')}/>
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
