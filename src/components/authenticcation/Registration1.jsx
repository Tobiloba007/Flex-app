import { Dimensions, Pressable, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import RegistrationHeader from './RegistrationHeader'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function Registration1(props) {
    const [close, setClose] = useState(false);
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);

    const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView className="items-center w-full" style={{paddingTop: StatusBar.currentHeight}}>
        <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{width: screenWidth, paddingBottom: 50}}
        >
        <View className="items-start w-full px-5 mt-11">
           <Text className={`text-[27px] font-["sans-semibold"]`}>
                Confirm your details
           </Text>

           <View className="flex-row items-center justify-between w-full mt-8">
              <View className="items-start w-[48%]">
                  <Text className={`text-[12px] font-["sans-regular"]`}>
                       First Name
                  </Text>
                  <TextInput
                  className="h-[49px] w-full pl-4 border-[1px] border-[#8A8A8A] rounded-[6px] mt-2 text-[13px]"
                  placeholder='John'
                   />
              </View>

              <View className="items-start w-[48%]">
                  <Text className={`text-[12px] font-["sans-regular"]`}>
                       Last Name
                  </Text>
                  <TextInput
                  className="h-[49px] w-full pl-4 border-[1px] border-[#8A8A8A] rounded-[6px] mt-2 text-[13px]"
                  placeholder='Doe'
                   />
              </View>
           </View>
           <Text className={`text-[11px] font-["sans-regular"] text-[#8A8A8A] mt-2`}>
                Please ensure this is first and last name on your Government ID document.
           </Text>

           <View className="items-start w-full mt-6">
                  <Text className={`text-[12px] font-["sans-regular"]`}>
                        Email address
                  </Text>
                  <TextInput
                  className="h-[49px] w-full pl-4 border-[1px] border-[#8A8A8A] rounded-[6px] mt-2 text-[13px]"
                  placeholder='name@gmail.com'
                   />
           </View>

           <View className="items-start w-full mt-6">
                  <Text className={`text-[12px] font-["sans-regular"]`}>
                       Create password
                  </Text>
                  <TextInput
                  className="h-[49px] w-full pl-4 border-[1px] border-[#8A8A8A] rounded-[6px] mt-2 text-[13px]"
                  placeholder='password'
                  secureTextEntry={close ? false : true}
                   />
                   <Pressable onPress={()=>setClose(!close)}
                   className="absolute right-4 bottom-[14px]">
                       <Ionicons name={close ? 'eye-off-outline' : 'eye-outline'} size={23} color="black" />
                   </Pressable>
           </View>

           <View className="items-start w-full mt-6">
                  <Text className={`text-[12px] font-["sans-regular"]`}>
                       Confirm password
                  </Text>
                  <TextInput
                  className="h-[49px] w-full pl-4 border-[1px] border-[#8A8A8A] rounded-[6px] mt-2 text-[13px]"
                  placeholder='password'
                  secureTextEntry={close ? false : true}
                   />
                   <Pressable onPress={()=>setClose(!close)}
                   className="absolute right-4 bottom-[14px]">
                       <Ionicons name={close ? 'eye-off-outline' : 'eye-outline'} size={23} color="black" />
                   </Pressable>
           </View>

           <View className="flex-row items-start justify-start w-full mt-8">
                 <Pressable onPress={()=>setCheck1(!check1)}
                  className="h-[17px] w-[14px] pl-4 border-[1px] border-[#029CFC] rounded-[4px] items-center justify-center"
                  >
                     {check1 && <Feather style={{position: 'absolute'}} name="check" size={16} color="black" />} 
                  </Pressable>
                  <Text className={`text-[10px] font-["sans-regular"] px-5`}>
                       I acknowledge that I have read, understand, and agree to be bound by Flex App's Merchant Service Agreement (MSA). Terms and Conditions, and Privacy Notice
                  </Text>
           </View>

           <View className="flex-row items-start justify-start w-full mt-7">
                  <Pressable onPress={()=>setCheck2(!check2)}
                  className="h-[17px] w-[14px] pl-4 border-[1px] border-[#029CFC] rounded-[4px] items-center justify-center"
                  >
                     {check2 && <Feather style={{position: 'absolute'}} name="check" size={16} color="black" />} 
                  </Pressable>

                  <Text className={`text-[10px] font-["sans-regular"] px-5`}>
                  I agree to receive news, offers, and promotional materials from Flex App.
                  </Text>
           </View>


           <TouchableOpacity onPress={props.handleBtn}
           className="items-center justify-center w-full h-[49px] rounded-[6px] bg-[#029CFC] mt-10">
                <Text className={`text-[15px] font-["sans-regular"] text-white`}>
                    Create your account
                </Text>
            </TouchableOpacity>

        </View>
        </ScrollView>

    </SafeAreaView>
  )
}
