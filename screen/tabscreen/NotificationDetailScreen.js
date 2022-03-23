import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  Image,
  StyleSheet,
} from "react-native";

import { ListItem } from "react-native-elements";

import MainLayout from "./MainLayout";

import Ionicons from "react-native-vector-icons/Ionicons";

import { COLORS } from "../../constaints";

import firebase from "../../config/firebase";
import Portfolio from "../components/Portfolio";

const NotificationDetailScreen = (props) => {
  const { route } = props;
  const { nid } = route.params;
  const [data, setData] = React.useState({});
  React.useEffect(() => {
    const onValueChange = firebase
      .database()
      .ref("notifications/" + nid)
      .once("value", (snapshot) => {
        // const keys = Object.keys(snapshot.val());
        const values = snapshot.val();
        setData(values);
      });
    return () =>
      firebase
        .database()
        .ref("notifications/" + nid)
        .off("value", onValueChange);
  }, []);

  React.useEffect(() => {
    handleUpdateSeenNotification(data, nid);
  }, [data]);

  function handleUpdateSeenNotification(data, nid) {
    const timestamp = firebase.database.ServerValue.TIMESTAMP;
    if (data?.seen === "wait") {
      firebase
        .database()
        .ref("notifications/" + nid)
        .update({ seen: timestamp });
    }
  }
  return (
    <View style={{ width: "100%", backgroundColor: "white", padding: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 20,
            paddingRight: 10,
          }}
        >
          {data?.title}
        </Text>
        <Ionicons name="flash" size={20} color={"#F79324"} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Image
          resizeMode="cover"
          style={{
            width: 42,
            height: 42,
            borderRadius: 42,
            backgroundColor: "#C4C4C4",
            marginRight: 10,
          }}
        />
        <View>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Admin</Text>
          <Text style={{ fontSize: 14, fontStyle: "italic" }}>
            {data?.from}
          </Text>
        </View>
      </View>
      <Text>{data?.message}</Text>
    </View>
  );
};

export default NotificationDetailScreen;
