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
import firebase from "../config/firebase";

import { HomeScreen, NotiScreen, ProfileScreen } from "./tabscreen";
import { COLORS, icons } from "../constaints";
import { NavigationContainer, TabRouter } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const Tabs = (props) => {
  const [numberOfNotificationsCount, setNumberOfNotificationsCount] =
    React.useState(0);
  const { route } = props;
  const { user_id } = route.params;
  React.useEffect(() => {
    let onValueChange;
    if (user_id) {
      onValueChange = firebase
        .database()
        .ref("notifications")
        .orderByChild("to")
        .equalTo(user_id)
        .on("value", (snapshot) => {
          const result = snapshot.val();
          if (result) {
            setNumberOfNotificationsCount(
              Object.values(result).filter((item) => item.seen === "wait")
                .length
            );
          } else setNumberOfNotificationsCount(0);
        });
    }
    return () =>
      firebase.database().ref("notifications").off("value", onValueChange);
  }, []);
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
                {route.name === "Notification" &&
                  numberOfNotificationsCount > 0 && (
                    <View
                      style={{
                        position: "absolute",
                        backgroundColor: focused ? "white" : "#F79324",
                        color: focused ? "#F79324" : "white",
                        right: 8,
                        top: 8,
                        width: 15,
                        height: 15,
                        borderRadius: 15,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "600",
                          color: focused ? "#F79324" : "white",
                        }}
                      >
                        {numberOfNotificationsCount}
                      </Text>
                    </View>
                  )}
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
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen
          name="Notification"
          component={NotiScreen}
          options={{
            headerShown: false,
            tabBarBadge: 2,
            tabBarBadgeStyle: { display: "none" },
          }}
        />
        <Tab.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={ProfileScreen}
        />
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
