import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import dp from '../../../assets/images/dp.jpg'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function ProfileTop() {
      const navigation = useNavigation();
  return (
    <SafeAreaView className='flex flex-col items-center justify-start w-full pt-12'>
          <TouchableOpacity className='absolute top-6 right-5'>
                 <Ionicons name="settings-sharp" size={27} color="black" />
          </TouchableOpacity>


          <View className='flex flex-col items-center justify-start w-full'>
               <View className='flex items-center justify-center w-20 h-20 bg-[#CDEAFC] rounded-full'>
                    <Image className='w-[80%] h-[80%] rounded-full' 
                    source={dp} alt='my displey_picture' />
                </View>
                <Text className={`text-xl text-[#029CFC] font-["sans-semibold"] mt-2`}>Anna Gaga</Text>
                <Text className={`text-sm text-[#000000] font-["sans-semibold"]`}>$Anna</Text>
          </View>



          <View className='flex flex-row items-center justify-center w-full mt-5'>
                <TouchableOpacity onPress={()=>navigation.navigate('seeRequests')}
                className='flex items-center justify-center bg-[#029CFC] w-[35%] h-11 rounded-xl'>
                      <Text className={`text-sm text-[#ffffff] font-["sans-medium"]`}>SEE REQUESTS</Text>
                </TouchableOpacity>
                <TouchableOpacity className='flex items-center justify-center bg-[#ffffff] w-[35%] h-11 rounded-xl'>
                      <Text className={`text-sm text-[#000000] font-["sans-medium"]`}>Edit Profile</Text>
                </TouchableOpacity>
          </View>



          <View className='flex flex-row items-center justify-center w-full mt-5'>
                <TouchableOpacity className='mr-7'>
                      <MaterialIcons name="phone-callback" size={24} color="#029CFC" />
                </TouchableOpacity>

                <TouchableOpacity className='mr-7'>
                      <MaterialIcons name="facebook" size={27} color="#029CFC" />
                </TouchableOpacity>

                <TouchableOpacity className='mr-7'>
                      <FontAwesome5 name="instagram" size={24} color="#029CFC" />
                </TouchableOpacity>

                <TouchableOpacity className=''>
                      <FontAwesome6 name="x-twitter" size={24} color="#029CFC" />
                </TouchableOpacity>

          </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})