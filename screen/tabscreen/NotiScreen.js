import React from "react";
import { serverTimestamp } from "firebase/firestore";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  Button,
} from "react-native";
import { color } from "react-native-reanimated";
import NotificationsByDate from "../components/NotificationsByDate";
import Ionicons from "react-native-vector-icons/Ionicons";

import MainLayout from "./MainLayout";

//Import navigators from react navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NotificationDetailScreen from "./NotificationDetailScreen";
import firebase from "../../config/firebase";
import filterByDate from "../../utils/filterByDate";

const Stack = createStackNavigator();

const FilterList = (props) => {
  const {
    filters,
    filterCurrent,
    setFilterCurrent,
    handleUpdateSeenNotification,
  } = props;

  const handleClearAll = () => {
    Alert.alert(
      "Confirm",
      "Are you sure? Mark all read?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Ok",
          onPress: () => {
            handleUpdateSeenNotification();
            return;
          },
        },
      ],
      { cancelable: false }
    );
  };
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
      <TouchableOpacity onPress={handleClearAll}>
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
  const { data, navigation } = props;

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => {
        return <NotificationsByDate navigation={navigation} data={item} />;
      }}
      contentContainerStyle={{ paddingTop: 50, paddingBottom: 100 }}
    ></FlatList>
  );
};

const NotificationsMainScreen = (props) => {
  const { navigation } = props;
  const [data, setData] = React.useState([]);
  const [dataView, setDataView] = React.useState([]);
  const { currentUser } = firebase.auth();
  //em comment vo day
  React.useEffect(() => {
    if (currentUser) {
      const onValueChange = firebase
        .database()
        .ref("notifications")
        .orderByChild("to")
        .equalTo(currentUser?.uid)
        .on("value", (snapshot) => {
          const keys = Object.keys(snapshot.val());
          const values = snapshot.val();
          if (values) {
            const newData = Object.values(values)
              .map((item, index) => {
                item.key = keys[index];
                return item;
              })
              .sort((a, b) => -a.created + b.created);
            setData([...newData]);
          } else setData([]);
        });
      return () =>
        firebase.database().ref("notifications").off("value", onValueChange);
    }
  }, []);

  const handleUpdateSeenNotification = () => {
    const timestamp = firebase.database.ServerValue.TIMESTAMP;
    data.forEach((element) => {
      if (element.seen === "wait") {
        firebase
          .database()
          .ref("notifications/" + element.key)
          .update({ seen: timestamp });
      }
    });
  };

  const filters = [
    { display: "Unread" },
    { display: "Important" },
    { display: "Other" },
    { display: "All" },
  ];
  const [filterCurrent, setFilterCurrent] = React.useState(
    filters?.[0].display
  );

  React.useEffect(() => {
    switch (filterCurrent) {
      case "Important":
        setDataView(
          filterByDate(data.filter((element) => element.status === "important"))
        );
        break;
      case "Unread":
        setDataView(
          filterByDate(data.filter((element) => element.seen === "wait"))
        );
        break;
      case "Other":
        setDataView(
          filterByDate(data.filter((element) => element.status !== "important"))
        );
        break;

      default:
        setDataView(filterByDate(data));
        break;
    }
  }, [filterCurrent, data]);

  const handlePushNew = () => {
    const newReference = firebase.database().ref("/notifications").push();

    const timestamp = firebase.database.ServerValue.TIMESTAMP;

    newReference
      .set({
        created: timestamp,
        from: "mC9nNTkiGVQDepATIWDloO0s1rh2",
        message: "Bee nek",
        seen: "wait",
        status: "important",
        title: "HELLO",
        to: "mC9nNTkiGVQDepATIWDloO0s1rh2",
      })
      .then(() => console.log("Data updated."));
  };

  return (
    <View>
      <TouchableOpacity
        style={{ position: "absolute", top: 15, right: 60, zIndex: 3 }}
        onPress={handlePushNew}
      >
        <Text>Push new</Text>
      </TouchableOpacity>
      <FilterList
        filters={filters}
        filterCurrent={filterCurrent}
        setFilterCurrent={setFilterCurrent}
        handleUpdateSeenNotification={handleUpdateSeenNotification}
      />
      {dataView?.length > 0 ? (
        <NotificationsByDateList navigation={navigation} data={dataView} />
      ) : (
        <Text
          style={{ marginTop: 60, marginLeft: "auto", marginRight: "auto" }}
        >
          No notifications
        </Text>
      )}
    </View>
  );
};

const NotificationsHeaderTitle = (props) => {
  const { numberOfNotificationsCount } = props;
  return (
    <View>
      <Text style={{ fontSize: 16.5, fontWeight: "600" }}>Notifications</Text>
      {numberOfNotificationsCount > 0 && (
        <View
          style={{
            position: "absolute",
            backgroundColor: "#F79324",
            color: "white",
            right: -14,
            top: -4,
            width: 15,
            height: 15,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 10, fontWeight: "600", color: "white" }}>
            {numberOfNotificationsCount}
          </Text>
        </View>
      )}
    </View>
  );
};

const NotiScreen = () => {
  const [numberOfNotificationsCount, setNumberOfNotificationsCount] =
    React.useState(0);
  const { currentUser } = firebase.auth();
  React.useEffect(() => {
    const onValueChange = firebase
      .database()
      .ref("notifications")
      .orderByChild("to")
      .equalTo(currentUser.uid)
      .on("value", (snapshot) => {
        const result = snapshot.val();
        if (result) {
          setNumberOfNotificationsCount(
            Object.values(result).filter((item) => item.seen === "wait").length
          );
        } else setNumberOfNotificationsCount(0);
      });
    return () =>
      firebase.database().ref("notifications").off("value", onValueChange);
  }, []);
  return (
    <MainLayout>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={NotificationsMainScreen}
          options={{
            title: "Notifications",
            headerTitle: (props) => (
              <NotificationsHeaderTitle
                numberOfNotificationsCount={numberOfNotificationsCount}
                {...props}
              />
            ),
          }}
        />
        <Stack.Screen
          name="NotificationDetail"
          options={{
            title: "",
            headerBackTitleStyle: { color: "black" },
            headerBackImage: () => (
              <Ionicons name="chevron-back-outline" size={22} />
            ),
          }}
          component={NotificationDetailScreen}
        />
      </Stack.Navigator>
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
