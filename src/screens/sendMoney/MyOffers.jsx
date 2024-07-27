import { View, SafeAreaView, Dimensions, ScrollView, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import SendMoneyTop from "../../components/sendMoney/SendMoneyTop";
import { styles } from "../../constants/styles";
import Offer from "../../components/sendMoney/Offer";
import axios from "axios";
import { BASE_URL_P2P } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyOffer from "../../components/sendMoney/MyOffer";
import { useSelector } from "react-redux";
import { colors } from "../../../colors";

const itemWidth = Dimensions.get("window").width;

const MyOffers = () => {
  const { isDark } = useSelector((state) => state.theme);

  const [offers, setOffers] = useState([]);
  const [user, setUser] = useState();

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

  const getOffers = async () => {
    try {
      const res = await axios.get(`${BASE_URL_P2P}/offers/user/${user?.id}`);

      setOffers(res.data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getOffers();
  }, [user]);

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
          <SendMoneyTop />

          <View
            style={{ backgroundColor: "rgba(75, 249, 197, 0.08)", padding: 10 }}
          >
            <View style={[styles.column, { gap: 30, width: "100%" }]}>
              {offers?.map((item, index) => (
                <MyOffer key={index} item={item} isDark={isDark} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyOffers;
