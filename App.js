import React, { useEffect } from "react";
import { StatusBar, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import AppStack from "./src/AppStack";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { requestUserPermission } from "./src/constants/utils/PushNotification";
import { configureNotificationChannels } from "./src/constants/utils/NotificationService";
import NotificationHandler from "./src/constants/utils/NotificationHandler";

export const navigationRef = createNavigationContainerRef();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "sans-bold": require("./fonts/OpenSans-Bold.ttf"),
    "sans-light": require("./fonts/OpenSans-Light.ttf"),
    "sans-medium": require("./fonts/OpenSans-Medium.ttf"),
    "sans-regular": require("./fonts/OpenSans-Regular.ttf"),
    "sans-semibold": require("./fonts/OpenSans-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    configureNotificationChannels();
    requestUserPermission();
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <NotificationHandler />
          <View onLayout={onLayoutRootView}></View>
          <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
          <AppStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
