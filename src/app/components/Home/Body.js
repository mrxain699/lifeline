import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet } from 'react-native';
import Item from './Item';
import { images } from '../../constants/Images';
import { AppContext } from '../../api/AppContentApi';
import { useNavigation } from '@react-navigation/native';

const Body = () => {
  const navigation = useNavigation();
  const { user, toggleStatus } = useContext(AppContext);
  const toggle_switch = () => {
    if (user.status === 1) {
      toggleStatus(0);
    }
    else {
      toggleStatus(1);
    }
  };

  return (

      <View style={styles.container}>
        <Item title="Request Blood" image={images.heart_icon} onPress={() => { navigation.navigate('BloodRequestScreen') }} />
        <Item title="Request Blood (Urgent)" image={images.blood_bag_icon} onPress={() => { navigation.navigate('UrgentBloodRequestScreen') }} />
        <Item title="Manage Blood Requests" image={images.blood_drop_icon} onPress={() => { navigation.navigate('ManageRequestsScreen') }} />
        <Item title="Manage Profile" image={images.person_icon} onPress={() => { navigation.navigate('Profile') }} imageStyle={{marginTop:-10}}/>
        <Item title="Available to Donate" image={user.status === 0 ? images.toggle_off_icon : images.toggle_on_icon} onPress={toggle_switch} />
        
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom:10,
  }
});

export default Body;
