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
import { BASE_URL, BASE_URL2 } from "../../config";
import ChatHistory from "../../components/chat/ChatHistory";
import ChannelSearch from "../../components/chat/ChannelSearch";

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
  const [channelSearch, setChannelSearch] = useState([]);
  const [channelQuery, setChannelQuery] = useState("");

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
      const res = await axios.get(`${BASE_URL2}/channel?name=`);

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

  useEffect(() => {
    if (channelQuery.length > 2) {
      const handleChannelQuery = async () => {
        try {
          const res = await axios.get(
            `${BASE_URL2}/channel?name=${channelQuery}`
          );

          setChannelSearch(res.data);
        } catch (error) {
          console.log(error);
        }
      };

      handleChannelQuery();
    } else if (channelQuery.length > 0 && channelQuery.length <= 2) {
      setChannelSearch([]);
    }
  }, [channelQuery]);

  // console.log(user)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.white} barStyle={"dark-content"} />

      <View className={"flex-1 flex-row pl-2"} style={styles.container}>
        <>
          <View className={"w-[68px] items-center"}>
            <Text className={"text-l font-semibold text-[#000] pt-6"}>
              Channels
            </Text>

            <ScrollView>
              <View style={{ alignItems: "center", gap: 4, marginTop: 5 }}>
                {channelLists?.map((channel) => (
                  <View
                    key={channel?.channel_id}
                    className="flex-row items-center p-1"
                  >
                    <TouchableWithoutFeedback
                      onPress={() =>
                        navigation.navigate("MessagingRoom", { channel })
                      }
                    >
                      <Image
                        source={
                          channel?.icon
                            ? { uri: channel?.icon }
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

            <View className={"p-4"} style={{ zIndex: 9 }}>
              <TextInput
                className={"p-1 pl-6 bg-[#ebebeb] rounded-lg"}
                placeholder="Find a channel"
                style={{ height: 50 }}
                onChangeText={(value) => setChannelQuery(value.trim())}
              />
            </View>

            {channelSearch.length > 0 && (
              <ChannelSearch channelSearch={channelSearch} />
            )}

            {channelSearch.length === 0 && (
              <ChatHistory refRBConversationSheet={refRBConversationSheet} />
            )}
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

          <NewConversation user={user} refRBSheet={refRBConversationSheet} />
        </>

        {/* Add navigation and friends list components here */}
        {/* <BottomNav /> */}
      </View>
    </SafeAreaView>
  );
};

export default ChatRoom;
