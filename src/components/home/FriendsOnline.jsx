import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import image1 from "../../../assets/images/dp.jpg";
import image2 from "../../../assets/images/dp2.jpg";
import image3 from "../../../assets/images/dp3.jpg";
import image4 from "../../../assets/images/dp4.jpg";
import image5 from "../../../assets/images/dp5.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../config";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const itemwidth = Dimensions.get("window").width;

export default function FriendsOnline() {
  //   const friends = [image1, image2, image3, image4, image5, image1];

  const [user, setUser] = useState();
  const [friends, setFriends] = useState([]);

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

  useEffect(() => {
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

    fetchFriends();
  }, [user]);

  return (
    <View
      style={styles.wrapper}
      className={
        "flex flex-col items-start justify-start w-full overflow-hidden h-[110px] p-3 rounded-2xl bg-[#E6F6FF] mt-3"
      }
    >
      <View className={"flex flex-row items-center justify-between w-full"}>
        <Text className={'text-[13px] font-["sans-semibold"] text-[#565657]'}>
          Friends online
        </Text>
        <Text className={'text-[10px] font-["sans-semibold"] text-[#000000]'}>
          Show all
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          className={
            "flex flex-row items-center justify-start overflow-hidden w-full mt-1"
          }
        >
          {friends?.length > 0 ? (
            <>
              {friends.map((item, index) => {
                return (
                  <Pressable
                    key={index}
                    className={"h-[60px] w-14 mr-2"}
                    onPress={() =>
                      navigation.navigate("MessagingRoom", { item })
                    }
                  >
                    <Image
                      className={"h-[50px] w-[50px] rounded-full"}
                      source={{ uri: item?.avatar }}
                    />
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
  },
});
