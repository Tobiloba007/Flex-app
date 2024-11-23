import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Octicons from "@expo/vector-icons/Octicons";
import { useNavigation } from "@react-navigation/native";

// type Recipient = {
//   id: string;
//   name: string;
//   details: string;
//   initial: string;
// };

export default function RecipientSelection() {
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const recipients = [
    {
      id: "1",
      name: "Samuel John",
      details: "Send INR- Local Bank Transfer",
      initial: "S",
    },
    {
      id: "2",
      name: "Samuel John",
      details: "Send INR- Local Bank Transfer",
      initial: "S",
    },
    {
      id: "3",
      name: "Samuel John",
      details: "Send INR- Local Bank Transfer",
      initial: "S",
    },
  ];

  const handleConfirm = () => {
    // Handle form submission
    setIsModalVisible(false);
  };

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
          <View style={[styles.stepCircle, styles.completedStep]}>
            <Ionicons name="checkmark" size={16} color="#fff" />
          </View>
          <Text style={[styles.stepText, styles.completedStepText]}>
            Amount
          </Text>
        </View>
        {[
          { number: "2", label: "Recipient", active: true },
          { number: "3", label: "Review" },
          { number: "4", label: "Pay" },
        ].map((step, index) => (
          <View key={index} style={styles.progressStep}>
            <View
              style={[
                styles.stepDivider,
                index === 0 && { backgroundColor: "#0099ff" },
              ]}
            />
            <View style={[styles.stepCircle]}>
              {step.number === "2" ? (
                <View
                  style={[
                    styles.activeStep,
                    { height: 10, width: 10, borderRadius: 50 },
                  ]}
                />
              ) : (
                <Text
                  style={[
                    styles.stepNumber,
                    step.active && styles.activeStepNumber,
                  ]}
                >
                  {step.number}
                </Text>
              )}
            </View>
            <Text
              style={[styles.stepText, step.active && styles.activeStepText]}
            >
              {step.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Send your Money Here!</Text>
        <Text style={styles.subtitle}>
          Fast and reliable international money transfer app.
        </Text>

        {/* Add New Recipient Button */}
        <TouchableOpacity
          style={styles.addRecipientButton}
          onPress={() => setIsModalVisible(true)}
        >
          <View style={styles.addRecipientIcon}>
            <Octicons name="person-add" size={20} color="#666" />
          </View>
          <Text style={styles.addRecipientText}>Add New Recipient</Text>
          <Ionicons name="arrow-forward" size={20} color="#0099ff" />
        </TouchableOpacity>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter Recipient's Account number"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Recipient List */}
        <Text style={styles.listTitle}>Recipient List</Text>
        <ScrollView style={styles.recipientList}>
          {recipients.map((recipient) => (
            <TouchableOpacity
              key={recipient.id}
              style={styles.recipientItem}
              onPress={() => navigation.navigate("ReviewScreen")}
            >
              <View style={styles.recipientInitial}>
                <Text style={styles.initialText}>{recipient.initial}</Text>
              </View>
              <View style={styles.recipientInfo}>
                <Text style={styles.recipientName}>{recipient.name}</Text>
                <Text style={styles.recipientDetails}>{recipient.details}</Text>
              </View>
              <View style={styles.arrowContainer}>
                <Ionicons name="arrow-forward" size={20} color="#0099ff" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Add Recipient Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Where would you send the money to ?
              </Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.recipientTypeContainer}>
              <View style={styles.recipientTypeIcon}>
                <Octicons name="person-add" size={24} color="#0099ff" />
              </View>
              <View>
                <Text style={styles.recipientTypeTitle}>Add recipient</Text>
                <Text style={styles.recipientTypeDescription}>
                  Give money to individual whose contacts you do not know
                </Text>
              </View>
            </View>

            <View style={styles.formContainer}>
              <TextInput
                style={styles.input}
                placeholder="Bank Name"
                value={bankName}
                onChangeText={setBankName}
              />
              <TextInput
                style={styles.input}
                placeholder="Account number"
                value={accountNumber}
                onChangeText={setAccountNumber}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Account Name"
                value={accountName}
                onChangeText={setAccountName}
              />
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  completedStep: {
    backgroundColor: "#0099ff",
  },
  activeStep: {
    backgroundColor: "#0099ff",
  },
  stepNumber: {
    fontSize: 12,
    color: "#666",
  },
  activeStepNumber: {
    color: "#0099ff",
  },
  stepText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  activeStepText: {
    color: "#0099ff",
  },
  completedStepText: {
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
  addRecipientButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    marginBottom: 16,
  },
  addRecipientIcon: {
    marginRight: 12,
  },
  addRecipientText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: "#0099ff",
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 16,
  },
  recipientList: {
    flex: 1,
  },
  recipientItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    marginBottom: 8,
  },
  recipientInitial: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  initialText: {
    fontSize: 16,
    color: "#0099ff",
    fontWeight: "400",
  },
  recipientInfo: {
    flex: 1,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  recipientDetails: {
    fontSize: 14,
    color: "#666",
  },
  arrowContainer: {
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 20,
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
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: "60%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  recipientTypeContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f8f8f8",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  recipientTypeIcon: {
    marginRight: 16,
  },
  recipientTypeTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  recipientTypeDescription: {
    fontSize: 14,
    color: "#666",
  },
  formContainer: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
  },
  confirmButton: {
    backgroundColor: "#0099ff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
