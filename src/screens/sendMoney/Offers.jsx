import {
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import SendMoneyTop from "../../components/sendMoney/SendMoneyTop";
import { styles } from "../../constants/styles";
import Offer from "../../components/sendMoney/Offer";
import axios from "axios";
import { BASE_URL_P2P } from "../../config";
import { useSelector } from "react-redux";
import { colors } from "../../../colors";

const itemWidth = Dimensions.get("window").width;

const Offers = ({ route }) => {
  const { type } = route.params;

  const { isDark } = useSelector((state) => state.theme);

  const [offers, setOffers] = useState([]);

  const getOffers = async () => {
    try {
      const res = await axios.get(`${BASE_URL_P2P}/offers/type/${type}`);

      setOffers(res.data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getOffers();
  }, []);

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
            style={{
              backgroundColor: isDark
                ? colors.black
                : "rgba(75, 249, 197, 0.08)",
              padding: 10,
            }}
          >
            <View style={[styles.column, { gap: 30, width: "100%" }]}>
              {offers?.map((item, index) => (
                <Offer key={index} item={item} type={type} isDark={isDark} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Offers;
