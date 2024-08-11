import { Dimensions, SafeAreaView, ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../../constants/styles";
import SendMoneyTop from "../../components/sendMoney/SendMoneyTop";
import PaymentMethod from "../../components/sendMoney/PaymentMethod";
import TradePricing from "../../components/sendMoney/TradePricing";
import AsyncStorage from "@react-native-async-storage/async-storage";

const itemWidth = Dimensions.get("window").width;

export default function SendMoney() {
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


  return (
    <SafeAreaView style={{ flex: 0.9, backgroundColor: "white", marginTop: 34 }}>
      <ScrollView horizontal={false}>
        <View
          style={[styles.container, { padding: 15, gap: 15, width: itemWidth }]}
        >
          <SendMoneyTop />

          <PaymentMethod />

          <TradePricing user={user} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
