import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { colors } from "../../../colors";
import { styles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import User from "../../components/User";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const cryptocurrency = [
  // {
  //   id: 1,
  //   img: require("../../../assets/images/btc.png"),
  //   name: "Bitcoin",
  //   backgroundColor: "#F9AA4B",
  // },
  // {
  //   id: 2,
  //   img: require("../../../assets/images/eth.png"),
  //   name: "Eth",
  //   backgroundColor: "#627EEA",
  // },
  {
    id: 3,
    img: require("../../../assets/images/usdc.png"),
    name: "USDC",
    backgroundColor: "#029CFC",
  },
  // {
  //   id: 4,
  //   img: require("../../../assets/images/t.png"),
  //   name: "Tether",
  //   backgroundColor: "#4BF9C5",
  // },
];

const paymentMethod = [
  {
    method_id: 1,
    method_name: "bank_transfer",
    description: "Bank Transfer",
  },
  {
    method_id: 2,
    method_name: "wire_transfer",
    description: "Wire Transfer",
  },
  {
    method_id: 3,
    method_name: "online_wallet",
    description: "Online Wallet",
  },
];

const CreateBuySellAd = () => {
  const { isDark } = useSelector((state) => state.theme);
  const { user } = User();

  const navigation = useNavigation();

  const [priceType, setPriceType] = useState("Fixed price");
  const [selectedImg, setSelectedImg] = useState({
    img: require("../../../assets/images/usdc.png"),
    bg: "#029CFC",
    name: "USDC",
  });
  const [inputs, setInputs] = useState({});

  const handleChangeInput = (name, value) => {
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  };

  useEffect(() => {
    handleChangeInput("user_id", user?.id);
    handleChangeInput("type", 0);
    handleChangeInput("payment_details", "");
  }, [user]);

  // console.log(inputs);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? colors.black : colors.white,
      }}
    >
      <StatusBar
        backgroundColor={isDark ? colors.black : colors.white}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <ScrollView>
        <View style={[style.container, { paddingBottom: 40 }]}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "900",
              fontSize: width * 0.036,
              color: colors.black,
              paddingVertical: height * 0.01,
            }}
          >
            Post an ad
          </Text>

          <View style={style.tabContainer}>
            <Text style={[style.tabText, style.activeTab]}>Buy</Text>
            <Text
              style={style.tabText}
              onPress={() => navigation.navigate("SendMoney")}
            >
              Sell
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            <Text style={style.label}>Price type:</Text>
            <View style={style.priceTypeContainer}>
              <Pressable
                style={[
                  style.priceTypeButton,
                  priceType === "Fixed price" && style.activeButton,
                ]}
                onPress={() => setPriceType("Fixed price")}
              >
                <Text
                  style={[
                    style.buttonText,
                    { color: priceType === "Fixed price" ? "#fff" : "#a1a1a1" },
                  ]}
                >
                  Fixed price
                </Text>
              </Pressable>
              <Pressable
                style={[
                  style.priceTypeButton,
                  priceType === "Floating price" && style.activeButton,
                ]}
                onPress={() => setPriceType("Floating price")}
              >
                <Text
                  style={[
                    style.buttonText,
                    {
                      color:
                        priceType === "Floating price" ? "#fff" : "#a1a1a1",
                    },
                  ]}
                >
                  Floating price
                </Text>
              </Pressable>
            </View>
          </View>

          <Text style={style.infoText}>
            {priceType === "Fixed price"
              ? "Your price remains the same and will not change by market fluctuations."
              : "Your selling price will charge according to the market price of Bitcoin"}
          </Text>

          <View style={{ gap: 8 }}>
            <Text
              style={[
                styles.smallTxt,
                {
                  alignSelf: "flex-start",
                  color: isDark ? colors.white : colors.black,
                },
              ]}
            >
              Choose your cryptocurrency
            </Text>

            <View style={styles.row}>
              {cryptocurrency.map((item) => (
                <Pressable
                  style={[
                    styles.btcButton,
                    { backgroundColor: inputs?.currency && colors.primary },
                  ]}
                  key={item.id}
                  onPress={() => {
                    setSelectedImg({
                      img: item.img,
                      bg: item.backgroundColor,
                      name: item.name,
                    });
                    handleChangeInput("currency", item.name);
                  }}
                >
                  <View
                    style={[
                      styles.btcImgCon,
                      { backgroundColor: item.backgroundColor },
                    ]}
                  >
                    <Image
                      source={item.img}
                      style={{ width: "100%" }}
                      resizeMode="contain"
                    />
                  </View>

                  <Text
                    style={[
                      styles.smallTxt,
                      { color: inputs?.currency ? colors.white : colors.black },
                    ]}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={{ gap: 8 }}>
            <Text style={style.smallTxt}>Crypto quantity</Text>
            <View style={style.cryptoQuantityContainer}>
              <View style={style.btcContainer}>
                {/* <View style={style.btcIcon} /> */}

                <View
                  style={[
                    styles.btcImgCon,
                    { backgroundColor: selectedImg.bg },
                  ]}
                >
                  <Image
                    source={selectedImg.img}
                    style={{ width: "100%" }}
                    resizeMode="contain"
                  />
                </View>

                <Text style={{ fontSize: width * 0.03 }}>
                  {selectedImg.name}
                </Text>
              </View>

              <TextInput
                style={{
                  width: "70%",
                  height: "100%",
                  alignSelf: "flex-start",
                }}
                keyboardType="number-pad"
              />

              <Pressable style={style.allButton}>
                <Text style={style.allButtonText}>All</Text>
              </Pressable>
            </View>
          </View>

          <View style={{ gap: 8 }}>
            <Text style={[styles.smallTxt, { textAlign: "left" }]}>
              Exchange rate
            </Text>
            <View style={style.inputContainer}>
              <TextInput
                style={style.input}
                placeholder="0.00"
                keyboardType="number-pad"
                onChangeText={(value) =>
                  handleChangeInput("exchange_rate", value)
                }
              />
              <Text style={style.currency}>USD</Text>
            </View>
          </View>

          <View style={style.inputContainer}>
            <Picker
              selectedValue={inputs?.exchange_currency}
              onValueChange={(itemValue) => {
                handleChangeInput("exchange_currency", itemValue);
              }}
              style={{ width: "100%" }}
            >
              <Picker.Item label="Exchange currency" value={""} />
              <Picker.Item label={"NGN"} value={"NGN"} />
            </Picker>
          </View>

          <View style={style.inputContainer}>
            <Picker
              selectedValue={inputs?.payment_method_id}
              onValueChange={(itemValue) => {
                handleChangeInput("payment_method_id", itemValue);
              }}
              style={{ width: "100%" }}
            >
              <Picker.Item label="Payment Method" value={""} />
              {paymentMethod.map((item) => (
                <Picker.Item
                  label={item.method_name}
                  value={item.method_id}
                  key={item.method_id}
                />
              ))}
            </Picker>
          </View>

          <View style={{ gap: 8 }}>
            <Text style={[styles.smallTxt, { textAlign: "left" }]}>
              Order limit
            </Text>
            <View style={style.orderLimitContainer}>
              <View style={[style.inputContainer, { width: "48%" }]}>
                <TextInput
                  style={style.input}
                  placeholder="Min"
                  keyboardType="number-pad"
                  onChangeText={(value) =>
                    handleChangeInput("min_trade_amount", value)
                  }
                />
                <Text style={style.currency}>USD</Text>
              </View>

              <View style={[style.inputContainer, { width: "48%" }]}>
                <TextInput
                  style={style.input}
                  placeholder="Max"
                  keyboardType="number-pad"
                  onChangeText={(value) =>
                    handleChangeInput("max_trade_amount", value)
                  }
                />
                <Text style={style.currency}>USD</Text>
              </View>
            </View>
          </View>

          <View style={{ gap: 8 }}>
            <Text style={[styles.smallTxt, { textAlign: "left" }]}>
              Payment timeout:
            </Text>
            <TextInput
              style={[style.input, { borderColor: "#ccc", borderWidth: 1 }]}
              placeholder="Within 15 min"
            />
          </View>

          {/* <View style={style.totalContainer}>
            <Text style={[styles.smallTxt, { textAlign: "left" }]}>
              Total price:
            </Text>
            <Text style={style.totalPrice}>0.00 USD</Text>
          </View> */}

          <View style={{ gap: 8 }}>
            <Text style={[styles.smallTxt, { textAlign: "left" }]}>
              Add Description:
            </Text>
            <TextInput
              style={[
                style.input,
                {
                  height: 100,
                  borderColor: "#ccc",
                  borderWidth: 1,
                  // marginBottom: 30,
                  flex: 0,
                },
              ]}
              multiline
              placeholder="Description should include details of your ad, including your mode of payment and preferred currency."
              onChangeText={(value) =>
                handleChangeInput("terms_and_conditions", value)
              }
            />
          </View>

          <Pressable
            onPress={() => navigation.navigate("adConfirmation", { inputs })}
            style={[styles.button, { alignSelf: "center" }]}
          >
            <Text style={style.submitButtonText}>Post buy ad</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    gap: 20,
  },
  tabContainer: {
    flexDirection: "row",
    // marginBottom: 20,
    justifyContent: "space-between",
  },
  tabText: {
    marginRight: 20,
    fontSize: width * 0.037,
    color: "#888",
    textAlign: "center",
    width: "50%",
    paddingBottom: 5,
    // padding: 14,
  },
  activeTab: {
    color: colors.black,
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  label: {
    fontSize: width * 0.038,
    fontWeight: "500",
    // marginBottom: 8,
  },
  priceTypeContainer: {
    flexDirection: "row",
    // marginBottom: 10,
    gap: 10,
  },
  priceTypeButton: {
    flex: 1,
    padding: 4,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    height: height * 0.06,
    justifyContent: "center",
  },
  activeButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.036,
  },
  infoText: {
    color: "#888",
    // marginBottom: 10,
    fontSize: width * 0.034,
  },
  cryptoQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    padding: 4,
    borderColor: "#ccc",
    borderRadius: 5,
    // marginBottom: 30,
  },
  btcContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  btcIcon: {
    width: width * 0.034,
    height: width * 0.034,
    backgroundColor: "#F7931A",
    borderRadius: 50,
  },
  allButton: {
    backgroundColor: colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  allButtonText: {
    color: "white",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 20,
  },
  switchLabel: {
    marginLeft: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    // marginBottom: 30,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  currency: {
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  orderLimitContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 30,
    // marginTop: 30,
  },
  totalLabel: {
    fontSize: width * 0.036,
    fontWeight: "500",
  },
  totalPrice: {
    fontSize: width * 0.036,
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#ccc",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
};

export default CreateBuySellAd;
