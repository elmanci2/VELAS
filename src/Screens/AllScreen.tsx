//import liraries
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useQuery } from "react-query";
import MyScreens from "../Components/body/Screen";
import { FechingData } from "../Hook/FechingData";
import Constants  from "expo-constants";
import AllnovelasGrid from "../Components/custom/Sliders/AllnovelasGrid";

// create a component
const AllScreen = () => {
  const { data, isError, refetch, isLoading } = useQuery(["novelas"], () =>
    FechingData("/novelas")
  );

  return (
    <MyScreens>
      <AllnovelasGrid
      StylesText={styles.StylesText}
        data={data}
        isLoading={isLoading}
        refrech={refetch}
        isError={isError}
      />
    </MyScreens>
  );
};

// define your styles
const styles = StyleSheet.create({
  StylesText: {
    marginTop:Constants.statusBarHeight +  20 ,
    marginBottom:Constants.statusBarHeight  - 20,
    paddingLeft: 10 ,  
    fontSize:25,
     textTransform:'capitalize',
     
  },



});

//make this component available to the app
export default AllScreen;
