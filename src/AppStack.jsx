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
import Buy from "./screens/sendMoney/Buy";
import Offers from "./screens/sendMoney/Offers";
import AboutOffers from "./screens/sendMoney/AboutOffers";
import Wallet from "./screens/wallet/Wallet";
import Trade from "./screens/trade/Trade";
import WalletOffer from "./screens/wallet/WalletOfer";
import Payment from "./screens/payment/Payment";
import ChannelRequests from "./screens/chat/ChannelRequests";
import MyOffers from "./screens/sendMoney/MyOffers";
import FriendProfile from "./components/profile/FriendProfile";
import Profile from "./screens/profile/Profile";
import EditProfile from "./screens/profile/EditProfile";
import SendImage from "./screens/chat/SendImage";
import PhotoDisplay from "./components/PhotoDisplay";
import ForgotPasswordEmail from "./screens/authentication/ForgotPasswordEmail";
import ForgotPasswordVerify from "./screens/authentication/ForgotPasswordVerify";
import ForgotPasswordNew from "./screens/authentication/ForgotPasswordNew";
import Settings from "./screens/settings/Settings";

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

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"tab"}
      screenOptions={{
        transitionSpec: { open: MyTransition, close: MyTransition },
        headerShown: false,
      }}
    >
      <Stack.Screen name="tab" component={Tab} />

      <Stack.Screen name="pin" component={Pin} />

      <Stack.Screen name="ChatRoom" component={ChatRoom} />
      <Stack.Screen name="MessagingRoom" component={MessagingRoom} />
      <Stack.Screen name="sendImage" component={SendImage} />
      <Stack.Screen name="Friend" component={Friend} />
      <Stack.Screen name="home" component={Home} />

      <Stack.Screen name="friendProfile" component={FriendProfile} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="editProfile" component={EditProfile} />
      <Stack.Screen name="photoDisplay" component={PhotoDisplay} />

      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{ headerShown: true }}
      />
      <Stack.Screen name="seeRequests" component={SeeRequests} />
      <Stack.Screen name="channelRequests" component={ChannelRequests} />
      <Stack.Screen name="notification" component={Notification} />
      <Stack.Screen name="buy" component={Buy} />
      <Stack.Screen name="offers" component={Offers} />
      <Stack.Screen name="myOffers" component={MyOffers} />
      <Stack.Screen name="aboutOffers" component={AboutOffers} />
      <Stack.Screen name="wallet" component={Wallet} />
      <Stack.Screen name="walletOffer" component={WalletOffer} />
      <Stack.Screen name="payment" component={Payment} />
      <Stack.Screen name="trade" component={Trade} />
      <Stack.Screen name="settings" component={Settings} />
    </Stack.Navigator>
  );
};

const AuthNavigator = ({ showSplash }) => {
  return (
    <Stack.Navigator
      initialRouteName={showSplash ? "splash" : "choose"}
      screenOptions={{
        transitionSpec: { open: MyTransition, close: MyTransition },
        headerShown: false,
      }}
    >
      {showSplash && <Stack.Screen name="splash" component={Splash} />}

      <Stack.Screen name="choose" component={Choose} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="pin" component={Pin} />
      <Stack.Screen name="registration" component={Registration} />
      <Stack.Screen name="verification" component={Verification} />
      <Stack.Screen name="resendCode" component={ResendCode} />
      <Stack.Screen
        name="forgotPasswordEmail"
        component={ForgotPasswordEmail}
      />
      <Stack.Screen
        name="forgotPasswordVerify"
        component={ForgotPasswordVerify}
      />
      <Stack.Screen name="forgotPasswordNew" component={ForgotPasswordNew} />
    </Stack.Navigator>
  );
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

  const fetchData = async () => {
    try {
      const storedItems = await AsyncStorage.getItem("user_data");
      // console.log(storedItems);

      const parsedItems = JSON.parse(storedItems);
      setUser(parsedItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return !user ? <AuthNavigator showSplash={showSplash} /> : <StackNavigator />;
};

export default AppStack;
