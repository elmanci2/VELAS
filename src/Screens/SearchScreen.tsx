//import liraries
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import MyScreens from "../Components/body/Screen";
import Constants from "expo-constants";
import SliderGrid from "../Components/custom/Sliders/SliderGrid";
import { useQuery } from "react-query";
import { FechingData } from "../Hook/FechingData";
import { useDarckStorage } from "../zustand/state/myGlovalState";
import { DARCK__COLOR__TEME, LING__COLOR__TEME } from "../Constants/Colors";

import { EvilIcons } from "@expo/vector-icons";
import useIsKeyboard from "../Hook/useIsKeyboard";
import Recommended from "./util/Recommended";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// create a component

const SearchScreen = () => {
  const isKeybord = useIsKeyboard();
  const [InputValue, setInputValue] = useState("");
  const { isDarck } = useDarckStorage();

  const { data, isLoading, refetch, isError } = useQuery(
    ["search", InputValue],
    () => FechingData(`/search/${InputValue}`)
  );

  const WindValue = useSharedValue(300);

  const Config = {
    duration: 500,
  };

  const mayStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(WindValue.value, Config),
    };
  });

  const textValueAnimate = useSharedValue(0);
  const TextClose = useAnimatedStyle(() => {
    return {
      width: withTiming(textValueAnimate.value, Config),
    };
  });

  const widInput = () => {
    if (isKeybord) {
      WindValue.value = 250;
      textValueAnimate.value = 100;
    } else if (!isKeybord && InputValue !== "") {
      WindValue.value = 230;
    } else {
      WindValue.value = 300;
      textValueAnimate.value = 1;
    }
  };

  widInput();

  const darck = isDarck
    ? DARCK__COLOR__TEME.TERCERO
    : LING__COLOR__TEME.TERCERO;

  const TextInPut = isDarck
    ? DARCK__COLOR__TEME.EXTRAS
    : LING__COLOR__TEME.EXTRAS;

  return (
    <MyScreens Styles={{ alignItems: "center" }}>
      <View style={[styles.inputBox, { backgroundColor: darck }]}>
        <Animated.View
          style={[
            styles.inputContainer,
            mayStyles,
            {
              backgroundColor: isDarck ? "#444444" : LING__COLOR__TEME.PRIMARI,
            },
          ]}
        >
          <EvilIcons name="search" size={30} color={TextInPut} />
          <TextInput
            onChangeText={setInputValue}
            value={InputValue}
            placeholderTextColor={isDarck ? TextInPut : "#9E9E9E"}
            placeholder="Busca tu novela aqui"
            style={[
              styles.input,
              {
                color: isDarck ? "white" : "black",
                backgroundColor: isDarck
                  ? "#444444"
                  : LING__COLOR__TEME.PRIMARI,
              },
            ]}
            autoFocus
          />
        </Animated.View>

        <TouchableOpacity onPress={() => setInputValue("")}>
          <Animated.Text
            style={[styles.textInput, TextClose, { color: TextInPut }]}
          >
            Cancelar
          </Animated.Text>
        </TouchableOpacity>
      </View>

      {isKeybord || InputValue !== "" ? (
        InputValue === "" ? (
          <Text style={[styles.text, { color: darck ? "white" : "black" }]}>
            Que Buscas ?
          </Text>
        ) : (
          <SliderGrid
            renderError={false}
            data={data}
            refrech={refetch}
            isLoading={isLoading}
            isError={isError}
          />
        )
      ) : (
        <Recommended />
      )}
    </MyScreens>
  );
};

const styles = StyleSheet.create({
  input: {
    height: "100%",
    width: "100%",
  },

  inputBox: {
    width: "100%",
    paddingTop: Constants.statusBarHeight + 20,
    paddingBottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  textInput: {
    height: 20,
    fontSize: 16,
    fontWeight: "500",
    paddingHorizontal: 10,
  },

  inputContainer: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 15,
    paddingVertical: 5,
    overflow: "hidden",
  },

  text: {
    fontSize: 26,
    fontWeight: "500",
    marginTop: 10,
  },
});

export default SearchScreen;
