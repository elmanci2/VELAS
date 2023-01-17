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
import { BannerAds } from "../Hook/anuncios/BannerAds";
import { useEffect, useState } from "react";
import { getWatchig } from "../db/db";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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

  useFocusEffect(() => {
    getWatchig().then((watching: any) => {
      setWatching(watching);
    });
  });

  const { isDarck } = useDarckStorage((state) => state);
  const { data: Emicion, isLoading: emicionLoading } = useQuery(
    ["emicion"],
    () => FechingData("/emicion")
  );
  const { data, isLoading } = useQuery(["novelas"], () =>
    FechingData("/novelas")
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
                data={watching as any}
              />
            )}

            <SLiderHorizontal title="ultimas novelas agregadas" data={data} />
            <SLiderHorizontal
              init={100}
              end={150}
              title="novelas mas vistas"
              data={data}
            />
            <SLiderHorizontal
              init={170}
              end={230}
              title="recomendadas para ti"
              data={data}
            />
            <SLiderHorizontal
              init={350}
              end={400}
              title="novelas de romance"
              data={data}
            />

            <SLiderHorizontal
              init={400}
              end={450}
              title="novelas de romance"
              data={data}
            />

            <SLiderHorizontal
              init={550}
              end={600}
              title="novelas de romance"
              data={data}
            />

            <SLiderHorizontal
              init={700}
              end={750}
              title="novelas de romance"
              data={data}
            />

            <SLiderHorizontal
              init={800}
              end={850}
              title="novelas de romance"
              data={data}
            />

            <BannerAds />
          </>
        }
      />
    </MyScreens>
  );
};

export default HomeScreen;
