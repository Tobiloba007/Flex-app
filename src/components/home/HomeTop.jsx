import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import image from '../../../assets/images/dp.jpg'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeTop() {
     const navigation = useNavigation();

  return (
    <View className={'flex flex-row items-center justify-between w-full'}>
         <View className={'items-center justify-center rounded-full border-[7px] border-[#E6F6FF]'}>
             <Image className={'h-12 w-12 rounded-full'}
             source={image} />
         </View>

         <View className='w-[70%]'>
             <TextInput className={'h-9 w-full bg-[#DEF9FF] rounded-3xl pl-6 text-sm'} />
             <View className={'absolute top-[10px] right-5'}>
                  <Feather name="search" size={18} color="black" />
             </View>
         </View>

         <TouchableOpacity onPress={()=>navigation.navigate('notification')}
         >
              <Ionicons className={'relative'}
              name="notifications" size={22} color="black" />
              <View className={'absolute right-1 top-[2px] h-2 w-2 bg-red-600 rounded-full'}></View>
         </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({})