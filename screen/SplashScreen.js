import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem("user_id").then((value) => {
        navigation.replace(value === null ? "Auth" : "Tabs", {
          user_id: value,
        });
      });
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/image/logo.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default SplashScreen;
