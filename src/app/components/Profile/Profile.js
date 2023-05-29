import React from 'react'
import { ScrollView } from 'react-native';
import Header from '../Home/Header';
import Body from './Body';
const Profile = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={true}> 
        <Header />
        <Body/>
    </ScrollView>
  )
}

export default Profile
