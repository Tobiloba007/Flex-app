import PushNotification from "react-native-push-notification";

export const configureNotificationChannels = () => {
  // Create the notification channel
  PushNotification.createChannel(
    {
      channelId: "channel-id", // (required)
      channelName: "Default channel", // (required)
      channelDescription: "A default channel", // (optional) default: undefined.
      playSound: true, // (optional) default: true
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the importance of the notification.
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
};
