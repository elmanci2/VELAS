//import liraries
import { FlatList } from "react-native";
import { useQuery } from "react-query";
import MyScreens from "../Components/body/Screen";
import HomeMenu from "../Components/home/HomeMenu";
import { useDarckStorage } from "../zustand/state/myGlovalState";
import Swiper from "../Components/home/Swiper";
import { FechingData } from "../Hook/FechingData";
import LoadScreen from "./util/LoadScreen";
import SLiderHorizontal from "../Components/custom/Sliders/SliderHorizontal";
import { useEffect, useState } from "react";
import { getWatchig } from "../db/db";
import { useNavigation } from "@react-navigation/native";
import { useNavigationTypes } from "../types/types";
import * as Notifications from "expo-notifications";

const HomeScreen = () => {
  const [watching, setWatching] = useState([]);

  const navigation = useNavigation<useNavigationTypes>();

  const handleNotificationPress = async (notification: any) => {
    await navigation.navigate(
      "previw",
      await notification.notification.request.content.data
    );
  };

  Notifications.addNotificationResponseReceivedListener(
    handleNotificationPress
  );

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
  const { data, isLoading } = useQuery(["generos"], () =>
    FechingData("/generos")
  );

  if (emicionLoading || isLoading) return <LoadScreen />;

  return (
    <MyScreens>
      <HomeMenu darck={isDarck} />
      <FlatList
        data={[]}
        renderItem={() => null}
        ListEmptyComponent={
          <>
            <Swiper data={Emicion} />
            {watching?.length === 0 ? null : (
              <SLiderHorizontal
                watching
                title="continua viendo"
                data={watching.reverse() as any}
              />
            )}
            <SLiderHorizontal
              title="Recomendado para ti"
              data={data[0]?.generos1 ?? []}
            />
            <SLiderHorizontal
              title="más populares hoy "
              data={data[1]?.generos2 ?? []}
            />

            <SLiderHorizontal
              title="novelas para ver en familia "
              data={data[2]?.generos3 ?? []}
            />
            <SLiderHorizontal
              title="Clásicos inolvidables"
              data={data[3]?.generos4 ?? []}
            />

            <SLiderHorizontal
              title="Novelas para matonear "
              data={data[5]?.generos6 ?? []}
            />

            <SLiderHorizontal
              title="Recién actualizadas "
              data={data[7]?.generos8 ?? []}
            />
          </>
        }
      />
    </MyScreens>
  );
};

export default HomeScreen;
