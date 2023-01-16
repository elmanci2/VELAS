//import liraries
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, FlatList, RefreshControl } from "react-native";
import {
  DARCK__COLOR__TEME,
  LING__COLOR__TEME,
} from "../../../Constants/Colors";
import { BannerAds } from "../../../Hook/anuncios/BannerAds";
import ErrorScreen from "../../../Screens/error/ErrorScreen";
import LoadScreen from "../../../Screens/util/LoadScreen";
import { useNavigationTypes } from "../../../types/types";
import { useDarckStorage } from "../../../zustand/state/myGlovalState";
import MyScreens from "../../body/Screen";
import CustomText from "../../custom/Titles/CustomTitle";
import SliderRender from "./render/SliderRender";

interface props {
  isLoading: boolean;
  isError: boolean;
  headerText?: string;
  StylesContainer?: {};
  StylesText?: {};
  renderError?: boolean;
  refrech: () => any;
  isText?: boolean;
  data: [
    {
      poster: string;
      title: string;
      id: string;
    }
  ];
}

// create a component
const SliderGrid = ({
  data,
  refrech,
  isLoading,
  isError,
  headerText,
  StylesContainer,
  isText = false,
  StylesText,
  renderError = true,
}: props) => {
  if (isLoading) {
    return <LoadScreen />;
  } else if (isError && renderError) {
    return <ErrorScreen refresh={refrech} />;
  }

  return (
    <MyScreens>
      <FlatList
        ListFooterComponent={data?.length >= 4 ? <BannerAds /> : <></> ?? <></>}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          isText ? (
            <CustomText
              StylesContainer={StylesContainer}
              StylesText={StylesText}
              text={headerText as any}
            />
          ) : (
            <></>
          )
        }
        refreshControl={
          <RefreshControl onRefresh={refrech} refreshing={isLoading} />
        }
        numColumns={3}
        ListFooterComponentStyle={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        columnWrapperStyle={{ justifyContent: "center" }}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <SliderRender item={item} />}
      />
    </MyScreens>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingBottom: 20,
    height: "100%",
  },

  ContainerAnime: {
    width: 115,
    margin: 5,
    marginBottom: 5,
  },

  imagenContainer: {
    width: 115,
    height: 178,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 7,
    backgroundColor: "#111",
  },
  name: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
});

export default SliderGrid;
