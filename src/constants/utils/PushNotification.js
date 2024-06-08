import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import { navigationRef } from "../../../App";

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem("fcmToken");
  // console.log("old fmcToken:", fcmToken);

  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      //   console.log("fcmToken", fcmToken);

      if (fcmToken) {
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    } catch (error) {
      // console.log(error);
    }
  }

  return fcmToken;
};

export const NotificationServices = () => {
  // Configure PushNotification
  PushNotification.configure({
    onRegister: function (token) {
      // console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
      // console.log("NOTIFICATION:", notification);
      // process the notification
      if (notification.userInteraction) {
        const { screen, item } = notification.data;
        if (screen) {
          // navigation.navigate(screen, { item });
        }
      }

      notification.finish(PushNotification?.FetchResult?.NoData);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,
    requestPermissions: true,
  });

  // Background message handler
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    const { messageId, notification } = remoteMessage;

    PushNotification.localNotification({
      channelId: "channel-id",
      messageId: messageId,
      title: notification?.title,
      body: notification?.body,
      message: notification?.body,
      picture: notification?.image,
      soundName: "default",
      vibrate: true,
      playSound: true,
      priority: "high",
    });
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        const { screen, item } = remoteMessage.data;
        if (screen) {
          // console.log(screen);
          navigationRef.current?.navigate(screen, { item });
        }
      }
    });
};
