import { View, Text, TextInput, Modal } from "react-native";
import React from "react";
import { colors } from "../../../colors";
import { styles } from "../../constants/styles";

const ResetPinModal = ({
  modalVisible,
  setModalVisible,
  setEmail,
  setPassword,
  handleResetPin,
}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: "80%",
              gap: 20,
            }}
          >
            <Text style={[styles.mediumTxt, { textAlign: "left" }]}>
              Reset Pin
            </Text>

            <Text style={[styles.smallTxt, { textAlign: "left" }]}>
              Enter your account password to reset your pin
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={"#8e8e8e"}
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor={"#8e8e8e"}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />

            <View style={styles.rowSpace}>
              <Text
                onPress={() => setModalVisible(false)}
                style={[styles.smallTxt, { color: colors.primary }]}
              >
                Logout
              </Text>

              <Text
                onPress={() => setModalVisible(false)}
                style={[styles.smallTxt, { color: colors.primary }]}
              >
                Cancel
              </Text>

              <Text
                onPress={handleResetPin}
                style={[styles.smallTxt, { color: colors.primary }]}
              >
                Reset
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ResetPinModal;
