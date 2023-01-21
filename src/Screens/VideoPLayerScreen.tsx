//import liraries

import { useEffect, useState } from "react";
import Video_PLayer from "../Components/video/src/app/Video_PLayer";
import { useAnuncios } from "../Hook/anuncios/useAnuncios";
import { use__get__Video__Player } from "../ts/Video";

interface props {
  route?: any;
}

// create a component
const VideoPLayerScreen = ({ route }: props) => {
  const { id, title } = route.params;

  const { video, loading } = use__get__Video__Player(id);

  /// use ads
  const {
    interstitial,
    interstitialLoaded,
    rewardedInterstitial,
    rewardedInterstitialLoaded,
  } = useAnuncios();

  const [loadAds, setLoadAds] = useState(true);
  const [noLoadAds, setNoLoadAds] = useState(true);
  const [INitial1, setINitial1] = useState(true);

  console.log([loadAds, interstitialLoaded, noLoadAds, INitial1]);

  useEffect(() => {
    if (interstitialLoaded && INitial1) {
      setINitial1(false);
      interstitial.show();
    }

    if (rewardedInterstitialLoaded && loadAds) {
      setTimeout(async () => {
        setLoadAds(false);
        await rewardedInterstitial.show();
      }, 400000);
    }

    if (loadAds === false && interstitialLoaded && noLoadAds) {
      setTimeout(async () => {
        setNoLoadAds(false);
        await interstitial.show();
      }, 1200000);
    }
  }, [interstitialLoaded, rewardedInterstitialLoaded]);

  return (
    <Video_PLayer uri={video} title={title} id={id} loadScreen={loading} />
  );
};

export default VideoPLayerScreen;
