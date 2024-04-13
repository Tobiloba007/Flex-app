import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../../constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../../colors";
import WalletTop from "../../components/wallet/WalletTop";
import Transactions from "../../components/wallet/Transactions";
import { useNavigation } from "@react-navigation/native";

const itemWidth = Dimensions.get("window").width;

const Wallet = () => {
  const [isSend, setIsSend] = useState(true);

  const navigation = useNavigation();

  const handleIsSend = (value) => {
    setIsSend(value);
  };

  return (
    <SafeAreaView style={{ flex: 0.92 }}>
      <WalletTop text={"Wallet"} />

      <ScrollView>
        <View
          style={[styles.container, { padding: 15, gap: 15, width: itemWidth }]}
        >
          <View style={[styles.column, { alignItems: "flex-start", gap: 15 }]}>
            <View style={[styles.row, { gap: 10 }]}>
              <MaterialCommunityIcons
                name="wallet"
                size={24}
                color={colors.primary}
              />

              <Text
                style={[styles.smallTxt, { color: colors.primary }]}
                onPress={() => navigation.navigate("walletOffer")}
              >
                Your wallet
              </Text>
            </View>

            <View
              style={[
                styles.box,
                { backgroundColor: colors.primary, borderRadius: 10 },
              ]}
            >
              <View style={styles.rowSpace}>
                <View style={{ alignItems: "flex-start", gap: 5 }}>
                  <Text
                    style={[
                      styles.smallTxt,
                      {
                        fontWeight: "400",
                        color: "white",
                        fontSize: itemWidth * 0.03,
                      },
                    ]}
                  >
                    TOTAL BALANCE
                  </Text>
                  <Text style={[styles.smallTxt, { color: "white" }]}>
                    36.896.87 USD
                  </Text>
                </View>

                <MaterialIcons name="visibility-off" size={24} color="white" />
              </View>
            </View>

            <View style={[styles.rowSpace, { width: "100%" }]}>
              <Pressable
                style={[
                  styles.row,
                  {
                    borderWidth: 1,
                    width: itemWidth * 0.35,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    height: itemWidth * 0.15,
                    backgroundColor: "white",
                    borderColor: "lightgray",
                  },
                ]}
                onPress={() => handleIsSend(true)}
              >
                <Text
                  style={[
                    styles.smallTxt,
                    { color: isSend ? colors.primary : "gray" },
                  ]}
                >
                  Send
                </Text>
                <MaterialCommunityIcons
                  name="arrow-top-right-thin"
                  size={24}
                  color={isSend ? "red" : "gray"}
                />
              </Pressable>

              <Pressable
                style={[
                  styles.row,
                  {
                    borderWidth: 1,
                    width: itemWidth * 0.35,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    height: itemWidth * 0.15,
                    backgroundColor: "white",
                    borderColor: "lightgray",
                  },
                ]}
                onPress={() => handleIsSend(false)}
              >
                <Text
                  style={[
                    styles.smallTxt,
                    { color: !isSend ? colors.primary : "gray" },
                  ]}
                >
                  Recieve
                </Text>

                <MaterialCommunityIcons
                  name="arrow-bottom-right-thin"
                  size={24}
                  color={!isSend ? colors.primary : "gray"}
                  style={{ transform: [{ rotate: "90deg" }] }}
                />
              </Pressable>
            </View>

            <View style={[styles.row, { gap: 10 }]}>
              <MaterialIcons
                name="access-time-filled"
                size={20}
                color={colors.primary}
              />

              <Text style={[styles.smallTxt, { color: colors.primary }]}>
                Last Transactions
              </Text>
            </View>

            <View>
              <Transactions isSend={isSend} />
              <Transactions isSend={isSend} />
              <Transactions isSend={isSend} />
              <Transactions isSend={isSend} />
              <Transactions isSend={isSend} />
              <Transactions isSend={isSend} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wallet;
