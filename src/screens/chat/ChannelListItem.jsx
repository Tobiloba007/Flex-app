import {
  View,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../../constants/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL2 } from "../../config";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const itemWidth = Dimensions.get("window").width;

const ChannelListItem = ({ channel }) => {
  const [channelMemberStatus, setChannelmemberStatus] = useState({});
  const [user, setUser] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedItems = await AsyncStorage.getItem("user_data");

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

  const checkIsChannelMember = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL2}/channel-request/${user?.id}/${channel?.channel_id}`
      );

      setChannelmemberStatus(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(channel);

  useEffect(() => {
    let unsubscribe = true;

    if (unsubscribe) {
      checkIsChannelMember();
    }

    return () => {
      unsubscribe = false;
    };
  }, [user, channel]);

  return (
    <>
      {channelMemberStatus?.status?.trim() === "accepted" ||
      channel?.owner_id === user?.id ? (
        <View className="flex-row items-center p-1">
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("MessagingRoom", {
                channel,
                channelMemberStatus,
                user,
              })
            }
          >
            <Image
              source={
                channel?.icon
                  ? { uri: channel?.icon }
                  : require("../../../assets/images/flexLogo.png")
              }
              style={[
                styles.profileIcon,
                {
                  height: itemWidth * 0.11,
                  width: itemWidth * 0.11,
                },
              ]}
            />
          </TouchableWithoutFeedback>
        </View>
      ) : null}
    </>
  );
};

export default ChannelListItem;
