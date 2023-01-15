//import liraries
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ViewStyle, TextStyle } from "react-native";
import {
  DARCK__COLOR__TEME,
  LING__COLOR__TEME,
} from "../../../../Constants/Colors";
import { useNavigationTypes } from "../../../../types/types";
import { useDarckStorage } from "../../../../zustand/state/myGlovalState";

interface props {
  item: {
    poster: string;
    title: string;
    id: string;
  };
  

  StylesContainer?: ViewStyle;
  StylesText?:TextStyle
  StylesIMgConted?: ViewStyle
}

// create a component
const SliderRender = ({ item , StylesContainer , StylesText  , StylesIMgConted  }: props) => {
  const navigation = useNavigation<useNavigationTypes>();

  const state = useDarckStorage();

  const mode = state.isDarck
    ? DARCK__COLOR__TEME.EXTRAS
    : LING__COLOR__TEME.EXTRAS;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("previw", {
          id: item.id,
          poster: item.poster,
        })
      }
      style={[styles.ContainerAnime , StylesContainer ]}
    >
      <View style={[styles.imagenContainer , StylesIMgConted ]}>
        <Image style={styles.img} source={{ uri: item.poster }} />
      </View>
      <Text numberOfLines={2} style={[styles.name, { color: mode } ,  StylesText ]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingBottom: 20,
    height: "100%",
  },

  ContainerAnime: {
    width: 115,
    margin: 5,
    marginBottom: 5,
  },

  imagenContainer: {
    width: '100%',
    height: 178,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 7,
    backgroundColor: "#111",
  },
  name: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
});

export default SliderRender;
