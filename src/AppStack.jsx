import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './screens/Splash';
import Choose from './screens/Choose';
import Login from './screens/authentication/Login';
import Registration from './screens/authentication/Registration';
import Home from './screens/Home';
import Verification from './components/authenticcation/Verification';
import ResendCode from './screens/authentication/ResendCode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const AppStack = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const checkSplashScreen = async () => {
      try {
        const hasShownSplash = await AsyncStorage.getItem('splash_token');
        if (hasShownSplash !== null) {
          setShowSplash(false);
        }
      } catch (error) {
        console.error('Error checking splash screen:', error);
      }
    };

    checkSplashScreen();
  }, []);

  return (
    <Stack.Navigator initialRouteName='splash'>
      {
        showSplash
      ?<Stack.Screen name="splash" component={Splash} options={{headerShown: false}} />
      :<Stack.Screen name="login" component={Login} options={{headerShown: false}} />
      }
      <Stack.Screen name="choose" component={Choose} options={{headerShown: false}} />
      <Stack.Screen name="registration" component={Registration} options={{headerShown: false}} />
      <Stack.Screen name="verification" component={Verification} options={{headerShown: false}} />
      <Stack.Screen name="resendCode" component={ResendCode} options={{headerShown: false}} />
      <Stack.Screen name="home" component={Home} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default AppStack;