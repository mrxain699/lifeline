import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Tabs  from './Tabs';
import ProfileScreen from '../screens/Main/ProfileScreen';
import { colors } from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native';
const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor:colors.red,
  },
  headerTintColor:colors.white,
  headerTitleStyle: {
    fontFamily:'Kalam-Regular',
    fontSize:24,
    marginLeft:-20,
  }
}

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen 
        name="App" 
        component={Tabs} 
        options={{
          headerShown:false,
        }}
        />
        <Stack.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={({navigation})=>({
          headerShown:true,
          headerRight:()=>(
            <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
              <Ionicons name="power" size={24} color={colors.white} style={{marginRight:20}} />
            </TouchableOpacity>
            )
        })}
        />
    </Stack.Navigator>
  );
}

export default AppStack;
