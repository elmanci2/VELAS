//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import MyScreens from "../../Components/body/Screen";
import terminos from "../../api/TerminosAndConditios/terminosAnConditios.json";
import { useDarckStorage } from "../../zustand/state/myGlovalState";
import { DARCK__COLOR__TEME, LING__COLOR__TEME } from "../../Constants/Colors";
import CustomText from "../../Components/custom/Titles/CustomTitle";
import Constants from "expo-constants";

// create a component
const TerminoAnConditionScreen = () => {
  const { isDarck } = useDarckStorage();

  const colorText = isDarck
    ? DARCK__COLOR__TEME.EXTRAS
    : LING__COLOR__TEME.EXTRAS;

  const carMode = isDarck
    ? DARCK__COLOR__TEME.TERCERO
    : LING__COLOR__TEME.TERCERO;

  return (
    <MyScreens>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        data={terminos}
        renderItem={({ item }) => (
          <View style={[styles.terminos, { backgroundColor: carMode }]}>
            <Text style={[styles.text, { color: DARCK__COLOR__TEME.SECONST }]}>
              {item.title}
            </Text>
            <Text style={[styles.info, { color: colorText }]}>{item.body}</Text>
          </View>
        )}
      />
    </MyScreens>
  );
};

// define your styles
const styles = StyleSheet.create({
  text: {
    fontWeight: "700",
    fontSize: 20,
    marginVertical: 10,
  },

  info: {
    fontSize: 15,
    fontWeight: "300",
  },
  terminos: {
    marginBottom: 10,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingBottom: 10,
    shadowColor: "rgba(0, 0, 0, 0.488);",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  container: {
    paddingHorizontal: 5,
    paddingBottom: 50,
    marginTop: 20
  },

  Titulo: {
    paddingBottom: 10,
    textTransform: "capitalize",
    paddingLeft: 5,
    marginTop: Constants.statusBarHeight + 10,
  },
});

//make this component available to the app
export default TerminoAnConditionScreen;
