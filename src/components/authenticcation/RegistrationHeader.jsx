import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

export default function RegistrationHeader({navigation, scroll}) {
  return (
    <SafeAreaView className="items-center justify-center w-full" 
    style={{paddingTop: StatusBar.currentHeight, marginTop: Platform.OS === 'ios' ? 25 : 40}}>
        <View className="flex-row items-center justify-center w-full pb-2">
          <View className={`w-[45px] h-[7px] bg-[#D9D9D9] rounded-[6px] mr-1 ${scroll === 0 && `bg-[#029CFC]`} `}></View>
          <View className={`w-[45px] h-[7px] bg-[#D9D9D9] rounded-[6px] mr-1 ${scroll === 1 && `bg-[#029CFC]`}`}></View>
          <View className={`w-[45px] h-[7px] bg-[#D9D9D9] rounded-[6px] mr-1 ${scroll === 2 && `bg-[#029CFC]`}`}></View>

          <TouchableOpacity onPress={() => navigation.goBack()}
          className={`absolute left-5 bottom-0`}
          >
              <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})