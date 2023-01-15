import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
} from "react-native";
import { DARCK__COLOR__TEME, LING__COLOR__TEME } from "../../Constants/Colors";
import { BASE__IMG, notPoster } from "../../Constants/url";
import { useNavigationTypes } from "../../types/types";

interface item {
  item: {
    poster: string;
    title: string;
    id: string;
  };

  dark: boolean;

  imageContedContainer?: ViewStyle;
}

export const EpisodesListItem = ({ item, dark }: item) => {
  const darkText = !dark
    ? DARCK__COLOR__TEME.TERCERO
    : LING__COLOR__TEME.TERCERO;
  const mode = dark ? DARCK__COLOR__TEME.TERCERO : LING__COLOR__TEME.TERCERO;

  return (
    <View style={[styles.itemConted, { backgroundColor: mode }]}>
      <View style={styles.imgConted}>
        <Image
          style={styles.img}
          source={{ uri: item.poster === notPoster ? BASE__IMG : item.poster }}
        />
      </View>
      <Text numberOfLines={3} style={[styles.title, { color: darkText }]}>
        {item.title}
      </Text>
    </View>
  );
};

//// recomendatos

export const RecomendadoRender = ({ item, dark }: item) => {
  const darkText = !dark
    ? DARCK__COLOR__TEME.TERCERO
    : LING__COLOR__TEME.TERCERO;

  return (
    <View key={item.id} style={[styles.itemConted]}>
      <View style={[styles.imgConted]}>
        <Image
          style={[styles.img, { resizeMode: "contain" }]}
          source={{ uri: item.poster === notPoster ? BASE__IMG : item.poster }}
        />
      </View>
      <Text numberOfLines={3} style={[styles.title, { color: darkText }]}>
        {item.title}
      </Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  Flatlist: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 20,
  },
  imgConted: {
    width: 160,
    height: 100,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },

  itemConted: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 5,
    width: "95%",
    borderRadius: 6,
    overflow: "hidden",
    shadowColor: "#0a0a0a52",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },

  title: {
    fontSize: 17,
    width: "55%",
    paddingHorizontal: 5,
  },
});
