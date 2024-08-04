import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "../../colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

const itemWidth = Dimensions.get("window").width;

export default function Choose({ navigation }) {
  const { isDark } = useSelector((state) => state.theme);

  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem(
        "seen_token",
        JSON.stringify("seenSplashScreen")
      );
      console.log("User data stored successfully!");
      navigation.navigate("login");
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  const handleRegister = async () => {
    try {
      await AsyncStorage.setItem(
        "seen_token",
        JSON.stringify("seenSplashSeen")
      );
      console.log("User data stored successfully!");
      navigation.navigate("registration");
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDark ? colors.black : colors.white }}
    >
      <StatusBar
        backgroundColor={isDark ? colors.black : colors.white}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <View
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: itemWidth * 0.1,
        }}
      >
        <View className="items-center justify-center w-full">
          <Image
            // className="w-[140px] h-[144px]"
            style={{
              height: itemWidth * 0.6,
              width: itemWidth * 0.6,
              borderRadius: 50,
            }}
            source={require("../../assets/images/logo.png")}
          />
          {/* <Text
            className={`font-["sans-bold"] text-[#029CFC]`}
            style={{ fontSize: itemWidth * 0.06 }}
          >
            Flex App
          </Text> */}
        </View>

        <View
          style={{
            width: "100%",
            padding: itemWidth * 0.05,
            marginTop: itemWidth * 0.2,
          }}
        >
          <TouchableOpacity
            onPress={handleLogin}
            className="items-center justify-center rounded-md mb-2"
            style={{ height: itemWidth * 0.12 }}
          >
            <Text
              className={`text-[15px] font-["sans-regular"] text-[#029CFC]`}
              style={{ color: isDark ? colors.white : "#029CFC" }}
            >
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleRegister}
            style={{
              height: itemWidth * 0.12,
              backgroundColor: colors.primary,
              borderRadius: 6,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              className={`text-[15px] font-["sans-regular"] text-[#ffffff]`}
            >
              Create account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
