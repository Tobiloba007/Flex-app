import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../../constants/styles";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL2 } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ChannelMsg = ({ message, user }) => {
  const navigation = useNavigation();
  // console.log(message)

  const [userDet, setUserDet] = useState();
  const [isLiked, setIsLiked] = useState(
    message?.likes_users?.includes(message?.id) ? true : false
  );
  const [likes, setLikes] = useState(message?.likes);
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    const fetchUserDet = async () => {
      try {
        const storedItems = await AsyncStorage.getItem("user_data");

        if (storedItems !== null) {
          const parsedItems = JSON.parse(storedItems);
          setUserDet(parsedItems);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserDet();
  }, []);

  const handleLike = async () => {
    setIsLiked(!isLiked);

    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);

      try {
        const res = await axios.put(
          `${BASE_URL2}/post/${message.post_id}/like`,
          {
            like_user: userDet?.id,
          }
        );

        console.log(res.data);
      } catch (error) {
        console.log(error?.response?.data);
      }
    }
  };

  useEffect(() => {
    const fetchPostComments = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL2}/comment/post/${message.post_id}`
        );

        setPostComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPostComments();
  }, [message]);

  // console.log(postComments);

  return (
    <View
      // className={`rounded-lg ${
      //   message?.message_from == user?.id
      //     ? "bg-blue-500 ml-[100px]"
      //     : "bg-gray-300"
      // } p-3 mb-1.5 mt-1.5 w-[280px] float-right`}
      style={[
        message?.user == user?.id
          ? styles.chatBubbleRight
          : styles.chatBubbleLeft,
        message?.image && { width: 280, padding: 4 },
      ]}
    >
      {message.post && (
        <Text
          className={`float-right ${
            message?.user == user?.id ? "text-[#fff]" : ""
          }`}
        >
          {message?.post}
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
          onPress={() =>
            navigation.navigate("Comments", {
              post_id: message?.post_id,
              user_id: user?.id,
            })
          }
        >
          {postComments?.length} comments
        </Text>
      </View>
    </View>
  );
};

export default ChannelMsg;
