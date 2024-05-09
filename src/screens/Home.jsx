import { Dimensions, SafeAreaView, ScrollView, StatusBar } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeTop from "../components/home/HomeTop";
import FriendsOnline from "../components/home/FriendsOnline";
import HomeFeeds from "../components/home/HomeFeeds";

const itemHeight = Dimensions.get("window").height;
const itemWidth = Dimensions.get("window").width;

export default function Home() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex:1,
        backgroundColor: "white",
        paddingVertical: itemHeight * 0.04,
        paddingHorizontal: itemWidth * 0.035,
      }}
    >
      <HomeTop user={user} />
      <FriendsOnline user={user} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeFeeds />
      </ScrollView>
    </SafeAreaView>
  );
}
