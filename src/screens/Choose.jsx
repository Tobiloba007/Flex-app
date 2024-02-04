import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../colors'

export default function Choose({navigation}) {
  return (
    <View className="w-full h-full items-center justify-center">
      <View className="items-center justify-center w-full">
        <Image className="w-[140px] h-[144px]"
        source={require('../../assets/images/flexLogo.png')} />
        <Text className={`text-[32px] font-["sans-bold"] text-[#029CFC]`}>Flex App</Text>
      </View>

      <View className="absolute bottom-20 w-full px-5 items-center">
        <TouchableOpacity onPress={()=>navigation.navigate('login')}
        className="items-center justify-center h-[49px] rounded-md w-full mb-2">
           <Text className={`text-[15px] font-["sans-regular"] text-[#029CFC]`}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('registration')}
        className="items-center justify-center h-[49px] rounded-md bg-[#029CFC] w-full">
           <Text className={`text-[15px] font-["sans-regular"] text-[#ffffff]`}>Create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
