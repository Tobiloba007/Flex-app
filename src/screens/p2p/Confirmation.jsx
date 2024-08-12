import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const ConfirmationScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirmation</Text>
        <TouchableOpacity style={styles.inoButton}>
          {/* <Text style={styles.infoButtonText}>i</Text> */}
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.amountContainer}>
          <View style={styles.usdtIcon} />
          <Text style={styles.amountText}>+1,351.35 USDT</Text>
        </View>
        <Text style={styles.dateText}>2,020,000.00 NGN</Text>

        <View style={styles.detailsContainer}>
          <DetailRow label="Complete time" value="5 Aug 2024, 16:30" />
          <DetailRow label="Status" value="Completed" isCompleted={true} />
          <DetailRow label="Order number" value="FLX-345377-34765" />
          <DetailRow label="Seller" value="FlexApp" showAvatar={true} />
          <DetailRow label="Payment methods" value="1 ChinaUnion Wallet" />
          <DetailRow label="Rate" value="1 USD = 1,460 NGN" />
          <DetailRow label="You pay" value="2,020,000 NGN" />
          <DetailRow label="You get" value="1,351.35 USDT" isBold={true} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const DetailRow = ({ label, value, isCompleted, showAvatar, isBold }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <View style={styles.detailValueContainer}>
      {showAvatar && <View style={styles.avatar} />}
      <Text
        style={[
          styles.detailValue,
          isCompleted && styles.completedText,
          isBold && styles.boldText,
        ]}
      >
        {value}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
        backgroundColor: "#F8F9FA",
    padding: 23
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
      borderBottomColor: "#E0E0E0",
    marginBottom: 33
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  infoButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  infoButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
  },
  amountContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  usdtIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "grey",
    marginRight: 8,
  },
  amountText: {
    fontSize: 34,
      fontWeight: "bold",
    marginTop: 20
  },
  dateText: {
    textAlign: "center",
    color: "#888",
    marginBottom: 24,
  },
  detailsContainer: {
    backgroundColor: "white",
    borderRadius: 15,
      padding: 16,
        marginTop: 23,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    marginTop: 15,
  },
  detailLabel: {
    color: "#888",
  },
  detailValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailValue: {
    textAlign: "right",
  },
  completedText: {
    color: "#4CAF50",
  },
  boldText: {
    fontWeight: "bold",
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E0E0E0",
    marginRight: 8,
  },
});

export default ConfirmationScreen;
