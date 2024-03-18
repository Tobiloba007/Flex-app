import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Notification() {
  const navigation = useNavigation();

  const notifications = [
    {
      id: 1,
      icon: (
        <MaterialCommunityIcons
          name="notebook-multiple"
          size={22}
          color="#029CFC"
        />
      ),
      title: "Payment Verified",
      time: "30min",
      desc: "Your payment was successfully forwarded. Do not share your transaction code with anyone",
    },
    {
      id: 2,
      icon: (
        <FontAwesome6 name="arrow-down-wide-short" size={20} color="#029CFC" />
      ),
      title: "Your order has arrived",
      time: "45min",
      desc: "This notification is to confirm that your order from Apple store has arrived.",
    },
    {
      id: 3,
      icon: <SimpleLineIcons name="note" size={22} color="#029CFC" />,
      title: "Open for survery?",
      time: "53min",
      desc: "Please this survey will only take a little of your time. This is to have a better view on how our customer feel on our new production.",
    },
    {
      id: 4,
      icon: <FontAwesome5 name="award" size={24} color="#029CFC" />,
      title: "Promo available!",
      time: "1hr",
      desc: "Promo is now available on Jumia. Log on to have more on the available products.",
    },
  ];
  return (
    <View
      className="flex flex-col items-center justify-start w-full h-full bg-white"
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      <View className="flex items-center justify-center w-full h-[80px] bg-white shadow-3xl border-b-[1px] border-[#eeeeee]">
        <Text
          className={`text-center text-black font-["sans-semibold"] text-lg mt-4`}
        >
          Notifications
        </Text>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-8 left-5"
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="absolute top-8 right-5">
          <Ionicons name="settings-sharp" size={25} color="black" />
        </TouchableOpacity>
      </View>

      <View className="flex flex-col items-center justify-start w-full px-5 mt-1">
        {notifications.map((item) => {
          return (
            <View
              key={item.id}
              className="flex flex-col items-center justify-start w-full mt-3"
            >
              <View className="flex flex-row items-center justify-between w-full">
                <View className="flex flex-row items-center justify-start">
                  {item.icon}
                  <Text
                    className={`text-center text-black font-["sans-bold"] text-sm ml-2`}
                  >
                    {item.title}
                  </Text>
                </View>
                <Text
                  className={`text-center text-black font-["sans-bold"] text-sm ml-2`}
                >
                  {item.time}
                </Text>
              </View>
              <Text
                className={`text-left w-full text-gray-500 font-["sans-semibold"] text-[11px] mt-1`}
              >
                {item.desc}
              </Text>
              <View className="border-[#cccccc] border-[0.4px] w-full mt-2"></View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
