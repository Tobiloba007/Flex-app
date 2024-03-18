import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "../../constants/styles";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ChannelMsg = ({ message, user }) => {
  const navigation = useNavigation();

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
  };

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

      <View style={styles.LikeComCon}>
        <Pressable style={styles.likeCon} onPress={handleLike}>
          <AntDesign
            name={isLiked ? "heart" : "hearto"}
            size={15}
            color="red"
          />
          <Text style={{ color: "white", fontSize: 12 }}>{likes}</Text>
        </Pressable>

        <Text
          style={{
            color: "white",
            textDecorationLine: "underline",
            fontSize: 12,
          }}
          onPress={() => navigation.navigate("Comments")}
        >
          2 comments
        </Text>
      </View>
    </View>
  );
};

export default ChannelMsg;
