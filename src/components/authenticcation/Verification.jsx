
import { useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';
import { confirmEmail } from '../../features/authentication/AuthActions';


export default function Verification() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [errorMssg, setErrorMssg] = useState(false);
    const route = useRoute();
    const regValues = route.params?.regValues

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
    const loading = useSelector((state) => state.auth.loading)
    const dispatch = useDispatch();

    const combinedString = otp.join('');
    const codes = {"verification_code" : combinedString}
    const type = {"request_type": "verify_code"}

     const handleSubmit = () => {
        const getmail = regValues.email
        const mail = {"email": getmail}
        const data = {...codes, ...type, ...mail}
        const verifyData = new FormData();
        // Append form field values to FormData
        Object.keys(data).forEach((key) => {
          verifyData.append(key, data[key]);
        });
        dispatch(confirmEmail(verifyData, setErrorMssg, navigation))
      };

  return (
    <SafeAreaView className="w-full h-full">
        <View className="items-start w-full px-5 mt-9">
          <Text className={`text-[27px] font-["sans-semibold"]`}>
               We just sent you an email 
           </Text>
          <Text className={`text-13px] font-["sans-regular"] pt-1`}>
               Enter the security code we just sent your email to confirm your email address.
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

             <View className="flex items-start w-full mt-10">
                   {errorMssg && <Text className="text-sm text-red-600">{errorMssg}</Text>}
             </View>

          <TouchableOpacity onPress={handleSubmit}
          disabled={!otp}
           className={`items-center justify-center w-full h-[49px] rounded-[6px] ${!loading ? 'bg-[#029CFC]' : 'bg-[#dddddd]' } mt-2`}>
                <Text className={`text-[15px] font-["sans-regular"] text-white`}>
                    {
                      loading
                      ?<ActivityIndicator style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} size={'large'} />
                      :'Confirm your email'
                    }
                </Text>
            </TouchableOpacity>

            <Pressable onPress={()=>navigation.navigate('resendCode')}
            >
               <Text className={`text-[11px] font-["sans-regular"] text-[#029CFC] mt-3`}>
                      Didn't receive the otp?
                </Text>
            </Pressable>
            
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})