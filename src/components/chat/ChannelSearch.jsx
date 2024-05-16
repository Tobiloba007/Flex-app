import { View } from "react-native";
import React from "react";
import ChannelSearchItem from "./ChannelSearchItem";

const ChannelSearch = ({ channelSearch, user }) => {
  return (
    <View>
      {channelSearch?.map((channel) => (
        <ChannelSearchItem
          channel={channel}
          key={channel?.channel_id}
          user={user}
        />
      ))}
    </View>
  );
};

export default ChannelSearch;
