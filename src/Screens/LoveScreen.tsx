//import liraries
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MyScreens from "../Components/body/Screen";
import SliderGrid from "../Components/custom/Sliders/SliderGrid";
import { DARCK__COLOR__TEME } from "../Constants/Colors";
import { getFavorites } from "../db/db";
import { useDarckStorage } from "../zustand/state/myGlovalState";

const LovesScreen = ({ navigation }: { navigation: any }) => {
  const { isDarck } = useDarckStorage();

  const [favoriteList, setFavoriteList] = useState([]);
  const theAreItems = favoriteList?.length === 0 ?? 0;

  getFavorites().then((favoritos: any) => {
    setFavoriteList(favoritos);
  });

  return (
    <MyScreens>
      {theAreItems ? (
        <View style={styles.contedNotItem}>
          <Text style={[styles.text, { color: isDarck ? "white" : "black" }]}>
            Aunó tienes nada en favoritos
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("all")}>
            <Text style={styles.add}>Agregar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <SliderGrid
          isError={false}
          isLoading={false}
          refrech={() => null}
          data={favoriteList as any}
        />
      )}
    </MyScreens>
  );
};

const styles = StyleSheet.create({
  contedNotItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 20,
  },

  add: {
    backgroundColor: DARCK__COLOR__TEME.SECONST,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    color: "white",
    fontWeight: "700",
    fontSize: 15,
    borderColor: "white",
  },
});

export default LovesScreen;
