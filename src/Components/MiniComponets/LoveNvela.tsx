//import liraries
import React, { useCallback, useState } from "react";
import {StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DARCK__COLOR__TEME } from "../../Constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import {
  addToFavoritesSQLite,
  getFavorites,
  removeFromFavoritesSQLite,
} from "../../db/db";

interface props {
  data: {
    poster: string;
    id: string;
    title: string;
  };

  id: string;
}

// create a component
const LoveNovela = ({ data, id }: props) => {
  const [isLove, setIsLove] = useState(false);

  const TouchHeart = () => {
    setIsLove(!isLove);
    addToFavoritesSQLite(data);
  };

  const removeTofavorite = () => {
    setIsLove(!isLove);
    removeFromFavoritesSQLite(data.id);
  };

  ///   love fuction
  const loveFavorite = useCallback(() => {
    getFavorites().then((favorites: any) => {
      setIsLove(favorites.some((f: any) => f.id === id));
    });
  }, []);

  useFocusEffect(loveFavorite);

  return (
    <TouchableOpacity style={styles.container}>
      {isLove ? (
        <Ionicons
          onPress={removeTofavorite}
          name="heart-sharp"
          size={24}
          color={DARCK__COLOR__TEME.SECONST}
        />
      ) : (
        <Ionicons
          name="heart-outline"
          size={24}
          onPress={TouchHeart}
          color={DARCK__COLOR__TEME.SECONST}
        />
      )}
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginRight: 20,
  },
});

//make this component available to the app
export default LoveNovela;
