//import liraries
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MyScreens from "../../Components/body/Screen";
import { FontAwesome } from "@expo/vector-icons";
import { useDarckStorage } from "../../zustand/state/myGlovalState";
import { DARCK__COLOR__TEME, LING__COLOR__TEME } from "../../Constants/Colors";
import * as Animatable from "react-native-animatable";
import CustomAlert from "../../Components/custom/Alert/CustomAlert";
import { BASE__URL } from "../../Constants/url";
import Animate, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import useIsKeyboard from "../../Hook/useIsKeyboard";

// create a component
const ReportError = () => {
  const { isDarck } = useDarckStorage();

  const keyboar = useIsKeyboard();

  const [inputsInfo, setInputsInfo] = useState({
    id: "",
    error: "",
  });

  const config = {
    duration: 600,
  };
  const animateValue = useSharedValue(130);
  /// animation
  const nweAnimatio = useAnimatedStyle(() => {
    return {
      height: withTiming(animateValue.value, config as any),
      marginBottom: 20,
    };
  });

  if (keyboar) {
    animateValue.value = 0;
  } else {
    animateValue.value = 130;
  }

  /// clos  modal
  const [closeModal, setCloseModal] = useState(false);
  const [IsErrorModal, setIsErrorModal] = useState(false);
  const [modalMasagge, setModalMasagge] = useState(
    "Mensaje recibido 👍 Gracias por avisarnos"
  );

  const [errorMasage, setErrorMasage] = useState(false);

  const dark = isDarck ? DARCK__COLOR__TEME.EXTRAS : LING__COLOR__TEME.EXTRAS;
  const mode = isDarck ? "#252525" : LING__COLOR__TEME.TERCERO;

  const unSubmitError = () => {
    setModalMasagge("Hubo un error inténtalo más tarde ");
    setCloseModal(true);
    setIsErrorModal(true);
  };

  const submitMassage = () => {
    fetch(`${BASE__URL}/error`, {
      method: "POST",
      body: JSON.stringify({
        id: inputsInfo.id,
        error: inputsInfo.error,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => null)
      .catch((error) => unSubmitError());
    setErrorMasage(false);
  };

  const submit = (t: string) => {
    if (inputsInfo.id === "" || inputsInfo.error === "") {
      setErrorMasage(true);
    } else {
      submitMassage();
      setInputsInfo({
        ...inputsInfo,
        id: "",
        error: "",
      });
      setCloseModal(true);
    }
  };

  const validateStyles = (t: string) => {
    if (errorMasage && t === "") {
      return { borderColor: "red", borderWidth: 1 };
    } else {
      return { borderColor: "#0ebbff", borderWidth: 1 };
    }
  };

  const onCLoseModela = () => {
    setCloseModal(false);
  };

  return (
    <MyScreens>
      <View style={styles.conted}>
        <Animate.View style={nweAnimatio}>
          <Text style={[styles.text, { color: dark }]}>
            Por favor expliqué con detalles el error para resolverlo lo más
            rápido posible.
          </Text>
          <Text style={[styles.text, { color: dark, marginTop: -10 }]}>
            Agradecemos tu apoyo gracias por mantener la app sin errores🥰
          </Text>
        </Animate.View>

        <View style={styles.inputsConted}>
          <View style={styles.inputBox}>
            {errorMasage && inputsInfo.id === "" ? (
              <Animatable.Text animation="fadeInUp" style={styles.errorMasage}>
                Completa este información
              </Animatable.Text>
            ) : null}
            <TextInput
              placeholderTextColor={isDarck ? dark : "#9E9E9E"}
              value={inputsInfo.id}
              onChangeText={(text) =>
                setInputsInfo({
                  ...inputsInfo,
                  id: text,
                })
              }
              style={[
                styles.inputs,
                styles.input1,
                validateStyles(inputsInfo.id),
                { backgroundColor: mode, color: dark },
              ]}
              placeholder="Nombre de la novela"
              multiline
            />
          </View>

          <View style={styles.inputBox}>
            {errorMasage && inputsInfo.error === "" ? (
              <Animatable.Text animation="fadeInUp" style={styles.errorMasage}>
                Completa este información
              </Animatable.Text>
            ) : null}
            <TextInput
              placeholderTextColor={isDarck ? dark : "#9E9E9E"}
              value={inputsInfo.error}
              style={[
                styles.inputs,
                styles.input2,
                validateStyles(inputsInfo.error),
                { backgroundColor: mode, color: dark },
              ]}
              onChangeText={(text) =>
                setInputsInfo({
                  ...inputsInfo,
                  error: text,
                })
              }
              placeholder="Cual es el erro"
              numberOfLines={9}
              autoCorrect
              multiline
            />
          </View>
        </View>

        <View style={[styles.enviar]}>
          <TouchableOpacity
            onPress={submit as any}
            style={[styles.eviarItem, { backgroundColor: mode }]}
          >
            <FontAwesome name="paper-plane" size={24} color={dark} />
            <Text style={[styles.textEnviar, { color: dark }]}>enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
      {closeModal ? (
        <CustomAlert
          close={onCLoseModela}
          massage={modalMasagge}
          isError={IsErrorModal}
          time
        />
      ) : (
        <></>
      )}
    </MyScreens>
  );
};

// define your styles
const styles = StyleSheet.create({
  text: {
    marginVertical: 30,
    fontWeight: "600",
    fontSize: 16,
    paddingHorizontal: 20,
  },
  conted: {
    paddingHorizontal: 10,
  },
  inputsConted: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },

  inputs: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 6,
    shadowColor: "rgba(0, 0, 0, 0.188);",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  input1: {
    marginBottom: 20,
    padding: 20,
  },

  input2: {
    paddingHorizontal: 20,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingVertical: 10,
  },

  eviarItem: {
    backgroundColor: "white",
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    borderRadius: 6,

    shadowColor: "rgba(0, 0, 0, 0.188);",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },

  enviar: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },

  textEnviar: {
    marginLeft: 10,
    fontWeight: "500",
    fontSize: 16,
    textTransform: "capitalize",
  },

  errorMasage: {
    fontWeight: "700",
    fontSize: 16,
    color: "#ec1e47",
    marginBottom: 10,
    textAlign: "left",
  },

  inputBox: {
    width: "90%",
  },
});

export default ReportError;
