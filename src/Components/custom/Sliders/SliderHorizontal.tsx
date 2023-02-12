import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import CustomText from "../Titles/CustomTitle";
import SliderRender from "./render/SliderRender";
import { DARCK__COLOR__TEME } from "../../../Constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useNavigationTypes } from "../../../types/types";
import { useAnuncios } from "../../../Hook/anuncios/useAnuncios";
import { FlashList } from "@shopify/flash-list";

interface props {
  data: [
    {
      id: string;
      poster: string;
      title: string;
    }
  ];

  title: string;

  watching?: boolean;
}
const SLiderHorizontal = ({ data, title, watching = false }: props) => {
  const navigate = useNavigation<useNavigationTypes>();

  const { interstitialLoaded, interstitial } = useAnuncios();

  const navigateAllScreen = async () => {
    if (interstitialLoaded) {
      interstitial.show();
    }
    await navigate.navigate(watching ? "lastWatching" : "all");
  };

  const { width, height } = Dimensions.get('window');


  return (
    <>
      <View style={styles.textContainer}>
        <CustomText StylesText={styles.CustomText} text={title} />
        <TouchableOpacity onPress={navigateAllScreen}>
          <Text style={styles.text}>ver mas</Text>
        </TouchableOpacity>
      </View>
      <FlashList
      estimatedListSize={ { height:220 ,  width: width }}
      estimatedItemSize={300}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        renderItem={({ item, index }) => (
          <SliderRender StylesIMgConted={styles.imgCotainer} item={item} />
        )}
      />
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  imgCotainer: {
    width: 113,
    height: 170,
    margin: 0,
  },

  CustomText: {
    textTransform: "capitalize",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 10,
  },

  text: {
    color: DARCK__COLOR__TEME.SECONST,
    fontSize: 18,
    fontWeight: "500",
  },
});

//make this component available to the app
export default SLiderHorizontal;
