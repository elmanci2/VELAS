import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Feather, Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useDarckStorage } from "../../../zustand/state/myGlovalState";

interface props {
  massage: string;
  isError?: boolean;
  close?: () => void | null ;
  time?: boolean;
  duration ? :number
}
// create a component
const CustomAlert = ({ massage, isError, close, time  , duration= 4000  }: props) => {
  const { isDarck } = useDarckStorage();

  
  if (time) {
    setTimeout(() => {
      close && close();
    }, duration);
  }

  const AlerStyles = () => {
    if (isError) {
      return {
        backgroundColor: "#ffe1db",
        borderWidth: 2,
        borderColor: "#f5c5bb",
      };
    } else {
      return {
        backgroundColor: "#eaffef",
        borderWidth: 2,
        borderColor: "#c6f6d2",
      };
    }
  };

  return (
    <Animatable.View animation="fadeInUp" style={styles.container}>
      <View style={[styles.alert, AlerStyles()]}>
        {isError ? (
          <FontAwesome
            style={[styles.iconAlert, { backgroundColor: "#eb4e2c" }]}
            name="warning"
            size={24}
            color="white"
          />
        ) : (
          <AntDesign
            style={[styles.iconAlert, { backgroundColor: "#3ab55b" }]}
            name="checkcircle"
            size={24}
            color="white"
          />
        )}

        <Text style={styles.slertText} numberOfLines={2}>
          {massage}
        </Text>

        <Ionicons name="close" size={24} color="#69727d" onPress={close} />
      </View>
    </Animatable.View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  alert: {
    width: "90%",
    borderRadius: 15,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    backgroundColor: "white",
    shadowColor: "rgba(0, 0, 0, 0.388)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3,

    justifyContent: "space-between",
  },

  slertText: {
    fontWeight: "400",
    textAlign: "left",
    textTransform: "capitalize",
    fontSize: 15,
    width: "75%",
  },

  iconAlert: {
    padding: 9,
    borderRadius: 14,

    shadowColor: "green",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 3,
  },
});

//make this component available to the app
export default CustomAlert;
