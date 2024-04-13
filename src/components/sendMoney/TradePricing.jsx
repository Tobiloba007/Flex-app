import {
  View,
  Text,
  Dimensions,
  TextInput,
  Alert,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../../constants/styles";
import { colors } from "../../../colors";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { BASE_URL_P2P } from "../../config";

const itemWidth = Dimensions.get("window").width;

const TradePricing = ({ user }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("BTC");
  const [selectedPayment, setSelectedPayment] = useState(1);
  const [minTrade, setMinTrade] = useState(0);
  const [maxTrade, setMaxTrade] = useState(0);

  const createOffer = async () => {
    const data = {
      user_id: user.id,
      payment_method_id: selectedPayment,
      currency: selectedCurrency,
      min_trade_amount: minTrade,
      max_trade_amount: maxTrade,
      exchange_rate: "live",
      terms_and_conditions: "Pay on time\n No delay",
      type: 1,
    };

    if (data.min_trade_amount < 10) {
      Alert.alert(
        "Please set trade amount to minimum of 10"
      );
    } else {
      try {
        const res = await axios.post(`${BASE_URL_P2P}/offers/create`, data);

        Alert.alert(res.data?.message);
      } catch (error) {
        console.log(error?.response?.data);
      }
    }
  };

  return (
    <View style={[styles.column, { gap: 15, width: "100%" }]}>
      <View
        style={[
          styles.row,
          {
            width: "100%",
            backgroundColor: "white",
            elevation: 5,
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 10,
          },
        ]}
      >
        <Text
          style={[
            styles.smallTxt,
            {
              fontWeight: "400",
              textAlign: "left",
              width: "65%",
              fontSize: itemWidth * 0.028,
            },
          ]}
        >
          You can’t change the payment method or currency on an existing offer.
          If you want to use a different payment method or currency, go ahead
          and create a new offer.
        </Text>

        <Pressable
          onPress={createOffer}
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 15,
            paddingVertical: 8,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white" }}>Create offer</Text>
        </Pressable>
      </View>

      <View style={[styles.rowSpace, { width: "100%", gap: 10 }]}>
        <View
          style={[
            styles.column,
            { alignItems: "flex-start", gap: 10, width: "50%" },
          ]}
        >
          <Text style={[styles.smallTxt, { fontWeight: "400" }]}>
            Payment Method
          </Text>

          <View style={[styles.paymentMethodBox, { padding: 0 }]}>
            {/* <Text style={{ fontSize: itemWidth * 0.028 }}>
              Amazon Gift Card
            </Text> */}
            <Picker
              selectedValue={selectedPayment}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedPayment(itemValue)
              }
              style={[
                styles.input,
                {
                  width: "98%",
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                  backgroundColor: "transparent",
                },
              ]}
            >
              <Picker.Item label="Bank Transfer" value={1} />
              <Picker.Item label="Wire Transfer" value={2} />
              <Picker.Item label="Online Wallet" value={3} />
            </Picker>

            {/* <View style={styles.paymentMethodIconBox}>
              <FontAwesome name="angle-down" size={20} color="black" />
            </View> */}
          </View>
        </View>

        <View
          style={[
            styles.column,
            { alignItems: "flex-start", gap: 10, width: "50%" },
          ]}
        >
          <Text style={[styles.smallTxt, { fontWeight: "400" }]}>
            Preferred Currency
          </Text>

          <View style={[styles.paymentMethodBox, { padding: 0 }]}>
            {/* <Text style={{ fontSize: itemWidth * 0.028 }}>US Dollar (USD)</Text> */}

            <Picker
              selectedValue={selectedCurrency}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCurrency(itemValue)
              }
              style={[
                styles.input,
                {
                  width: "98%",
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                  backgroundColor: "transparent",
                },
              ]}
            >
              <Picker.Item label="BTC" value="BTC" />
              <Picker.Item label="Eth" value="Eth" />
              <Picker.Item label="Tether" value="Tether" />
              <Picker.Item label="USDC" value="USDC" />
            </Picker>

            {/* <View style={styles.paymentMethodIconBox}>
              <FontAwesome name="angle-down" size={20} color="black" />
            </View> */}
          </View>
        </View>
      </View>

      <Text style={[styles.smallTxt, { alignSelf: "flex-start" }]}>
        Trade Pricing
      </Text>

      <View style={[styles.row, { width: "100%", gap: 10 }]}>
        <View
          style={[styles.column, { width: "49%", alignItems: "flex-start" }]}
        >
          <View style={[styles.row, { gap: 5 }]}>
            <View style={styles.radio}></View>
            <Text>Market price</Text>
          </View>

          <Text style={{ fontSize: itemWidth * 0.024 }}>
            Your offer’s selling price will charge according to the market price
            of Bitcoin
          </Text>
        </View>

        <View
          style={{ width: 1, backgroundColor: "#333", height: "100%" }}
        ></View>

        <View
          style={[styles.column, { width: "49%", alignItems: "flex-start" }]}
        >
          <View style={[styles.row, { gap: 5 }]}>
            <View style={styles.radio}></View>
            <Text>Fixed price</Text>
          </View>

          <Text style={{ fontSize: itemWidth * 0.024 }}>
            Your offer’s selling price is locked when you create it, and you
            won’t change with the market price
          </Text>
        </View>
      </View>

      <View style={[styles.rowSpace, { width: "100%" }]}>
        <Text style={[styles.smallTxt, { alignSelf: "flex-start" }]}>
          Offer Trade Limits
        </Text>

        <Text
          style={[
            styles.smallTxt,
            {
              alignSelf: "flex-start",
              fontSize: itemWidth * 0.028,
              borderWidth: 1,
              borderRadius: 4,
              borderColor: "#333",
              padding: 4,
              paddingHorizontal: 20,
              fontWeight: "500",
            },
          ]}
        >
          Use fixed price
        </Text>
      </View>

      <View
        style={[
          styles.column,
          {
            backgroundColor: "white",
            elevation: 5,
            borderRadius: 10,
            paddingHorizontal: 15,
            paddingVertical: 10,
            gap: 15,
            alignItems: "flex-start",
          },
        ]}
      >
        <View
          style={[
            styles.rowSpace,
            {
              width: "100%",
            },
          ]}
        >
          <View
            style={[
              styles.column,
              { width: "40%", alignItems: "flex-start", gap: 8 },
            ]}
          >
            <Text
              style={[
                styles.smallTxt,
                { alignSelf: "flex-start", fontWeight: "500" },
              ]}
            >
              Minimum
            </Text>

            <View
              style={[
                styles.row,
                {
                  borderWidth: 1,
                  borderColor: colors.primary,
                  width: "100%",
                  borderRadius: 4,
                },
              ]}
            >
              <TextInput
                style={{ flex: 2.5, paddingLeft: 4 }}
                placeholder="10"
                keyboardType="numeric"
                onChangeText={(value) => setMinTrade(value)}
              />

              <Text
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: colors.primary,
                  paddingHorizontal: 6,
                }}
              >
                {selectedCurrency}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.column,
              { width: "40%", alignItems: "flex-start", gap: 8 },
            ]}
          >
            <Text
              style={[
                styles.smallTxt,
                { alignSelf: "flex-start", fontWeight: "500" },
              ]}
            >
              Maximum
            </Text>

            <View
              style={[
                styles.row,
                {
                  borderWidth: 1,
                  borderColor: colors.primary,
                  width: "100%",
                  borderRadius: 4,
                },
              ]}
            >
              <TextInput
                style={{ flex: 2.5, paddingLeft: 4 }}
                placeholder="1000"
                keyboardType="numeric"
                onChangeText={(value) => setMaxTrade(value)}
              />

              <Text
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: colors.primary,
                  paddingHorizontal: 6,
                }}
              >
                {selectedCurrency}
              </Text>
            </View>
          </View>
        </View>

        <Text style={{ fontSize: itemWidth * 0.026 }}>
          To list this offer on the Marketplace, you’ll need at least10 USD
          worth of cryptocurrency in your FlexApp Wallet.
        </Text>
      </View>
    </View>
  );
};

export default TradePricing;
