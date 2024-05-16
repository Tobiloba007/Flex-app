import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { styles } from "../../constants/styles";
import { colors } from "../../../colors";
import Channel from "../../components/bottomSheets/Channel";
import NewConversation from "../../components/bottomSheets/NewConversation";
import ChannelLink from "../../components/bottomSheets/ChannelLink";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL2 } from "../../config";
import ChatHistory from "../../components/chat/ChatHistory";
import ChannelSearch from "../../components/chat/ChannelSearch";
import ChannelListItem from "./ChannelListItem";
import { useSelector } from "react-redux";

const itemWidth = Dimensions.get("window").width;

const ChatRoom = () => {
  const devicesMessages = useSelector((state) => state.message.messages);

  const refRBChannelSheet = useRef();
  const refRBChannelLinkSheet = useRef();
  const refRBConversationSheet = useRef();

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
    let unsubscribe = true;

    if (unsubscribe) {
      if (user) {
        fetchChannelList();
      }
    }

    return () => {
      unsubscribe = false;
    };
  }, [user, channelLink]);

  const handleChannelQuery = async () => {
    try {
      const res = await axios.get(`${BASE_URL2}/channel?name=${channelQuery}`);

      setChannelSearch(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let unsubscribe = true;

    if (unsubscribe) {
      if (channelQuery.length > 2) {
        handleChannelQuery();
      } else if (channelQuery.length > 0 && channelQuery.length <= 2) {
        setChannelSearch([]);
      }
    }

    return () => {
      unsubscribe = false;
    };
  }, [channelQuery]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.white} barStyle={"dark-content"} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          className={"flex-1 flex-row pl-2"}
          style={[styles.container, { paddingBottom: itemWidth * 0.2 }]}
        >
          <>
            <View className={"w-[68px] items-center"}>
              <Text className={"text-l font-semibold text-[#000] pt-6"}>
                Channels
              </Text>

              <ScrollView>
                <View
                  style={{
                    alignItems: "center",
                    gap: 4,
                    marginTop: 5,
                    paddingBottom: itemWidth * 0.2,
                  }}
                >
                  {channelLists?.map((channel) => (
                    <ChannelListItem
                      key={channel?.channel_id}
                      channel={channel}
                    />
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

            <View style={{ flex: 1 }}>
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
                <ChannelSearch channelSearch={channelSearch} user={user} />
              )}

              {channelSearch.length === 0 && (
                <ChatHistory
                  refRBConversationSheet={refRBConversationSheet}
                  devicesMessages={devicesMessages}
                />
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatRoom;
