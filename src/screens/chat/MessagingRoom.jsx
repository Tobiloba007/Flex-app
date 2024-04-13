import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StatusBar,
  Image,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Pressable,
  Keyboard,
  Alert,
} from "react-native";
import { styles } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../colors";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL, BASE_URL2 } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import ChannelMsg from "./ChannelMsg";
import UserMsg from "./UserMsg";

const itemHeight = Dimensions.get("window").height;

const MessagingRoom = ({ route }) => {
  const channel = route.params?.channel;
  const item = route.params?.item;

  const navigation = useNavigation();

  const [inputHeight, setInputHeight] = useState(itemHeight * 0.06);
  const [messages, setMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [user, setUser] = useState();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const [channelMemberStatus, setChannelmemberStatus] = useState({});
  const [createChannel, setCreateChannel] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedItems = await AsyncStorage.getItem("user_data");

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

        // Define a regular expression to match JSON data within the response
        const jsonRegex = /\[.*\]/;

        // Use the regular expression to extract the JSON data
        const jsonDataMatch = res.data?.match(jsonRegex);

        // If a match is found, parse the JSON data
        let jsonData;
        if (jsonDataMatch) {
          jsonData = JSON.parse(jsonDataMatch[0]);
        } else {
          console.error("No JSON data found in the response");
        }

        // Now 'jsonData' contains only the data without HTML elements
        setMessages(jsonData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (channel) {
      fetchChannelMessages();
    }
  }, [channel]);

  useEffect(() => {
    if (item) {
      fetchMessages();
    }
  }, [item, user]);

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("user_id", user?.id);
    formData.append("flag", "delete_channel");
    formData.append("channel_id", channel?.channel?.id);

    try {
      const res = await axios.delete(
        `${BASE_URL}/api/v1/channel/index.php?user_id=${
          user?.id
        }&flag=${"delete_channel"}&channel_id=${channel?.channel?.id}`
      );

      const data = res.data;

      console.log(data);

      // navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 2],
      quality: 1,
      base64: true,
    });

    if (!result?.canceled) {
      setImage(result?.assets[0]?.base64);
    }
  };

  const handleSendMessage = async () => {
    const messageData = new FormData();

    messageData.append("user_id", user?.id);
    item && messageData.append("message_to", item?.id);
    channel && messageData.append("channel_id", channel?.id);
    messageData.append("message", message.trim());
    image && messageData.append("image", image);

    const channelData = {
      user: user?.id,
      channel: channel?.channel_id,
      post: message.trim(),
      likes_users: [],
    };

    if (message.trim() !== "" || image) {
      try {
        const res = await fetch(
          item
            ? `${BASE_URL}/api/v1/chat/private_message.php`
            : `${BASE_URL2}/post`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: item ? messageData : JSON.stringify(channelData),
          }
        );

        const data = await res.json();
        console.log(data);

        setMessage("");
        setImage(null);
        Keyboard.dismiss();

        fetchMessages();
        fetchChannelMessages();
      } catch (error) {}
    } else {
      setMessage("");
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    if (image) {
      handleSendMessage();
    }
  }, [image]);

  const checkIsChannelMember = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL2}/channel-request/${user?.id}/${channel?.channel_id}`
      );

      setChannelmemberStatus(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIsChannelMember();
  }, [user, channel, createChannel]);

  const createChannelRequest = async () => {
    const data = {
      request_user_id: user?.id,
      channel_id: channel?.channel_id,
    };

    try {
      const res = await axios.post(`${BASE_URL2}/channel-request`, data);

      setCreateChannel(res.data);

      Alert.alert("Channel request created successfully");
    } catch (error) {
      console.log(first);
    }
  };

  // console.log(channel, user?.id);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.white} barStyle={"dark-content"} />

      <View style={[styles.container, { flex: 0 }]}>
        <View style={{ height: "100%" }}>
          <View style={styles.chatBar}>
            <View style={styles.row}>
              <MaterialIcons
                name="arrow-back-ios"
                size={24}
                color="black"
                onPress={() => navigation.goBack()}
              />

              <Image
                source={
                  channel?.ChannelIcon
                    ? { uri: channel?.ChannelIcon }
                    : item?.avatar
                    ? { uri: item?.avatar }
                    : require("../../../assets/images/flexLogo.png")
                }
                style={[styles.profileIcon, { marginLeft: -10 }]}
              />

              <Text className={"text-xl font-bold text-18px]"}>
                {channel?.ChannelName ? channel?.ChannelName : item?.fname}
              </Text>
            </View>

            <View style={styles.row}>
              <Feather
                name="camera"
                size={24}
                color="black"
                onPress={handleDelete}
              />
              <Feather name="video" size={24} color="black" />
              <Feather name="phone" size={24} color="black" />

              {channel?.owner_id === user?.id && (
                <Feather
                  name="more-vertical"
                  size={24}
                  color="black"
                  onPress={() => setDropDown((prev) => !prev)}
                />
              )}
            </View>
          </View>

          {dropDown && (
            <Pressable
              style={{
                backgroundColor: "white",
                position: "absolute",
                right: 0,
                padding: 20,
                top: 60,
                zIndex: 999,
                elevation: 5,
              }}
              onPress={() =>
                navigation.navigate("channelRequests", {
                  id: channel?.owner_id,
                })
              }
            >
              <Text>See channel requests</Text>
            </Pressable>
          )}

          <Pressable onPress={() => setDropDown(false)}>
            <ImageBackground
              source={require("../../../assets/images/bg.png")}
              style={styles.bgImg}
              resizeMode="cover"
            >
              {messages.length > 0 && (
                <ScrollView showsVerticalScrollIndicator={false}>
                  {messages?.map((message, index) => (
                    <UserMsg key={index} message={message} user={user} />
                  ))}
                </ScrollView>
              )}

              <ScrollView showsVerticalScrollIndicator={false}>
                {channel?.owner_id !== user?.id &&
                channelMemberStatus?.status?.trim() === "rejected" ? (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: itemHeight * 0.8,
                    }}
                  >
                    <Pressable
                      style={[styles.button]}
                      onPress={createChannelRequest}
                    >
                      <Text style={styles.buttonTxt}>
                        Request to join this channel
                      </Text>
                    </Pressable>
                  </View>
                ) : channel?.owner_id !== user?.id &&
                  channelMemberStatus?.status?.trim() === "pending" ? (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: itemHeight * 0.8,
                    }}
                  >
                    <Pressable style={styles.button}>
                      <Text style={styles.buttonTxt}>
                        Channel request is pending
                      </Text>
                    </Pressable>
                  </View>
                ) : channel?.owner_id !== user?.id &&
                  channelMemberStatus?.status?.trim() === "accepted" ? (
                  <>
                    {channels?.map((message, index) => (
                      <ChannelMsg key={index} message={message} user={user} />
                    ))}
                  </>
                ) : (
                  <>
                    {channels?.length > 0 && (
                      <>
                        {channels?.map((message, index) => (
                          <ChannelMsg
                            key={index}
                            message={message}
                            user={user}
                          />
                        ))}
                      </>
                    )}
                  </>
                )}
              </ScrollView>
            </ImageBackground>
          </Pressable>

          {channelMemberStatus?.status?.trim() === "accepted" ||
          channel?.owner_id === user?.id ? (
            <View style={styles.msgInputCon}>
              <Entypo name="plus" size={26} color="black" onPress={pickImage} />

              <TextInput
                placeholder="Type a message"
                style={[
                  styles.input,
                  {
                    width: "73%",
                    height: inputHeight,
                    maxHeight: itemHeight * 0.13,
                  },
                ]}
                multiline
                cursorColor={"gray"}
                onContentSizeChange={handleContentSizeChange}
                onChangeText={(value) => setMessage(value)}
                value={message}
              />

              <Entypo name="emoji-happy" size={24} color="black" />

              <Pressable disabled={!message} onPress={handleSendMessage}>
                <MaterialIcons
                  name={message !== "" ? "send" : "mic-none"}
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>
          ) : null}

          {item && (
            <View style={styles.msgInputCon}>
              <Entypo name="plus" size={26} color="black" onPress={pickImage} />

              <TextInput
                placeholder="Type a message"
                style={[
                  styles.input,
                  {
                    width: "73%",
                    height: inputHeight,
                    maxHeight: itemHeight * 0.13,
                  },
                ]}
                multiline
                cursorColor={"gray"}
                onContentSizeChange={handleContentSizeChange}
                onChangeText={(value) => setMessage(value)}
                value={message}
              />

              <Entypo name="emoji-happy" size={24} color="black" />

              <Pressable disabled={!message} onPress={handleSendMessage}>
                <MaterialIcons
                  name={message !== "" ? "send" : "mic-none"}
                  size={24}
                  color="black"
                />
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MessagingRoom;
