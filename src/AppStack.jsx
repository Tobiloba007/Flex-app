import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./screens/Splash";
import Choose from "./screens/Choose";
import Login from "./screens/authentication/Login";
import Registration from "./screens/authentication/Registration";
import Home from "./screens/Home";
import Verification from "./components/authenticcation/Verification";
import ResendCode from "./screens/authentication/ResendCode";

import ChatRoom from "./screens/chat/ChatRoom";
import FriendRequests from "./screens/chat/AddFriends";
import MessagingRoom from "./screens/chat/MessagingRoom";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Friend from "./screens/friend/Friend";
import Tab from "./components/Tab";
import SeeRequests from "./screens/SeeRequests";
import Notification from "./screens/Notification";
import Pin from "./screens/authentication/Pin";
import Comments from "./screens/chat/Comments";

const Stack = createStackNavigator();

const MyTransition = {
  duration: 500,
  open: {
    screenInterpolator: (sceneProps) => ({
      // Use sceneProps.layout.width to get screen width
      translateX: sceneProps.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [sceneProps.layout.width, 0],
      }),
    }),
  },
  close: {
    screenInterpolator: (sceneProps) => ({
      translateX: sceneProps.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -sceneProps.layout.width],
      }),
    }),
  },
};

const AppStack = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSplashScreen = async () => {
      try {
        const hasShownSplash = await AsyncStorage.getItem("seen_token");
        if (hasShownSplash !== null) {
          setShowSplash(false);
        }
      } catch (error) {
        console.error("Error checking splash screen:", error);
      }
    };

    checkSplashScreen();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedItems = await AsyncStorage.getItem("user_data");
        // console.log(storedItems);

        if (storedItems !== null) {
          const parsedItems = JSON.parse(storedItems);
          setUser(parsedItems);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // <Stack.Navigator
  //     initialRouteName={showSplash ? "splash" : "ChatRoom"}
  //     screenOptions={{
  //       transitionSpec: { open: MyTransition, close: MyTransition },
  //     }}
  //   >
  //     {showSplash ? (
  //       <Stack.Screen
  //         name="splash"
  //         component={Splash}
  //         options={{ headerShown: false }}
  //       />
  //     ) : (
  //       <Stack.Screen
  //         name="login"
  //         component={Login}
  //         options={{ headerShown: false }}
  //       />
  //     )}

  // console.log(user)

  return (
    <Stack.Navigator
      initialRouteName={showSplash ? "splash" : "tab"}
      screenOptions={{
        transitionSpec: { open: MyTransition, close: MyTransition },
      }}
    >
      {showSplash && (
        <Stack.Screen
          name="splash"
          component={Splash}
          options={{ headerShown: false }}
        />
      )}

      {!user && (
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
      )}

      <Stack.Screen
        name="tab"
        component={Tab}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ChatRoom"
        component={ChatRoom}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MessagingRoom"
        component={MessagingRoom}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Friend"
        component={Friend}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="choose"
        component={Choose}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="loginScreen"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="registration"
        component={Registration}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="verification"
        component={Verification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="resendCode"
        component={ResendCode}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="pin"
        component={Pin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="seeRequests"
        component={SeeRequests}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="notification"
        component={Notification}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
