//import liraries
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import FastImage from "react-native-fast-image";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { DARCK__COLOR__TEME } from "../../Constants/Colors";
import { useAnuncios } from "../../Hook/anuncios/useAnuncios";
import { useNavigationTypes } from "../../types/types";

interface props {
  data: [
    {
      id: string;
      poster: string;
      banner?: string;
      title: string;
    }
  ];
}

// create a component
const Swiper = ({ data }: props) => {
  const navigate = useNavigation<useNavigationTypes>();

   const   { interstitialLoaded ,  interstitial }   =  useAnuncios()
  const  loadAds  =  async (item : any  ) =>  {
     await  navigate.navigate("previw", { id: item.id, poster: item.poster })
     if (!interstitialLoaded) {
      interstitial.show()
     }
  }
 
  return (
    <View style={styles.container}>
      <SwiperFlatList
        autoplay
        paginationStyle={styles.pagination}
        paginationStyleItem={styles.paginationItem}
        paginationActiveColor={DARCK__COLOR__TEME.SECONST}
        autoplayDelay={2}
        autoplayLoop
        index={2}
        showPagination
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              loadAds(item)
            }
            style={[styles.child, { backgroundColor: item }]}
          >
            <FastImage style={{ flex: 1 }} source={{ uri: item.banner }} />
            <Text numberOfLines={1} style={styles.text}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    height: 200,
    width: "100%",
  },
  child: {
    width,
    justifyContent: "center",
  },

  pagination: {
    position: "absolute",
    left: 0,
  },
  paginationItem: {
    width: 6,
    height: 6,
  },

  text: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginBottom: 10,
    marginRight: 10,
    fontSize: 19,
    fontWeight: "600",
    maxWidth: "60%",
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 10,
  },
});

//make this component available to the app
export default Swiper;
