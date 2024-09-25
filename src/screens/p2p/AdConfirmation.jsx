import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../colors";
import { useSelector } from "react-redux";
import { styles } from "../../constants/styles";
import WalletTop from "../../components/wallet/WalletTop";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL_P2P } from "../../config";
import axios from "axios";
import User from "../../components/User";

const itemWidth = Dimensions.get("window").width;
const itemHeight = Dimensions.get("window").height;

const AdConfirmation = ({ route }) => {
  const { inputs } = route.params;
  const { user } = User();

  console.log(inputs)

  const { isDark } = useSelector((state) => state.theme);

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const handleCreateAd = async () => {
    if (
      !inputs.currency ||
      !inputs.min_trade_amount ||
      !inputs.max_trade_amount ||
      !inputs.terms_and_conditions ||
      !inputs.exchange_rate ||
      !inputs.exchange_currency
    ) {
      return Alert.alert("All inputs are required");
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${BASE_URL_P2P}/ads/create`,
        {
          ...inputs,
        },
        {
          headers: { user_id: user.id },
        }
      );

      // Alert.alert(res.data?.message);
      res.data?.message && navigation.navigate("successTransaction");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error?.response?.data?.message);
      Alert.alert(error?.response?.data?.message || error?.response?.data);
      // Alert.alert(error?.response?.data)
    }
  };

  // console.log(inputs);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDark ? colors.black : colors.white }}
    >
      <StatusBar
        backgroundColor={isDark ? colors.black : colors.white}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <WalletTop text={"Trade"} isDark={isDark} />

      <ScrollView>
        <View
          style={[
            styles.container,
            { padding: 15, gap: 20, width: itemWidth, height: itemHeight },
          ]}
        >
          <View style={styles.rowSpace}>
            <Text style={[styles.mediumTxt, { color: colors.primary }]}>
              My Offer
            </Text>

            <View style={styles.row}>
              <Text style={{ color: colors.primary }}>Turn Off all offers</Text>
              <Ionicons name="toggle" size={30} color={colors.primary} />
            </View>

            <Text>Security deposit</Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text>Security deposit</Text>
            <View
              style={[
                styles.box,
                { borderWidth: 1, borderColor: "lightgray", gap: 10 },
              ]}
            >
              <Text>Security deposit amount</Text>

              <View
                style={{
                  width: "100%",
                  height: 4,
                  backgroundColor: "lightgray",
                  borderRadius: 20,
                }}
              >
                <View
                  style={{
                    height: "100%",
                    width: "10%",
                    backgroundColor: "gray",
                    borderRadius: 20,
                  }}
                ></View>
              </View>

              <View style={styles.rowSpace}>
                <Text style={{ fontSize: itemWidth * 0.028 }}>
                  Deposited: 0 USDC
                </Text>
                <Text
                  style={{ fontSize: itemWidth * 0.028, color: colors.red }}
                >
                  Required: 1 USDC
                </Text>
              </View>

              <Text style={styles.smallTxt}>
                Offers that need a security deposit 1 (1)
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.box,
              styles.rowSpace,
              { borderWidth: 1, borderColor: colors.black },
            ]}
          >
            <View style={{ gap: 12 }}>
              <Text>Type</Text>
              <Text>Rate per USDC</Text>
              <Text>Min - Max Amount</Text>
              <Text>Payment Method</Text>
              <Text>Speed</Text>
            </View>

            <View style={{ gap: 12 }}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={{
                  backgroundColor: colors.primary,
                  padding: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 4,
                }}
              >
                <Text style={styles.buttonTxt}>Edit</Text>
              </Pressable>
              <Text>8621.93 USD +5.00%</Text>
              <Text>
                {inputs.min_trade_amount} - {inputs.max_trade_amount}
              </Text>
              <Text>
                {inputs.payment_method_id === 1
                  ? "Bank Transfer"
                  : inputs.payment_method_id === 2
                  ? "Wire Transfer"
                  : inputs.payment_method_id === 3
                  ? "Online Wallet"
                  : null}
              </Text>
              <Text
                style={{
                  backgroundColor: colors.black,
                  padding: 8,
                  borderRadius: 6,
                  color: colors.white,
                  width: "50%",
                  textAlign: "center",
                }}
              >
                New
              </Text>
            </View>
          </View>

          <View style={styles.rowSpace}>
            <Text
              style={{
                fontSize: itemWidth * 0.022,
                backgroundColor: "lightgray",
                padding: 10,
              }}
            >
              Security deposit: 0USDC/ 0.1 BTC
            </Text>
            <Text
              style={{
                fontSize: itemWidth * 0.022,
                backgroundColor: "lightgray",
                padding: 10,
              }}
            >
              Deposit: 0.1 USDC to active this offer.
            </Text>
          </View>

          <Pressable
            onPress={handleCreateAd}
            style={[styles.button, { alignSelf: "center", zIndex: 9 }]}
          >
            {loading ? (
              <ActivityIndicator size="large" color={colors.white} />
            ) : (
              <Text style={styles.buttonTxt}>Create new offer</Text>
            )}
          </Pressable>

          <Image
            source={require("../../../assets/images/coins.png")}
            style={{ position: "absolute", bottom: -30, right: 0 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdConfirmation;
