import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { BASE_URL } from "../../config";

export default function ReportUser({
  setReport,
  setBlock,
  user_id,
  reportAccountId,
}) {
  const handleBlockUser = async () => {
    const formData = new FormData();
    formData.append("report_user_id", user_id);
    formData.append("user_account_id", reportAccountId);
    formData.append("report", "This account is spamming on flexapp users");

    try {
      const res = await fetch(`${BASE_URL}/user_report.php`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      Alert.alert(data?.message, [
        {
          text: "OK",
          onPress: () => {
            setReport(false);
            setBlock(true);
          },
        },
      ]);
    } catch (error) {}
  };

  return (
    <View className="absolute top-[35%] z-50 flex flex-col items-center justify-start w-[65%] h-[20rem] bg-white rounded-xl py-5">
      <View className="flex flex-row items-center justify-start w-full px-5">
        <TouchableOpacity onPress={() => setReport(false)}>
          <AntDesign name="close" size={20} color="black" />
        </TouchableOpacity>
        <Text
          className={`text-base text-[#000000] font-["sans-semibold"] ml-7`}
        >
          Report User
        </Text>
      </View>

      <View className="border-[0.4px] border-[#dddddd] w-full mt-3"></View>

      <Text
        className={`text-xs text-[#000000] font-["sans-semibold"] mt-8 px-5 leading-5`}
      >
        If this user uses abusive, inappropriate, harmful content or if you
        think that this user violates Flexap's rules
      </Text>

      <View className="border-[0.3px] border-[#029CFC] w-[90%] mt-8"></View>

      <View className="flex flex-row items-center justify-end w-full px-5 mt-5">
        <TouchableOpacity onPress={() => setReport(false)}>
          <Text className={`text-[13px] text-[#000000] font-["sans-medium"]`}>
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setReport(false)}>
          <Text
            className={`text-[13px] text-[#029CFC] font-["sans-medium"] ml-6`}
          >
            Report
          </Text>
        </TouchableOpacity>
      </View>

      <Pressable
        onPress={handleBlockUser}
        className="flex items-center justify-center w-full mt-6"
      >
        <Text className={`text-[10px] text-[#029CFC] font-["sans-medium"]`}>
          Want to block the User?
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
