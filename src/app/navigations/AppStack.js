import React, {useContext, useEffect} from 'react'
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
import PhoneNumber from '../screens/Modals/PhoneNumber';
import Address from '../screens/Modals/Address';
import BloodRequestScreen from '../screens/Main/BloodRequestScreen';
import UrgentBloodRequestScreen from '../screens/Main/UrgentBloodRequestScreen';
import { AuthContext } from '../api/AuthContentApi';
import { AppContext } from '../api/AppContentApi';
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
  const {isLoggedIn, getCurrentUser} = useContext(AuthContext);
  const {modalVisible, setModalVisible} = useContext(AppContext);
  useEffect(()=>{
    if(isLoggedIn){
      getCurrentUser();
    }
  }, [])

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
            <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)}>
              <Ionicons name="power" size={24} color={colors.white} style={{marginRight:20}} />
            </TouchableOpacity>
            )
        })}
        />
        <Stack.Screen name="BloodRequestScreen" component={BloodRequestScreen} options={{title:"Blood Request"}}/>
        <Stack.Screen name="UrgentBloodRequestScreen" component={UrgentBloodRequestScreen} options={{title:"Urgent Blood Request"}}/>
        
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="BloodGroup" component={BloodGroup} options={{title:"Blood Group"}}/>
          <Stack.Screen name="LastBleed" component={LastBleed} options={{title:"Last Bleed",}}/>
          <Stack.Screen name="Address" component={Address} />
          <Stack.Screen name="PhoneNumber" component={PhoneNumber} options={{title:"Phone Number"}}/>
          <Stack.Screen name="Gender" component={Gender} />
          <Stack.Screen name="DateOfBirth" component={DateOfBirth} options={{title:"Date of Birth"}}/>
        </Stack.Group>
    </Stack.Navigator>
  );
}

export default AppStack;
