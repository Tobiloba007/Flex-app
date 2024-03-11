import React from 'react'
import { View } from 'react-native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppStack from './src/AppStack'
import { Provider } from 'react-redux'
import store from './src/store'
import Home from './src/screens/Home'
import Tab from './src/components/Tab'

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'sans-bold': require('./fonts/OpenSans-Bold.ttf'),
    'sans-light': require('./fonts/OpenSans-Light.ttf'),
    'sans-medium': require('./fonts/OpenSans-Medium.ttf'),
    'sans-regular': require('./fonts/OpenSans-Regular.ttf'),
    'sans-semibold': require('./fonts/OpenSans-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }


  return (
    <Provider store={store}>
     <NavigationContainer>
        <View onLayout={onLayoutRootView}></View>
          <AppStack /> 
      </NavigationContainer>
    </Provider>
  );
}
