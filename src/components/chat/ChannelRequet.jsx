import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { BASE_URL, BASE_URL2 } from "../../config";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ChannelRequest = ({ user, item }) => {
  const [userDet, setUserDet] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserDet = async () => {
      const formData = new FormData();
      formData.append("name", item?.request_user_id);

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
  }, [item]);

  const cancelRequest = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL2}/channel-request/${item?.channel_request_id}`,
        { status: false }
      );

      Alert.alert(res.data?.status);

      navigation.goBack();
    } catch (error) {}
  };

  const acceptRequest = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL2}/channel-request/${item?.channel_request_id}`,
        { status: true }
      );

      Alert.alert(res.data?.status);

      navigation.goBack();
    } catch (error) {}
  };

  // console.log(item)

  return (
    <View
      className="flex flex-col items-center justify-start w-full  rounded-3xl border-[1px] border-[#cccccc] px-5 py-3"
      style={{ marginBottom: 5 }}
    >
      <View className="flex flex-col items-center justify-start w-full mt-6">
        <View className="flex items-center justify-center w-[75px] h-[75px] bg-[#CDEAFC] rounded-full">
          <Image
            className="w-[80%] h-[80%] rounded-full"
            source={{ uri: userDet?.avatar }}
            resizeMode="cover"
          />
        </View>
        <Text className={`text-sm text-[#000000] font-["sans-semibold"] mt-2`}>
          {userDet?.fname} {userDet?.lname}
        </Text>
        {/* <Text className={`text-xs text-[#000000] font-["sans-regular"]`}>
          ${item?.username}
        </Text> */}
      </View>

      {item?.request_accepted === false && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TouchableOpacity
            className="flex items-center justify-center h-12 bg-[#029CFC] rounded-3xl mt-8"
            style={{ backgroundColor: "#029CFC", width: "49%" }}
            onPress={acceptRequest}
          >
            <Text className={`text-sm text-[#ffffff] font-["sans-semibold"]`}>
              Accept
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex items-center justify-center h-12  bg-[#029CFC] rounded-3xl mt-8"
            style={{ backgroundColor: "red", width: "49%" }}
            onPress={cancelRequest}
          >
            <Text className={`text-sm text-[#ffffff] font-["sans-semibold"]`}>
              Reject
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ChannelRequest;
