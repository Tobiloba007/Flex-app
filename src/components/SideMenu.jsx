import { View, Text, Pressable } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../colors";
import { styles } from "../constants/styles";
import { useNavigation } from "@react-navigation/native";

const SideMenu = ({ handleSideMenu }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.sideMenu}>
      <Pressable style={{ padding: 20 }} onPress={() => handleSideMenu(false)}>
        <Ionicons name="close-circle" size={24} color={colors.primary} />
      </Pressable>

      <View
        style={{ width: "100%", height: 1, backgroundColor: colors.primary }}
      ></View>

      <View
        style={[
          styles.column,
          { alignItems: "flex-start", padding: 20, gap: 25 },
        ]}
      >
        <Pressable
          style={[styles.row, { width: "100%" }]}
          onPress={() => {
            handleSideMenu(false);
            navigation.navigate("myOffers");
          }}
        >
          <Entypo name="dot-single" size={24} color={colors.primary} />
          <Text style={styles.smallTxt}>My offers</Text>
        </Pressable>

        <Pressable
          style={[styles.row, { width: "100%" }]}
          onPress={() => {
            handleSideMenu(false);
            navigation.navigate("wallet");
          }}
        >
          <Entypo name="dot-single" size={24} color={colors.primary} />
          <Text style={styles.smallTxt}>Wallet</Text>
        </Pressable>

        <Pressable
          style={[styles.row, { width: "100%" }]}
          onPress={() => {
            handleSideMenu(false);
          }}
        >
          <Entypo name="dot-single" size={24} color={colors.primary} />
          <Text style={styles.smallTxt}>Dashboard</Text>
        </Pressable>

        <Pressable
          style={[styles.row, { width: "100%" }]}
          onPress={() => {
            handleSideMenu(false);
            navigation.navigate("trade");
          }}
        >
          <Entypo name="dot-single" size={24} color={colors.primary} />
          <Text style={styles.smallTxt}>Convert</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SideMenu;
