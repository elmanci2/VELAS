import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Video } from "expo-av";
import { StatusBar } from "expo-status-bar";
import {
  MaterialIcons,
  Feather,
  AntDesign,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { styles } from "../util/Styles";
import { _Props, _statusTYpe } from "../util/Types";
import { useNavigation } from "@react-navigation/native";
import Load__Video from "./Load__Video";
import OnError from "./OnError";
import { getTime, saveLastTime } from "../../../../db/db";

export default function Video_PLayer({
  uri = "url",
  title = "title",
  sizeIConst = 40,
  timePosition,
  loadScreen = true,
  refresh,
  setrefresh,
  id,
}: _Props) {
  const [status, setStatus] = useState<_statusTYpe>({} as any);
  const [activeControlls, setActiveControlls] = useState(true);
  const [Lock, setLock] = useState(false);
  ///  full screen aoption
  const [fullScreen, setFullScreen] = useState<Boolean>(false);
  /// position video
  const [positioSatodo, setPositioSatodo] = useState(
    status.positionMillis === undefined ? 0 : status.positionMillis
  );
  const sizeIconstPlay = sizeIConst;

  //// initialize adds

  /// comverte milesegundo to segunos an minuts
  const agregarCeroSiEsNecesario = (valor: number) => {
    if (valor < 10) {
      return "0" + valor;
    } else {
      return "" + valor;
    }
  };
  const milisegundosAMinutosYSegundos = (milisegundos: number) => {
    const minutos = parseInt((milisegundos / 1000 / 60) as any);
    milisegundos -= minutos * 60 * 1000;
    const segundos = milisegundos / 1000;

    return `${minutos}:${agregarCeroSiEsNecesario(segundos.toFixed(0) as any)}`;
  };

  const navigation = useNavigation();

  //// converter  secunst to  hour

  const video = useRef(null as any);

  const { width, height } = Dimensions.get("window");

  const [VideoErro, setVideoErro] = useState(false);

  async function saveTime() {
    saveLastTime(id, status.positionMillis);
    navigation.goBack();
  }

  useEffect(() => {
    getTime(id).then((time: any) => {
      setPositioSatodo(time[0]?.last_episode ?? 0);
    });
  }, []);

  if (loadScreen) {
    return <Load__Video />;
  } else if (VideoErro) {
    return <OnError />;
  }

  return (
    <View style={styles.Container}>
      <View style={styles.TouchContainer}>
        <View style={styles.VideoContainer}>
          <Video
            onError={() => setVideoErro(true)}
            resizeMode={"contain" as any}
            shouldCorrectPitch={true}
            progressUpdateIntervalMillis={100}
            onPlaybackStatusUpdate={(status) => setStatus(() => status as any)}
            ref={video}
            style={[
              styles.video,
              fullScreen ? { height: height * 2 } : { width: "100%" },
            ]}
            source={{
              uri: uri,
            }}
            onLoadStart={async () => await video.current.playAsync()}
            positionMillis={positioSatodo}
          />
        </View>

        <TouchableOpacity
          onPress={() => setActiveControlls(!activeControlls)}
          style={styles.statusContainer}
        >
          {activeControlls ? (
            <View style={styles.controlls}>
              {/* Arrow goback an title video  */}
              <TouchableOpacity onPress={saveTime} style={styles.headerArrow}>
                <Ionicons
                  name="arrow-back-outline"
                  style={styles.arrow}
                  size={24}
                  color="white"
                />
                <Text numberOfLines={1} style={styles.controllsText}>
                  {title}
                </Text>

                <View style={{ width: 100 }}></View>
              </TouchableOpacity>

              {/* play pause  back secunst   */}

              {Lock ? null : (
                <View style={styles.PLayPauseBaackControlls}>
                  <TouchableOpacity
                    onPress={() =>
                      setPositioSatodo(
                        status.positionMillis === undefined
                          ? null
                          : ((status.positionMillis - 10000) as any)
                      )
                    }
                  >
                    <MaterialIcons
                      style={styles.backSecus}
                      name="replay-10"
                      size={sizeIconstPlay}
                      color="white"
                    />
                  </TouchableOpacity>

                  <View style={styles.playingControlls}>
                    {status.isBuffering &&
                    status.isLoaded &&
                    !status.isPlaying ? (
                      <ActivityIndicator
                        style={styles.ActivitiIndicator}
                        color="#ec1e47"
                        size={70}
                      />
                    ) : null}
                    <TouchableOpacity
                      onPress={async () => {
                        if (status.didJustFinish) {
                          setPositioSatodo(0);
                        } else {
                          status.isPlaying
                            ? await video.current.pauseAsync()
                            : await video.current.playAsync();
                        }
                      }}
                    >
                      {status.didJustFinish ? (
                        <SimpleLineIcons
                          name="reload"
                          size={sizeIconstPlay}
                          color="white"
                        />
                      ) : status.isPlaying ? (
                        <AntDesign
                          name="pause"
                          size={sizeIconstPlay}
                          color="white"
                        />
                      ) : (
                        <Feather
                          name="play"
                          size={sizeIconstPlay}
                          color="white"
                        />
                      )}
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    onPress={() =>
                      setPositioSatodo(
                        status.positionMillis === undefined
                          ? null
                          : ((status.positionMillis + 10000) as any)
                      )
                    }
                  >
                    <MaterialIcons
                      style={styles.backSecus}
                      name="forward-10"
                      size={sizeIconstPlay}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              )}

              {/* slider an time  controlls  */}

              {Lock ? null : (
                <View style={styles.PLayTimeControlls}>
                  <Text style={styles.numItem}>
                    {status.positionMillis === undefined
                      ? 0
                      : milisegundosAMinutosYSegundos(
                          status.positionMillis === undefined
                            ? 0
                            : status.positionMillis
                        )}
                  </Text>

                  <Slider
                    onSlidingStart={() => {}}
                    onSlidingComplete={(position) => {
                      const duration = position * status.durationMillis;
                      setPositioSatodo(duration);

                      if (!status.isPlaying) {
                      }
                    }}
                    style={{ width: "75%" }}
                    minimumValue={0}
                    maximumValue={1}
                    thumbTintColor="#ec1e47"
                    minimumTrackTintColor="#ec1e47"
                    maximumTrackTintColor="white"
                    value={
                      status.playableDurationMillis
                        ? status.playableDurationMillis / status.durationMillis
                        : 0
                    }
                  />

                  <Text style={styles.numItem}>
                    {status.durationMillis === undefined
                      ? 0
                      : milisegundosAMinutosYSegundos(
                          Math.floor(status.durationMillis)
                        )}
                  </Text>
                </View>
              )}

              {/*  aditional controll  */}

              <View style={styles.AditionalControllsContainer}>
                <View>
                  {!Lock ? (
                    <TouchableOpacity
                      onPress={() => setLock(!Lock)}
                      style={styles.BottomsExtraSeting}
                    >
                      <SimpleLineIcons name="lock" size={23} color="white" />
                      <Text style={styles.textExtra}>bloquear </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setLock(!Lock)}
                      style={[styles.BottomsExtraSeting]}
                    >
                      <SimpleLineIcons
                        name="lock-open"
                        size={22}
                        color="white"
                      />
                      <Text style={[styles.textExtra]}>desbloquear </Text>
                    </TouchableOpacity>
                  )}
                </View>

                {Lock ? null : (
                  <>
                    <TouchableOpacity style={styles.BottomsExtraSeting}>
                      <MaterialIcons name="hd" size={24} color="white" />
                      <Text style={styles.textExtra}>Calidad </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => setFullScreen(!fullScreen)}
                      style={styles.BottomsExtraSeting}
                    >
                      <MaterialIcons
                        name="fit-screen"
                        size={24}
                        color="white"
                      />
                      <Text style={styles.textExtra}>Ajustar imagen</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>

              {/*  lineal gradient bottom   */}
              <LinearGradient
                colors={["transparent", "black"]}
                style={styles.gradient}
              />
              {/* gradient top  */}
              <LinearGradient
                colors={["black", "transparent"]}
                style={[styles.gradient, { top: 0, height: "30%" }]}
              />
            </View>
          ) : (
            <></>
          )}
        </TouchableOpacity>
      </View>

      <StatusBar hideTransitionAnimation="fade" hidden style="light" />
    </View>
  );
}
