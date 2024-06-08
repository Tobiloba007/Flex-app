import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import SendMoney from "../screens/sendMoney/SendMoney";
import Profile from "../screens/Profile";
import ChatRoom from "../screens/chat/ChatRoom";
import { useNavigation } from "@react-navigation/native";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import axios from "axios";
import { BASE_URL2 } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../colors";
import { styles } from "../constants/styles";
import Pin from "../screens/authentication/Pin";
import PinComponent from "../screens/authentication/PinComponent";
import { onValue, ref } from "firebase/database";
import { db } from "../../firebaseConfig";
import { useFocusEffect } from "expo-router";

const itemHeight = Dimensions.get("window").height;
const itemWidth = Dimensions.get("window").width;

export default function Tab() {
  const [count, setCount] = useState(1);
  const [animation] = useState(new Animated.Value(0));

  const [channelId, setChannelId] = useState(undefined);
  const [user, setUser] = useState();
  const [channelMemberStatus, setChannelmemberStatus] = useState(null);
  const [error, setError] = useState("");

  const [showPin, setShowPin] = useState(true);
  const [userPin, setUserPin] = useState();
  const [message, setMessage] = useState("");
  const [pin, setPin] = useState([]);
  const [unreadMessages, setUnReadMessages] = useState();

  const navigation = useNavigation();

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

  useEffect(() => {
    const getPin = async () => {
      const storedPin = await AsyncStorage.getItem("@user_pin");

      if (storedPin === null) {
        setUserPin(storedPin);
      } else {
        setUserPin(storedPin);
      }
    };

    getPin();
  }, []);

  const handleDynamicLink = useCallback(async (link) => {
    if (link?.url) {
      setChannelId(link?.url.match(/[0-9]+/g)[0]);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);

    return () => unsubscribe();
  }, [handleDynamicLink]);

  const checkIsChannelMember = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL2}/channel-request/${user?.id}/${channelId}`
      );

      setChannelmemberStatus(res.data);
    } catch (error) {
      console.log(error);

      setError("An error occured, please try again.");

      setTimeout(() => {
        setError("");
        setChannelId(undefined);
      }, 3000);
    }
  };

  useEffect(() => {
    let unsubscribe = true;

    if (unsubscribe) {
      if (channelId) {
        checkIsChannelMember();
      }
    }

    return () => {
      unsubscribe = false;
    };
  }, [user, channelId]);

  const fetchChannel = async () => {
    try {
      const res = await axios.get(`${BASE_URL2}/channel/${channelId}`);

      navigation.navigate("MessagingRoom", {
        channel: res.data,
        channelMemberStatus,
      });

      setChannelId(undefined);
    } catch (error) {
      console.log(error);

      setError("An error occured, please try again.");

      setTimeout(() => {
        setError("");
        setChannelId(undefined);
      }, 3000);
    }
  };

  useEffect(() => {
    let unsubscribe = true;

    if (unsubscribe) {
      if (channelMemberStatus) {
        if (channelId) {
          fetchChannel();
        }
      }
    }

    return () => {
      unsubscribe = false;
    };
  }, [channelId, channelMemberStatus]);

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
          <Image
            className="h-full w-full rounded-full"
            source={{ uri: user?.image }}
            alt="dp"
          />
        </View>
      ),
      label: "Me",
    },
  ];

  const handleTab = (item) => {
    setCount(item);
  };

  const getFcmUser = async () => {
    try {
      const userRef = ref(db, "users/" + user?.id);

      // const userSnapshot = await get(userRef);

      // Listen for real-time changes to the user's data
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setUnReadMessages(snapshot.val().unreadMessages);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(unreadMessages)

  // useFocusEffect(
  //   useCallback(() => {
  //     if (user) {
  //       getFcmUser();
  //     }
  //   }, [user])
  // );

  useEffect(() => {
    if (user) {
      getFcmUser();
    }
  }, [user]);

  const handlePin = (num) => {
    if (pin.length < 4) {
      setPin((prev) => [...prev, num]);
    }
  };

  const removePin = () => {
    if (pin.length > 0) {
      pin.pop();
      setPin((prev) => [...prev]);
    }
  };

  useEffect(() => {
    if (pin.length === 4 && userPin) {
      if (pin.toString() === userPin) {
        setShowPin(false);
        setPin([]);
      } else {
        setMessage(
          "The pin you input is incorrect, please try again or use forgot pin"
        );

        setTimeout(() => {
          setPin([]);
          setMessage("");
        }, 3000);
      }
    }
  }, [pin.length]);

  const handlePrompt = () => {
    navigation.navigate("pin");
  };

  return (
    <View style={{ flex: 1 }}>
      {showPin && (
        <View
          style={{
            position: "absolute",
            zIndex: 999,
            backgroundColor: "white",
            width: "100%",
            height: "100%",
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <PinComponent
              isNewPin={undefined}
              userPin={userPin}
              message={message}
              handlePin={handlePin}
              handlePrompt={handlePrompt}
              isMaxPin={undefined}
              pin={pin}
              removePin={removePin}
            />
          </ScrollView>
        </View>
      )}

      {!showPin && (
        <>
          {!channelId && (
            <>
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
            </>
          )}

          {channelId && (
            <View
              style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator color={colors.primary} size={"large"} />
            </View>
          )}

          {error && (
            <View
              style={{
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={[styles.smallTxt, { color: "#000" }]}>{error}</Text>
            </View>
          )}

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
            {tabs.map((item, index) => {
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

                  {index === 2 && unreadMessages > 0 && (
                    <View
                      style={{
                        paddingHorizontal: 6,
                        position: "absolute",
                        backgroundColor: "white",
                        borderRadius: 50,
                        alignItems: "center",
                        justifyContent: "center",
                        top: 0,
                        right: 0,
                        borderWidth: 2,
                        borderColor: colors.primary,
                      }}
                    >
                      <Text style={{ color: colors.primary }}>
                        {unreadMessages}
                      </Text>
                    </View>
                  )}

                  <Text
                    className={`text-[9px] text-[#029CFC] font-["sans-medium"]`}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}
