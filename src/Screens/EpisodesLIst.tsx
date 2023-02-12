//import liraries
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { useQuery } from "react-query";
import MyScreens from "../Components/body/Screen";
import VerticalSlider from "../Components/custom/Sliders/SliderVertical";
import { FechingData } from "../Hook/FechingData";
import LoadScreen from "./util/LoadScreen";

// create a component
const EpisodesScreen = () => {
  const { data, isError, isLoading, refetch } = useQuery(["episodes"], () =>
    FechingData("/episodesdb")
  );

  if(isLoading)  <LoadScreen/>

  return (
    <MyScreens Styles={styles.container}>
      <VerticalSlider
        data={data}
        Styles={styles.Flatlist}
        refresh={refetch}
        isLoading={isLoading}
      />
    </MyScreens>
  );
};

// define your styles
const styles = StyleSheet.create({
  Flatlist: {
    justifyContent: "center",
    alignItems: "center",
    width:"100%",

    paddingTop: 20,
  },
  imgConted: {
    width: 160,
    height: 100,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
  },

  itemConted: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 5,
    width: "95%",
    borderRadius: 6,
    overflow: "hidden",
    shadowColor: "#0a0a0a52",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },

  title: {
    fontSize: 17,
    width: "55%",
    paddingHorizontal: 5,
  },

  container: {
    paddingLeft:10,
    justifyContent: "center",
    alignItems: "center",
  },
});

//make this component available to the app
export default EpisodesScreen;
