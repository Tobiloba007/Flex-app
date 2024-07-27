import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import ProfileTop from "../../components/profile/ProfileTop";
import ProfileTransactions from "../../components/profile/ProfileTransactions";
import { useSelector } from "react-redux";
import { colors } from "../../../colors";

const screenWidth = Dimensions.get("window").width;

export default function Profile() {
  const { isDark } = useSelector((state) => state.theme);

  return (
    <SafeAreaView
      // className="flex flex-col items-center justify-start h-full w-full bg-white"
      style={{ flex: 1, backgroundColor: isDark ? colors.black : colors.white }}
    >
      <StatusBar
        backgroundColor={isDark ? colors.black : colors.white}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <ScrollView>
        <ProfileTop isDark={isDark} />
        <ProfileTransactions isDark={isDark} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
