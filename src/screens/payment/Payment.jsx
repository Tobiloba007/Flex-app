import { View, Text, SafeAreaView, Pressable, Dimensions } from "react-native";
import React from "react";
import { styles } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../../colors";
import WalletTop from "../../components/wallet/WalletTop";

const itemWidth = Dimensions.get("window").width;

const Payment = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WalletTop text={"Payment"} />

      <View
        style={[styles.container, { padding: 15, gap: 15, width: itemWidth }]}
      >
        <View style={[styles.column, { alignItems: "flex-start", gap: 20 }]}>
          <Text style={[styles.smallTxt, { color: colors.primary }]}>
            Payment instructions
          </Text>

          <Text>
            Please read the seller’s instructions below, if you have followed
            them all and paid, click{" "}
            <Text style={{ fontWeight: 600 }}>Paid</Text>. If you have missed a
            step or haven’t paid click{" "}
            <Text style={{ fontWeight: 600 }}>Back</Text> to chat the seller.
          </Text>

          <View
            style={[styles.box, { backgroundColor: "rgba(46, 52, 54, 0.04)" }]}
          >
            <Text>
              {
                "1. Say “Hi” and confirm that you are ready \n2. I will give you the exact back account details. \n3. Have your account ready for transfer and send the  payment instantly."
              }
            </Text>
          </View>

          <View
            style={[
              styles.box,
              {
                backgroundColor: "rgba(254, 248, 248, 1)",
                flexDirection: "row",
                alignItems: "flex-start",
                elevation: 5
              },
            ]}
          >
            <Ionicons
              name="information-circle-outline"
              size={20}
              color="rgba(150, 52, 52, 0.45)"
            />

            <Text style={{ fontSize: 12, width: "95%" }}>
              Clicking Paid without paying the vendor will damage your
              reputation on the platform and get you blocked.
            </Text>
          </View>

          <View
            style={[
              styles.box,
              {
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
                paddingVertical: 10
              },
            ]}
          >
            <Text>Upload Payment Receipt Here</Text>

            <View
              style={{
                backgroundColor: colors.primary,
                borderRadius: 8,
                width: itemWidth * 0.1,
                height: itemWidth * 0.1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="send" size={24} color="white" />
            </View>
          </View>

          <View style={[styles.rowSpace, { width: "100%" }]}>
            <Pressable style={[styles.button, { width: itemWidth * 0.35 }]}>
              <Text style={[styles.buttonTxt, { color: "white" }]}>Back</Text>
            </Pressable>

            <Pressable style={[styles.button, { width: itemWidth * 0.35 }]}>
              <Text style={[styles.buttonTxt, { color: "white" }]}>Paid</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Payment;
