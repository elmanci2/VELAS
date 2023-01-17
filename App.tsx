import { StatusBar } from "expo-status-bar";
import { Routes } from "./src/Routes/Routes";
import { QueryClientProvider, QueryClient } from "react-query";
import { useDarckStorage } from "./src/zustand/state/myGlovalState";
import "react-native-gesture-handler";
import { activateKeepAwake } from "expo-keep-awake";
import { useEffect, useRef, useState } from "react";
import * as Network from "expo-network";
import NetworError from "./src/Screens/error/NetworError";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Device from "expo-device";
import { createTable, insertLastEpisode } from "./src/db/db";
import { BASE__URL } from "./src/Constants/url";
activateKeepAwake();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const queryClient = new QueryClient();
  const { isDarck } = useDarckStorage((state) => state);

  const [conecte, setConecte] = useState(true);

  useEffect(() => {
    istHatContection();
    createTable();
  }, [conecte]);

  const istHatContection = async () => {
    const wifi = await Network.getNetworkStateAsync();
    setConecte(wifi?.isConnected as any);
  };

  /// notificatios  token

  const [expoGettoken, setExpoGettoken] = useState("");

  const submitMassage = (token: string) => {
    fetch(`${BASE__URL}/token`, {
      method: "POST",
      body: JSON.stringify({
        token: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => null)
      .catch((error) => null);
  };

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoGettoken(token as any);
      submitMassage(token as any);
    });
  }, []);

  console.log(expoGettoken);

  if (conecte === false) {
    return (
      <>
        <StatusBar style="auto" />
        <NetworError />
      </>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      {isDarck ? <StatusBar style="light" /> : <StatusBar style="dark" />}
      <Routes />
    </QueryClientProvider>
  );
}
