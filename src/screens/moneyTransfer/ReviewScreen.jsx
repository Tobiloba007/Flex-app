import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// type TransferDetails = {
//   sendAmount: string;
//   transferFee: string;
//   sendTotal: string;
//   recipientGets: string;
// };

// type RecipientDetails = {
//   bankName: string;
//   accountNumber: string;
//   accountName: string;
//   service: string;
// };

export default function ReviewScreen() {
  const transferDetails = {
    sendAmount: "$10",
    transferFee: "1.850 USD",
    sendTotal: "8.15 USD",
    recipientGets: "677.67INR",
  };

  const recipientDetails = {
    bankName: "Firstbank",
    accountNumber: "3115618069",
    accountName: "Miracle Onagun",
    service: "Bank Transfer",
  };

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
        {[
          { label: "Amount", completed: true },
          { label: "Recipient", completed: true },
          { label: "Review", active: true },
          { label: "Pay", number: "4" },
        ].map((step, index) => (
          <View key={index} style={styles.progressStep}>
            {index > 0 && (
              <View
                style={[
                  styles.progressLine,
                  index < 3 && { backgroundColor: "#0099ff" },
                ]}
              />
            )}
            <View
              style={[
                styles.stepCircle,
                step.completed && styles.completedStep,
                step.active && styles.activeStep,
              ]}
            >
              {step.completed ? (
                <Ionicons name="checkmark" size={16} color="#fff" />
              ) : step.active ? (
                <View style={styles.activeStepDot} />
              ) : (
                <Text style={styles.stepNumber}>{step.number}</Text>
              )}
            </View>
            <Text
              style={[
                styles.stepLabel,
                (step.completed || step.active) && styles.activeStepLabel,
              ]}
            >
              {step.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Review Details Of Your Transfer</Text>

        {/* Transfer Details Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Transfer Details</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
              <Ionicons name="create-outline" size={20} color="#0099ff" />
            </TouchableOpacity>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.row}>
              <Text style={styles.label}>You will Send</Text>
              <Text style={styles.value}>{transferDetails.sendAmount}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Transfer Fee</Text>
              <Text style={styles.value}>{transferDetails.transferFee}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Send Total</Text>
              <Text style={styles.value}>{transferDetails.sendTotal}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Recipient will Get</Text>
              <Text style={styles.value}>{transferDetails.recipientGets}</Text>
            </View>
          </View>
        </View>

        {/* Recipient Details Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Recipient Details</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>Change</Text>
              <Ionicons name="create-outline" size={20} color="#0099ff" />
            </TouchableOpacity>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.row}>
              <Text style={styles.label}>Bank Name</Text>
              <Text style={styles.value}>{recipientDetails.bankName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Acc Number</Text>
              <Text style={styles.value}>{recipientDetails.accountNumber}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Acc Name</Text>
              <Text style={styles.value}>{recipientDetails.accountName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Service</Text>
              <Text style={styles.value}>{recipientDetails.service}</Text>
            </View>
          </View>
        </View>

         {/* Continue Button */}
         <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate("PaymentScreen")}
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
    flex: 1,
    alignItems: "center",
  },
  progressLine: {
    position: "absolute",
    top: 12,
    left: -50,
    right: 0,
    height: 1,
    backgroundColor: "#e0e0e0",
    zIndex: -1,
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
  completedStep: {
    backgroundColor: "#0099ff",
  },
  activeStep: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#f0f0f0",
  },
  activeStepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0099ff",
  },
  stepNumber: {
    fontSize: 12,
    color: "#666",
  },
  stepLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  activeStepLabel: {
    color: "#0099ff",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f8ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editButtonText: {
    color: "#0099ff",
    marginRight: 4,
    fontSize: 14,
  },
  cardContent: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
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
});
