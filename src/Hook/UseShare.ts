//import liraries
import React, { Component } from "react";
import { Share, Alert } from "react-native";

// create a component
export const useShare = async (massage: string) => {
  try {
    await Share.share({
      message: massage,
    });
  } catch (error) {
    Alert.alert("ubo un error");
  }
};
