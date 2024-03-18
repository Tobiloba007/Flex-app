import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Pressable,
  Keyboard,
} from "react-native";
import { styles } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../colors";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import ChannelMsg from "./ChannelMsg";
import UserMsg from "./UserMsg";

const itemHeight = Dimensions.get("window").height;

const MessagingRoom = ({ route }) => {
  const channel = route.params?.channel;
  const item = route.params?.item;
  // console.log( item)

  const navigation = useNavigation();

  const [inputHeight, setInputHeight] = useState(itemHeight * 0.06);
  const [messages, setMessages] = useState([]);
  const [channels, setChannels] = useState([]);
  const [user, setUser] = useState();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

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
        `${BASE_URL}/api/v1/chat/channel_message.php?channel_id=${channel?.id}`
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
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchChannelMessages();
  }, [channel]);

  useEffect(() => {
    fetchMessages();
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

    if (message.trim() !== "" || image) {
      try {
        await fetch(
          item
            ? `${BASE_URL}/api/v1/chat/private_message.php`
            : `${BASE_URL}/api/v1/chat/channel_message.php`,
          {
            method: "POST",
            body: messageData,
          }
        );

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

  // console.log( channel?.channel?.id, user?.id);

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
            </View>
          </View>

          <ImageBackground
            source={require("../../../assets/images/bg.png")}
            style={styles.bgImg}
            resizeMode="cover"
          >
            {messages.length > 0 && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {messages.map((message, index) => (
                  <UserMsg key={index} message={message} user={user} />
                ))}
              </ScrollView>
            )}

            {channels.length > 0 && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {channels.map((message, index) => (
                  <ChannelMsg key={index} message={message} user={user} />
                ))}
              </ScrollView>
            )}
          </ImageBackground>

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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MessagingRoom;
