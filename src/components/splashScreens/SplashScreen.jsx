import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "../../../colors";

export default function SplashScreen(props) {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        width: screenWidth,
        height: "auto",
        justifyContent: "space-between",
      }}
    >
      <View style={{ padding: screenWidth * 0.045 }}>
        <Text
          className={`text-[35px] font-["sans-bold"] text-[#000000] w-[${props.titleWidth}] leading-[47px]`}
        >
          {props.title}
        </Text>
        <Text
          className={`text-[18px] font-["sans-regular"] text-[#000000] w-[85%] leading-7 mt-3`}
        >
          {props.desc}
        </Text>
      </View>

      <View>
        <Image
          source={props.image}
          style={{ width: screenWidth, height: screenHeight * 0.5 }}
          resizeMode="cover"
        />
      </View>

      <View style={{ padding: screenWidth * 0.05 }}>
        <TouchableOpacity
          onPress={props.handleBtn}
          style={{
            backgroundColor: colors.primary,
            alignItems: "center",
            padding: screenWidth * 0.035,
            borderRadius: 40,
          }}
          //   className={`h-[49px] w-full items-center justify-center bg-[#029CFC] rounded-[25px] shadow-md`}
        >
          <Text className={`text-[15px] font-["sans-regular"] text-[#ffffff]`}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
