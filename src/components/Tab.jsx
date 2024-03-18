import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import Home from "../screens/Home";
import Cards from "../screens/Cards";
import SendMoney from "../screens/SendMoney";
import Profile from "../screens/Profile";
import Bitcoins from "../screens/Bitcoins";
import dp from "../../assets/images/dp.jpg";
import ChatRoom from "../screens/chat/ChatRoom";

export default function Tab() {
  const [count, setCount] = useState(1);

  const tabs = [
    {
      id: 1,
      icon: <Foundation name="home" size={24} color="#029CFC" />,
      label: "Home",
    },
    {
      id: 2,
      icon: <Ionicons name="card" size={24} color="#029CFC" />,
      label: "Cards",
    },
    {
      id: 3,
      icon: <Ionicons name="add-circle-sharp" size={33} color="#029CFC" />,
      label: "Send Money",
    },
    {
      id: 4,
      icon: <Ionicons name="chatbubble" size={24} color="#029CFC" />,
      //   icon: <Zocial name="bitcoin" size={24} color="#029CFC" />,
      label: "Chats",
    },
    {
      id: 5,
      icon: (
        <View className="flex items-center justify-center h-[30px] w-[30px] bg-red-500 rounded-full">
          <Image className="h-full w-full rounded-full" source={dp} alt="dp" />
        </View>
      ),
      label: "Me",
    },
  ];

  const handleTab = (item) => {
    setCount(item);
    // console.log(item);
  };

  //   items-center justify-start

  return (
    <View className="flex flex-col w-full h-full">
      {count === 1 ? (
        <Home />
      ) : count === 2 ? (
        <Cards />
      ) : count === 3 ? (
        <SendMoney />
      ) : count === 4 ? (
        <ChatRoom />
      ) : (
        count === 5 && <Profile />
      )}
      <View className="absolute bottom-0 flex flex-row items-end justify-between w-full h-[80px] bg-white shadow-2xl border-[0.8px] border-[#eeeeee] px-5 pb-4">
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
