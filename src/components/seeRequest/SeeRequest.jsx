import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { BASE_URL } from "../../config";

const SeeRequest = ({
  user,
  item,
  dropdown,
  setDropdown,
  setReportAccountId,
  setBlock,
  setReport,
}) => {
  const [dropId, setDropId] = useState("");

  const handleReport = (id) => {
    setDropdown(false);
    setReport(true);
    setReportAccountId(id);
  };

  const handleBlock = (id) => {
    setDropdown(false);
    setBlock(true);
    setReportAccountId(id);
  };

  const handleDropdown = (id) => {
    setDropId(id);
    setDropdown(true);
  };

  const cancelRequest = async () => {
    const formData = new FormData();
    formData.append("request_from", item?.request_from);
    formData.append("request_to", item?.request_to);
    formData.append("flag", "cancel_request");
    formData.append("receiver_name", item?.username);

    try {
      const res = await fetch(
        `${BASE_URL}/api/v1/friend/send_cancel_friend_request.php`,
        { method: "POST", body: formData }
      );

      const data = await res.json();

      Alert.alert(data?.message);
    } catch (error) {}
  };

  const acceptRequest = async () => {
    const formData = new FormData();
    formData.append("request_from", item?.request_from);
    formData.append("request_to", item?.request_to);
    formData.append("sender_name", item?.username);

    try {
      const res = await fetch(
        `${BASE_URL}/api/v1/friend/accept_friend_request.php`,
        { method: "POST", body: formData }
      );

      const data = await res.json();

      Alert.alert(data?.message);
    } catch (error) {}
  };

  return (
    <View
      className="flex flex-col items-center justify-start w-full  rounded-3xl border-[1px] border-[#cccccc] px-5 py-3"
      style={{ marginBottom: 5 }}
    >
      <View className="flex flex-col items-center justify-start w-full mt-6">
        <View className="flex items-center justify-center w-[75px] h-[75px] bg-[#CDEAFC] rounded-full">
          <Image
            className="w-[80%] h-[80%] rounded-full"
            source={{ uri: item?.avatar }}
            resizeMode="cover"
          />
        </View>
        <Text className={`text-sm text-[#000000] font-["sans-semibold"] mt-2`}>
          {item?.username}
        </Text>
        <Text className={`text-xs text-[#000000] font-["sans-regular"]`}>
          ${item?.username}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => handleDropdown(item?.id)}
        className="absolute top-8 right-5"
      >
        <Entypo name="dots-three-vertical" size={18} color="black" />
      </TouchableOpacity>
      {dropId === item?.id && dropdown && (
        <View className="absolute top-10 right-6 flex flex-col items-center justify-center w-[100px] h-[85px] border-[#cccccc] border-[1px] bg-white rounded-md">
          <Pressable
            onPress={() =>
              handleReport(
                user?.id === item?.request_from
                  ? item?.request_to
                  : item?.request_from
              )
            }
          >
            <Text
              className={`text-xs text-[#000000] font-["sans-regular"] text-left`}
            >
              Report User
            </Text>
          </Pressable>

          <Pressable
            onPress={() =>
              handleBlock(
                user?.id === item?.request_from
                  ? item?.request_to
                  : item?.request_from
              )
            }
            className="mt-5"
          >
            <Text
              className={`text-xs text-[#000000] font-["sans-regular"] text-left`}
            >
              Block User
            </Text>
          </Pressable>
        </View>
      )}

      {/* <View className="flex flex-row items-center justify-center w-full mt-5">
        <TouchableOpacity className="flex items-center justify-center bg-[#ffffff] w-[35%] h-10 rounded-xl border-[1px] border-[#cccccc]">
          <Text className={`text-xs text-[#029CFC] font-["sans-medium"]`}>
            ADD FRIEND
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex items-center justify-center bg-[#ffffff] w-[35%] h-10 rounded-xl ml-5 border-[1px] border-[#cccccc]">
          <Text className={`text-xs text-[#029CFC] font-["sans-medium"]`}>
            3 FRIENDS
          </Text>
        </TouchableOpacity>
      </View> */}

      {item?.action === "Cancel Request" && (
        <TouchableOpacity
          className="flex items-center justify-center h-12 w-full bg-[#029CFC] rounded-3xl mt-8"
          style={{ backgroundColor: "red" }}
          onPress={cancelRequest}
        >
          <Text className={`text-sm text-[#ffffff] font-["sans-semibold"]`}>
            {item?.action}
          </Text>
        </TouchableOpacity>
      )}

      {item?.action === "Accept" && (
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
              {item?.action}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex items-center justify-center h-12  bg-[#029CFC] rounded-3xl mt-8"
            style={{ backgroundColor: "red", width: "49%" }}
            onPress={acceptRequest}
          >
            <Text className={`text-sm text-[#ffffff] font-["sans-semibold"]`}>
              {item?.action_2}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SeeRequest;
