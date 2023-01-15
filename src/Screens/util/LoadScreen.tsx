//import liraries
import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MyScreens from "../../Components/body/Screen";
import { DARCK__COLOR__TEME } from "../../Constants/Colors";

const LoadScreen = () => {
  return (
    <MyScreens Styles={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={50} color={DARCK__COLOR__TEME.SECONST} />
    </MyScreens>
  );
};

export default LoadScreen;
