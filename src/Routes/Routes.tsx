/// import dependencis
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

///  import  icons
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
/// import state
import { useDarckStorage } from "../zustand/state/myGlovalState";
import { DARCK__COLOR__TEME, LING__COLOR__TEME } from "../Constants/Colors";

/// import escreens
import HomeScreeen from "../Screens/HomeScreen";
import LovesScreen from "../Screens/LoveScreen";
import SearchScreen from "../Screens/SearchScreen";
import SetingScreen from "../Screens/SetingScreen";
import AllScreen from "../Screens/AllScreen";
import TerminoAnConditionScreen from "../Screens/util/TerminosAnCondityonsScreen";
import PreviwScreen from "../Screens/PreviwScreen";
import EpisodesScreen from "../Screens/EpisodesLIst";
import ReportError from "../Screens/util/ReportEror";
import VideoPLayerScreen from "../Screens/VideoPLayerScreen";
import { useState } from "react";
import { getFavorites } from "../db/db";
import { LastWatching } from "../Screens/util/LastWatching";
import KeyScreen from "../Screens/util/key/KeyScreen";

/// stack navigation

const TransitionScreenOptions = {
  headerShown: false,
  gestureEnabled: false,
  presentation: "transparentModal",
  
};



const Stack = createNativeStackNavigator();
function MyStack() {
  const { isDarck } = useDarckStorage();

  const darck = isDarck
    ? DARCK__COLOR__TEME.TERCERO
    : LING__COLOR__TEME.TERCERO;
  const textColor = !isDarck
    ? DARCK__COLOR__TEME.TERCERO
    : LING__COLOR__TEME.TERCERO;

  const StackScreenOPtiosFuction = (headerName: string) => {
    return {
      animation: "flip",
      headerTitle: headerName,
      headerTintColor: textColor,
      headerStyle: {
        backgroundColor: darck,
      },
      headerShown: true,
    };
  };

  return (
    <Stack.Navigator initialRouteName="key" screenOptions={TransitionScreenOptions as any}>
      <Stack.Screen name='key' component={KeyScreen}   /> 
      <Stack.Screen name="Home" component={BottomTabs} />
      <Stack.Screen name="buscar" component={SearchScreen} />
      <Stack.Screen
        options={StackScreenOPtiosFuction("Reportar Un Error") as any}
        name="error"
        component={ReportError}
      />
      <Stack.Screen
        options={StackScreenOPtiosFuction("Todas Las Novelas") as any}
        name="all"
        component={AllScreen}
      />
      <Stack.Screen
        options={StackScreenOPtiosFuction("Terminos Y  Condiciones") as any}
        name="termineAnCondition"
        component={TerminoAnConditionScreen}
      />

      <Stack.Screen
        name="videoPLayer"
        options={{ orientation: "landscape" }}
        component={VideoPLayerScreen}
      />

      <Stack.Screen
        options={StackScreenOPtiosFuction("Continua Viendo") as any}
        name="lastWatching"
        component={LastWatching}
      />

      <Stack.Screen name="previw" component={PreviwScreen} />
    </Stack.Navigator>
  );
}

///// bottom tabs navigation
const bottom = createBottomTabNavigator();
function BottomTabs() {
  const state = useDarckStorage();

  const darck = state.isDarck
    ? DARCK__COLOR__TEME.TERCERO
    : LING__COLOR__TEME.TERCERO;

  /// text color

  const textColor = !state.isDarck
    ? DARCK__COLOR__TEME.TERCERO
    : LING__COLOR__TEME.TERCERO;

  const [favorites, setFavorites] = useState(0);

  getFavorites().then((favorites: any) => {
    setFavorites(favorites?.length ?? 0);
  });

  return (
    <bottom.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: DARCK__COLOR__TEME.SECONST,
        tabBarStyle: {
          backgroundColor: darck,
          height: 60,
          borderTopColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarItemStyle: {
          borderRadius: 10,
          marginVertical: 5,
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10,
        },
        tabBarBadgeStyle: {
          backgroundColor: DARCK__COLOR__TEME.SECONST,
          fontSize: 10,
        },

        tabBarLabelStyle: {
          flexDirection: "row",
          display: "none",
        },
        headerShown: false,
      }}
    >
      <bottom.Screen
        options={{
          tabBarLabel: "inicio",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
        name="home"
        component={HomeScreeen}
      />
      <bottom.Screen
        options={{
          tabBarLabel: "buscar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
        name="search"
        component={SearchScreen}
      />

      <bottom.Screen
        options={{
          headerTitle: "Favoritas",
          headerTintColor: textColor,
          headerStyle: {
            backgroundColor: darck,
          },
          headerShown: true,

          tabBarBadge: favorites,
          tabBarLabel: "favoritas",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite-border" size={size} color={color} />
          ),
        }}
        name="love"
        component={LovesScreen}
      />

      <bottom.Screen
        name="episode"
        component={EpisodesScreen}
        options={{
          headerShown: true,
          headerTitle: "Ultimos Capitulos",
          headerTintColor: textColor,
          headerStyle: {
            backgroundColor: darck,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="ios-play-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <bottom.Screen
        options={{
          headerTitle: "Ajustes",

          headerTintColor: textColor,
          headerStyle: {
            backgroundColor: darck,
          },
          headerShown: true,
          tabBarLabel: "ajustes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-settings-outline" size={size} color={color} />
          ),
        }}
        name="setings"
        component={SetingScreen}
      />
    </bottom.Navigator>
  );
}

/// export fuction  for may estack

export function Routes() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
