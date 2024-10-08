import {
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import SendMoneyTop from "../../components/sendMoney/SendMoneyTop";
import { styles } from "../../constants/styles";
import Offer from "../../components/sendMoney/Offer";
import axios from "axios";
import { BASE_URL_P2P } from "../../config";
import { useSelector } from "react-redux";
import { colors } from "../../../colors";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import User from "../../components/User";

const itemWidth = Dimensions.get("window").width;
const itemHeight = Dimensions.get("window").height;

const cryptocurrency = [
  // {
  //   id: 1,
  //   img: require("../../../assets/images/btc.png"),
  //   name: "Bitcoin",
  //   backgroundColor: "#F9AA4B",
  // },
  // {
  //   id: 2,
  //   img: require("../../../assets/images/eth.png"),
  //   name: "Eth",
  //   backgroundColor: "#627EEA",
  // },
  {
    id: 3,
    img: require("../../../assets/images/usdc.png"),
    name: "USDC",
    backgroundColor: "#029CFC",
  },
  // {
  //   id: 4,
  //   img: require("../../../assets/images/t.png"),
  //   name: "Tether",
  //   backgroundColor: "#4BF9C5",
  // },
];

const Offers = ({ route }) => {
  const offerType = route?.params?.offerType;
  const amount = route?.params?.amount;

  const { isDark } = useSelector((state) => state.theme);
  const { userId } = User();

  const navigation = useNavigation();

  const [type, setType] = useState(offerType);
  const [offers, setOffers] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [selectedImg, setSelectedImg] = useState({
    img: require("../../../assets/images/usdc.png"),
    bg: "#029CFC",
    name: "USDC",
  });

  const getOffers = async () => {
    try {
      const res = await axios.get(`${BASE_URL_P2P}/ads/type/${type}`, {
        headers: { user_id: userId },
      });

      setOffers(res.data?.data);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    getOffers();
  }, [type]);

  const reverseOffers = [...offers]
    .reverse()
    .filter((item) =>
      amount && amount >= Number(item.max_trade_amount) ? item : item
    );
  // console.log(amount)

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
          style={[styles.container, { padding: 15, gap: 0, width: itemWidth }]}
        >
          <SendMoneyTop />

          <View style={[styles.row, { marginTop: 15, gap: 8 }]}>
            <View
              style={[
                styles.row,
                {
                  backgroundColor: colors.white,
                  elevation: 5,
                  padding: 3,
                  width: "24%",
                  height: itemHeight * 0.06,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 6,
                  gap: 2,
                },
              ]}
            >
              <Pressable
                onPress={() => setType(0)}
                style={{
                  backgroundColor: type === 0 ? colors.primary : "transparent",
                  height: "100%",
                  width: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: type === 0 ? colors.white : "#b1b1b1" }}>
                  Buy
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setType(1);
                  // navigation.navigate("createbuysellad");
                }}
                style={{
                  backgroundColor: type === 1 ? colors.primary : "transparent",
                  height: "100%",
                  width: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: type === 1 ? colors.white : "#b1b1b1" }}>
                  Sell
                </Text>
              </Pressable>
            </View>

            <View
              style={{
                backgroundColor: colors.white,
                height: itemHeight * 0.06,
                width: "74%",
                elevation: 5,
                borderRadius: 6,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                gap: 6,
              }}
            >
              <View
                style={[styles.btcImgCon, { backgroundColor: selectedImg.bg }]}
              >
                <Image
                  source={selectedImg.img}
                  style={{ width: "100%" }}
                  resizeMode="contain"
                />
              </View>

              <Picker
                selectedValue={selectedCurrency}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedCurrency(itemValue);
                  cryptocurrency.find(
                    (i) =>
                      i.name === itemValue &&
                      setSelectedImg({
                        name: i.name,
                        img: i.img,
                        bg: i.backgroundColor,
                      })
                  );
                }}
                style={{ width: "90%" }}
              >
                {cryptocurrency.map((item) => (
                  <Picker.Item
                    label={item.name}
                    value={item.name}
                    key={item.id}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View
            style={{
              backgroundColor: isDark
                ? colors.black
                : "rgba(75, 249, 197, 0.08)",
            }}
          >
            <View
              style={[
                styles.column,
                {
                  width: "100%",
                  marginTop: 10,
                  borderRadius: 20,
                  elevation: 5,
                },
              ]}
            >
              {reverseOffers?.map((item, index) => (
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
