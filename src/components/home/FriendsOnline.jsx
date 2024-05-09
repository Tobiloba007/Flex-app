import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../../config";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import NewConversation from "../bottomSheets/NewConversation";

const itemwidth = Dimensions.get("window").width;
const itemHeight = Dimensions.get("window").height;

export default function FriendsOnline({ user }) {
  const refRBConversationSheet = useRef();

  const [friends, setFriends] = useState([]);

  const navigation = useNavigation();

  const fetchFriends = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/chat/friends.php?user_id=${user?.id}`
      );

      setFriends(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let unsubscribed = true;

    if (unsubscribed) {
      fetchFriends();
    }

    return () => (unsubscribed = false);
  }, [user]);

  return (
    <View style={styles.wrapper}>
      <View className={"flex flex-row items-center justify-between w-full"}>
        <Text className={'text-[13px] font-["sans-semibold"] text-[#565657]'}>
          Friends online
        </Text>
        <Text
          onPress={() => refRBConversationSheet?.current?.open()}
          className={'text-[10px] font-["sans-semibold"] text-[#000000]'}
        >
          Show all
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.imgWrapper}>
          {friends?.length > 0 ? (
            <>
              {friends?.slice(0, 7)?.map((item, index) => {
                return (
                  <Pressable
                    key={index}
                    style={styles.imgCon}
                    onPress={() =>
                      navigation.navigate("MessagingRoom", { item })
                    }
                  >
                    <Image style={styles.img} source={{ uri: item?.avatar }} />
                    <View
                      className={
                        "absolute right-3 top-[2px] h-2 w-2 bg-[#97FC73] rounded-full"
                      }
                    ></View>
                  </Pressable>
                );
              })}
            </>
          ) : (
            <View
              style={{
                width: itemwidth * 0.8,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center" }}>
                You have no friends yet
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <NewConversation user={user} refRBSheet={refRBConversationSheet} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    backgroundColor: "#E6F6FF",
    height: "auto",
    paddingHorizontal: itemwidth * 0.02,
    paddingVertical: itemwidth * 0.015,
    borderRadius: 10,
    marginTop: itemHeight * 0.025,
    gap: itemHeight * 0.01,
  },

  imgWrapper: { flexDirection: "row", alignItems: "center", gap: 10 },

  imgCon: {
    width: itemwidth * 0.12,
    height: itemwidth * 0.12,
    borderRadius: 50,
  },
  img: { width: "100%", height: "100%", borderRadius: 50 },
});
