//import liraries

import { View, Text, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";
import { DARCK__COLOR__TEME, LING__COLOR__TEME } from "../../Constants/Colors";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useNavigationTypes } from "../../types/types";

type props = {
  darck: boolean;
};

const HomeMenu = ({ darck }: props) => {
  const navigation = useNavigation<useNavigationTypes>();

  const isDacrk = darck
    ? DARCK__COLOR__TEME.PRIMARI
    : LING__COLOR__TEME.PRIMARI;
  return (
    <View style={[styles.menu, { backgroundColor: isDacrk }]}>
      <View style={styles.menuItems}>
        <View style={styles.menuLogo}>
          <View style={styles.menuImageConted}>
            <Image
              style={{ width: "100%", height: "100%" }}
              source={require("../../../assets/vela/logo.png")}
            />
          </View>
          <Text style={styles.logoText}>ela</Text>
        </View>

        <View style={styles.menuExtras}>
          <EvilIcons
            name="search"
            size={35}
            color={darck ? "white" : "black"}
            onPress={() => navigation.navigate("buscar")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    width: "100%",
    paddingVertical: 10,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
    elevation: 0.8,
    shadowColor: "#1f1f1f3d",
  },
  menuItems: {
    marginTop: Constants.statusBarHeight,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  menuLogo: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoText: {
    color: LING__COLOR__TEME.SECONST,
    fontWeight: "900",
    fontSize: 33,
    marginLeft: -5,
  },
  menuImageConted: {
    width: 40,
    height: 40,
  },

  menuExtras: {
    flexDirection: "row",
  },
});

export default HomeMenu;
