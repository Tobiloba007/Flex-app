import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles } from "../../constants/styles";
import { colors } from "../../../colors";
import { useNavigation } from "@react-navigation/native";
import Channel from "../../components/bottomSheets/Channel";
import NewConversation from "../../components/bottomSheets/NewConversation";
import BottomNav from "../../components/bottomNav/BottomNav";
import ChannelLink from "../../components/bottomSheets/ChannelLink";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../config";

const itemWidth = Dimensions.get("window").width;

const friends = [
  {
    id: 1,
    name: "Alice",
    image: require("../../../assets/icons/ellipse-28.png"),
  },
  {
    id: 2,
    name: "Bob",
    image: require("../../../assets/icons/ellipse-29.png"),
  },
  {
    id: 3,
    name: "Charlie",
    image: require("../../../assets/icons/ellipse-31.png"),
  },
  {
    id: 4,
    name: "Alice",
    image: require("../../../assets/icons/ellipse-32.png"),
  },
  {
    id: 5,
    name: "Bob",
    image: require("../../../assets/icons/ellipse-28.png"),
  },
  {
    id: 6,
    name: "Charlie",
    image: require("../../../assets/icons/ellipse-28.png"),
  },
];
const ChatRoom = () => {
  const refRBChannelSheet = useRef();
  const refRBChannelLinkSheet = useRef();
  const refRBConversationSheet = useRef();
  const navigation = useNavigation();

  const [user, setUser] = useState();
  const [channelLink, setChannelLink] = useState("");
  const [channelLists, setChannelLists] = useState([]);

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

  const fetchChannelList = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/channel/index.php?user_id=${user?.id}`
      );

      setChannelLists(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchChannelList();
    }
  }, [user, channelLink]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.white} barStyle={"dark-content"} />

      <View className={"flex-1 flex-row pl-2"} style={styles.container}>
        <>
          <View className={"w-[65px] items-center"}>
            <Text className={"text-l font-semibold text-[#000] pt-6"}>
              Friends
            </Text>

            <ScrollView>
              <View style={{ alignItems: "center", gap: 4, marginTop: 5 }}>
                {channelLists?.map((channel) => (
                  <View key={channel?.id} className="flex-row items-center p-1">
                    <TouchableWithoutFeedback
                      onPress={() =>
                        navigation.navigate("MessagingRoom", { channel })
                      }
                    >
                      <Image
                        source={
                          channel?.ChannelIcon
                            ? { uri: channel?.ChannelIcon }
                            : require("../../../assets/images/flexLogo.png")
                        }
                        style={[
                          styles.profileIcon,
                          { height: itemWidth * 0.11, width: itemWidth * 0.11 },
                        ]}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                ))}

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => refRBChannelSheet?.current?.open()}
                  className="flex-row items-center p-1"
                  style={[styles.circularBtn, { marginTop: 5 }]}
                >
                  <Entypo name="plus" size={28} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>

          <View className={"flex-1"}>
            <View className={"p-4 border-b border-gray-200"}>
              <Text
                className={
                  'text-[25px] font-bold text-center font-["sans-bold"]'
                }
              >
                Chat Room
              </Text>
            </View>

            <View className={"p-4"}>
              <TextInput
                className={"p-1 pl-6 bg-[#02CFFC] rounded-lg"}
                placeholder="Find or start a conversation"
                editable={false}
              />
            </View>

            <View className={"flex-1 justify-center items-center p-0"}>
              <Image source={require("../../../assets/icons/chat-svg.png")} />

              <Text className={"text-xl font-semibold text-[#000] pt-6"}>
                Your Chat Is Empty
              </Text>

              <Text
                className={
                  'text-center text-[#000000] p-8 text-[15px] font-["sans-regular"]'
                }
              >
                It looks like you haven’t messaged anyone yet. Simply click on
                button below to begin chatting with your friends and colleagues.
              </Text>

              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={() => refRBConversationSheet?.current?.open()}
              >
                <Text className={"text-white font-bold "}>New Chat</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* bottom sheets */}
          <Channel
            user={user}
            setChannelLink={setChannelLink}
            refRBSheet={refRBChannelSheet}
            refRBChannelLinkSheet={refRBChannelLinkSheet}
          />

          <ChannelLink
            channelLink={channelLink}
            refRBSheet={refRBChannelLinkSheet}
          />

          <NewConversation  user={user} refRBSheet={refRBConversationSheet} />
        </>

        {/* Add navigation and friends list components here */}
        {/* <BottomNav /> */}
      </View>
    </SafeAreaView>
  );
};

export default ChatRoom;
