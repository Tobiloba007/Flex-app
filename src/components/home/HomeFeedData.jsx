import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL, BASE_URL2 } from "../../config";
import moment from "moment";
import FeaturedContent from "./FeaturedContent";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onValue, ref } from "firebase/database";
import { db } from "../../../firebaseConfig";
import { sendNotification } from "../../constants/utils/SendNotification";

const screenWidth = Dimensions.get("window").width;

const HomeFeedData = ({ item }) => {
  const [user, setUser] = useState([]);
  const [userDet, setUserDet] = useState();
  const [isLiked, setIsLiked] = useState(
    item?.likes_users?.includes(userDet?.id)
  );
  const [likes, setLikes] = useState(item?.likes);
  const [postComments, setPostComments] = useState([]);
  const [channelMemberStatus, setChannelmemberStatus] = useState({});
  const [fcmToken, setFcmToken] = useState("");

  const navigation = useNavigation();

  // console.log(item)

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
    const fetchUserDet = async () => {
      const formData = new FormData();
      formData.append("name", item?.user);

      try {
        const res = await fetch(`${BASE_URL}/profile.php`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        setUserDet(data?.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserDet();
  }, []);

  const getFbUser = async () => {
    try {
      const userRef = ref(db, "users/" + item?.user);

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
    if (item) {
      getFbUser();
    }
  }, [item]);

  const handleLike = async () => {
    setIsLiked(!isLiked);

    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }

    const data = {
      screen: "tab",
      item,
      user,
    };

    try {
      const res = await axios.put(
        `${BASE_URL2}/post/${item.post_id}/like`,
        {
          like_user: userDet?.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
    setIsLiked(item?.likes_users?.includes(userDet?.id));
  }, [item, userDet]);

  useEffect(() => {
    const fetchPostComments = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL2}/comment/post/${item.post_id}`
        );

        setPostComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPostComments();
  }, [item]);

  const checkIsChannelMember = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL2}/channel-request/${user?.id}/${item?.channel}`
      );

      setChannelmemberStatus(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(channelMemberStatus);

  useEffect(() => {
    checkIsChannelMember();
  }, [user, item]);

  // console.log(item)

  return (
    <>
      {channelMemberStatus?.status?.trim() === "accepted" ||
      item?.user === user?.id ||
      item?.channel === 31 ? (
        <View className="flex flex-col items-start justify-start w-full mt-5">
          <View className={"flex flex-row items-start justify-start w-full"}>
            {/* LEFT*/}
            <View className={"flex flex-col items-start justify-start w-[17%]"}>
              {/* OWNER IMAGE*/}
              <Pressable
                onPress={() => {
                  if (userDet?.id === user?.id) {
                    navigation.navigate("profile");
                  } else {
                    navigation.navigate("friendProfile", { item: userDet });
                  }
                }}
                className="w-[50px] h-[50px]"
              >
                <Image
                  className="w-full h-full rounded-full"
                  source={
                    userDet?.image !== null
                      ? { uri: userDet?.image }
                      : require("../../../assets/images/flexLogo.png")
                  }
                />
              </Pressable>

              {/* VERTICAL BORDER*/}
              <View className="h-6 border-[0.3px] border-[#959292] mt-[6px] ml-6"></View>
              {/* COMMENT IMAGES*/}
              <View
                className={
                  "flex flex-row items-center justify-center mt-1 w-6 ml-2"
                }
              >
                {item?.replyImg1 && (
                  <Image
                    className="w-5 h-5 rounded-full"
                    source={item?.replyImg1}
                  />
                )}

                {item?.replyImg2 && (
                  <Image
                    className="w-5 h-5 rounded-full absolute left-3"
                    source={item?.replyImg2}
                  />
                )}
              </View>

              {/* FEATURED BORDER */}

              {/* {item.featuredComment !== null && (
            <View className={"flex flex-row items-end justify-start left-6"}>
              <View className="h-11 border-[0.3px] border-[#959292] mt-[6px]"></View>
              <View className="w-8 border-[0.3px] border-[#959292] mt-[6px]"></View>
            </View>
          )} */}
            </View>

            {/* RIGHT */}
            <View
              className={"flex flex-col items-start justify-start w-[73%] mt-1"}
            >
              {/* RIGHT TOP*/}
              <View
                className={"flex flex-row items-center justify-between w-full"}
              >
                <View className={"flex flex-row items-center justify-start"}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    className={
                      'text-[14px] text-black font-["sans-semibold"] mr-3'
                    }
                    onPress={() => {
                      if (userDet?.id === user?.id) {
                        navigation.navigate("profile");
                      } else {
                        navigation.navigate("friendProfile", { item: userDet });
                      }
                    }}
                  >
                    {userDet?.lname} {userDet?.fname}
                  </Text>
                  {userDet?.verify && (
                    <MaterialIcons
                      name={"verified"}
                      size={18}
                      color="#029CFC"
                    />
                  )}
                </View>

                <View className={"flex flex-row items-center justify-start"}>
                  <Text
                    className={
                      'text-[12px] text-[#959292] font-["sans-semibold"] mr-3'
                    }
                  >
                    {moment(item?.created_at).fromNow()}
                  </Text>
                  <MaterialCommunityIcons
                    name="dots-horizontal"
                    size={16}
                    color="black"
                  />
                </View>
              </View>

              {/* TWEET*/}
              {!item.post?.startsWith("https") && (
                <View className="w-[90%]">
                  <Text
                    numberOfLines={3}
                    ellipsizeMode="tail"
                    className={
                      'text-xs text-[#585859] font-["sans-semibold"] mr-3 leading-5'
                    }
                  >
                    {item?.post}
                  </Text>
                </View>
              )}

              {item?.post?.startsWith("https") && (
                <Pressable
                  style={{ width: 280, padding: 4 }}
                  onPress={() =>
                    navigation.navigate("photoDisplay", { image: item?.post })
                  }
                >
                  <Image
                    source={{ uri: item?.post }}
                    style={{
                      borderRadius: 10,
                      aspectRatio: 1,
                      width: "100%",
                    }}
                    resizeMode="cover"
                  />
                </Pressable>
              )}

              {/* LIKE, COMMENT, SHARE */}
              <View className="flex flex-row items-start justify-start mt-2">
                <TouchableOpacity className={"mr-8"} onPress={handleLike}>
                  {!isLiked ? (
                    <AntDesign name="hearto" size={15} color="black" />
                  ) : (
                    <AntDesign name="heart" size={15} color="hotpink" />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  className={"mr-8"}
                  onPress={() =>
                    navigation.navigate("Comments", {
                      post_id: item?.post_id,
                      user_id: userDet?.id,
                    })
                  }
                >
                  <FontAwesome5 name="comment" size={15} color="black" />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Fontisto name="share-a" size={13} color="black" />
                </TouchableOpacity>
              </View>

              {/* FIRST REPLIES AND LIKES */}
              <View className="flex flex-row items-start justify-start mt-1">
                <Text
                  className={
                    'text-[10px] text-[#959292] font-["sans-semibold"] mr-2'
                  }
                >
                  {likes} Likes - {postComments?.length} replies
                </Text>
              </View>

              {/* FEATURED CONTENTS */}

              {/* <FeaturedContent item={item} /> */}
            </View>
          </View>

          <View
            className="border-[0.3px] border-[#dddddd] w-full mt-6"
            style={{ width: screenWidth }}
          ></View>
        </View>
      ) : null}
    </>
  );
};

export default HomeFeedData;
