//import liraries
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";

/// import colors for  mode
import { LING__COLOR__TEME, DARCK__COLOR__TEME } from "../../Constants/Colors";
import { useDarckStorage } from "../../zustand/state/myGlovalState";

interface props {
  children: JSX.Element | JSX.Element[];
  Styles?: any;
  title?: string;
  isTitle?: boolean;
}

const MyScreens = ({ children, Styles, title, isTitle }: props) => {
  const { isDarck } = useDarckStorage((state) => state);

  const mode = isDarck ? DARCK__COLOR__TEME.PRIMARI : LING__COLOR__TEME.PRIMARI;
  const darck = isDarck ? DARCK__COLOR__TEME.EXTRAS : LING__COLOR__TEME.EXTRAS;

  return (
    <View style={[styles.container, { backgroundColor: mode }, Styles]}>
      {isTitle ? (
        <Text style={[styles.title, { color: darck }]}>{title}</Text>
      ) : null}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DARCK__COLOR__TEME.PRIMARI,
  },

  title: {
    fontSize: 25,
    fontWeight: "500",
    textTransform: "uppercase",
    textAlign: "left",
    marginTop: Constants.statusBarHeight + 10,
    paddingLeft: 10,
  },
});

export default MyScreens;
