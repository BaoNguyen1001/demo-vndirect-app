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
import Notification from "./Notification";

NotificationsByDate.propTypes = {};

function NotificationsByDate(props) {
  let { data, navigation } = props;
  return (
    <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
      <Text
        style={{
          fontSize: 10,
          fontWeight: "700",
          color: "#7C7C7C",
          marginBottom: 5,
        }}
      >
        {data.date}
      </Text>
      <View
        style={{
          borderRadius: 10,
          backgroundColor: "white",
          paddingHorizontal: 10,
          paddingTop: 10,
          paddingBottom: 5,
        }}
      >
        <FlatList
          data={data.notifications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return <Notification navigation={navigation} data={item} />;
          }}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

export default NotificationsByDate;
