import React from 'react'
import {ScrollView} from 'react-native'
import Header from './Header'
import Body from './Body'

const Home = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} alwaysBounceVertical={true}>
      <Header />
      <Body />
    </ScrollView>
  )
}

export default Home
