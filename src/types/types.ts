export type useNavigationTypes = {
  navigate: any;
};

export interface PropsComponetPrevi {
  Continua?: number;
  setContinua?: React.Dispatch<React.SetStateAction<number>>;
  poster?: string;
  data: {
    id: string;
    poster?: string;
    episodes: [
      {
        poster: string;
        id: string;
        title: string;
      }
    ];
    sinopsis: string;
    title: string;
  };

  text: string;
}
