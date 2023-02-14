import { StatusBar } from "expo-status-bar";
import { Routes } from "./src/Routes/Routes";
import { QueryClientProvider, QueryClient } from "react-query";
import { useDarckStorage } from "./src/zustand/state/myGlovalState";
import "react-native-gesture-handler";
import { activateKeepAwake } from "expo-keep-awake";
import { useEffect, useState } from "react";
import * as Network from "expo-network";
import NetworError from "./src/Screens/error/NetworError";
import { openConditios } from "./src/zustand/state/myStorage";
import { TerminosAncoditionesHome } from "./src/Components/util/TerminosAndCondition";
import { createTable } from "./src/db/db";
import KeyScreen from "./src/Screens/util/key/KeyScreen";
activateKeepAwake();

export default function App() {
  const queryClient = new QueryClient();
  const { isDarck } = useDarckStorage((state) => state);
  const { isCondition } = openConditios();

  const [isConnected, setIsConnected] = useState(true);

  ///  check conection to internt
  const handleConnectivityChange = async () => {
    const wifi = await Network.getNetworkStateAsync();
    setIsConnected(wifi?.isConnected as any);
  };

  useEffect(() => {
    handleConnectivityChange();
    createTable();
  }, []);

  if (isConnected) {
  } else {
    return (
      <>
        <StatusBar style="auto" />
        <NetworError />
      </>
    );
  }

  ///  terminos ad conditions
  if (isCondition) {
    return <TerminosAncoditionesHome />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {isDarck ? <StatusBar style="light" /> : <StatusBar style="dark" />}
      <Routes />
    </QueryClientProvider>
  );
}
