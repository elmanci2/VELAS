import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

type props = {
  refresh?: boolean;
  setrefresh?: any;
};

const OnError = ({ refresh, setrefresh }: props) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.imgConted}>
          <Image
            source={require("../assets/error.png")}
            style={styles.imageError}
          />
        </View>
        <Text style={styles.text}>
          ups! Tuvimos un error, inténtalo más tarde.
        </Text>
        {/*         <TouchableOpacity  onPress={() => setrefresh(!refresh) }  >
          <Text style={styles.reloadText}>recargar</Text>
        </TouchableOpacity> */}
      </View>
      <StatusBar hideTransitionAnimation="fade" hidden style="auto" />
    </View>
  );
};

export default OnError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imgConted: {
    width: 100,
    height: 100,
  },
  imageError: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    marginVertical: 10,
  },

  reloadText: {
    textAlign: "center",
    color: "white",
    backgroundColor: "#fe646f",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontWeight: "600",
    fontSize: 17,
    marginTop: 10,
  },
});
