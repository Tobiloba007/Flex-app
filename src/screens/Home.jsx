import { Dimensions, Pressable, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeTop from "../components/home/HomeTop";
import FriendsOnline from "../components/home/FriendsOnline";
import HomeFeeds from "../components/home/HomeFeeds";
import { ref, set, get, update } from "firebase/database";
import { db } from "../../firebaseConfig";
import { colors } from "../../colors";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const itemHeight = Dimensions.get("window").height;
const itemWidth = Dimensions.get("window").width;

const item = {
  avatar:
    "https://gotflexapp.com/swift/uploads/profile/7e68f312588801b188f3dc3d38955d145521acd989572cfcec08b57e1d6e57b2._.6394ea037d498.jpeg",
  fname: "FlexApp",
  id: 268,
  lname: "FlexApp",
};

export default function Home() {
  const [user, setUser] = useState(null);
  const [fcmToken, setFcmToken] = useState("");

  const navigation = useNavigation();

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

  useState(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("fcmToken");

      setFcmToken(token);
    };

    getToken();
  }, []);

  const createFcmUser = async () => {
    if (user) {
      const lastSeen = Date.now();

      try {
        const userRef = ref(db, "users/" + user?.id);
        const userSnapshot = await get(userRef);

        if (userSnapshot.exists()) {
          update(ref(db, "users/" + user?.id), {
            username: user?.fname,
            email: user?.email,
            lastSeen,
            fcmToken,
          });
        } else {
          set(ref(db, "users/" + user?.id), {
            username: user?.fname,
            email: user?.email,
            lastSeen,
            fcmToken,
            unreadMessages: 0,
            messages: [],
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      createFcmUser();
    }
  }, [user]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingVertical: itemHeight * 0.04,
        paddingHorizontal: itemWidth * 0.035,
      }}
    >
      <Pressable
        onPress={() =>
          navigation.navigate("MessagingRoom", {
            item,
            user,
          })
        }
        style={{
          width: 50,
          height: 50,
          borderRadius: 100,
          backgroundColor: colors.primary,
          position: "absolute",
          bottom: 100,
          right: 50,
          zIndex: 999,
          elevation: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AntDesign name="customerservice" size={30} color="white" />
      </Pressable>

      <HomeTop user={user} />
      <FriendsOnline user={user} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeFeeds />
      </ScrollView>
    </SafeAreaView>
  );
}
