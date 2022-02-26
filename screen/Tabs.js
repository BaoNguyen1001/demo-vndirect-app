import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import { HomeScreen, NotiScreen, ProfileScreen } from "./tabscreen";
import { COLORS, icons } from "../constaints";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const Tabs = (props) => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "ios-home";
            } else if (route.name === "Notification") {
              iconName = "ios-notifications";
            } else if (route.name === "Profile") {
              iconName = "ios-person";
            }

            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 60,
                  height: 60,
                  borderRadius: 10,
                  top: focused ? -10 : 0,
                  backgroundColor: focused ? "#F79324" : "null",
                }}
              >
                <Ionicons
                  name={focused ? iconName : iconName + "-outline"}
                  size={size}
                  color={color}
                />
                <Text style={{ fontSize: 9, color: color }}>{route.name}</Text>
              </View>
            );
          },
          tabBarShowLabel: false,
          tabBarStyle: {
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: "#FFFFFF",
            borderRadius: 15,
            height: 60,
            ...styles.shadow,
          },
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Notification" component={NotiScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
