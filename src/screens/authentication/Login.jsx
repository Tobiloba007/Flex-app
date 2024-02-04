import { Image, Pressable, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


export default function Login({navigation}) {
    const [close, setClose] = useState(false)

  return (
    <SafeAreaView clasName="items-center w-full h-full" style={{paddingTop: StatusBar.currentHeight}}>
        <View className="items-center justify-center w-full mt-5">
            <Text className={`text-[15px] font-["sans-semibold"]`}>Login</Text>
            <TouchableOpacity onPress={()=>navigation.goBack()}
            className="absolute left-5 w-[30px] h-[41px] top-1">
               <SimpleLineIcons name="arrow-left" size={16} color="black" />
            </TouchableOpacity>
        </View>


        <View className="items-center w-full px-5 mt-20">
            <TouchableOpacity className="flex-row items-center justify-center w-full h-[49px] border-[0.5px] border-[#8A8A8A] rounded-[37px] mb-4">
                <Image className="w-[18px] h-[19px] mr-5"
                source={require('../../../assets/icons/google.png')} />
                <Text className={`text-[14px] font-["sans-regular"]`}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-center w-full h-[49px] border-[0.5px] border-[#8A8A8A] rounded-[37px]">
                <Image className="w-[16px] h-[25px] mr-5"
                source={require('../../../assets/icons/apple.png')} />
                <Text className={`text-[14px] font-["sans-regular"]`}>Continue with Google</Text>
            </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between w-full px-5 mt-12">
            <View className="border-[0.5px] opacity-25 w-[47%]"></View>
            <Text className={`text-[12px] font-["sans-regular"]`}>or</Text>
            <View className="border-[0.5px] opacity-25 w-[47%]"></View>
        </View>

        <View className="items-center w-full px-5 mt-6">
            <View className="items-start w-full mb-5">
                <Text className={`text-[12px] font-["sans-regular"]`}>Email address</Text>
                <TextInput 
                className="w-full h-[49px] border-[#029CFC] border-[1px] mt-3 rounded-[6px] pl-4"
                placeholder='example@gmail.com'
                />
            </View>

            <View className="items-start w-full mb-7">
                <Text className={`text-[12px] font-["sans-regular"]`}>Password</Text>
                <TextInput 
                className="w-full h-[49px] border-[#029CFC] border-[1px] mt-3 rounded-[6px] pl-4"
                placeholder='Password'
                secureTextEntry={close ? true : false}
                />
                <Pressable onPress={()=>setClose(!close)}
                className="absolute bottom-3 right-4">
                    {
                      close 
                      ? <AntDesign name="eye" size={24} color="#029CFC" />
                      : <Ionicons name="eye-off-sharp" size={24} color="#029CFC" />
                    }
                </Pressable>
            </View>

            <TouchableOpacity onPress={()=>navigation.navigate('home')}
            className="items-center justify-center w-full h-[49px] rounded-[6px] bg-[#029CFC]">
                <Text className={`text-[15px] font-["sans-regular"] text-white`}>Login</Text>
            </TouchableOpacity>

        </View>

        <View className="flex-row items-center justify-between w-full px-5 mt-3">
            <Pressable>
               <Text className={`text-[12px] font-["sans-regular"] text-[#029CFC]`}>Forgot Password?</Text>
            </Pressable>
            <Pressable>
               <Text className={`text-[12px] font-["sans-regular"] text-[#029CFC]`}>Create New Account</Text>
            </Pressable>
        </View>

    </SafeAreaView>
  )
}
