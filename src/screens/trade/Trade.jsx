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
import { SimpleLineIcons } from "@expo/vector-icons";
import CountdownTimer from "../../components/CountdownTimer";
import { useSelector } from "react-redux";
import { launchImageLibrary } from "react-native-image-picker";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL, BASE_URL_P2P } from "../../config";
import { sendNotification } from "../../constants/utils/SendNotification";
import User from "../../components/User";
import axios from "axios";
import { onValue, ref } from "firebase/database";
import { db } from "../../../firebaseConfig";

const itemWidth = Dimensions.get("window").width;
const itemHeight = Dimensions.get("window").height;

const Trade = ({ route }) => {
  const { id, adId, amount } = route.params;

  const { isDark } = useSelector((state) => state.theme);
  const { user } = User();

  const navigation = useNavigation();

  const [image_url, setImage_url] = useState(null);
  const [image, setImage] = useState(null);
  const [offerUser, setOfferUser] = useState(null);
  const [fcmToken, setFcmToken] = useState("");
  const [complete, setComplete] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const fetchProfile = async () => {
    const formData = new FormData();
    formData.append("name", id);

    try {
      const res = await fetch(`${BASE_URL}/profile.php`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setOfferUser(data?.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let subscribe = true;

    if (subscribe) {
      fetchProfile();
    }

    return () => (subscribe = false);
  }, []);

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      includeBase64: true,
    });

    if (!result?.canceled) {
      setImage_url(result?.assets[0]?.base64);
      setImage(result?.assets[0].uri);
    }
  };

  // get fcm user(seller/offer) so that push notification can be sent to the seller/offer
  useEffect(() => {
    const getFcmUser = async () => {
      try {
        const userRef = ref(db, "users/" + id);

        // const userSnapshot = await get(userRef);

        // Listen for real-time changes to the user's data
        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            setFcmToken(snapshot.val().fcmToken);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    getFcmUser();
  }, [id]);

  // initiate transaction and send a notification indicating that transaction has been initiated.
  useEffect(() => {
    const createTransaction = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL_P2P}/p2p/create`,
          {
            adId: adId,
            buyerId: user.id,
            sellerId: id,
            amount: amount,
            currency: "USDC",
          },
          {
            headers: { user_id: user.id },
          }
        );

        setTransactionId(response.data?.transactionId);
      } catch (error) {
        console.log(error?.response?.data);
      }
    };

    if (user) {
      createTransaction();
    }
  }, [user]);

  // Send notification to the seller
  useEffect(() => {
    const notifySeller = async () => {
      const data = {
        title: "New Trade Notification",
        body: `${user?.lname} ${user?.fname} wants to trade with you`,
        sound: true,
        priority: "high",
        click_action: "OPEN_WALLET",
        data: {
          // screen: "TransactionReciever",
          screen: "tab",
          item: offerUser,
          user,
        },
      };

      await sendNotification(fcmToken, data.title, data.body, data.data);
    };

    if (fcmToken && user) {
      notifySeller();
    }
  }, [fcmToken, user]);

  const completeTransactions = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL_P2P}/p2p/buyer/confirm/${transactionId}`,
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
                { color: colors.white, backgroundColor: colors.primary },
              ]}
            >
              Please do no leave this page till trade is completed.
            </Text>
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
                  flexDirection: "row",
                  alignItems: "center",
                },
              ]}
            >
              <SimpleLineIcons name="clock" size={24} color={colors.primary} />

              <View style={{ width: "92%", alignItems: "flex-start" }}>
                <Text
                  style={[
                    styles.smallTxt,
                    { color: colors.primary, fontSize: itemWidth * 0.03 },
                  ]}
                >
                  Please make a payment of 600 PHP using GCash
                </Text>

                <Text style={{ fontSize: 12 }}>
                  0.00029728 BTC will be added to your Bitcoin wallet
                </Text>
              </View>
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
                Once you’ve made the payment, be sure to click Paid within the
                given time limit. Otherwise the trade will be automatically
                canceled and the Bitcoin will be returned to the seller’s
                wallet.
              </Text>

              <View style={styles.row}>
                <Text style={{ fontSize: 12 }}>
                  Time left <CountdownTimer duration={30 * 60} />
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

              <View style={[styles.rowSpace, { width: "100%" }]}>
                <Pressable
                  style={[styles.button, { width: itemWidth * 0.35 }]}
                  onPress={cancelTransactions}
                >
                  <Text style={[styles.buttonTxt, { color: "white" }]}>
                    Cancel Trade
                  </Text>
                </Pressable>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 6,
                    flex: 0.7,
                  }}
                >
                  <Ionicons
                    name="information-circle-outline"
                    size={20}
                    color="rgba(150, 52, 52, 0.45)"
                  />

                  <Text style={{ fontSize: 12, width: "95%" }}>
                    You haven’t paid yet
                  </Text>
                </View>
              </View>
            </View>

            <Pressable
              // onPress={pickImage}
              onPress={() =>
                navigation.navigate("MessagingRoom", {
                  item: offerUser,
                  user: user,
                })
              }
              style={{
                backgroundColor: colors.white,
                paddingVertical: itemHeight * 0.02,
                borderWidth: 1,
                borderRadius: 8,
                width: "100%",
              }}
            >
              <Text style={styles.smallTxt}>Upload Payment Receipt Here</Text>
            </Pressable>

            <Pressable
              onPress={completeTransactions}
              style={[
                styles.button,
                { alignSelf: "center", marginVertical: itemHeight * 0.03 },
              ]}
            >
              <Text style={[styles.buttonTxt, { color: "white" }]}>
                Complete Trade
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Trade;
