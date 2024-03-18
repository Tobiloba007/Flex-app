import { View, Text, Image } from "react-native";
import React from "react";
import { styles } from "../../constants/styles";

const UserMsg = ({message, user}) => {
  return (
    <View
      // className={`rounded-lg ${
      //   message?.message_from == user?.id
      //     ? "bg-blue-500 ml-[100px]"
      //     : "bg-gray-300"
      // } p-3 mb-1.5 mt-1.5 w-[280px] float-right`}
      style={[
        message?.message_from == user?.id
          ? styles.chatBubbleRight
          : styles.chatBubbleLeft,
        message?.image && { width: 280, padding: 4 },
      ]}
    >
      {message.message && (
        <Text
          className={`float-right ${
            message?.message_from == user?.id ? "text-[#fff]" : ""
          }`}
        >
          {message.message}
        </Text>
      )}

      {message?.image && (
        <View>
          <Image
            source={{ uri: message?.image }}
            style={{
              borderRadius: 10,
              aspectRatio: 1,
              width: undefined,
            }}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
};

export default UserMsg;
