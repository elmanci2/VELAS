//import liraries

import Video_PLayer from "../Components/video/src/app/Video_PLayer";
import { use__get__Video__Player } from "../ts/Video";

interface props {
  route?: any;
}

// create a component
const VideoPLayerScreen = ({ route }: props) => {
  const { id, title } = route.params;

  const { video, loading } = use__get__Video__Player(id);

  return <Video_PLayer uri={video} title={title} loadScreen={loading} />;
};

export default VideoPLayerScreen;
