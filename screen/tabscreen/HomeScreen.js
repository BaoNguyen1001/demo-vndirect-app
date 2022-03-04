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

const RenderList = (props) => {
  const data = props.data;
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          return <Portfolio data={item} />;
        }}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 5 }}
      ></FlatList>
    </View>
  );
};

const HomeScreen = () => {
  const [data, setData] = useState([]);
  //em comment vo day
  useEffect(() => {
    console.log("hello");
    const onValueChange = firebase
      .database()
      .ref("portfolio")
      .on("value", (snapshot) => {
        const result = snapshot.val();
        console.log({ result });
        setData(Object.values(result));
      });
    return () =>
      firebase.database().ref("portfolio").off("value", onValueChange);
  }, []);

  return (
    <MainLayout>
      <View style={styles.container}>
        <RenderList data={data} />
      </View>
    </MainLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  itemContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
  },
});

function addCommas(nStr) {
  nStr += "";
  var x = nStr.split(".");
  var x1 = x[0];
  var x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
}

{
  /* <TouchableOpacity style={styles.itemContainer}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  {item.id}
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="ios-time-outline" color={"red"} size={12} />
                  <Text
                    style={{
                      marginLeft: 5,
                    }}
                  >
                    {item.date}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                  }}
                >
                  {addCommas(item.giaHienTai)}
                </Text>
                <Text style={{ color: rateColor }}>{item.rate}%</Text>
              </View>
            </TouchableOpacity> */
}
