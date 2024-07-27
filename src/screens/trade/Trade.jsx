import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Pressable,
  StatusBar,
} from "react-native";
import React from "react";
import WalletTop from "../../components/wallet/WalletTop";
import { styles } from "../../constants/styles";
import { colors } from "../../../colors";
import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import CountdownTimer from "../../components/CountdownTimer";
import { useSelector } from "react-redux";

const itemWidth = Dimensions.get("window").width;

const Trade = () => {
  const { isDark } = useSelector((state) => state.theme);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDark ? colors.black : colors.white }}
    >
      <StatusBar
        backgroundColor={isDark ? colors.black : colors.white}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <WalletTop text={"Trade"} isDark={isDark} />

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
              Keep all conversations within the trade chat. Moderators won't be
              able to assist you if something goes wrong outside of FlexApp.
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
              canceled and the Bitcoin will be returned to the seller’s wallet.
            </Text>

            <Pressable style={styles.button}>
              <Text style={[styles.buttonTxt, { color: "white" }]}>Paid</Text>
            </Pressable>

            <Text style={{ fontSize: 12 }}>
              Time left <CountdownTimer duration={30 * 60} />{" "}
            </Text>
          </View>

          <View
            style={[
              styles.box,
              { backgroundColor: "rgba(254, 248, 248, 1)", gap: 30 },
            ]}
          >
            <View
              style={{ flexDirection: "row", alignItems: "flex-start", gap: 6 }}
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
                all trade conversations within FlexApp. If you choose to proceed
                outside FlexApp, note that we cannot help or support you if you
                are scammed during such trades.
              </Text>
            </View>

            <View style={[styles.rowSpace, { width: "100%" }]}>
              <Pressable style={[styles.button, { width: itemWidth * 0.35 }]}>
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Trade;
