//import liraries
import { useNavigation } from "@react-navigation/native";
import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { DARCK__COLOR__TEME } from "../../../Constants/Colors";
import { BannerAds } from "../../../Hook/anuncios/BannerAds";
import { useAnuncios } from "../../../Hook/anuncios/useAnuncios";
import { useNavigationTypes } from "../../../types/types";
import { useDarckStorage } from "../../../zustand/state/myGlovalState";
import MyScreens from "../../body/Screen";
import {
  EpisodesListItem,
  RecomendadoRender,
} from "../../MiniComponets/EpisodesCOnponet";
import CustomText from "../Titles/CustomTitle";

interface props {
  data: [
    {
      poster: string;
      id: string;
      title: string;
    }
  ];

  Styles?: any;
  refresh: () => any;
  isLoading: boolean;
  recomedate?: boolean;
}
// create a component
const VerticalSlider = ({
  data,
  Styles,
  refresh,
  isLoading,
  recomedate = false,
}: props) => {
  const { isDarck } = useDarckStorage();

  const navigation = useNavigation<useNavigationTypes>();

  //// recomedate load adds

  const { interstitial, interstitialLoaded } = useAnuncios();

  //  recomed fuction
  const recomedFuction = async (item: any ,  openRute : string ) => {

    await navigation.navigate(openRute, {
      id: item.id,
      poster: item.poster,
    }); 

    if (!interstitialLoaded) {
      interstitial.show();
    }

  };

  return (
    <MyScreens>
      <FlatList
        ListHeaderComponent={
          recomedate ? (
            <CustomText
              StylesContainer={styles.containerText}
              StylesText={styles.text}
              text="Recomendado para ti"
            />
          ) : (
            <></>
          )
        }
        ListFooterComponent={
          recomedate ? (
            <>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
                onPress={() =>  recomedFuction({} ,"all")}
              >
                <Text style={styles.add}>ver mas </Text>
              </TouchableOpacity>

              <BannerAds />
            </>
          ) : (
            <></>
          )
        }
        refreshControl={
          <RefreshControl onRefresh={() => refresh()} refreshing={isLoading} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={Styles}
        data={data}
        renderItem={({ item, index }) =>
          recomedate ? (
            <TouchableOpacity
              style={{ width: "100%", justifyContent: "center" }}
              onPress={() => recomedFuction(item , "previw")}
            >
              <RecomendadoRender item={item} dark={isDarck} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("videoPLayer", {
                  id: item.id,
                  title: item.title,
                })
              }
            >
              <EpisodesListItem item={item} dark={isDarck} />
            </TouchableOpacity>
          )
        }
      />
    </MyScreens>
  );
};

const styles = StyleSheet.create({
  containerText: {
    marginVertical: 20,
    marginLeft: 15,
  },
  text: {
    textTransform: "capitalize",
  },

  textBottom: {
    fontWeight: "500",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "red",
    borderRadius: 8,
    color: "white",
  },

  add: {
    marginVertical: 10,
    backgroundColor: DARCK__COLOR__TEME.SECONST,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    color: "white",
    fontWeight: "700",
    fontSize: 15,
    borderColor: "white",
  },
});

//make this component available to the app
export default VerticalSlider;
