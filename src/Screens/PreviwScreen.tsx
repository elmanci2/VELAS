//import liraries
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, Image, RefreshControl } from "react-native";
import { useQuery } from "react-query";
import MyScreens from "../Components/body/Screen";
import { FechingData } from "../Hook/FechingData";
import { useDarckStorage } from "../zustand/state/myGlovalState";
import ErrorScreen from "./error/ErrorScreen";
import LoadScreen from "./util/LoadScreen";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { DARCK__COLOR__TEME, LING__COLOR__TEME } from "../Constants/Colors";
import Constants from "expo-constants";
import Animation, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import EpisodesLIstPreviw from "../Components/PreviewScreenComponets/EpisodesLIst";
import { HeaderPreview } from "../Components/PreviewScreenComponets/MInicomponets";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useShare } from "../Hook/UseShare";


interface props {
  route: any;
  navigation: any;
}

// create a component
const PreviwScreen = ({ route, navigation }: props) => {
  ///  utiles fuctions
  const { id, poster } = route.params;
  const { isDarck } = useDarckStorage();
  const { data, isLoading, isError, refetch } = useQuery([id], () =>
    FechingData(`/infodb/${id}`)
  );

  /// mode conditionals
  const DarckGradien = isDarck
    ? DARCK__COLOR__TEME.PRIMARI
    : LING__COLOR__TEME.PRIMARI;
  const CoverColor = isDarck ? "#1313135e" : "#f5f5f52f";
  const iconColor = !isDarck ? "#1313135e" : "#f5f5f52f";
  const text = isDarck ? "white" : "black";

  const dacrkAnimation = isDarck
    ? DARCK__COLOR__TEME.TERCERO
    : LING__COLOR__TEME.PRIMARI;

  const arrowANimatin = !isDarck
    ? DARCK__COLOR__TEME.TERCERO
    : LING__COLOR__TEME.PRIMARI;

  //// styki animation

  const animatedValue = useSharedValue(0);
  const elevationValue = useSharedValue(0);
  const TextStykiValue = useSharedValue(0);

  const animationColor = useDerivedValue(() => {
    return interpolateColor(
      animatedValue.value,
      [0, 2],
      ["transparent", dacrkAnimation]
    );
  });

  const animation = useAnimatedStyle(() => {
    return {
      backgroundColor: animationColor.value,
      elevation: elevationValue.value,
    };
  });

  const TextStyky = useAnimatedStyle(() => {
    return {
      opacity: TextStykiValue.value,
      marginLeft: 7,
      color: text,
      width: "80%",
    };
  });

  const [ArrowAnimation, setArrowAnimation] = useState(true);

  const activeHeader = () => {
    animatedValue.value = withTiming(5, { duration: 200 });
    elevationValue.value = withTiming(4, { duration: 500 });
    TextStykiValue.value = withTiming(1, { duration: 500 });
    setArrowAnimation(false);
  };

  const inactiveHeader = () => {
    animatedValue.value = withTiming(0, { duration: 500 });
    elevationValue.value = withTiming(0, { duration: 500 });
    TextStykiValue.value = withTiming(0, { duration: 500 });
    setArrowAnimation(true);
  };

  function handleScroll(event: any) {
    const currentScrollPosition = event.nativeEvent.contentOffset.y;
    if (currentScrollPosition >= 110) {
      activeHeader();
    } else if (currentScrollPosition <= 500) {
      inactiveHeader();
    }
  }

  const [Continua, setContinua] = useState(1);

  /// is loadig return
  if (isLoading) {
    return <LoadScreen />;
  } else if (isError) {
    return <ErrorScreen refresh={refetch as any} />;
  }

  const URL = "https";

  /// retunt
  return (
    <MyScreens>
      <Animation.View style={[styles.arrows, animation]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Entypo
            style={[
              styles.iconHeader,
              ArrowAnimation ? { backgroundColor: iconColor } : null,
            ]}
            onPress={() => navigation.goBack()}
            name="chevron-left"
            size={27}
            color={!ArrowAnimation ? arrowANimatin : "white"}
          />
          <Animation.Text numberOfLines={1} style={[styles.title, TextStyky]}>
            {data.title}
          </Animation.Text>
        </View>

        {ArrowAnimation ? (
          <MaterialCommunityIcons
            style={[styles.iconHeader, { backgroundColor: iconColor }]}
            onPress={() =>
              useShare(
                `🎉 ¡No te pierdas la emoción de \u0002 ${data.title}  \u000f completamente GRATIS en Vela! 🔥Descubre nuestras series exclusivas y disfruta de horas de entretenimiento sin costo alguno. 🤝 Comparte con tus amigos y no pierdas la oportunidad de ver esta increíble historia  
                =>   ${URL}
                `
              )
            }
            name="share"
            size={24}
            color={"white"}
          />
        ) : null}
      </Animation.View>

      <FlatList
        data={[]}
        renderItem={() => null}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        style={{ flex: 1 }}
        ListEmptyComponent={
          <>
            <View style={styles.header}>
              <View style={styles.imagenConted}>
                <Image style={styles.img} source={{ uri: poster }} />
              </View>
              <LinearGradient
                colors={["transparent", DarckGradien]}
                style={styles.gradientHeader}
              />
              <View style={[styles.capaImg, { backgroundColor: CoverColor }]} />
            </View>
            {/* metadatas */}
            <HeaderPreview
              data={data}
              poster={poster}
              Continua={Continua}
              text={text}
            />
            <EpisodesLIstPreviw
              poster={poster}
              data={data}
              text={text}
              setContinua={setContinua}
            />
          </>
        }
      />
    </MyScreens>
  );
};

// define your styles
const styles = StyleSheet.create({
  sinopsisContainer: {
    paddingHorizontal: 7,
    paddingVertical: 7,
    paddingTop: 7,
    marginHorizontal: 5,
    borderRadius: 6,
    marginBottom: 7,
  },

  ///  text  episode

  infoCantainerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 20,
  },

  title: {
    justifyContent: "center",
    fontWeight: "600",
    fontSize: 16,
  },

  /// img const

  espisodesConted: {
    marginHorizontal: 7,
    marginTop: 10,
  },

  sinopsis: {
    fontWeight: "300",
  },

  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },

  header: {
    height: 400,
    position: "relative",
  },
  img: {
    width: "100%",
    height: "100%",
  },

  imagenConted: {
    width: "100%",
    height: "100%",
  },
  gradientHeader: {
    width: "100%",
    position: "absolute",
    height: "70%",
    zIndex: 2,
    bottom: 0,
  },
  capaImg: {
    /*     width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1, */
  },

  arrows: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    paddingVertical: 10,
    zIndex: 5,
    top: 0,
    paddingTop: Constants.statusBarHeight,
  },

  iconHeader: {
    padding: 5,
    borderRadius: 50,
    alignItems: "center",
  },
});

//make this component available to the app
export default PreviwScreen;
