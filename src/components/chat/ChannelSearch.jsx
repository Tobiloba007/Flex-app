import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../colors";
import { styles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

const itemWidth = Dimensions.get("window").width;

const ChannelSearch = ({ channelSearch }) => {
  const navigation = useNavigation();

  return (
    <View>
      {channelSearch?.map((channel) => (
        <View key={channel?.channel_id} className="flex-row items-center p-1">
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate("MessagingRoom", { channel })}
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
      ))}
    </View>
  );
};

export default ChannelSearch;
