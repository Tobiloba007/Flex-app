import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { colors } from "../../../colors";
import { styles } from "../../constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL_P2P } from "../../config";
import User from "../../components/User";
import axios from "axios";

const itemWidth = Dimensions.get("window").width;
const itemHeight = Dimensions.get("window").height;

const P2p = () => {
  const { isDark } = useSelector((state) => state.theme);
  const { user, userId, userId2 } = User();

  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);
  const [walletBalance, setWalletBalance] = useState(null);

  const handleVisibilityChange = () => {
    setVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL_P2P}/wallet/balances/${user.id}`,
          {
            headers: { user_id: user.id },
          }
        );

        console.log(response.data);

        setWalletBalance(response.data);
      } catch (error) {
        console.log(error?.response?.data);
      }
    };

    fetchWalletBalance();
  }, [user]);

  // console.log(walletBalance?.details[0]?.token?.symbol);

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
          <View style={{ gap: 16 }}>
            <View style={styles.rowSpace}>
              <Text style={[styles.mediumTxt, { color: colors.primary }]}>
                Hi, {user?.fname}
              </Text>

              <Ionicons name="notifications" size={28} color={colors.primary} />
            </View>

            <View style={styles.rowSpace}>
              <View style={{ gap: 6 }}>
                <Text
                  style={[
                    styles.smallTxt,
                    { textAlign: "left", color: colors.primary },
                  ]}
                >
                  Your balance
                </Text>

                <Text
                  style={[
                    styles.mediumTxt,
                    { color: colors.primary, textAlign: "left" },
                  ]}
                >
                  {visible
                    ? "*****"
                    : walletBalance?.details[0]
                    ? walletBalance?.details[0]?.amount
                    : 0}{" "}
                  {walletBalance?.details[0]?.token?.symbol || "USDC"}
                </Text>
              </View>

              <Ionicons
                name={visible ? "eye-off" : "eye"}
                size={24}
                color={colors.primary}
                onPress={handleVisibilityChange}
              />
            </View>

            <View style={styles.row}>
              <Pressable
                onPress={() => navigation.navigate("findOffer")}
                style={styles.walletBox}
              >
                <MaterialCommunityIcons
                  name="briefcase-download-outline"
                  size={30}
                  color={colors.primary}
                />
                <Text
                  style={[
                    styles.smallTxt,
                    { color: colors.primary, fontWeight: "600" },
                  ]}
                >
                  Add
                </Text>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate("createbuysellad")}
                style={styles.walletBox}
              >
                <MaterialCommunityIcons
                  name="briefcase-download-outline"
                  size={30}
                  color={colors.primary}
                />
                <Text
                  style={[
                    styles.smallTxt,
                    { color: colors.primary, fontWeight: "600" },
                  ]}
                >
                  Offer
                </Text>
              </Pressable>

              <View style={styles.walletBox}>
                <MaterialCommunityIcons
                  name="briefcase-download-outline"
                  size={30}
                  color={colors.primary}
                />
                <Text
                  style={[
                    styles.smallTxt,
                    { color: colors.primary, fontWeight: "600" },
                  ]}
                >
                  Transfer
                </Text>
              </View>
            </View>

            <View style={[styles.row, { width: "100%" }]}>
              <View
                style={[
                  styles.box,
                  {
                    borderWidth: 1,
                    borderColor: "lightgray",
                    width: "48%",
                    borderRadius: 6,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.smallTxt,
                    { textAlign: "left", fontWeight: "600" },
                  ]}
                >
                  HOW FLEX WORKS
                </Text>
                <Text style={[styles.smallTxt, { textAlign: "left" }]}>
                  We connect you to over 400 payment methods so you can add and
                  withdraw funds.
                </Text>
              </View>

              <View
                style={[
                  styles.box,
                  {
                    borderWidth: 1,
                    borderColor: "lightgray",
                    width: "48%",
                    borderRadius: 6,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.smallTxt,
                    { textAlign: "left", fontWeight: "600" },
                  ]}
                >
                  HOW FLEX WORKS
                </Text>
                <Text style={[styles.smallTxt, { textAlign: "left" }]}>
                  We connect you to over 400 payment methods so you can add and
                  withdraw funds.
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.box,
                {
                  borderWidth: 1,
                  borderColor: "lightgray",
                  width: "100%",
                  borderRadius: 6,
                },
              ]}
            >
              <Text style={{ fontWeight: "600" }}>USDC Today</Text>
              <Text
                style={{
                  color: colors.red,
                  fontSize: itemWidth * 0.045,
                  fontWeight: "600",
                }}
              >
                $1.00 USD
              </Text>
              <Text style={{ fontSize: itemWidth * 0.025 }}>Past 24 hours</Text>
            </View>

            <View
              style={[
                styles.row,
                styles.box,
                { backgroundColor: colors.black, width: "100%" },
              ]}
            >
              <Image
                source={require("../../../assets/images/bitcoin.png")}
                style={{ width: "30%" }}
              />

              <View style={{ width: "70%" }}>
                <Text
                  style={{
                    color: colors.white,
                    fontWeight: "600",
                    fontSize: itemWidth * 0.04,
                  }}
                >
                  Get Paid in Flex
                </Text>
                <Text style={{ color: colors.white }}>
                  With our partners, you can make dollars and get paid directly
                  to your Flex account. income opportunities include payment
                  from $1-$200.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default P2p;
