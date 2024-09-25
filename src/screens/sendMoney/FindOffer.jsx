import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../colors";
import { useSelector } from "react-redux";
import { styles } from "../../constants/styles";
import SendMoneyTop from "../../components/sendMoney/SendMoneyTop";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const itemWidth = Dimensions.get("window").width;
const itemHeight = Dimensions.get("window").height;

const FindOffer = () => {
  const { isDark } = useSelector((state) => state.theme);

  const navigation = useNavigation();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [type, setType] = useState(0);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDark ? colors.black : colors.white }}
    >
      <StatusBar
        backgroundColor={isDark ? colors.black : colors.white}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <ScrollView>
        <View
          style={[
            styles.container,
            {
              padding: 15,
              gap: 15,
              width: itemWidth,
              paddingBottom: itemHeight * 0.11,
            },
          ]}
        >
          <SendMoneyTop isDark={isDark} />

          <View
            style={[
              styles.row,
              {
                backgroundColor: colors.white,
                elevation: 5,
                padding: 3,
                width: "24%",
                height: itemHeight * 0.06,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 6,
                gap: 2,
              },
            ]}
          >
            <Pressable
              onPress={() => setType(0)}
              style={{
                backgroundColor: type === 0 ? colors.primary : "transparent",
                height: "100%",
                width: "50%",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 6,
              }}
            >
              <Text style={{ color: type === 0 ? colors.white : "#b1b1b1" }}>
                Buy
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setType(1);
                // navigation.navigate("createbuysellad");
              }}
              style={{
                backgroundColor: type === 1 ? colors.primary : "transparent",
                height: "100%",
                width: "50%",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 6,
              }}
            >
              <Text style={{ color: type === 1 ? colors.white : "#b1b1b1" }}>
                Sell
              </Text>
            </Pressable>
          </View>

          <View style={{ gap: 25 }}>
            <View style={{ gap: 10 }}>
              <Text style={[styles.smallTxt, { textAlign: "left" }]}>{type === 0 ? "Buy" : "Sell"}</Text>

              <View style={styles.inputOutlined}>
                <Picker
                  selectedValue={paymentMethod}
                  onValueChange={(itemValue, itemIndex) => {
                    setPaymentMethod(itemValue);
                  }}
                  style={{ width: "100%" }}
                >
                  <Picker.Item label={"USDC"} value={""} />
                </Picker>
              </View>

              <Text>1 USDC = NGN 1500</Text>
            </View>

            <View style={{ gap: 10 }}>
              <Text style={[styles.smallTxt, { textAlign: "left" }]}>
                Pay via
              </Text>

              <View style={styles.inputOutlined}>
                <Picker
                  selectedValue={paymentMethod}
                  onValueChange={(itemValue, itemIndex) => {
                    setPaymentMethod(itemValue);
                  }}
                  style={{ width: "100%" }}
                >
                  <Picker.Item label={"All Payment  Methods"} value={""} />
                </Picker>
              </View>
            </View>

            <View style={{ gap: 10 }}>
              <Text style={[styles.smallTxt, { textAlign: "left" }]}>
                I Want To Add
              </Text>

              <View style={[styles.inputOutlined, { flexDirection: "row" }]}>
                <TextInput
                  placeholder="Enter amount"
                  keyboardType="number-pad"
                  style={{ width: "60%" }}
                />

                <Picker
                  selectedValue={paymentMethod}
                  onValueChange={(itemValue, itemIndex) => {
                    setPaymentMethod(itemValue);
                  }}
                  style={{ width: "40%" }}
                >
                  <Picker.Item label={"NGN"} value={""} />
                </Picker>
              </View>
            </View>

            <View style={{ gap: 10 }}>
              <Text style={[styles.smallTxt, { textAlign: "left" }]}>
                Offer Location
              </Text>

              <View style={styles.inputOutlined}>
                <Picker
                  selectedValue={paymentMethod}
                  onValueChange={(itemValue, itemIndex) => {
                    setPaymentMethod(itemValue);
                  }}
                  style={{ width: "100%" }}
                >
                  <Picker.Item label={"United States"} value={""} />
                </Picker>
              </View>
            </View>

            <View style={{ gap: 10 }}>
              <Text style={[styles.smallTxt, { textAlign: "left" }]}>
                Your Location
              </Text>

              <View style={styles.inputOutlined}>
                <Picker
                  selectedValue={paymentMethod}
                  onValueChange={(itemValue, itemIndex) => {
                    setPaymentMethod(itemValue);
                  }}
                  style={{ width: "100%" }}
                >
                  <Picker.Item label={"United States"} value={""} />
                </Picker>
              </View>
            </View>

            <View style={styles.rowSpace}>
              <Text style={[styles.smallTxt, { textAlign: "left" }]}>
                FlexApp verified Offers Only
              </Text>
              <Ionicons name="toggle" size={36} color={"#e1e1e1"} />
            </View>

            <Pressable
              onPress={() => navigation.navigate("offers")}
              style={[
                styles.button,
                { alignSelf: "center", marginTop: itemHeight * 0.02 },
              ]}
            >
              <Text style={styles.buttonTxt}>Find Offers</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FindOffer;
