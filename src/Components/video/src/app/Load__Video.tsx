import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

export default function Load__Video() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={"#ec1e47"} size={40} />
      <Text style={styles.text}>Cargando...</Text>
      <StatusBar hideTransitionAnimation="fade" hidden style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    flexDirection: "row",
  },
  text: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginLeft: 10,
  },
});
