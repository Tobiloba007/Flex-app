import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { styles } from "../../constants/styles";
import { colors } from "../../../colors";
import { useSelector } from "react-redux";
import User from "../../components/User";
import axios from "axios";
import { BASE_URL_P2P } from "../../config";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import WalletTop from "../../components/wallet/WalletTop";
import Octicons from "@expo/vector-icons/Octicons";
import Clipboard from "@react-native-clipboard/clipboard";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Wallet = () => {
  const { isDark } = useSelector((state) => state.theme);
  const { user } = User();
  const fullname = user?.lname + user?.fname;

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
    navigation.navigate('CoinbaseWebView', {
      amount: 10, 
      address: wallet?.wallet?.address, 
      project: project,
      yellowCardUrl: yellowCardUrl,
    });
  };

  const createNewWallet = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL_P2P}/wallet/${user.id}`,
        {},
        {
          headers: { user_id: user.id },
        }
      );

      // console.log(response.data);

      setWalletCreated(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error?.response?.data);
    }
  };

  // console.log(user.id)

  useEffect(() => {
    const fetchWallet = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL_P2P}/wallet/user/${user.id}`,
          {
            headers: { user_id: user.id },
          }
        );

        setWallet(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error?.response?.data);
      }
    };

    fetchWallet();
  }, [walletCreated, user]);

  // fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${BASE_URL_P2P}/p2p/transactions`, {
          headers: { user_id: user.id },
        });

        setTransactions(response.data);
      } catch (error) {
        console.log(error?.response?.data);
      }
    };

    fetchTransactions();
  }, [user]);

  // console.log(transactions);

   // fetch Coinbase Project ID
   useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${BASE_URL_P2P}/wallet/payment/productId`, {
          headers: { user_id: user.id },
        });
        console.log(response.data)
        setProject(response.data);
      } catch (error) {
        console.log(error?.response?.data);
      }
    };

    fetchProject();
  }, [user]);

  //console.log(project);

     // fetch Coinbase Project ID
     useEffect(() => {
      const fetchYellowCardURL = async () => {
        try {
          const response = await axios.get(`${BASE_URL_P2P}/payment/url/${user.id}`, {
            headers: { user_id: user.id },
          });
          setYellowCardUrl(response.data.url);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchYellowCardURL();
     }, [user]);
  
 // console.log(yellowCardUrl);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDark ? colors.black : colors.white }}
    >
      <StatusBar
        backgroundColor={isDark ? colors.black : colors.white}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <ScrollView>
        <WalletTop text={"Wallet"} />
        <View style={style.container}>
          <View style={style.header}>
            <View style={{
              flexDirection: 'row', justifyContent: 'space-between'
            }}>
            <Text
              style={[styles.smallTxt, { textAlign: "left", color: "white" }]}
            >
              My wallet
            </Text>
            <TouchableOpacity onPress={() => navigateToCoinbaseWebView()}>
              <Text style={[styles.smallTxt, { color: "white" }]}>Deposit</Text>
            </TouchableOpacity>

            </View>

            {wallet && (
              <>
                <Text
                  style={[
                    style.balanceText,
                    {
                      backgroundColor: "white",
                      color: colors.primary,
                      padding: 10,
                    },
                  ]}
                >
                  Only send USDC ({project? project.network: ''} network) to this address
                </Text>

                <View style={styles.row}>
                  <Text style={style.balanceText}>
                    {wallet?.wallet?.address}
                  </Text>
                  <Octicons
                    name="copy"
                    size={16}
                    color="white"
                    onPress={() => Clipboard.setString(wallet?.wallet?.address)}
                  />
                </View>
              </>
            )}

            {!wallet && (
              <Pressable
                onPress={createNewWallet}
                style={{
                  backgroundColor: colors.white,
                  padding: 10,
                  borderRadius: 10,
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                {loading ? (
                  <ActivityIndicator color={colors.primary} />
                ) : (
                  <Text>Create a new wallet</Text>
                )}
              </Pressable>
            )}

            {/* <View style={style.actions}>
              <TouchableOpacity style={{ alignItems: "center" }}>
                <View
                  style={{
                    borderWidth: 1,
                    padding: 4,
                    borderColor: "#fff",
                    borderRadius: 50,
                  }}
                >
                  <Ionicons name="arrow-down" size={28} color="#fff" />
                </View>
                <Text style={{ color: "#fff", fontSize: width * 0.035 }}>
                  Receive
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ alignItems: "center" }}>
                <View
                  style={{
                    borderWidth: 1,
                    padding: 4,
                    borderColor: "#fff",
                    borderRadius: 50,
                  }}
                >
                  <Ionicons name="arrow-up" size={24} color="#fff" />
                </View>
                <Text style={{ color: "#fff", fontSize: width * 0.035 }}>
                  Send
                </Text>
              </TouchableOpacity>
            </View> */}
          </View>

          <View style={style.listSection}>
            <Text style={style.listHeader}>Transaction History: </Text>
            {transactions?.transactions?.map((item, index) => (
              <>
                {item.seller_name === fullname && (
                  <TouchableOpacity
                    key={index}
                    style={style.listItem}
                    onPress={() =>
                      navigation.navigate("TransactionReciever", {
                        transactionId: item.id,
                      })
                    }
                  >
                    <Image
                      source={{ uri: "https://via.placeholder.com/50" }}
                      style={styles.avatar}
                    />
                    <View style={style.itemTextContainer}>
                      <Text style={style.itemTitle}>{item.buyer_name}</Text>
                      <Text style={style.itemSubtitle}>USDC {item.amount}</Text>
                    </View>

                    <View>
                      <Text style={style.itemId}>{item.status}</Text>
                      <Text style={style.itemId}>
                        {moment(item.created_at).fromNow()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </>
            ))}
          </View>

          {/* <View style={[styles.row, { gap: 10 }]}>
            <MaterialIcons
              name="access-time-filled"
              size={20}
              color={isDark ? colors.white : colors.primary}
            />

            <Text
              style={[
                styles.smallTxt,
                { color: isDark ? colors.white : colors.primary },
              ]}
            >
              Last Transactions
            </Text>
          </View>

          <View>
            <Transactions isSend={isSend} isDark={isDark} />
            <Transactions isSend={isSend} isDark={isDark} />
            <Transactions isSend={isSend} isDark={isDark} />
            <Transactions isSend={isSend} isDark={isDark} />
            <Transactions isSend={isSend} isDark={isDark} />
            <Transactions isSend={isSend} isDark={isDark} />
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 10,
    height: "auto",
    paddingBottom: height * 0.09,
  },
  header: {
    flexDirection: "column",
    backgroundColor: colors.primary,
    padding: 16,
    height: "auto",
    width: "100%",
    borderRadius: 12,
    justifyContent: "space-between",
    borderCurve: "circular",
    alignSelf: "center",
    gap: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: width * 0.04,
    fontStyle: "normal",
    fontWeight: "700",
    textAlign: "center",
  },
  iconButton: {
    marginLeft: 16,
  },
  icon: {
    color: "#ffffff",
    fontSize: 24,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
    alignContent: "center",
    alignSelf: "center",
  },
  balanceText: {
    color: "#ffffff",
    fontSize: width * 0.03,
    textAlign: "left",
  },
  ethText: {
    color: "#ffffff",
    fontSize: 16,
  },
  listSection: {
    padding: 4,
  },
  listHeader: {
    fontSize: width * 0.05,
    marginBottom: 36,
    marginTop: 20,
    fontWeight: "bold",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderTopColor: "#029CFC",
    borderTopWidth: 0.5,
    padding: 6,
    paddingTop: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: width * 0.036,
    fontWeight: "600",
  },
  itemSubtitle: {
    color: "#888888",
    fontSize: width * 0.03,
  },
  itemId: {
    color: "#888888",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#029CFC",
    alignItems: "center",
    justifyContent: "center",
  },
  fabIcon: {
    color: "#ffffff",
    fontSize: 24,
  },
});

export default Wallet;
