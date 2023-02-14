//import liraries
import { useQuery } from "react-query";
import MyScreens from "../Components/body/Screen";
import HomeMenu from "../Components/home/HomeMenu";
import { useDarckStorage } from "../zustand/state/myGlovalState";
import Swiper from "../Components/home/Swiper";
import { FechingData } from "../Hook/FechingData";
import LoadScreen from "./util/LoadScreen";
import SLiderHorizontal from "../Components/custom/Sliders/SliderHorizontal";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getWatchig } from "../db/db";
import { FlashList } from "@shopify/flash-list";
import { RefreshControl, StyleSheet } from "react-native";

type rendritems = {
  item: any;
  index: number;
};
const HomeScreen = () => {
  const [watching, setWatching] = useState([]);

  useEffect(() => {
    getWatchig().then((watching: any) => {
      setWatching(watching);
    });
  }, []);

  const { isDarck } = useDarckStorage((state) => state);
  const { data: Emicion, isLoading: emicionLoading } = useQuery(
    ["emicion"],
    () => FechingData("/emicion")
  );
  const {
    data,
    isLoading: dataLoading,
    refetch,
  } = useQuery(["generos"], () => FechingData("/generos"));

  ///  extract data
  const generateData = useMemo(() => {
    return [
      { name: "Continuar viendo", data: watching.reverse() },
      {
        name: "Recomendado para ti",
        data: data ? data[0]?.generos1 ?? [] : [],
      },
      { name: "Más populares hoy", data: data ? data[1]?.generos2 ?? [] : [] },
      {
        name: "Novelas para ver en familia",
        data: data ? data[2]?.generos3 ?? [] : [],
      },
      {
        name: "Clásicos inolvidables",
        data: data ? data[3]?.generos4 ?? [] : [],
      },
      {
        name: "Novelas para matonear",
        data: data ? data[4]?.generos5 ?? [] : [],
      },
      {
        name: "Recién actualizadas",
        data: data ? data[5]?.generos6 ?? [] : [],
      },
      {
        name: "Novelas más vistas hoy",
        data: data ? data[6]?.generos7 ?? [] : [],
      },

      {
        name: "Historias inolvidables",
        data: data ? data[7]?.generos8 ?? [] : [],
      },
    ];
  }, [data]);

  const renderSlider = useCallback(({ item, index }: rendritems) => {
    if (item.data.length > 0) {
      return (
        <SLiderHorizontal
          title={item.name}
          data={item.data}
          watching={item.name === "Continuar viendo" ? true : false}
        />
      );
    }
    return null;
  }, []);

  /// load componet
  const isLoading = emicionLoading || dataLoading;
  if (isLoading) return <LoadScreen />;

  return (
    <MyScreens>
      <HomeMenu darck={isDarck} />
      <FlashList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        contentContainerStyle={styles.conted}
        data={generateData}
        renderItem={renderSlider}
        ListHeaderComponent={<Swiper data={Emicion} />}
      />
    </MyScreens>
  );
};

const styles = StyleSheet.create({
  conted: {
    paddingBottom: 50,
  },
});

export default HomeScreen;
