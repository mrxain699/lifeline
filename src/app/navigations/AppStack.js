import React from 'react'
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Tabs  from './Tabs';
import ProfileScreen from '../screens/Main/ProfileScreen';
import BloodGroup from '../screens/Modals/BloodGroup';
import LastBleed from '../screens/Modals/LastBleed';
import DateOfBirth from '../screens/Modals/DateOfBirth';
import Gender from '../screens/Modals/Gender';

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

        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="BloodGroup" component={BloodGroup} />
          <Stack.Screen name="LastBleed" component={LastBleed} />
          <Stack.Screen name="Gender" component={Gender} />
          <Stack.Screen name="DateOfBirth" component={DateOfBirth} />

        </Stack.Group>
    </Stack.Navigator>
  );
}

export default AppStack;
