import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CryptoList from "../../components/crypto/CryptoList";
import User from "../../components/User";
import axios from "axios";
import { BASE_URL_P2P } from "../../config";
import { useNavigation } from "@react-navigation/native";

const FlexApp = () => {
  const { user } = User();

  const [wallet, setWallet] = useState();
  const [project, setProject] = useState();
  const [yellowCardUrl, setYellowCardUrl] = useState();
  const [walletCreated, setWalletCreated] = useState();
  const [isSend, setIsSend] = useState(true);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [showWebView, setShowWebView] = useState(false);

  const navigation = useNavigation();

  const navigateToCoinbaseWebView = () => {
    navigation.navigate("CoinbaseWebView", {
      amount: 10,
      address: wallet?.wallet?.address,
      project: project,
      yellowCardUrl: yellowCardUrl,
    });
  };

  const navigateToYellowCardWebView = () => {
    navigation.navigate("YellowCardWebView", {
      yellowCardUrl,
    });
  };

  const navigateToWithdrawView = () => {
    navigation.navigate("WithdrawView", {
      location: user.location ? user.location : "Nigeria",
    });
  };

  const createNewWallet = async () => {
    if (!user?.id) return; // Check if user is defined
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL_P2P}/wallet/${user.id}`,
        {},
        {
          headers: { user_id: user.id },
        }
      );

      setWalletCreated(response.data);
    } catch (error) {
      console.error(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchWallet = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL_P2P}/wallet/user/${user.id}`,
          {
            headers: { user_id: user.id },
          }
        );
        setWallet(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, [walletCreated, user]);
  useEffect(() => {
    const fetchProject = async () => {
      if (!user?.id) return;
      try {
        const response = await axios.get(
          `${BASE_URL_P2P}/wallet/payment/productId`,
          {
            headers: { user_id: user.id },
          }
        );
        setProject(response.data);
        setYellowCardUrl(response.data.yellowCardUrl);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
  }, [user]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ height: 50, width: 50 }}
            source={require("../../../assets/p2p/logo.png")}
          />
          <Text style={[styles.logo, { fontSize: 30 }]}>Flex App</Text>
        </View>
        {/* <Text style={styles.sell}>Sell</Text>
        <View style={styles.buyContainer}>
          <Text style={styles.buy}>Buy</Text>
          <Ionicons name="chevron-down" size={24} color="black" />
        </View> */}
        <Ionicons name="menu" size={24} color="black" />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          {!wallet && (
            <TouchableOpacity
              onPress={createNewWallet}
              style={{
                backgroundColor: "#fff",
                padding: 10,
                borderRadius: 10,
                alignItems: "center",
                marginTop: 10,
              }}
            >
              {loading ? (
                <ActivityIndicator color="#0066cc" />
              ) : (
                <Text style={styles.logo}>Click here to get started...</Text>
              )}
            </TouchableOpacity>
          )}
          {wallet && (
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{ height: 50, width: 50 }}
                  source={require("../../../assets/p2p/logo.png")}
                />
                <View style={{ marginLeft: 6 }}>
                  <Text style={styles.cardTitle}>USDC</Text>
                  <Text style={styles.cardSubtitle}>1 USDC = 1.00 USD</Text>
                </View>
              </View>
              <Text style={styles.cardAmount}>100 USD</Text>
              <Text style={styles.cardSubAmount}>100.00 USDC</Text>
              <View style={styles.cardButtons}>
                <View style={styles.cardButtonView}>
                  <TouchableOpacity
                    style={styles.cardButton}
                    onPress={() => navigateToWithdrawView()}
                  >
                    <Ionicons name="send-outline" size={24} color="white" />
                  </TouchableOpacity>
                  <Text style={styles.cardButtonText}>Send</Text>
                </View>
                <View style={styles.cardButtonView}>
                  <TouchableOpacity
                    style={styles.cardButton}
                    onPress={() => navigateToYellowCardWebView()}
                  >
                    <Ionicons name="arrow-down" size={24} color="white" />
                  </TouchableOpacity>
                  <Text style={styles.cardButtonText}>Sell</Text>
                </View>
                <View style={styles.cardButtonView}>
                  <TouchableOpacity
                    style={styles.cardButton}
                    onPress={() => navigateToCoinbaseWebView()}
                  >
                    <Ionicons name="card-outline" size={24} color="white" />
                  </TouchableOpacity>
                  <Text style={styles.cardButtonText}>Buy</Text>
                </View>
                <View style={styles.cardButtonView}>
                  <TouchableOpacity
                    style={[styles.cardButton, { opacity: 0.6 }]}
                    onPress={() => navigation.navigate("MoneyTransfer")}
                  >
                    <Ionicons name="swap-horizontal" size={24} color="white" />
                  </TouchableOpacity>
                  <Text style={styles.cardButtonText}>Swap</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        <ScrollView horizontal={true}>
          <View style={[styles.infoCard, { backgroundColor: "#3F3665" }]}>
            <View style={{ width: "70%", marginLeft: 23 }}>
              <Text style={[styles.infoCardTitle, { color: "#fff" }]}>
                How to swap to local currency
              </Text>
              <Text style={[styles.infoCardSubtitle, { color: "#fff" }]}></Text>
              <Text style={[styles.infoCardText, { color: "#fff" }]}>
                Using our P2P network, you can send money to banks.
              </Text>
              <Text style={[styles.infoCardLink, { color: "#fff" }]}></Text>
            </View>
            <View style={{ width: "auto" }}>
              <Image
                style={{ height: 200, width: 200 }}
                source={require("../../../assets/p2p/swap.png")}
              />
            </View>
          </View>
          <View style={styles.infoCard}>
            <View style={{ width: "70%", marginLeft: 23 }}>
              <Text style={styles.infoCardTitle}>HOW FLEX WORKS</Text>
              <Text style={styles.infoCardSubtitle}>How to Buy</Text>
              <Text style={styles.infoCardText}>
                We provide you with over 100 payment methods to exchange your
                local currency to coins.
              </Text>
              <Text style={styles.infoCardLink}>Learn More</Text>
            </View>
            <View style={{ width: "auto" }}>
              <Image
                style={{ height: 200, width: 200 }}
                source={require("../../../assets/p2p/flex_works.png")}
              />
            </View>
          </View>
          <View style={[styles.infoCard, { backgroundColor: "#029CFC" }]}>
            <View style={{ width: "70%", marginLeft: 23 }}>
              <Text style={[styles.infoCardTitle, { color: "#fff" }]}>
                ADD FUNDS
              </Text>
              <Text style={[styles.infoCardSubtitle, { color: "#fff" }]}>
                How to Sell
              </Text>
              <Text style={[styles.infoCardText, { color: "#fff" }]}>
                We connect you with other buyers to swap your coins to local
                currency
              </Text>
            </View>
            <View style={{ width: "auto" }}>
              <Image
                style={{ height: 200, width: 200 }}
                source={require("../../../assets/p2p/add_funds.png")}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.paidCard}>
          <View style={{ width: "70%", marginLeft: 23 }}>
            <Text style={styles.paidCardTitle}>Get paid in FlexApp</Text>
            <Text style={styles.paidCardText}>
              FlexApp is a web3-powered remittance product that allow
              individuals and businesses to send, receive, and save via
              stablecoin peer to peer. We are enabling real-time cross-border
              payments with multiple exchange rates.
            </Text>
          </View>
          <View style={{ width: "auto" }}>
            <Image
              style={{ height: 200, width: 200 }}
              source={require("../../../assets/p2p/get_paid.png")}
            />
          </View>
        </View>

        <View style={styles.marketSection}>
          <Text style={styles.logo}>Market:</Text>
          <CryptoList />
        </View>
      </ScrollView>

      <View style={styles.tabBar}>{/* Tab bar icons would go here */}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0066cc",
    fontFamily: "serif",
  },
  sell: {
    fontSize: 16,
  },
  buyContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buy: {
    fontSize: 16,
    marginRight: 5,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: "#C5E5FA",
    borderRadius: 10,
    padding: 20,
    margin: 15,
  },
  cardTitle: {
    color: "#000",
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  cardSubtitle: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  cardAmount: {
    color: "#000",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 10,
    fontFamily: "serif",
  },
  cardSubAmount: {
    color: "#817F7F",
    fontSize: 14,
    fontFamily: "Open Sans",
    lineHeight: 20,
  },
  cardButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cardButton: {
    alignItems: "center",
    backgroundColor: "#029CFC",
    padding: 20,
    paddingLeft: 23,
    paddingRight: 23,
    borderRadius: 23,
  },
  cardButtonText: {
    color: "#000",
    marginTop: 5,
    fontSize: 17,
    fontWeight: "500",
    fontFamily: "serif",
    lineHeight: 19.6,
    letterSpacing: 2,
  },
  cardButtonView: {
    alignItems: "center",
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    margin: 15,
    marginLeft: 6,
    marginRight: 6,
    width: Dimensions.get("window").width * 0.9,
    height: 180,
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  infoCardTitle: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 25,
    fontFamily: "serif",
  },
  infoCardSubtitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  infoCardText: {
    marginBottom: 10,
    fontSize: 20,
    fontFamily: "sans-serif",
  },
  infoCardLink: {
    color: "#0066cc",
  },
  paidCard: {
    backgroundColor: "#3F3665",
    borderRadius: 20,
    padding: 20,
    margin: 15,
    height: 180,
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  paidCardTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 23,
    marginBottom: 10,
    fontFamily: "serif",
  },
  paidCardText: {
    color: "white",
    fontSize: 18,
    fontFamily: "sans-serif",
  },
  marketSection: {
    margin: 15,
  },
  marketTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
});

export default FlexApp;
