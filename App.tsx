import { StatusBar } from "expo-status-bar";
import { Routes } from "./src/Routes/Routes";
import { QueryClientProvider, QueryClient } from "react-query";
import { useDarckStorage } from "./src/zustand/state/myGlovalState";
import "react-native-gesture-handler";
import { activateKeepAwake } from "expo-keep-awake";
import { useEffect, useState } from "react";
import * as Network from "expo-network";
import NetworError from "./src/Screens/error/NetworError";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Device from "expo-device";
import { createTable, insertLastEpisode } from "./src/db/db";

activateKeepAwake();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
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

  if (conecte === false) {
    return (
      <>
        <StatusBar style="auto" />
        <NetworError />
      </>
    );
  }

  /// notificatios  token

  const registerForPushNotificationsAsync = async () => {
    let token;

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
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  const [expoGettoken, setExpoGettoken] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoGettoken(token as string)
    );
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isDarck ? <StatusBar style="light" /> : <StatusBar style="dark" />}
      <Routes />
    </QueryClientProvider>
  );
}
