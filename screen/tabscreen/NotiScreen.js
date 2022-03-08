import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { color } from "react-native-reanimated";
import NotificationsByDate from "../components/NotificationsByDate";
import Ionicons from "react-native-vector-icons/Ionicons";

import MainLayout from "./MainLayout";

const FilterList = (props) => {
  const { filters, filterCurrent, setFilterCurrent } = props;
  return (
    <View
      style={{
        position: "absolute",
        zIndex: 1,
        top: 5,
        left: 10,
        right: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <FlatList
        style={{
          backgroundColor: "white",
          padding: 5,
          borderRadius: 30,
          flexDirection: "row",
          ...styles.shadow,
        }}
        data={filters}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={item.display}
              style={{
                backgroundColor:
                  filterCurrent === item.display ? "#F79324" : "white",
                borderRadius: 30,
                marginRight: 5,
              }}
              onPress={() => setFilterCurrent(item.display)}
            >
              <Text
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  color: filterCurrent === item.display ? "white" : "black",
                }}
              >
                {item.display}
              </Text>
            </TouchableOpacity>
          );
        }}
      ></FlatList>
      <TouchableOpacity>
        <Ionicons
          name="checkmark-done"
          size={24}
          color="#9F9F9F"
          style={{ marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const NotificationsByDateList = (props) => {
  const { data } = props;
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        return <NotificationsByDate data={item} />;
      }}
      contentContainerStyle={{ paddingTop: 50, paddingBottom: 100 }}
    ></FlatList>
  );
};

const NotiScreen = () => {
  const filters = [
    { display: "All" },
    { display: "Important" },
    { display: "Other" },
  ];
  const [filterCurrent, setFilterCurrent] = React.useState(
    filters?.[0].display
  );
  return (
    <MainLayout>
      <View>
        <FilterList
          filters={filters}
          filterCurrent={filterCurrent}
          setFilterCurrent={setFilterCurrent}
        />
        <NotificationsByDateList data={[1, 2, 3, 4]} />
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default NotiScreen;
