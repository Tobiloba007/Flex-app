import { Dimensions, Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function SplashScreen(props) {
    const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView
    className="items-center justify-start h-full w-full">
        <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{width: screenWidth, height: '100%'}}>
        <View className="items-start w-full px-5">
            <Text className={`text-[40px] font-["sans-bold"] text-[#000000] w-[${props.titleWidth}] leading-[47px]`}>
                {props.title}
            </Text>
            <Text className={`text-[20px] font-["sans-regular"] text-[#000000] w-[85%] leading-7 mt-3`}>
                 {props.desc}
            </Text>
        </View>
        <View className="w-full items-center justify-center mt-7">
            <Image className={props.imageStyle}
            source={props.image} />
        </View>

        <View className="w-full px-5 absolute bottom-24">
            <TouchableOpacity onPress={props.handleBtn}
            className={`h-[49px] w-full items-center justify-center bg-[#029CFC] rounded-[25px] shadow-md`}>
                <Text className={`text-[15px] font-["sans-regular"] text-[#ffffff]`}>Continue</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>

    </SafeAreaView>
  )
}
