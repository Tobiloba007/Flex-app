import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  TextInput,
  Switch,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../../constants/styles";
import SendMoneyTop from "../../components/sendMoney/SendMoneyTop";
import { Picker } from "@react-native-picker/picker";
import { colors } from "../../../colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const itemWidth = Dimensions.get("window").width;

const Buy = () => {
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [selectedPayment, setSelectedPayment] = useState();
  const [isEnabled, setIsEnabled] = useState(false);

  const navigation = useNavigation()

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={[styles.container, { padding: 15, gap: 15, width: itemWidth }]}
      >
        <SendMoneyTop />

        <View style={[styles.column, { alignItems: "flex-start", gap: 15 }]}>
          <Text style={[styles.smallTxt, { fontWeight: "500" }]}>Buy</Text>

          <Picker
            selectedValue={selectedCurrency}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCurrency(itemValue)
            }
            style={styles.input}
          >
            <Picker.Item label="Bitcoin" value="bitcoin" />
            <Picker.Item label="Eth" value="eth" />
            <Picker.Item label="Tether" value="tether" />
            <Picker.Item label="USDC" value="jusdcs" />
          </Picker>

          <Text style={[styles.smallTxt, { fontWeight: "500" }]}>
            1 BTC= 1,933,718.82 PHP
          </Text>

          <Text style={[styles.smallTxt, { fontWeight: "500" }]}>Pay via</Text>

          <Picker
            selectedValue={selectedPayment}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedPayment(itemValue)
            }
            style={styles.input}
          >
            <Picker.Item label="All Payment  Methods" value="" />
            <Picker.Item label="Eth" value="eth" />
            <Picker.Item label="Tether" value="tether" />
            <Picker.Item label="USDC" value="jusdcs" />
          </Picker>

          <Text style={[styles.smallTxt, { fontWeight: "500" }]}>
            I Want To Spend
          </Text>

          <View
            style={[
              styles.rowSpace,
              { borderWidth: 1, borderColor: colors.soft, width: "100%" },
            ]}
          >
            <TextInput
              style={[
                styles.input,
                { width: "60%", backgroundColor: "transparent" },
              ]}
              placeholder="Enter amount"
            />

            <Picker
              selectedValue={selectedPayment}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedPayment(itemValue)
              }
              style={[styles.input, { width: "25%" }]}
            >
              <Picker.Item label="$" value="" />
              <Picker.Item label="Eth" value="eth" />
              <Picker.Item label="Tether" value="tether" />
              <Picker.Item label="USDC" value="jusdcs" />
            </Picker>
          </View>

          <Text style={[styles.smallTxt, { fontWeight: "500" }]}>
            Offer Location
          </Text>

          <View
            style={[
              styles.rowSpace,
              {
                borderWidth: 1,
                borderColor: colors.soft,
                width: "100%",
                paddingHorizontal: 4,
              },
            ]}
          >
            <Ionicons name="location-outline" size={24} color="black" />

            <Picker
              selectedValue={selectedPayment}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedPayment(itemValue)
              }
              style={[
                styles.input,
                { width: "90%", backgroundColor: "transparent" },
              ]}
            >
              <Picker.Item label="USA" value="" />
              <Picker.Item label="Canada" value="eth" />
              <Picker.Item label="UK" value="tether" />
              <Picker.Item label="Germany" value="jusdcs" />
            </Picker>
          </View>

          <View style={[styles.rowSpace, { width: "100%" }]}>
            <Text style={[styles.smallTxt, { fontWeight: "500" }]}>
              Offer owner Location
            </Text>

            <Switch
              trackColor={{
                false: "rgba(217, 217, 217, 1)",
                true: colors.primary,
              }}
              thumbColor={isEnabled ? colors.primary : "#f4f3f4"}
              ios_backgroundColor={"#3e3e3e"}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <View
            style={[
              styles.rowSpace,
              {
                borderWidth: 1,
                borderColor: colors.soft,
                width: "100%",
                paddingHorizontal: 4,
              },
            ]}
          >
            <Ionicons name="location-outline" size={24} color="black" />

            <Picker
              selectedValue={selectedPayment}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedPayment(itemValue)
              }
              style={[
                styles.input,
                { width: "90%", backgroundColor: "transparent" },
              ]}
            >
              <Picker.Item label="USA" value="" />
              <Picker.Item label="Canada" value="eth" />
              <Picker.Item label="UK" value="tether" />
              <Picker.Item label="Germany" value="jusdcs" />
            </Picker>
          </View>

          <View style={[styles.rowSpace, { width: "100%" }]}>
            <Text
              style={[styles.smallTxt, { fontWeight: "500", color: "grey" }]}
            >
              FlexApp verified Offers Only
            </Text>

            <Switch
              trackColor={{
                false: "rgba(217, 217, 217, 1)",
                true: colors.primary,
              }}
              thumbColor={isEnabled ? colors.primary : "#f4f3f4"}
              ios_backgroundColor={"#3e3e3e"}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <View style={styles.row}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={colors.primary}
            />

            <Text style={{ color: colors.primary }}>What is this?</Text>
          </View>

          <Pressable style={[styles.button, {alignSelf:'center'}]} onPress={()=> navigation.navigate('offers')} >
            <Text style={[styles.buttonTxt, {color: 'white', fontWeight: '500'}]}>Find Offers</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Buy;
