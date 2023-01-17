import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import CustomText from "../Titles/CustomTitle";
import SliderRender from "./render/SliderRender";
import { DARCK__COLOR__TEME } from "../../../Constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { useNavigationTypes } from "../../../types/types";

interface props {
  data: [
    {
      id: string;
      poster: string;
      title: string;
    }
  ];

  title: string;

  init?: number;
  end?: number;

  watching?: boolean;
}
const SLiderHorizontal = ({
  data,
  init = 0,
  end = 50,
  title,
  watching = false,
}: props) => {
  const navigate = useNavigation<useNavigationTypes>();

  return (
    <>
      <View style={styles.textContainer}>
        <CustomText StylesText={styles.CustomText} text={title} />
        <TouchableOpacity
          onPress={() => navigate.navigate(watching ? "lastWatching" : "all")}
        >
          <Text style={styles.text}>ver mas</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={watching ? data : data?.slice(init, end) ?? []}
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
