import create from "zustand";

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

//// feching  data state

interface FechingIterface {}

export const datataNovelas = create<FechingIterface>((set) => ({

}));

