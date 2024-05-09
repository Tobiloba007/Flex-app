import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
  SafeAreaView,
  Dimensions,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { BASE_URL } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import { colors } from "../../../colors";
import { styles } from "../../constants/styles";

const itemWidth = Dimensions.get("window").width;

const FriendProfile = ({ route }) => {
  const { item } = route.params;

  // console.log(item)

  const [dropId, setDropId] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [user, setUser] = useState();
  //   console.log(user)

  useEffect(() => {
    const fetchUser = async () => {
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

    fetchUser();
  }, []);

  //   console.log(item);

  const handleReport = (id) => {
    setDropDown(false);
    setReport(true);
  };

  const handleBlock = (id) => {
    setDropDown(false);
    setBlock(true);
  };

  const handleDropdown = (id) => {
    setDropId(id);
    setDropDown(true);
  };

  const sendRequest = async () => {
    const formData = new FormData();
    formData.append("request_from", user?.id);
    formData.append("request_to", item?.id);
    formData.append("flag", "friend_request");
    formData.append("receiver_name", `${item?.fname} ${item?.lname}`);

    try {
      const res = await fetch(
        `${BASE_URL}/api/v1/friend/send_cancel_friend_request.php`,
        { method: "POST", body: formData }
      );

      const data = await res.json();

      Alert.alert(data?.message);
    } catch (error) {}
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        //   className="flex flex-col items-center justify-start w-full  rounded-3xl border-[1px] border-[#cccccc] px-5 py-3"
        style={{ marginBottom: 5, padding: itemWidth * 0.1 }}
      >
        <View className="flex flex-col items-center justify-start w-full mt-6">
          <View className="flex items-center justify-center w-[75px] h-[75px] bg-[#CDEAFC] rounded-full">
            <Image
              className="w-[80%] h-[80%] rounded-full"
              source={{ uri: item?.image }}
              resizeMode="cover"
            />
          </View>
          <Text
            className={`text-sm text-[#000000] font-["sans-semibold"] mt-2`}
          >
            {item?.fname}
          </Text>
          <Text className={`text-xs text-[#000000] font-["sans-regular"]`}>
            ${item?.fname}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => handleDropdown(item?.id)}
          className="absolute top-8 right-5"
        >
          <Entypo name="dots-three-vertical" size={18} color="black" />
        </TouchableOpacity>
        {dropId === item?.id && dropDown && (
          <View className="absolute top-10 right-6 flex flex-col items-center justify-center w-[100px] h-[85px] border-[#cccccc] border-[1px] bg-white rounded-md">
            <Pressable onPress={() => handleReport(item?.id)}>
              <Text
                className={`text-xs text-[#000000] font-["sans-regular"] text-left`}
              >
                Report User
              </Text>
            </Pressable>

            <Pressable onPress={() => handleBlock(item?.id)} className="mt-5">
              <Text
                className={`text-xs text-[#000000] font-["sans-regular"] text-left`}
              >
                Block User
              </Text>
            </Pressable>
          </View>
        )}

        <View className="flex flex-row items-center justify-center w-full mt-5">
          <TouchableOpacity
            className="flex items-center justify-center bg-[#ffffff] w-[35%] h-10 rounded-xl border-[1px] border-[#cccccc]"
            onPress={sendRequest}
          >
            <Text className={`text-xs text-[#029CFC] font-["sans-medium"]`}>
              ADD FRIEND
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex items-center justify-center bg-[#ffffff] w-[35%] h-10 rounded-xl ml-5 border-[1px] border-[#cccccc]">
            <Text className={`text-xs text-[#029CFC] font-["sans-medium"]`}>
              3 FRIENDS
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="flex items-center justify-center h-12 w-full bg-[#029CFC] rounded-3xl mt-8"
          // onPress={cancelRequest}
        >
          <Text className={`text-sm text-[#ffffff] font-["sans-semibold"]`}>
            PAY OR REQUEST
          </Text>
        </TouchableOpacity>

        <View
          style={[
            styles.row,
            { alignSelf: "center", paddingVertical: itemWidth * 0.05 },
          ]}
        >
          <MaterialIcons
            name="phone-callback"
            size={24}
            color={colors.primary}
            onPress={() => Linking.openURL(`tel:${item?.phone}`)}
          />
          <Pressable
            disabled={!item?.facebook}
            onPress={() => Linking.openURL(item?.facebook)}
          >
            <FontAwesome5 name="facebook" size={24} color={colors.primary} />
          </Pressable>

          <Pressable
            disabled={!item?.instagram}
            onPress={() => Linking.openURL(item?.instagram)}
          >
            <FontAwesome6 name="instagram" size={24} color={colors.primary} />
          </Pressable>

          <Pressable
            disabled={!item?.twitter}
            onPress={() => Linking.openURL(item?.twitter)}
          >
            <FontAwesome6 name="x-twitter" size={24} color={colors.primary} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FriendProfile;
