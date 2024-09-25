import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Pressable,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import WalletTop from "../../components/wallet/WalletTop";
import { styles } from "../../constants/styles";
import { colors } from "../../../colors";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL, BASE_URL_P2P } from "../../config";
import User from "../../components/User";
import axios from "axios";

const itemWidth = Dimensions.get("window").width;
const itemHeight = Dimensions.get("window").height;

const TransactionReciever = ({ route }) => {
  const { transactionId } = route.params;

  const { isDark } = useSelector((state) => state.theme);
  const { user } = User();

  const navigation = useNavigation();

  const [image_url, setImage_url] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const [offerUser, setOfferUser] = useState(null);
  const [accept, setAccept] = useState(false);
  const [complete, setComplete] = useState(false);

  //   fetch transaction
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL_P2P}/p2p/transaction/${transactionId}`,
          {
            headers: { user_id: user.id },
          }
        );

        setTransaction(response.data);
      } catch (error) {
        console.log(error?.response?.data);
      }
    };

    fetchTransactions();
  }, [accept, complete]);

  //   get other user profile
  const fetchProfile = async () => {
    if (transaction?.transaction) {
      const formData = new FormData();
      formData.append(
        "name",
        transaction?.transaction?.buyer_id === user.id
          ? transaction?.transaction?.seller_id
          : transaction?.transaction?.buyer_id
      );

      try {
        const res = await fetch(`${BASE_URL}/profile.php`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        // console.log(data)

        setOfferUser(data?.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    let subscribe = true;

    if (subscribe) {
      fetchProfile();
    }

    return () => (subscribe = false);
  }, [transaction?.transaction]);

  const acceptTransaction = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL_P2P}/p2p/accept/${transactionId}`,
        {},
        {
          headers: { user_id: user.id },
        }
      );

      response && setAccept((prev) => !prev);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  //   console.log(transactionId);

  const completeTransactions = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL_P2P}/p2p/seller/confirm/${transactionId}`,
        {},
        {
          headers: { user_id: user.id },
        }
      );

      response.data && navigation.navigate("successTransaction");

      setComplete((prev) => !prev);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const cancelTransactions = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL_P2P}/p2p/cancel/${transactionId}`,
        {},
        {
          headers: { user_id: user.id },
        }
      );

      response.data && navigation.goBack();
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

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
          style={[styles.container, { padding: 15, gap: 15, width: itemWidth }]}
        >
          <View style={[styles.column, { alignItems: "flex-start", gap: 10 }]}>
            <Text
              style={[
                styles.smallTxt,
                { color: isDark ? colors.white : colors.primary },
              ]}
            >
              Trade Started
            </Text>

            <View
              style={[
                styles.box,
                {
                  backgroundColor: "rgba(254, 248, 248, 1)",
                  flexDirection: "row",
                  alignItems: "flex-start",
                },
              ]}
            >
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="rgba(150, 52, 52, 0.45)"
              />

              <Text style={{ fontSize: 12, width: "95%" }}>
                Keep all conversations within the trade chat. Moderators won't
                be able to assist you if something goes wrong
                outside of FlexApp.
              </Text>
            </View>

            <View
              style={[
                styles.box,
                {
                  alignItems: "center",
                  gap: 30,
                  elevation: 5,
                  backgroundColor: "white",
                },
              ]}
            >
              <Text style={{ fontSize: 12 }}>
                Once you’ve received the payment, be sure to confirm payment
                within the given time limit. Otherwise the trade will be
                automatically canceled.
              </Text>

              <View style={styles.row}>
                <Text style={{ fontSize: 12 }}>
                  {/* Time left <CountdownTimer duration={30 * 60} /> */}
                </Text>

                <Pressable
                  style={[styles.row, { gap: 5 }]}
                  onPress={() =>
                    navigation.navigate("MessagingRoom", {
                      item: offerUser,
                      user: user,
                    })
                  }
                >
                  <Ionicons
                    name="chatbubble-ellipses-sharp"
                    size={22}
                    color={colors.primary}
                  />
                  <Text style={styles.smallTxt}>Chat</Text>
                </Pressable>
              </View>
            </View>

            <View
              style={[
                styles.box,
                { backgroundColor: "rgba(254, 248, 248, 1)", gap: 30 },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 6,
                }}
              >
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color="rgba(150, 52, 52, 0.45)"
                />

                <Text style={{ fontSize: 12, width: "95%" }}>
                  Keep trades within FlexApp. Some users may ask you to trade
                  outside the FlexApp platform. This is against our Terms of
                  Service and likely a scam attempt. You must insist on keeping
                  all trade conversations within FlexApp. If you choose to
                  proceed outside FlexApp, note that we cannot help or support
                  you if you are scammed during such trades.
                </Text>
              </View>
              {transaction?.transaction?.status === "pending" && (
                <Text>Accept trade to continue</Text>
              )}

              <View style={[styles.rowSpace, { width: "100%" }]}>
                {transaction?.transaction?.status === "pending" && (
                  <Pressable
                    style={[styles.button, { width: itemWidth * 0.35 }]}
                    onPress={cancelTransactions}
                  >
                    <Text style={[styles.buttonTxt, { color: "white" }]}>
                      Cancel Trade
                    </Text>
                  </Pressable>
                )}

                {transaction?.transaction?.status === "pending" && (
                  <Pressable
                    style={[styles.button, { width: itemWidth * 0.4 }]}
                    onPress={acceptTransaction}
                  >
                    <Text style={[styles.buttonTxt, { color: "white" }]}>
                      Accept Trade
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>

            {transaction?.transaction?.status !== "pending" && (
              <Pressable
                onPress={completeTransactions}
                style={[
                  styles.button,
                  { alignSelf: "center", marginVertical: itemHeight * 0.03 },
                ]}
              >
                <Text style={[styles.buttonTxt, { color: "white" }]}>
                  Complete Transaction
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionReciever;
