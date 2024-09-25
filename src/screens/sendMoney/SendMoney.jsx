import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../../constants/styles";
import SendMoneyTop from "../../components/sendMoney/SendMoneyTop";
import PaymentMethod from "../../components/sendMoney/PaymentMethod";
import TradePricing from "../../components/sendMoney/TradePricing";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from "../../../firebaseConfig";
import { onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";
import { colors } from "../../../colors";

const itemWidth = Dimensions.get("window").width;

export default function SendMoney() {
  const { isDark } = useSelector((state) => state.theme);

  const [user, setUser] = useState();
  const [users, setUsers] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

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

  const getFcmUsers = async () => {
    try {
      const userRef = ref(db, "users/");

      // Listen for real-time changes to the user's data
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const res = Object.values(snapshot.val());

          setUsers(res);

          return;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFcmUsers();
  }, []);

  // let onlineUsers = [];

  const calOnlineUsers = () => {
    const ONLINE_THRESHOLD_MINUTES = 5; // Define online threshold in minutes
    const currentTime = Date.now();

    users?.forEach((user) => {
      if (user.lastSeen) {
        const diffMs = currentTime - user.lastSeen;
        const diffMinutes = Math.floor(diffMs / 1000 / 60);

        if (diffMinutes <= ONLINE_THRESHOLD_MINUTES) {
          // onlineUsers.push(user);
          setOnlineUsers((prev) => [...prev, user]);
        }
      }
    });
  };

  useEffect(() => {
    if (users) {
      calOnlineUsers();
    }
  }, [users]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDark ? colors.black : colors.white }}
    >
      <StatusBar
        backgroundColor={isDark ? colors.black : colors.white}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <ScrollView>
        <View
          style={[styles.container, { padding: 15, gap: 15, width: itemWidth }]}
        >
          <SendMoneyTop isDark={isDark} />

          <PaymentMethod onlineUsers={onlineUsers} isDark={isDark} />

          <TradePricing user={user} isDark={isDark} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
