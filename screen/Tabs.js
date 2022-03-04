import React from "react";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Ionicons from 'react-native-vector-icons/Ionicons';

import { HomeScreen, NotiScreen, ProfileScreen } from './tabscreen'
import { COLORS, icons } from "../constaints"

const Tab = createBottomTabNavigator()

const Tabs = (props) => {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'ios-home-outline'

                    } else if (route.name === 'Notification') {
                        iconName = 'ios-notifications-outline'

                    } else if (route.name === 'Profile') {
                        iconName = 'ios-person-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
            />
            <Tab.Screen
                name="Notification"
                component={NotiScreen}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{headerShown: false}}
            />

        </Tab.Navigator>
    )

}

export default Tabs;