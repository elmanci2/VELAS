import { View, Text, StyleSheet } from "react-native";
import { DARCK__COLOR__TEME } from "../../Constants/Colors";
import LoveNovela from "../MiniComponets/LoveNvela";
import { FontAwesome } from "@expo/vector-icons";
import { PropsComponetPrevi } from "../../types/types";
import { useShare } from "../../Hook/UseShare";

// create a component
export const HeaderPreview = ({
  text,
  data,
  poster,
  Continua,
}: PropsComponetPrevi) => {

  const URL = ''

  return (
    <>
      <View style={[styles.infoCantainerTitle]}>
        <View style={{ width: "80%" }}>
          <Text numberOfLines={2} style={[styles.title, { color: text }]}>
            {data.title}
          </Text>

          <Text style={{ fontWeight: "300", fontSize: 14, color: text }}>
            <Text
              style={{
                color: DARCK__COLOR__TEME.SECONST,
                fontWeight: "300",
                fontSize: 14,
              }}
            >
              Capitulos:
            </Text>
            {data?.episodes?.length ?? 0    }
          </Text>
        </View>

        <View style={{ flexDirection: "row", paddingRight: 10 }}>
          <LoveNovela
            data={
              {
                id: data.id || null,
                poster: poster || null,
                title: data.title || null,
              } as any
            }
            id={data.id}
          />

          <FontAwesome
            onPress={() =>
              useShare(
                `🎉 ¡No te pierdas la emoción de \u0002 ${data.title}  \u000f completamente GRATIS en Vela! 🔥Descubre nuestras series exclusivas y disfruta de horas de entretenimiento sin costo alguno. 🤝 Comparte con tus amigos y no pierdas la oportunidad de ver esta increíble historia  
                =>   ${URL}
                `
              )
            }
            name="share-square"
            size={24}
            color={text}
          />
        </View>
      </View>

      <View style={[styles.sinopsisContainer]}>
        <Text style={{ color: text, fontWeight: "700", marginBottom: 6 }}>
          Sinopsis
        </Text>
        <Text numberOfLines={5} style={[styles.sinopsis, { color: text }]}>
          {data?.sinopsis ?? ""}
        </Text>
        {/* duraction   */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 6,
          }}
        >
          <Text style={{ marginTop: 6, fontWeight: "600", color: text }}>
            Duracion:
            <Text style={{ color: DARCK__COLOR__TEME.SECONST }}>40 min</Text>
          </Text>

          <Text style={{ fontWeight: "600", color: text }}>
            Continua:
            <Text style={{ color: DARCK__COLOR__TEME.SECONST }}>
              {Continua ? (Continua === 0 || null ? 1 : Continua + 2) : 1}
            </Text>
          </Text>
        </View>
      </View>
    </>
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

  sinopsis: {
    fontWeight: "300",
  },
});
