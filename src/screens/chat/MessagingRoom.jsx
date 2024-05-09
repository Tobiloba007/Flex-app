import React, { useCallback, useEffect, useState } from "react";
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { colors } from "../../../colors";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL, BASE_URL2 } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import ChannelMsg from "./ChannelMsg";
import UserMsg from "./UserMsg";
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import { changeMessageState } from "../../redux/directMessageReducer";

const itemHeight = Dimensions.get("window").height;

const MessagingRoom = ({ route }) => {
  const channel = route.params?.channel;
  const item = route.params?.item;

  const devicesMessages = useSelector((state) => state.message.messages);
  // console.log(devicesMessages);

  const dispatch = useDispatch();

  // console.log('item:', item, 'channel:', channel)

  const navigation = useNavigation();

  const [inputHeight, setInputHeight] = useState(itemHeight * 0.06);
  const [messages, setMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [user, setUser] = useState();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [channelImage, setChannelImage] = useState(null);
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

  // update device message if message isn't present yet
  useEffect(() => {
    if (messages?.length > 0) {
      if (
        !devicesMessages.some((deviceMessage) => deviceMessage.id === item.id)
      ) {
        const lastMessage = messages?.slice(-1)[0];
        const savedItem = {
          ...item,
          lastMessage: lastMessage?.message || lastMessage?.image,
        };
        // console.log(savedItem)
        dispatch(changeMessageState(savedItem));
      }
    }
  }, [messages]);

  // console.log(messages)

  useFocusEffect(
    useCallback(() => {
      if (channel) {
        fetchChannelMessages();
      }
    }, [channel])
  );

  useEffect(() => {
    if (item) {
      fetchMessages();
    }
  }, [item, user]);

  const pickImage = async () => {
    if (channel) {
      const result = await launchImageLibrary({
        mediaType: "photo",
      });

      if (!result.didCancel) {
        // setImage(result.assets[0].uri);
        setFile(result);
      }
    } else if (item) {
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
    }
  };

  useEffect(() => {
    if (file) {
      navigation.navigate("sendImage", { file, channel });
    }
  }, [file]);

  const handleSendMessage = async () => {
    if (channel) {
      const channelData = {
        user: user?.id,
        channel: channel?.channel_id,
        post: message.trim(),
        likes_users: [],
      };

      if (message.trim() !== "") {
        try {
          const res = await fetch(`${BASE_URL2}/post`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(channelData),
          });

          setMessage("");
          setImage(null);
          Keyboard.dismiss();

          fetchChannelMessages();
        } catch (error) {
          console.log(error);
        }
      } else {
        setMessage("");
        Keyboard.dismiss();
      }
    } else {
      const messageData = new FormData();

      messageData.append("user_id", user?.id);
      messageData.append("message_to", item?.id);
      messageData.append("message", message.trim());
      image && messageData.append("image", image);

      if (message.trim() !== "" || image) {
        try {
          const res = await fetch(
            `${BASE_URL}/api/v1/chat/private_message.php`,
            {
              method: "POST",
              body: messageData,
            }
          );

          // console.log(messageData);

          setMessage("");
          setImage(null);
          Keyboard.dismiss();

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

  // console.log(channelMemberStatus)

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

  console.log(channel);

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
                  channel?.icon
                    ? { uri: channel?.icon }
                    : item?.avatar
                    ? { uri: item?.avatar }
                    : require("../../../assets/images/flexLogo.png")
                }
                style={[styles.profileIcon, { marginLeft: -10 }]}
              />

              <Text className={"text-xl font-bold text-18px]"}>
                {channel?.name ? channel?.name : item?.fname}
              </Text>
            </View>

            <View style={styles.row}>
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

          {messages.length > 0 && (
            <ImageBackground
              source={require("../../../assets/images/bg.png")}
              style={styles.bgImg}
              resizeMode="cover"
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: itemHeight * 0.02, paddingBottom: itemHeight * 0.06 }}
              >
                {messages.map((message, index) => (
                  <UserMsg key={index} message={message} user={user} />
                ))}
              </ScrollView>
            </ImageBackground>
          )}

          {channels.length > 0 && (
            <ImageBackground
              source={require("../../../assets/images/bg.png")}
              style={styles.bgImg}
              resizeMode="cover"
            >
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
                  <Pressable
                    onPress={() => setDropDown(false)}
                    style={{ height: "auto" }}
                  >
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
                  </Pressable>
                )}
              </ScrollView>
            </ImageBackground>
          )}

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
