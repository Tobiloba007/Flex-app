import { fontScale } from "nativewind";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  ScrollView,
} from "react-native";

const CreateBuySellAd = () => {
  const [priceType, setPriceType] = useState("Fixed price");
  const [isAggregateOrder, setIsAggregateOrder] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabContainer}>
        <Text style={[styles.tabText, styles.activeTab]}>Buy</Text>
        <Text style={styles.tabText}>Sell</Text>
      </View>

      <Text style={styles.label}>Price type:</Text>
      <View style={styles.priceTypeContainer}>
        <TouchableOpacity
          style={[
            styles.priceTypeButton,
            priceType === "Fixed price" && styles.activeButton,
          ]}
          onPress={() => setPriceType("Fixed price")}
        >
          <Text style={styles.buttonText}>Fixed price</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.priceTypeButton,
            priceType === "Floating price" && styles.activeButton,
          ]}
          onPress={() => setPriceType("Floating price")}
        >
          <Text style={styles.buttonText}>Floating price</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.infoText}>
        Your price remains the same and will not change by market fluctuations.
      </Text>

      <Text style={styles.label}>Crypto quantity</Text>
      <View style={styles.cryptoQuantityContainer}>
        <View style={styles.btcContainer}>
          <View style={styles.btcIcon} />
          <Text>USDT</Text>
        </View>
        <TouchableOpacity style={styles.allButton}>
          <Text style={styles.allButtonText}>All</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Unit Price</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="0.00" />
        <Text style={styles.currency}>NGN</Text>
      </View>

      <Text style={styles.label}>Order limit</Text>
      <View style={styles.orderLimitContainer}>
        <View style={[styles.inputContainer, {width: '48%'}]}>
          <TextInput style={styles.input} placeholder="Min" />
          <Text style={styles.currency}>NGN</Text>
        </View>
        <View style={[styles.inputContainer, {width: '48%'}]}>
          <TextInput style={styles.input} placeholder="Max" />
          <Text style={styles.currency}>NGN</Text>
        </View>
      </View>

      <Text style={styles.label}>Payment timeout:</Text>
      <TextInput style={[styles.input, {borderColor: '#ccc',borderWidth: 1}]} placeholder="Within 15 min" />

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total price:</Text>
        <Text style={styles.totalPrice}>0.00 NGN</Text>
      </View>
      <Text style={styles.label}>Add Description:</Text>
      <TextInput style={[styles.input, {height: 100,borderColor: '#ccc',borderWidth: 1,marginBottom: 30, flex: 0}]}/>
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Post buy ad</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "white",
    height: "100%",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 30,
    justifyContent: "space-between",
  },
  tabText: {
    marginRight: 20,
    fontSize: 22,
    color: "#888",
    textAlign: "center",
    width: "50%",
    padding: 14,
    fontFamily: "serif",
  },
  activeTab: {
    color: "#000",
    fontWeight: "bold",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  priceTypeContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  priceTypeButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginRight: 10,
    borderRadius: 5,
    height: 55,
    justifyContent: "center",
    fontFamily: "serif",
  },
  activeButton: {
    backgroundColor: "#3050FF",
  },
  buttonText: {
    color: "#fff",
    fontSize: 23,
  },
  infoText: {
    color: "#888",
    marginBottom: 20,
  },
  cryptoQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  btcContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  btcIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#F7931A",
    borderRadius: 12,
    marginRight: 8,
  },
  allButton: {
    backgroundColor: "#3050FF",
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
    marginBottom: 20,
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
    marginBottom: 30,
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
      marginBottom: 30,
    marginTop: 30
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
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
