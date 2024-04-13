import { View, Text, Image, Pressable, Dimensions } from "react-native";
import React from "react";
import { styles } from "../../constants/styles";
import { colors } from "../../../colors";

const itemWidth = Dimensions.get("window").width;

const PaymentMethod = () => {
  return (
    <View style={[styles.column, { gap: 15 }]}>
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

        {/* <View
        style={{
          position: "absolute",
          width: itemWidth * 0.23,
          height: itemWidth * 0.15,
          backgroundColor: "#F3F3F3",
          borderRadius: 100
        }}
      ></View> */}
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
