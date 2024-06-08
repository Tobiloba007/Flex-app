import { View, Text, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../../constants/styles";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL2 } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { onValue, ref } from "firebase/database";
import { db } from "../../../firebaseConfig";
import { sendNotification } from "../../constants/utils/SendNotification";

const ChannelMsg = ({ message, user }) => {
  const navigation = useNavigation();
  // console.log(message)

  const [userDet, setUserDet] = useState();
  const [isLiked, setIsLiked] = useState(
    message?.likes_users?.includes(userDet?.id)
  );
  const [likes, setLikes] = useState(message?.likes);
  const [postComments, setPostComments] = useState([]);
  const [fcmToken, setFcmToken] = useState("");

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

  const getFbUser = async () => {
    try {
      const userRef = ref(db, "users/" + message?.user);

      // const userSnapshot = await get(userRef);

      // Listen for real-time changes to the user's data
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setFcmToken(snapshot.val().fcmToken);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (message) {
      getFbUser();
    }
  }, [message]);

  const handleLike = async () => {
    setIsLiked(!isLiked);

    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }

    const data = {
      screen: "tab",
      message,
      user,
    };

    try {
      const res = await axios.put(`${BASE_URL2}/post/${message.post_id}/like`, {
        like_user: userDet?.id,
      });

      // console.log(res.data);

      if (!isLiked) {
        // send push notification
        const body = "Liked your post";
        const title = `${user?.fname} ${user?.lname}`;

        await sendNotification(fcmToken, title, body, data);
      }
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    setIsLiked(message?.likes_users?.includes(userDet?.id));
  }, [message, userDet]);

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

  // console.log(message);

  return (
    <View
      style={[
        message?.user == user?.id
          ? styles.chatBubbleRight
          : styles.chatBubbleLeft,
        message?.post?.startsWith("https") && { width: 280, padding: 4 },
      ]}
    >
      {!message.post?.startsWith("https") && (
        <Text
          className={`float-right ${
            message?.user == user?.id ? "text-[#fff]" : ""
          }`}
        >
          {message?.post}
        </Text>
      )}

      {message?.post?.startsWith("https") && (
        <Pressable
          onPress={() =>
            navigation.navigate("photoDisplay", { image: message?.post })
          }
        >
          <Image
            source={{ uri: message?.post }}
            style={{
              borderRadius: 10,
              aspectRatio: 1,
              width: "100%",
            }}
            resizeMode="cover"
          />
        </Pressable>
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
