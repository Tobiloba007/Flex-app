import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../../constants/styles";

const ChatHistory = ({ refRBConversationSheet }) => {
  return (
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
        It looks like you haven’t messaged anyone yet. Simply click on button
        below to begin chatting with your friends and colleagues.
      </Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => refRBConversationSheet?.current?.open()}
      >
        <Text className={"text-white font-bold "}>New Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatHistory;
