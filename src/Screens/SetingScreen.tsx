import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import React, { useState } from "react";

import { MaterialIcons, Entypo, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { useNavigationTypes } from "../types/types";
import MyScreens from "../Components/body/Screen";
import { useDarckStorage } from "../zustand/state/myGlovalState";
import { DARCK__COLOR__TEME, LING__COLOR__TEME } from "../Constants/Colors";
import CustomAlert from "../Components/custom/Alert/CustomAlert";
import { useShare } from "../Hook/UseShare";
import { clearFavoritesSQLite } from "../db/db";
import { useAnuncios } from "../Hook/anuncios/useAnuncios";
import { useQuery } from "react-query";
import { FechingData } from "../Hook/FechingData";

export default function SetingScreen() {
  const navigate = useNavigation<useNavigationTypes>();
  const { isDarck, changeMode } = useDarckStorage((state) => state);

  const AjustesItems = [
    {
      id: 7,
      icon: isDarck ? "sun" : "moon",
      title: isDarck ? "modo claro" : "modo obscuro",
    },
    { id: 2, icon: "layers", title: "todas  las novelas " },
    { id: 4, icon: "share", title: "Comparte la aplicación" },
    { id: 5, icon: "star", title: "valora la aplicación " },
    { id: 6, icon: "alert-triangle", title: "Reportar un error" },
    { id: 8, icon: "trash", title: "borrar  favoritos" },
  ];

  const AjustesExtras = [
    { id: 1, icon: "coffee", title: "Apoya a los desarrolladores" },
    { id: 2, icon: "info", title: "Sobre la app" },
    { id: 3, icon: "help-circle", title: "Terminos y condiciones" },
  ];

  //// share fuction

  const [openAlert, setOpenAlert] = useState(false);
  const { interstitial, interstitialLoaded } = useAnuncios();

  const handelAdsNAllNovelas = async () => {
    if (!interstitialLoaded) {
      await interstitial.show();
    }
    await navigate.navigate("all");
  };

  const { data } = useQuery(["info"], () => FechingData("/config"));

  //// seting fuctinos
  const routes = (id: number) => {
    switch (id) {
      case 2:
        handelAdsNAllNovelas();

        break;
      case 3:
        navigate.navigate("Favoritos");
        break;
      case 4:
        useShare(`Hola! Estoy disfrutando de esta increíble app de novelas llamada Vela Novelas. ¡Si te gustan las novelas, definitivamente deberías probarla! Puedes descargarla aquí:${data.app_url}
  `);

        break;
      case 5:
        Linking.openURL(data.app_url);
        break;
      case 6:
        navigate.navigate("error");
        break;
      case 7:
        changeMode();
        break;
      case 8:
        clearFavoritesSQLite();
        setOpenAlert(!openAlert);

        break;
      default:
        null;
        break;
    }
  };

  //// hellow  
  /// extrax seting
  const setingStrast = (id: number) => {
    switch (id) {
      case 1:
        Linking.openURL(data.web);
        break;
      case 2:
        Linking.openURL(data.app_url);
        break;
      case 3:
        navigate.navigate("termineAnCondition");
        break;
    }
  };

  const dacrck = isDarck
    ? DARCK__COLOR__TEME.TERCERO
    : LING__COLOR__TEME.TERCERO;

  return (
    <MyScreens>
      <View style={styles.container}>
        <SafeAreaView style={styles.areViw}>
          <View style={[styles.box, { backgroundColor: dacrck }]}>
            {AjustesItems.map((e) => (
              <TouchableOpacity
                onPress={() => routes(e.id) as any}
                key={e.id}
                style={styles.boxitem}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Feather
                    name={e?.icon as any}
                    size={24}
                    color={isDarck ? "white" : "black"}
                  />

                  <Text
                    style={{
                      textTransform: "capitalize",
                      marginLeft: 10,
                      color: isDarck ? "white" : "black",
                    }}
                  >
                    {e.title}
                  </Text>
                </View>
                {e.id === 7 ? (
                  <Switch
                    trackColor={{ false: "#767577", true: "white" }}
                    thumbColor={LING__COLOR__TEME.SECONST}
                    value={isDarck}
                    onChange={() => {
                      changeMode();
                    }}
                  />
                ) : (
                  <Entypo
                    name="chevron-right"
                    size={24}
                    color={isDarck ? DARCK__COLOR__TEME.SECONST : "black"}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={[styles.box, { backgroundColor: dacrck }]}>
            {AjustesExtras.map((e) => (
              <TouchableOpacity
                onPress={() => setingStrast(e.id)}
                key={e.id}
                style={styles.boxitem}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Feather
                    name={e?.icon as any}
                    size={24}
                    color={isDarck ? "white" : "black"}
                  />
                  <Text
                    style={{
                      textTransform: "capitalize",
                      marginLeft: 10,
                      color: isDarck ? "white" : "black",
                    }}
                  >
                    {e.title}
                  </Text>
                </View>
                <Entypo
                  name="chevron-right"
                  size={24}
                  color={isDarck ? DARCK__COLOR__TEME.SECONST : "black"}
                />
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={[
              styles.box,
              {
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: dacrck,
              },
            ]}
          >
            <MaterialIcons
              name="system-update"
              size={24}
              color={isDarck ? DARCK__COLOR__TEME.SECONST : "black"}
            />
            <Text style={{ color: isDarck ? "white" : "black" }}>
              App version 1.1.0
            </Text>
          </View>

          <View
            style={[
              styles.box,
              {
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: dacrck,
              },
            ]}
          >
            <MaterialIcons
              name="exit-to-app"
              size={24}
              color={isDarck ? DARCK__COLOR__TEME.SECONST : "black"}
            />
            <Text style={{ color: isDarck ? "white" : "black" }}>salir</Text>
          </View>
        </SafeAreaView>
      </View>

      {openAlert ? (
        <CustomAlert
          isError
          time
          close={() => setOpenAlert(false)}
          massage="lista de favoritos  eliminada"
        />
      ) : (
        <></>
      )}
    </MyScreens>
  );
}

const styles = StyleSheet.create({
  boxitem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  box: {
    width: "95%",
    padding: 10,
    borderRadius: 10,

    marginVertical: 9,
    shadowColor: "rgba(0, 0, 0, 0.488);",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  areViw: {
    overflow: "hidden",
    paddingBottom: 80,
    marginTop: 10,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
