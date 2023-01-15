//import liraries
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MyScreens from "../../Components/body/Screen";
import { DARCK__COLOR__TEME, LING__COLOR__TEME } from "../../Constants/Colors";
import { useDarckStorage } from "../../zustand/state/myGlovalState";

interface props {
  refresh: () => Promise<[]>;
}

const ErrorScreen = ({ refresh }: props) => {
  const { isDarck } = useDarckStorage();
  const dacrk = isDarck ? DARCK__COLOR__TEME.EXTRAS : LING__COLOR__TEME.EXTRAS;

  return (
    <MyScreens Styles={{ justifyContent: "center", alignItems: "center" }}>
      <View style={styles.imgConte}>
        <Image
          style={styles.img}
          source={require("../../../assets/vela/img/arror404.png")}
        />
      </View>
      <Text style={[styles.text, { color: dacrk }]}>
        Oops hubo un error inténtalo más tarde
      </Text>

      <TouchableOpacity onPress={() => refresh()}>
        <Text
          style={[
            styles.reloadText,
            { color: "white", backgroundColor: DARCK__COLOR__TEME.SECONST },
          ]}
        >
          Recargar
        </Text>
      </TouchableOpacity>
    </MyScreens>
  );
};

const styles = StyleSheet.create({
  imgConte: {
    width: 320,
    height: 320,
  },
  img: {
    width: "100%",
    height: "100%",
  },

  text: {
    fontWeight: "800",
    fontSize: 20,
    textTransform: "capitalize",
    textAlign: "center",
    width: "90%",
  },

  reloadText: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 20,
    fontWeight: "600",
    fontSize: 17,
  },
});

export default ErrorScreen;
