import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL2 } from "../../config";
import axios from "axios";

const itemWidth = Dimensions.get("window").width;

const ChannelSearchItem = ({ channel, user }) => {
  const [channelMemberStatus, setChannelmemberStatus] = useState({});

  const navigation = useNavigation();

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
    <View className="flex-row items-center p-1">
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() =>
          navigation.navigate("MessagingRoom", { channel, channelMemberStatus })
        }
        style={[
          styles.row,
          { backgroundColor: "#ebebeb", width: "95%", padding: 6 },
        ]}
      >
        <Image
          source={
            channel?.icon
              ? { uri: channel?.icon }
              : require("../../../assets/images/flexLogo.png")
          }
          style={[
            styles.profileIcon,
            { height: itemWidth * 0.11, width: itemWidth * 0.11 },
          ]}
        />

        <Text style={styles.smallTxt}>{channel?.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChannelSearchItem;
