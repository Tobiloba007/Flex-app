import { View, Text, Image, Pressable, Dimensions } from "react-native";
import React from "react";
import { styles } from "../../constants/styles";
import { colors } from "../../../colors";

const itemWidth = Dimensions.get("window").width;

const PaymentMethod = ({ onlineUsers }) => {
  return (
    <View style={[styles.column, { gap: 15, alignItems: "flex-start" }]}>
      <View
        style={{
          gap: 6,
          backgroundColor: "white",
          elevation: 5,
          width: "100%",
          padding: 10,
          borderRadius: 8,
          alignItems: "flex-start",
        }}
      >
        <Text style={[styles.mediumTxt, { color: colors.primary }]}>
          Explore P2P Marketplace
        </Text>
        <Text style={[styles.smallTxt, { textAlign: "left" }]}>
          Online users:{" "}
          <Text style={{ color: colors.primary }}>
            {onlineUsers?.length > 0 ? onlineUsers?.length : 0}
          </Text>
        </Text>
        <Text style={[styles.smallTxt, { textAlign: "left" }]}>
          Active offers: <Text style={{ color: colors.primary }}>56481</Text>
        </Text>
        <Text style={[styles.smallTxt, { textAlign: "left" }]}>
          Trade 24h vol:{" "}
          <Text style={{ color: colors.primary }}>3,422,229 USD</Text>
        </Text>
        <Text style={[styles.smallTxt, { textAlign: "left" }]}>
          Total liquidity:{" "}
          <Text style={{ color: colors.primary }}>673,744,827 USD</Text>
        </Text>
        <Text style={[styles.smallTxt, { textAlign: "left" }]}>
          BTC price:{" "}
          <Text style={{ color: colors.primary }}>69,963.03 USD</Text>
        </Text>
      </View>

      <View style={[styles.row]}>
        <Text style={styles.btcOfferTxt}>
          Edit Offer to Sell{" "}
          <Text style={{ color: colors.primary, fontSize: itemWidth * 0.09 }}>
            Bitcoin
          </Text>
        </Text>

        <Image
          source={require("../../../assets/images/boost.png")}
          style={{ width: itemWidth * 0.3 }}
        />
      </View>

      <Text style={[styles.smallTxt, { alignSelf: "flex-start" }]}>
        Choose your cryptocurrency
      </Text>

      <View style={styles.row}>
        <Pressable style={styles.btcButton}>
          <View style={styles.btcImgCon}>
            <Image
              source={require("../../../assets/images/btc.png")}
              style={{ width: "100%" }}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.smallTxt}>Bitcoin</Text>
        </Pressable>

        <Pressable style={styles.btcButton}>
          <View style={[styles.btcImgCon, { backgroundColor: "#627EEA" }]}>
            <Image
              source={require("../../../assets/images/eth.png")}
              style={{ width: "100%" }}
              resizeMode="cover"
            />
          </View>

          <Text style={styles.smallTxt}>Eth</Text>
        </Pressable>

        <Pressable style={styles.btcButton}>
          <View style={[styles.btcImgCon, { backgroundColor: "#029CFC" }]}>
            <Image
              source={require("../../../assets/images/usdc.png")}
              style={{ width: "100%" }}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.smallTxt}>USDC</Text>
        </Pressable>

        <Pressable style={styles.btcButton}>
          <View style={[styles.btcImgCon, { backgroundColor: "#4BF9C5" }]}>
            <Image
              source={require("../../../assets/images/t.png")}
              style={{ width: "100%" }}
              resizeMode="cover"
            />
          </View>

          <Text style={styles.smallTxt}>Tether</Text>
        </Pressable>
      </View>

      <Text style={[styles.smallTxt, { alignSelf: "flex-start" }]}>
        Payment method
      </Text>
    </View>
  );
};

export default PaymentMethod;
