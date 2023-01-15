//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import MyScreens from "../../Components/body/Screen";

// create a component
const LoadError = () => {
  return (
   <MyScreens>
    
   </MyScreens>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

export default LoadError;
