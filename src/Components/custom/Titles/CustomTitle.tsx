//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TextStyle, ViewStyle } from "react-native";
import {
  DARCK__COLOR__TEME,
  LING__COLOR__TEME,
} from "../../../Constants/Colors";
import { useDarckStorage } from "../../../zustand/state/myGlovalState";

interface props {
  text: string;
  StylesText?:  TextStyle;
  StylesContainer?: ViewStyle;
}
// create a component
const CustomText = ({ text, StylesText, StylesContainer }: props) => {
  const { isDarck } = useDarckStorage();

  const mode = isDarck ? DARCK__COLOR__TEME.EXTRAS : LING__COLOR__TEME.EXTRAS;

  return (
    <View style={[styles.container ,  StylesContainer ]}>
      <Text style={[styles.text, { color: mode }, StylesText]}>{text}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "left",
  },
});

export default CustomText;
