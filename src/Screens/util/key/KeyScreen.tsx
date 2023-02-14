import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import MyScreens from "../../../Components/body/Screen";
import { useDarckStorage } from "../../../zustand/state/myGlovalState";
import { Entypo } from "@expo/vector-icons";

export default function KeyScreen(props: any) {
  // hooks
  const { isDarck } = useDarckStorage();

  //  conditionales
  const textDarck = { color: isDarck ? "white" : "black" };

  // fuctions
  const useNavigationFuction = () => {
    props.navigation.navigate("Home");
  };

  return (
    <MyScreens>
      <View style={styles.constainer}>
        <Text style={[styles.text, textDarck]}>
          Presiona el botón entrar para ver todas las novelas
        </Text>

        <TouchableOpacity onPress={useNavigationFuction} style={styles.bootom}>
          <Text style={styles.bootmText}>
            <Entypo name="chevron-right" size={28} color="white" /> Entrar
          </Text>
        </TouchableOpacity>
      </View>
    </MyScreens>
  );
}

//  styler
const styles = StyleSheet.create({
  constainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
    marginHorizontal: 15,
    marginBottom: 25,
  },

  bootom: {
    backgroundColor: "red",
    borderRadius: 7,
    paddingVertical: 6,
    paddingHorizontal: 15,
  },

  bootmText: {
    color: "white",
    fontSize: 26,
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
