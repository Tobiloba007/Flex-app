import React, { useState } from "react";
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

// type PaymentMethod = {
//   id: string;
//   name: string;
//   icon: string;
//   description: string;
// };

export default function PaymentScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMethod, setSelectedMethod] = useState();
  // (useState < string) | (null > null);

  const navigation = useNavigation();

  const paymentMethods = [
    {
      id: "wallet",
      name: "Wallet",
      icon: "wallet-outline",
      description: "Payment arrived Instantly",
    },
    // {
    //   id: "coinbase",
    //   name: "Coinbase Pay",
    //   icon: "logo-bitcoin",
    //   description: "Payment arrived Instantly",
    // },
  ];

  const filteredMethods = paymentMethods.filter((method) =>
    method.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          { label: "Review", completed: true },
          { label: "Pay", active: true },
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
                <Text style={styles.stepNumber}>{index + 1}</Text>
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

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Payment gateway"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Payment Methods */}
        <View style={styles.methodsContainer}>
          {filteredMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.methodCard,
                selectedMethod === method.id && styles.selectedMethod,
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={styles.methodIcon}>
                <Ionicons name={method.icon} size={24} color="#0099ff" />
              </View>
              <View style={styles.methodInfo}>
                <Text style={styles.methodName}>{method.name}</Text>
                <Text style={styles.methodDescription}>
                  {method.description}
                </Text>
              </View>
              {selectedMethod === method.id && (
                <Ionicons name="checkmark-circle" size={24} color="#0099ff" />
              )}
            </TouchableOpacity>
          ))}
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
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
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
  searchContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    fontSize: 16,
  },
  searchButton: {
    width: 48,
    height: 48,
    backgroundColor: "#0099ff",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  methodsContainer: {
    gap: 12,
  },
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f8ff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedMethod: {
    borderColor: "#0099ff",
    backgroundColor: "#f0f8ff",
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  methodInfo: {
    flex: 1,
  },
  methodName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  methodDescription: {
    fontSize: 14,
    color: "#0099ff",
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
    marginTop:'10%'
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
