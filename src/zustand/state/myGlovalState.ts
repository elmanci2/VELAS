import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface prosp {
  isDarck: boolean;
  changeMode: () => any;
}

export const useDarckStorage = create(
  persist<prosp>(
    (set, get) => ({
      isDarck: true,
      changeMode: () =>
        set((state: any) => ({
          isDarck: !state.isDarck,
        })),
    }),
    {
      name: "food-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
