import { View, Text, Dimensions, Pressable } from "react-native";
import React from "react";
import { styles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";

const itemWidth = Dimensions.get("window").width;

const WalletOfferBox = () => {
  const navigation = useNavigation();

  return (
    <View style={[styles.box, { borderWidth: 1 }]}>
      <View style={[styles.rowSpace, { width: "100%", gap: 10 }]}>
        <View style={{ gap: 5, alignItems: "flex-start", flex: 0.5 }}>
          <Text
            style={[
              styles.smallTxt,
              {
                color: "gray",
                fontWeight: "500",
                fontSize: itemWidth * 0.028,
              },
            ]}
          >
            Security deposit amount
          </Text>

          <View
            style={{
              width: "100%",
              height: 3,
              backgroundColor: "#ebebeb",
              borderRadius: 10,
            }}
          >
            <View
              style={{
                height: "100%",
                width: "25%",
                backgroundColor: "gray",
                borderRadius: 10,
              }}
            ></View>
          </View>

          <View style={[styles.rowSpace, { width: "100%" }]}>
            <Text
              style={[
                styles.smallTxt,
                {
                  fontWeight: "500",
                  fontSize: itemWidth * 0.02,
                },
              ]}
            >
              Deposited: 0 BTC
            </Text>

            <Text
              style={[
                styles.smallTxt,
                {
                  color: "red",
                  fontWeight: "500",
                  fontSize: itemWidth * 0.02,
                },
              ]}
            >
              Required: 0.1 BTC
            </Text>
          </View>
        </View>

        <View style={{ alignItems: "flex-end", gap: 5, flex: 0.5 }}>
          <View style={[styles.row, { gap: 5 }]}>
            <Pressable
              style={[styles.button, { width: itemWidth * 0.2, height: 35 }]}
              onPress={() => navigation.navigate("payment")}
            >
              <Text style={[styles.buttonTxt, { color: "white" }]}>
                Deposit
              </Text>
            </Pressable>

            <Pressable
              style={[styles.button, { width: itemWidth * 0.2, height: 35 }]}
            >
              <Text style={[styles.buttonTxt, { color: "white" }]}>
                Withdraw
              </Text>
            </Pressable>
          </View>

          <Text
            style={[
              styles.smallTxt,
              {
                color: "gray",
                fontWeight: "500",
                fontSize: itemWidth * 0.02,
              },
            ]}
          >
            Offers that need a security deposit 1 (1)
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WalletOfferBox;
