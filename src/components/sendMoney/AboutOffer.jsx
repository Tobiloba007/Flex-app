import { View, Text, Dimensions, SafeAreaView, StatusBar } from "react-native";
import React, { useState } from "react";
import { styles } from "../../constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CountdownTimer from "../CountdownTimer";
import { colors } from "../../../colors";
import { useSelector } from "react-redux";

const itemWidth = Dimensions.get("window").width;

const AboutOffer = ({ offer }) => {
  const { isDark } = useSelector((state) => state.theme);

  return (
    <View
      style={[
        styles.box,
        {
          alignItems: "flex-start",
          borderRadius: 10,
          gap: 10,
          elevation: 5,
          paddingHorizontal: 15,
        },
      ]}
    >
      <View style={[styles.row, { gap: 5 }]}>
        <Text style={{ color: "gray" }}>Seller rate</Text>

        <MaterialCommunityIcons name="star-outline" size={24} color="black" />
      </View>

      <Text style={[styles.mediumTxt, { fontSize: itemWidth * 0.04 }]}>
        34,677.265 USD.{" "}
        <Text
          style={{
            fontSize: itemWidth * 0.028,
            color: "gray",
            fontWeight: "600",
          }}
        >
          8% above market
        </Text>
      </Text>

      <View
        style={{
          backgroundColor: "rgba(2, 156, 252, 0.03)",
          width: "100%",
          alignItems: "flex-start",
          gap: 8,
          paddingVertical: 10,
        }}
      >
        <Text style={{ color: "gray" }}>Buy limits</Text>
        <Text
          style={[
            styles.mediumTxt,
            { fontSize: itemWidth * 0.035, fontWeight: 700 },
          ]}
        >
          Min {offer?.min_trade_amount} {offer?.currency} - Max{" "}
          {offer?.max_trade_amount} {offer?.currency}
        </Text>
      </View>

      <View style={[styles.row, { gap: 90 }]}>
        <View style={{ alignItems: "flex-start" }}>
          <Text style={{ color: "gray" }}>Trade time limit</Text>
          <Text
            style={[
              styles.mediumTxt,
              { fontSize: itemWidth * 0.035, fontWeight: "500" },
            ]}
          >
            <CountdownTimer duration={30 * 60} /> min
          </Text>
        </View>

        <View style={{ alignItems: "flex-start" }}>
          <Text style={{ color: "gray" }}>FlexApp</Text>
          <Text
            style={[
              styles.mediumTxt,
              { fontSize: itemWidth * 0.04, fontWeight: "500" },
            ]}
          >
            0%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AboutOffer;
