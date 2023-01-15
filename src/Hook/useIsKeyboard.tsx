//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Keyboard } from "react-native";

// create a component
const useIsKeyboard = () => {

    const [keyboardShown, setKeyboardShown] = useState(false);

    const keyboardDidShow = () => {
      setKeyboardShown(true);
    };
  
    const keyboardDidHide = () => {
      setKeyboardShown(false);
    };
  
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        keyboardDidShow
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        keyboardDidHide
      );
  
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);
  

    return keyboardShown 
};

export default useIsKeyboard;
