import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  Container: {
    height: "100%",
    backgroundColor: "black",
    position: "relative",
    width: "100%",
  },
  TouchContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 2,
  },
  gradient: {
    width: "100%",
    height: "80%",
    position: "absolute",
    bottom: 0,
  },

  VideoContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },

  statusContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 2,
  },
  controlls: {
    width: "100%",
    height: "100%",
  },

  headerArrow: {
    width: "100%",
    flexDirection: "row",
    marginLeft: "7%",
    marginTop: "2%",
    alignItems: "center",
    position: "absolute",
    zIndex: 10,
  },

  controllsText: {
    marginLeft:10,
    textTransform: "capitalize",
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    width:"80%"
  },

  arrow: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 30,
  },

  PLayPauseBaackControlls: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    position: "absolute",
    zIndex: 4,
  },

  backSecus: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },

  playingControlls: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 60,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },

  PLayTimeControlls: {
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    zIndex: 6,
    alignItems: "center",
    marginBottom: "7%",
  },

  numItem: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },

  ActivitiIndicator: {
    position: "absolute",
    alignItems:"center",
    justifyContent:"center"
  },

  AditionalControllsContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    zIndex: 5,
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 30,
  },

  textExtra: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
    marginLeft: 7,
    textTransform: "capitalize",
  },

  BottomsExtraSeting: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
});
