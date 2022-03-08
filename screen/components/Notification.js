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

Notification.propTypes = {};

function Notification(props) {
  const { data } = props;
  return (
    <View
      style={{
        backgroundColor: data?.seen ? "#F6F6F6" : "#FEF4E9",
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
          borderRadius: "50%",
          backgroundColor: "#C4C4C4",
          marginRight: 10,
        }}
        resizeMode="contain"
      />
      <View>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "700",
            color: data?.seen ? "#7C7C7C" : "#444444",
          }}
        >
          Title
        </Text>
        <Text
          style={{
            fontSize: 11,
            fontWeight: "400",
            color: data?.seen ? "#7C7C7C" : "#444444",
          }}
        >
          Description...
        </Text>
      </View>
      <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: "400",
            color: data?.seen ? "#7C7C7C" : "#444444",
          }}
        >
          30 Minutes ago
        </Text>
        <Ionicons
          name="flash"
          size={17}
          style={{ margin: 5 }}
          color={data?.seen ? "#C4C4C4" : "#F79324"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

export default Notification;
