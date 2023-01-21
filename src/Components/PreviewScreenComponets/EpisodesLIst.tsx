import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { DARCK__COLOR__TEME } from "../../Constants/Colors";
import { PropsComponetPrevi, useNavigationTypes } from "../../types/types";
import { useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { fetchLastEpisode, insertLastEpisode, saveWatching } from "../../db/db";
import { BannerAds } from "../../Hook/anuncios/BannerAds";

// create a component

interface items {
  poster: string;
  id: string;
  title: string;
}

const EpisodesLIstPreviw = ({
  data,
  text,
  setContinua,
  poster,
}: PropsComponetPrevi) => {
  const [ViewEpisodes, setViewEpisodes] = useState(Number);
  const navigation = useNavigation<useNavigationTypes>();

  const itemWashing = {
    id: data.id,
    title: data.title,
    poster: poster,
  };

  const ViewEpisodeFuction = async (index: number, item: items) => {
    saveWatching(itemWashing as any);
    insertLastEpisode(data.id, index);
    await navigation.navigate("videoPLayer", {
      id: item.id,
      title: item.title,
    });
  };

  useFocusEffect(() => {
    fetchLastEpisode(data.id).then((episode: any) => {
      setContinua && setContinua(episode[0]?.last_episode ?? 0);
      setViewEpisodes(episode[0]?.last_episode ?? null );
      ///   add whashin g
    });
  });

  return (
    <View style={styles.espisodesConted}>
      <FlatList
        ListFooterComponent={<BannerAds />}
        data={data.episodes}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => ViewEpisodeFuction(index, item)}
            key={item?.id ?? ""}
            style={styles.epContainer}
          >
            <View style={styles.epImgCOnted}>
              <Image style={styles.img} source={{ uri: item?.poster ?? "" }} />

              <View style={styles.iconEpisodesBox}>
                <FontAwesome name="play-circle" size={34} color="white" />
                {ViewEpisodes >= index ? (
                  <View style={styles.episodesBufer} />
                ) : null}
              </View>
            </View>
            <View style={{ width: "50%", flexDirection: "row" }}>
              <Text style={{ marginLeft: 10, fontSize: 15.5, color: text }}>
                Capitulo
              </Text>
              <Text style={[styles.epText, { color: text }]}>
                {item?.title.split("-")[1].replace("Capitulo", "") ?? ""}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// define your styles

// define your styles
const styles = StyleSheet.create({
  episodesBufer: {
    width: "100%",
    height: 4,
    backgroundColor: DARCK__COLOR__TEME.SECONST,
    bottom: 0,
    position: "absolute",
    borderBottomLeftRadius: 5,
    borderBottomEndRadius: 5,
  },

  iconEpisodesBox: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 4,
    backgroundColor: "#1a1a1a42",
    borderRadius: 5,
  },

  ///  text  episode

  epText: {
    fontWeight: "600",
  },

  /// img const

  img: { width: "100%", height: "100%", borderRadius: 5 },

  epContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },

  epImgCOnted: {
    width: 160,
    height: 100,
    marginBottom: 10,
    position: "relative",
  },

  espisodesConted: {
    marginHorizontal: 7,
    marginTop: 10,
  },
});

//make this component available to the app
export default EpisodesLIstPreviw;
