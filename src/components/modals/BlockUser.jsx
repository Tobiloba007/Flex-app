import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';


export default function BlockUser({setBlock}) {
  return (
    <View className='absolute top-[35%] z-50 flex flex-col items-center justify-start w-[65%] h-[20rem] bg-white rounded-xl py-5'>
          <View className='flex flex-row items-center justify-start w-full px-5'>
               <TouchableOpacity onPress={()=>setBlock(false)}>
                     <AntDesign name="close" size={20} color="black" />
               </TouchableOpacity>
               <Text className={`text-base text-[#000000] font-["sans-semibold"] ml-7`}>Block User</Text>
          </View>

          <View className='border-[0.4px] border-[#dddddd] w-full mt-3'></View>

          <TextInput className='w-[90%] h-56 border-[0.8px] border-[#dddddd] mt-8 rounded-3xl px-4 pt-4'
          placeholder='State your reason'
          placeholderTextColor='#A4A4A4'
          multiline={true}
          textAlignVertical="top"
          />

          <TouchableOpacity onPress={()=>setBlock(false)}
          className='mt-6'>
                  <Text className={`text-sm text-[#029CFC] font-["sans-semibold"]`}>Block</Text>
          </TouchableOpacity>


    </View>
  )
}

const styles = StyleSheet.create({})