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
  const { data, isLoading, refetch } = useQuery("novelas", () =>
    FechingData("/novelas")
  );

  const [random50, setRandom50] = useState<Novel[]>([]);

  useEffect(() => {
    if (data && !isLoading) {
      let randomElements = [] as any;
      while (randomElements.length !== 50) {
        const randomIndex = Math.floor(
          Math.random() * data.slice(0, 500).length
        );
        if (!randomElements.includes(data[randomIndex])) {
          randomElements.push(data[randomIndex]);
        }
      }
      setRandom50(randomElements);
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <LoadScreen />;
  }

  return (
    <VerticalSlider
      recomedate
      data={random50 as any}
      refresh={refetch}
      isLoading={isLoading}
    />
  );
};

//make this component available to the app
export default Recommended;
