import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import PushNotification from "react-native-push-notification";

const NotificationHandler = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Configure PushNotification
    PushNotification.configure({
      onRegister: function (token) {
        // console.log("TOKEN:", token);
      },
      onNotification: function (notification) {
        // console.log("NOTIFICATION:", notification);
        // process the notification
        if (notification.userInteraction) {
          const { data } = notification;

          if (data && data.screen) {
            const item = data.item && JSON.parse(data.item);
            const channel = data.channel && JSON.parse(data.channel);
            const user = data.user && JSON.parse(data.user);

            if (item) {
              navigation.navigate(data.screen, { item, user });
            } else if (channel) {
              navigation.navigate(data.screen, { channel, user });
            }
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

    // Handle notification opened when the app is in the background or closed
    messaging().onNotificationOpenedApp((remoteMessage) => {
      const { data } = remoteMessage;
      if (data && data.screen) {
        const item = data.item && JSON.parse(data.item); // Parse the item
        const channel = data.channel && JSON.parse(data.channel);
        const user = data.user && JSON.parse(data.user);

        // Navigate with the item
        if (item) {
          navigation.navigate(data.screen, { item, user });
        } else if (channel) {
          navigation.navigate(data.screen, { channel, user });
        } else {
          navigation.navigate(data.screen);
        }
      }
    });

    // Handle initial notification when the app is opened from a quit state
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage && remoteMessage.data && remoteMessage.data.screen) {
          const item = JSON.parse(remoteMessage.data.item); // Parse the item
          navigation.navigate(remoteMessage.data.screen, { item }); // Navigate with the item
        }
      });

    // Background message handler
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      const { messageId, notification, data } = remoteMessage;

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
        data,
      });
    });

    // Handle foreground notifications
    const unsubscribed = messaging().onMessage(async (remoteMessage) => {
      const { messageId, notification, data } = remoteMessage;

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
        data,
      });
    });

    return unsubscribed;
  }, [navigation]);

  return null;
};

export default NotificationHandler;
