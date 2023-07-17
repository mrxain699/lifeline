import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Regular from '../screens/Tabs/Requests/Regular';
import Urgent from '../screens/Tabs/Requests/Urgent';
import Send from '../screens/Tabs/Requests/Send';
import Recieve from '../screens/Tabs/Requests/Recieve';
import { colors } from '../constants/Colors';

const Tab = createMaterialTopTabNavigator();



const TopTabs = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarIndicatorStyle: {
                backgroundColor: colors.red,
            },
            tabBarPressColor: colors.red_50,
            tabBarBounces: true,
            tabBarLabelStyle: {
                fontSize: 14
            }
        }}

        >
            <Tab.Screen name="Regular" component={Regular}
                options={{
                    tabBarLabel: ({ focused, color }) => {
                        return (

                            <Text style={[focused ? styles.isFocused : styles.notFocused]}>Normal</Text>
                        )
                    }
                }}
            />
            <Tab.Screen name="Urgent" component={Urgent}
                options={{
                    tabBarLabel: ({ focused, color }) => {
                        return (

                            <Text style={[focused ? styles.isFocused : styles.notFocused]}>Urgent</Text>
                        )
                    }
                }}
            />
            <Tab.Screen name="Send" component={Send}
                options={{
                    tabBarLabel: ({ focused, color }) => {
                        return (

                            <Text style={[focused ? styles.isFocused : styles.notFocused]}>Send</Text>
                        )
                    }
                }}
            />
            <Tab.Screen name="Recieve" component={Recieve}
                options={{
                    tabBarLabel: ({ focused, color }) => {
                        return (

                            <Text style={[focused ? styles.isFocused : styles.notFocused]}>Recieved</Text>
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
        color: colors.red,
        width: 150,
    },
    notFocused: {
        color: colors.grey_100,
    }
})

export default TopTabs;
