import { useState, useEffect } from "react";
import {
  InterstitialAd,
  AdEventType,
  RewardedInterstitialAd,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";
import { INTERSTITIAL_ID, REWARDED_ID } from "../../Constants/ads";

//// initialize    adds
const interstitial = InterstitialAd.createForAdRequest('INTERSTITIAL_ID', {
  requestNonPersonalizedAdsOnly: true,
});

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(
  'REWARDED_ID',
  {
    requestNonPersonalizedAdsOnly: true,
  }
);

export const useAnuncios = () => {
  /// configuere ads
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  const [rewardedInterstitialLoaded, setRewardedInterstitialLoaded] =
    useState(false);

  /// interstisisal ads
  const loadInterstitial = () => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setInterstitialLoaded(true);
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setInterstitialLoaded(false);
        interstitial.load();
      }
    );

    interstitial.load();

    return () => {
      unsubscribeClosed();
      unsubscribeLoaded();
    };
  };

  /// raworde
  const loadRewardedInterstitial = () => {
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setRewardedInterstitialLoaded(true);
      }
    );

    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log(`User earned reward of ${reward.amount} ${reward.type}`);
      }
    );

    const unsubscribeClosed = rewardedInterstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setRewardedInterstitialLoaded(false);
        rewardedInterstitial.load();
      }
    );

    rewardedInterstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeEarned();
    };
  };

  useEffect(() => {
    const InterstitialAds = loadInterstitial();
    const rewardedAds = loadRewardedInterstitial();

    return () => {
      InterstitialAds();
      rewardedAds();
    };
  }, []);

  /// export fcutiones

  return {
    interstitial,
    rewardedInterstitial,
    interstitialLoaded,
    rewardedInterstitialLoaded,
  };
};
