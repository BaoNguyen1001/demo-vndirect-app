import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  Image,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import countUp from "../../utils/countUp";

Notification.propTypes = {};

function Notification(props) {
  const { data, navigation } = props;
  return (
    <TouchableOpacity
      onPress={() => navigation.push("NotificationDetail", { nid: data.key })}
    >
      <View
        style={{
          backgroundColor: data?.seen !== "wait" ? "#F6F6F6" : "#FEF4E9",
          borderRadius: 10,
          marginBottom: 5,
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Image
          style={{
            height: 42,
            width: 42,
            borderRadius: 50,
            backgroundColor: "#C4C4C4",
            marginRight: 10,
          }}
          resizeMode="contain"
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: data?.seen !== "wait" ? "#7C7C7C" : "#444444",
            }}
            numberOfLines={2}
          >
            {data.title}
          </Text>
          <Text
            style={{
              fontSize: 11,
              fontWeight: "400",
              color: data?.seen !== "wait" ? "#7C7C7C" : "#444444",
            }}
            numberOfLines={2}
          >
            {data.message}
          </Text>
        </View>
        <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "400",
              color: data?.seen !== "wait" ? "#7C7C7C" : "#444444",
            }}
          >
            {countUp(data.created)}
          </Text>
          {data.status === "important" && (
            <Ionicons
              name="flash"
              size={17}
              style={{ margin: 5 }}
              color={data?.seen !== "wait" ? "#C4C4C4" : "#F79324"}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});

export default Notification;
