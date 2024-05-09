import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import SendMoney from "../screens/sendMoney/SendMoney";
import Profile from "../screens/Profile";
import dp from "../../assets/images/dp.jpg";
import ChatRoom from "../screens/chat/ChatRoom";
import { useNavigation } from "@react-navigation/native";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import axios from "axios";
import { BASE_URL2 } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const itemHeight = Dimensions.get("window").height;
const itemWidth = Dimensions.get("window").width;

export default function Tab() {
  const [count, setCount] = useState(1);
  const [animation] = useState(new Animated.Value(0));

  const [channelId, setChannelId] = useState(undefined);
  const [user, setUser] = useState([]);

  const navigation = useNavigation();

  const handleDynamicLink = useCallback(async (link) => {
    if (link?.url) {
      setChannelId(link?.url.match(/[0-9]+/g)[0]);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

    return () => unsubscribe();
  }, [handleDynamicLink]);

  useEffect(() => {
    if (channelId) {
      const fetchChannel = async () => {
        try {
          const res = await axios.get(`${BASE_URL2}/channel/${channelId}`);

          navigation.navigate("MessagingRoom", { channel: res.data });
        } catch (error) {
          console.log(error);
        }
      };

      fetchChannel();
    }
  }, [channelId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedItems = await AsyncStorage.getItem("user_data");
        // console.log(storedItems);

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

  const tabs = [
    {
      id: 1,
      icon: <Foundation name="home" size={24} color="#029CFC" />,
      label: "Home",
    },
    {
      id: 2,
      icon: <Ionicons name="add-circle-sharp" size={33} color="#029CFC" />,
      label: "P2P crypto",
    },
    {
      id: 3,
      icon: <Ionicons name="chatbubble" size={24} color="#029CFC" />,
      //   icon: <Zocial name="bitcoin" size={24} color="#029CFC" />,
      label: "Chats",
    },
    {
      id: 4,
      icon: (
        <View className="flex items-center justify-center h-[30px] w-[30px] bg-red-500 rounded-full">
          <Image className="h-full w-full rounded-full" source={{uri: user?.image}} alt="dp" />
        </View>
      ),
      label: "Me",
    },
  ];

  const handleTab = (item) => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCount(item);
      animation.setValue(0);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {count === 1 ? (
        <Animated.View
          style={{
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0], // Map animation value from 0 to 1 to opacity from 1 to 0
            }),
            flex: 1,
          }}
        >
          <Home />
        </Animated.View>
      ) : count === 2 ? (
        <Animated.View
          style={{
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
            flex: 1,
          }}
        >
          <SendMoney />
        </Animated.View>
      ) : count === 3 ? (
        <Animated.View
          style={{
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
            flex: 1,
          }}
        >
          <ChatRoom />
        </Animated.View>
      ) : count === 4 ? (
        <Animated.View
          style={{
            opacity: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
            flex: 1,
          }}
        >
          <Profile />
        </Animated.View>
      ) : null}

      <View
        style={{
          position: "absolute",
          bottom: 0,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          height: itemHeight * 0.08,
          backgroundColor: "white",
          shadowColor: "#000",
          elevation: 5,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          paddingHorizontal: itemWidth * 0.1,
          paddingVertical: 4,
        }}
      >
        {tabs.map((item) => {
          return (
            <TouchableOpacity
              onPress={() => handleTab(item.id)}
              key={item.id}
              className="flex flex-col items-center justify-center"
            >
              <View
                className={`flex items-center justify-center bg-[${
                  item.id === count && "#CDEAFC"
                }] rounded-full h-10 w-10`}
              >
                {item.icon}
              </View>
              <Text
                className={`text-[9px] text-[#029CFC] font-["sans-medium"]`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
