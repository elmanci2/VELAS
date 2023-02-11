//import liraries
import React, { Component, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "react-query";
import MyScreens from "../../Components/body/Screen";
import VerticalSlider from "../../Components/custom/Sliders/SliderVertical";
import { FechingData } from "../../Hook/FechingData";
import LoadScreen from "./LoadScreen";

interface Novel {
  id: string;
  title: string;
  poster: string;
}

// create a component
const Recommended = () => {
  const { data, isLoading, refetch } = useQuery(["recomed"], () =>
    FechingData("/recomed")
  );

 

  if (isLoading) {
    return <LoadScreen />;
  }

  return (
    <VerticalSlider
      recomedate
      data={data}
      refresh={refetch}
      isLoading={isLoading}
    />
  );
};

//make this component available to the app
export default Recommended;
