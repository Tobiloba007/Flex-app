import React, { useCallback, useEffect, useState } from "react";
import {
  StatusBar,
  SafeAreaView,
  Dimensions,
  Keyboard,
  Alert,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { colors } from "../../../colors";
import axios from "axios";
import { BASE_URL, BASE_URL2 } from "../../config";
import { launchImageLibrary } from "react-native-image-picker";
import { ref, onValue, set, get, update } from "firebase/database";
import { db } from "../../../firebaseConfig";
import moment from "moment";
import { sendNotification } from "../../constants/utils/SendNotification";
import MessagingRoomComp from "../../components/chat/MessagingRoomComp";
import { useSelector } from "react-redux";

const itemHeight = Dimensions.get("window").height;

const MessagingRoom = ({ route }) => {
  const channel = route.params?.channel;
  const item = route.params?.item;
  const user = route.params?.user;
  const channelMemberStatus = route.params?.channelMemberStatus;

  const { isDark } = useSelector((state) => state.theme);

  const navigation = useNavigation();

  const [inputHeight, setInputHeight] = useState(itemHeight * 0.06);
  const [messages, setMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [lastSeen, setLastSeen] = useState("Loading...");
  const [dropDown, setDropDown] = useState(false);
  const [fcmToken, setFcmToken] = useState("");
  const [channelMembers, setChannelMembers] = useState([]);
  const [unreadMessages, setUnReadMessages] = useState();

  const createFbChannelUser = async () => {
    if (user) {
      const lastSeen = Date.now();

      try {
        const channelRef = ref(db, "channel/" + channel?.channel_id);
        const channelSnapshot = await get(channelRef);

        if (channelSnapshot.exists()) {
          setChannelMembers(channelSnapshot.val()?.members);

          update(ref(db, "channel/" + channel?.channel_id), {
            members: channelSnapshot
              .val()
              ?.members.map((item) =>
                item?.email === user?.email
                  ? { email: user?.email, lastSeen, fcmToken }
                  : [
                      ...channelSnapshot.val()?.members,
                      { email: user?.email, lastSeen, fcmToken },
                    ]
              ),
          });
        } else {
          set(ref(db, "channel/" + channel?.channel_id), {
            members: [{ email: user?.email, lastSeen, fcmToken }],
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (user && channel && fcmToken) {
      if (
        channelMemberStatus?.status?.trim() === "accepted" ||
        channel?.owner_id === user?.id
      ) {
        createFbChannelUser();
      }
    }
  }, [channel, channelMemberStatus, user, fcmToken]);

  const handleContentSizeChange = (event) => {
    // Set a maximum height for the input container
    setInputHeight(
      Math.max(itemHeight * 0.06, event.nativeEvent.contentSize.height)
    );
  };

  const fetchChannelMessages = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL2}/post/channel/${channel?.channel_id}`
      );

      setChannels(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessages = async () => {
    if (user) {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/chat/private_message.php?user_id=${user?.id}&message_to=${item?.id}`
        );
        setMessages(res.data);

        // // Define a regular expression to match JSON data within the response
        // const jsonRegex = /\[.*\]/;

        // // Use the regular expression to extract the JSON data
        // const jsonDataMatch = res.data?.match(jsonRegex);

        // // If a match is found, parse the JSON data
        // let jsonData;
        // if (jsonDataMatch) {
        //   jsonData = JSON.parse(jsonDataMatch[0]);
        // } else {
        //   console.error("No JSON data found in the response");
        // }

        // // Now 'jsonData' contains only the data without HTML elements
        // setMessages(jsonData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (channel) {
        fetchChannelMessages();
      }
    }, [channel])
  );

  useFocusEffect(
    useCallback(() => {
      if (item) {
        fetchMessages();
      }
    }, [item, user])
  );

  // update sender message
  useEffect(() => {
    if (messages?.length > 0) {
      const lastMessage = messages?.slice(-1)[0];
      const savedItem = {
        lastMessage: lastMessage?.message || lastMessage?.image,
        time: lastMessage?.timestamp,
        messageCount: 0,
        id: item.id,
        name: item?.name ? `${item?.name}` : `${item?.lname} ${item?.fname}`,
        avatar: item?.avatar,
      };

      try {
        // update user messages
        update(ref(db, `users/${user?.id}/messages/${item?.id}`), savedItem);
      } catch (error) {
        console.log(error);
      }
    }
  }, [messages]);

  const pickImage = async () => {
    if (channel) {
      const result = await launchImageLibrary({
        mediaType: "photo",
      });

      if (!result.didCancel) {
        setFile(result);
      }
    } else if (item) {
      const result = await launchImageLibrary({
        mediaType: "photo",
        includeBase64: true,
      });

      if (!result?.canceled) {
        setImage(result?.assets[0]);
      }
    }
  };

  useEffect(() => {
    if (file || image) {
      navigation.navigate("sendImage", {
        file,
        channel,
        image,
        user_id: user?.id,
        message_to: item?.id,
      });
    }
  }, [file, image]);

  const handleSendMessage = async () => {
    if (channel) {
      const channelData = {
        user: user?.id,
        channel: channel?.channel_id,
        post: message.trim(),
        likes_users: [],
      };

      const title = channel?.name;
      const body = message.trim();
      const data = {
        screen: "MessagingRoom",
        channel,
        user,
      };

      if (message.trim() !== "") {
        try {
          await fetch(`${BASE_URL2}/post`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(channelData),
          });

          setMessage("");
          setImage(null);
          Keyboard.dismiss();

          channelMembers.map(async (item) => {
            // send push notification
            await sendNotification(item?.fcmToken, title, body, data);
          });

          fetchChannelMessages();
        } catch (error) {
          console.log(error);
        }
      } else {
        setMessage("");
        Keyboard.dismiss();
      }
    } else if (item) {
      const messageData = new FormData();

      messageData.append("user_id", user?.id);
      messageData.append("message_to", item?.id);
      messageData.append("message", message.trim());
      image && messageData.append("image", image);

      const title = `${item?.name || item?.fname + user?.lname}`;
      const body = message.trim();
      const data = {
        screen: "MessagingRoom",
        item,
        user,
      };

      if (message.trim() !== "" || image) {
        try {
          await fetch(`${BASE_URL}/api/v1/chat/private_message.php`, {
            method: "POST",
            body: messageData,
          });

          setMessage("");
          setImage(null);
          Keyboard.dismiss();

          // update partner last message
          const savedItem = {
            lastMessage: message || image,
            time: Date.now(),
            id: user.id,
            messageCount: 1,
            name: `${user?.lname} ${user?.fname}`,
            avatar: user?.image,
          };

          update(ref(db, `users/${item?.id}/messages/${user?.id}`), savedItem);

          // send push notification
          if (fcmToken) {
            await sendNotification(fcmToken, title, body, data);

            // update receiver unread messages
            update(ref(db, "users/" + item?.id), {
              unreadMessages: unreadMessages + 1,
            });
          }

          // retrieve messages
          fetchMessages();
        } catch (error) {
          console.log(error);
        }
      } else {
        setMessage("");
        Keyboard.dismiss();
      }
    }
  };

  const createChannelRequest = async () => {
    const formData = {
      request_user_id: user?.id,
      channel_id: channel?.channel_id,
    };

    const title = channel?.name;
    const body = `${user?.fname} ${user?.lname} requested to join your channel`;
    const data = {
      screen: "MessagingRoom",
      channel,
      user,
    };
    let fcmTken = "";

    try {
      const userRef = ref(db, "users/" + channel.owner_id);

      await axios.post(`${BASE_URL2}/channel-request`, formData);

      Alert.alert("Channel request created successfully");

      createFbChannelUser();

      // Listen for real-time changes to the user's data
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          fcmTken = snapshot.val().fcmToken;
        }
      });

      // send notification
      await sendNotification(fcmTken, title, body, data);

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const getFcmUser = async () => {
    if (item) {
      try {
        const userRef = ref(db, "users/" + item.id);

        // const userSnapshot = await get(userRef);

        // Listen for real-time changes to the user's data
        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setFcmToken(snapshot.val().fcmToken);
            setUnReadMessages(snapshot.val()?.unreadMessages);

            const lastSeenTime = snapshot.val().lastSeen;
            const currentTime = Date.now();
            const diffMs = currentTime - lastSeenTime;
            const diffSeconds = Math.floor(diffMs / 1000);
            const diffMinutes = Math.floor(diffSeconds / 60);

            if (diffMinutes < 1) {
              setLastSeen("Online");
            } else {
              setLastSeen(
                `Last seen ${moment(snapshot.val().lastSeen).calendar()}`
              );
            }
          } else {
            setLastSeen("Last seen unknown");
          }
        });

        // updated user's unread messages
        update(ref(db, "users/" + user?.id), {
          unreadMessages: 0,
        });
      } catch (error) {
        console.log(error);
      }
    } else if (channel) {
      try {
        const userRef = ref(db, "users/" + user.id);

        // const userSnapshot = await get(userRef);

        // Listen for real-time changes to the user's data
        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setFcmToken(snapshot.val().fcmToken);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (item || channel) {
      getFcmUser();
    }
  }, [item, channel, user]);

  // console.log(fcmToken)

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDark ? colors.black : colors.white }}
    >
      <StatusBar
        backgroundColor={isDark ? colors.black : colors.white}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <MessagingRoomComp
        channel={channel}
        item={item}
        lastSeen={lastSeen}
        user={user}
        setDropDown={setDropDown}
        dropDown={dropDown}
        messages={messages}
        channelMemberStatus={channelMemberStatus}
        createChannelRequest={createChannelRequest}
        channels={channels}
        pickImage={pickImage}
        handleContentSizeChange={handleContentSizeChange}
        message={message}
        setMessage={setMessage}
        inputHeight={inputHeight}
        handleSendMessage={handleSendMessage}
        channelMembers={channelMembers}
        isDark={isDark}
      />
    </SafeAreaView>
  );
};

export default MessagingRoom;
