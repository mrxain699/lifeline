import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { globalStyles } from '../../constants/Style'
import Home from '../../components/Home/Home'
const HomeScreen = () => {
  return (
    <SafeAreaView style={globalStyles.wrapper}>
        <View style={[globalStyles.wrapper, {paddingBottom:10}]}>
          <Home />
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen