import { Image, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../colors'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Choose({navigation}) {

  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem('seen_token', JSON.stringify('seenSplashScreen'));
      console.log('User data stored successfully!');
      navigation.navigate('login')
      navigation.navigate('loginScreen')
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }


  const handleRegister = async () => {
    try {
      await AsyncStorage.setItem('seen_token', JSON.stringify('seenSplashSeen'));
      console.log('User data stored successfully!');
      navigation.navigate('registration')
    } catch (error) {
      console.error('Error storing user data:', error);
    }
  }

  return (
    <View className="w-full h-full items-center justify-center">
      <View className="items-center justify-center w-full">
        <Image className="w-[140px] h-[144px]"
        source={require('../../assets/images/flexLogo.png')} />
        <Text className={`text-[32px] font-["sans-bold"] text-[#029CFC]`}>Flex App</Text>
      </View>

      <View className="absolute bottom-20 w-full px-5 items-center">
        <TouchableOpacity onPress={handleLogin}
        className="items-center justify-center h-[49px] rounded-md w-full mb-2">
           <Text className={`text-[15px] font-["sans-regular"] text-[#029CFC]`}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister}
        className="items-center justify-center h-[49px] rounded-md bg-[#029CFC] w-full">
           <Text className={`text-[15px] font-["sans-regular"] text-[#ffffff]`}>Create account</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
