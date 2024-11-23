import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function MoneyTransfer() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Money Transfer</Text>
      </View>

      {/* Progress Steps */}
      <View style={styles.progressContainer}>
        <View style={styles.progressStep}>
          <View style={[styles.stepCircle]}>
            <View
              style={[
                styles.activeStep,
                { height: 10, width: 10, borderRadius: 50 },
              ]}
            />
          </View>
          <Text style={[styles.stepText, styles.activeStepText]}>Amount</Text>
        </View>
        {[
          { number: "2", label: "Recipient" },
          { number: "3", label: "Review" },
          { number: "4", label: "Pay" },
        ].map((step, index) => (
          <View key={index} style={styles.progressStep}>
            <View
              style={[
                styles.stepDivider,
                
              ]}
            />
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>{step.number}</Text>
            </View>
            <Text style={styles.stepText}>{step.label}</Text>
          </View>
        ))}
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Send your Money Here!</Text>
        <Text style={styles.subtitle}>
          Fast and reliable international money transfer app.
        </Text>

        {/* Amount Input Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>You Will Send</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              value="1,000.00"
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.currencySelector}>
              <Text style={styles.currencyCode}>USDC</Text>
              <Ionicons name="chevron-down" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.minimumText}>Minimum of $10</Text>

          {/* Transfer Details */}
          <View style={styles.transferDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="swap-horizontal" size={20} color="#666" />
              <Text style={styles.detailText}>Transfer fee : 1.85USD</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="swap-horizontal" size={20} color="#666" />
              <Text style={styles.detailText}>
                Transfer in local : 1.85 USD
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="card-outline" size={20} color="#666" />
              <Text style={styles.detailText}>
                Total Amount we will convert : - 1.85USD
              </Text>
            </View>
          </View>
        </View>

        {/* Recipient Amount Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recipients will Gets</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              value="1,000.00"
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.currencySelector}>
              <Text style={styles.currencyCode}>CAD</Text>
              <Ionicons name="chevron-down" size={20} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.minimumText}>Minimum of $10</Text>
        </View>

        {/* Delivery Time */}
        <View style={styles.deliveryTime}>
          <Ionicons name="time-outline" size={20} color="#666" />
          <Text style={styles.deliveryTimeText}>
            Will arrive within 24 Hours
          </Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate("RecipientSelection")}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 0,
    marginVertical: 15,
  },
  progressStep: {
    alignItems: "center",
    flex: 1,
  },
  stepCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  activeStep: {
    backgroundColor: "#0099ff",
  },
  stepNumber: {
    fontSize: 12,
    color: "#666",
  },
  stepText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  activeStepText: {
    color: "#0099ff",
  },
  stepDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    width: "100%",
    position: "absolute",
    top: 12,
    left: -50,
    zIndex: -1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
  },
  currencySymbol: {
    fontSize: 18,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 18,
  },
  currencySelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  currencyCode: {
    fontSize: 16,
  },
  minimumText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  transferDetails: {
    marginTop: 16,
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
  },
  deliveryTime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  deliveryTimeText: {
    fontSize: 14,
    color: "#666",
  },
  continueButton: {
    backgroundColor: "#0099ff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomNav: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navItemCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
  },
  navText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  sendButton: {
    backgroundColor: "#0099ff",
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});
