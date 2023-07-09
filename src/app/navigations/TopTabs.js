import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import IncomingRequest from '../screens/Tabs/IncomingRequest';
import OutgoingRequest from '../screens/Tabs/OutgoingRequest';
import { colors } from '../constants/Colors';

const { width, height } = Dimensions.get('window');
const Tab = createMaterialTopTabNavigator();



const TopTabs = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarIndicatorStyle: {
                backgroundColor: colors.red,
            },
            tabBarPressColor: colors.red_50,
            tabBarBounces: true,
            tabBarLabelStyle:{
                fontSize:14
            }
        }}

        >
            <Tab.Screen name="IncomingRequest" component={IncomingRequest}
                options={{
                    tabBarLabel: ({ focused, color }) => {
                        return (

                            <Text style={[focused ? styles.isFocused : styles.notFocused]}>INCOMING</Text>
                        )
                    }
                }}
            />
            <Tab.Screen name="OutgoingRequest" component={OutgoingRequest}
                options={{
                    tabBarLabel: ({ focused, color }) => {
                        return (

                            <Text style={[focused ? styles.isFocused : styles.notFocused]}>OUTGOING</Text>
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}


const styles = StyleSheet.create({
    isFocused: {
        fontWeight: 'bold',
        color:colors.red,
        width:150,
    },
    notFocused: {
        color: colors.grey_100,
    }
})

export default TopTabs;
