import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import axios from "axios";
import { BASE_URL2 } from "../../config";
import HomeFeedData from "./HomeFeedData";

const screenWidth = Dimensions.get("window").width;

const HomeFeeds = () => {
  const [feeds, setFeeds] = useState([]);

  const fetchFeeds = async () => {
    try {
      const res = await axios.get(`${BASE_URL2}/post`);

      setFeeds(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    let unsubscribed = true;

    if (unsubscribed) {
      fetchFeeds();
    }

    return () => (unsubscribed = false);
  }, []);

  const reverseFeeds = [...feeds].reverse()

  // console.log(feeds)

  return (
    <SafeAreaView className="flex flex-col items-start justify-start w-full pb-20">
      <Text className={'text-xs text-black font-["sans-semibold"] mt-5'}>
        {feeds.length > 0 ? "Feeds" : "Feeds appears here."}
      </Text>

      <View className="flex flex-col items-start justify-start w-full">
        {reverseFeeds?.map((item) => {
          return <HomeFeedData key={item.post_id} item={item} />;
        })}
      </View>
    </SafeAreaView>
  );
};

export default HomeFeeds;
