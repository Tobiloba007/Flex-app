import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const FeaturedContent = ({ item }) => {
  return (
    <>
      {item.featuredComment !== null && (
        <View>
          <View className="flex flex-row items-start justify-start w-[75%] mt-2">
            <Image className="w-5 h-5 rounded-full" source={item.featuredImg} />
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              className={
                'text-[10px] text-[#585859] font-["sans-semibold"] ml-2 mt-1'
              }
            >
              {item.featuredComment}
            </Text>
          </View>

          {/*BOTTOM LIKE, COMMENT, SHARE */}
          <View className="flex flex-row items-start justify-start mt-2">
            <TouchableOpacity className={"mr-4"}>
              <AntDesign name="hearto" size={15} color="black" />
            </TouchableOpacity>

            <TouchableOpacity className={"mr-4"}>
              <FontAwesome5 name="comment" size={15} color="black" />
            </TouchableOpacity>

            <TouchableOpacity>
              <Fontisto name="share-a" size={13} color="black" />
            </TouchableOpacity>
          </View>

          {/*FIRST REPLIES AND LIKES */}
          <View className="flex flex-row items-start justify-start mt-1">
            <Text
              className={
                'text-[10px] text-[#959292] font-["sans-semibold"] mr-2'
              }
            >
              {item.featuredReplies} replies - {item.featuredLikes} Likes
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default FeaturedContent;
