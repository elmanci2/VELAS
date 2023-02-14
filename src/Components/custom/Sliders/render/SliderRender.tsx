//import liraries
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
  TextStyle,
} from "react-native";
import FastImage from "react-native-fast-image";
import {
  DARCK__COLOR__TEME,
  LING__COLOR__TEME,
} from "../../../../Constants/Colors";
import { BASE__IMG, notPoster } from "../../../../Constants/url";
import { useAnuncios } from "../../../../Hook/anuncios/useAnuncios";
import { useNavigationTypes } from "../../../../types/types";
import { useDarckStorage } from "../../../../zustand/state/myGlovalState";

interface props {
  item: {
    poster: string;
    title: string;
    id: string;
  };

  StylesContainer?: ViewStyle;
  StylesText?: TextStyle;
  StylesIMgConted?: ViewStyle;
}

// create a component
const SliderRender = ({
  item,
  StylesContainer,
  StylesText,
  StylesIMgConted,
}: props) => {
  const navigation = useNavigation<useNavigationTypes>();

  const state = useDarckStorage();

  const mode = state.isDarck
    ? DARCK__COLOR__TEME.EXTRAS
    : LING__COLOR__TEME.EXTRAS;

  const { interstitialLoaded, interstitial } = useAnuncios();

  const openAdds = async () => {
    navigation.navigate("previw", {
      id: item.id,
      poster: item.poster === notPoster ? BASE__IMG : item.poster,
    }); 
    
    if (!interstitialLoaded) {
    }
    interstitial.show();
  
  }; ///  navigato ad adds

  return (
    <TouchableOpacity
    key={item.id}
      onPress={openAdds}
      style={[styles.ContainerAnime, StylesContainer]}
    >
      <View style={[styles.imagenContainer, StylesIMgConted]}>
        <FastImage
          style={styles.img}
          source={{
            uri: item.poster === notPoster ? BASE__IMG : item.poster,
            priority: FastImage.priority.high
           
          }}
        />
      </View>
      <Text
        numberOfLines={2}
        style={[styles.name, { color: mode }, StylesText]}
      >
        {item?.title ?? '  '  }
      </Text>
    </TouchableOpacity>
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
    margin: 3,

  },

  imagenContainer: {
    width: "100%",
    height: 178,
    backgroundColor:"gray",
    borderRadius:7 
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

export default SliderRender;
