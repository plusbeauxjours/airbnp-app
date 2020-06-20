import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Image, AsyncStorage } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as Sentry from "sentry-expo";
import Constants from "expo-constants";

import NavController from "./components/NavController";
import store, { persistor } from "./redux/store";

const cacheImages = (images: any) =>
  images.map((image: any) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });

const cacheFonts = (fonts: any) =>
  fonts.map((font: any) => Font.loadAsync(font));

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const handleFinish = () => setIsReady(true);
  const setSentry = () => {
    Sentry.init({
      dsn:
        "https://ff9f536e81d24e15983fe0dba7c585b2@o282599.ingest.sentry.io/5283707",
      enableInExpoDevelopment: true,
      debug: true,
    });
    Sentry.setRelease(
      Constants.manifest.revisionId ? Constants.manifest.revisionId : ""
    );
  };
  const loadAssets = async () => {
    await AsyncStorage.clear();
    const images = [
      require("./assets/loginBg.jpeg"),
      require("./assets/roomDefault.jpeg"),
      require("./assets/welcomeIcon.png"),
      "http://logok.org/wp-content/uploads/2014/07/airbnb-logo-belo-219x286.png",
    ];
    const fonts = [Ionicons.font];
    const imagePromises = cacheImages(images);
    const fontPromises = cacheFonts(fonts);
    return Promise.all([...imagePromises, ...fontPromises]);
  };
  useEffect(() => {
    setSentry();
  }, []);
  return isReady ? (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavController />
      </PersistGate>
    </Provider>
  ) : (
    <AppLoading
      onError={console.error}
      onFinish={handleFinish}
      startAsync={loadAssets}
    />
  );
}
