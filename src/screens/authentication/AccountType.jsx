import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { colors } from "../../../colors";

export default function AccountType({ handleNextPage }) {
  const { isDark } = useSelector((state) => state.theme);

  const screenWidth = Dimensions.get("window").width;

  const handleSubmit = () => {
    handleNextPage(1);
  };

  return (
    <SafeAreaView
      className="items-center w-full"
      style={{ flex: 1, backgroundColor: isDark ? colors.black : colors.white }}
    >
      <StatusBar
        backgroundColor={isDark ? colors.black : colors.white}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ width: screenWidth, paddingBottom: 50 }}
      >
        <View className="items-start w-full px-5 mt-11">
          <Text className={`text-[27px] font-["sans-semibold"]`}>
            What type of account would you like to create?
          </Text>
          <Text className={`text-13px] font-["sans-regular"] pt-1`}>
            Select the account type that best meets your needs.
          </Text>
        </View>

        <View className="w-full px-5">
          <TouchableOpacity
            onPress={handleSubmit}
            className="items-center justify-center w-full h-[49px] rounded-[6px] bg-[#029CFC] mt-12"
          >
            <Text className={`text-[15px] font-["sans-regular"] text-white`}>
              Confirm your email
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
