import create from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FavoritesState {
  favorites: Array<{
    id: string;
    title: string;
    poster: string;
  }>;
  addToFavorites: (item: { id: string; title: string; poster: string }) => void;
  removeFromFavorites: (id: string) => void;
  clearFavorites: () => void;
}

export const useFavorites = create<FavoritesState>((set) => ({
  favorites: [],
  addToFavorites: (item: { id: string; title: string; poster: string }) =>
    set((prevState) => ({
      favorites: [...prevState.favorites, item],
    })),
  removeFromFavorites: (id: string) =>
    set((prevState) => ({
      favorites: prevState.favorites.filter((item) => item.id !== id),
    })),

  clearFavorites: () =>
    set((prevState) => ({
      favorites: [],
    })),
}));

/// terminos an condityion storage
interface terminoAnConditios  {
  isCondition: boolean;
  saveAsectConditions: () => void ;
}

export const openConditios = create(
  persist <terminoAnConditios>(
    (set, get) => ({
      isCondition: true,
      saveAsectConditions: () =>
        set((state: any) => ({
          isCondition: false,
        })),
    }),
    {
      name: "conditions",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

