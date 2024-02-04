
import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from "@react-navigation/native";


export default function Verification() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const handleOtpChange = (value, index) => {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move focus to the next box if the current one has a value
      if (value && index < newOtp.length - 1) {
      inputs[index + 1].focus();
      }
    };
    const inputs = [];

    const navigation = useNavigation();

     const handleSubmit = () => {
        console.log(otp);
        navigation.navigate('home')
      };

  return (
    <SafeAreaView className="w-full h-full">
        <View className="items-start w-full px-5 mt-9">
          <Text className={`text-[27px] font-["sans-semibold"]`}>
               We just sent you an email
           </Text>
          <Text className={`text-13px] font-["sans-regular"] pt-1`}>
               Enter the security code we just sent to name@gmail.com to confirm your email address.
           </Text>
        </View>

        <View className="items-center w-full px-5 mt-11">
            <View className="flex-row items-center justify-between w-full">
                 {otp.map((digit, index) => (
                 <TextInput
                   key={index}
                   className="text-center rounded-[6px] border-[#C5C4C4] border-[1px] h-[49px] w-[14.3%]"
                   maxLength={1}
                   keyboardType="numeric"
                   onChangeText={(value) => handleOtpChange(value, index)}
                   value={digit}
                   ref={(input) => {
                     inputs[index] = input;
                   }}
                 />
               ))}
            </View>
          <TouchableOpacity onPress={handleSubmit}
           className="items-center justify-center w-full h-[49px] rounded-[6px] bg-[#029CFC] mt-12">
                <Text className={`text-[15px] font-["sans-regular"] text-white`}>
                     Confirm your email
                </Text>
            </TouchableOpacity>

            <Pressable>
               <Text className={`text-[11px] font-["sans-regular"] text-[#029CFC] mt-3`}>
                      Didn't receive the otp?
                </Text>
            </Pressable>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})