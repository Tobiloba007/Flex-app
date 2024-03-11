import { Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import dp from '../../assets/images/dp4.jpg'
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ReportUser from '../components/modals/ReportUser';
import BlockUser from '../components/modals/BlockUser';



export default function SeeRequests() {
    const [dropdown, setDropdown] = useState(false)
    const [report, setReport] = useState(false)
    const [block, setBlock] = useState(false)
    const navigation = useNavigation();

    const handleReport = () => {
        setDropdown(false)
        setReport(true)
    }

    const handleBlock = () => {
        setDropdown(false)
        setBlock(true)
    }


  return (
    <SafeAreaView className={`flex flex-col items-center justify-start w-full bg-white`} style={{paddingTop: StatusBar.currentHeight}}>
        <View className={`flex flex-col items-center justify-start w-full h-full bg-white ${report | block && 'bg-[#cccccc] opacity-50'}`}>
           <View className='flex items-center justify-center w-full h-[75px] bg-white shadow-3xl border-b-[1px] border-[#eeeeee]'>
               <Text className={`text-center text-black font-["sans-semibold"] text-base mt-4`}>FRIEND REQUESTS</Text>

               <TouchableOpacity onPress={()=>navigation.goBack()}
               className='absolute top-8 left-3'>
                       <AntDesign name="arrowleft" size={24} color="black" />
               </TouchableOpacity>
           </View>

           <View className='flex flex-row items-center justify-center w-full mt-12'>
                <TouchableOpacity className='flex items-center justify-center h-8 w-28 rounded-2xl bg-[#D9D9D9]'>
                       <FontAwesome name="user" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity className='flex items-center justify-center h-8 w-28 rounded-2xl bg-[#029CFC] ml-2'>
                       <FontAwesome name="users" size={22} color="white" />
                </TouchableOpacity>
           </View>


           <View className='flex items-center justify-start w-full h-full mt-6 px-3'>
                 <View className='flex flex-col items-center justify-start w-full h-full rounded-3xl border-[1px] border-[#cccccc] px-5'>

                       <View className='flex flex-col items-center justify-start w-full mt-6'>
                            <View className='flex items-center justify-center w-[75px] h-[75px] bg-[#CDEAFC] rounded-full'>
                                 <Image className='w-[80%] h-[80%] rounded-full' 
                                 source={dp} alt='my displey_picture' />
                             </View>
                             <Text className={`text-sm text-[#000000] font-["sans-semibold"] mt-2`}>Dele Koa</Text>
                             <Text className={`text-xs text-[#000000] font-["sans-regular"]`}>$Anna</Text>
                       </View>

                       <TouchableOpacity onPress={()=>setDropdown(true)}
                       className='absolute top-8 right-5'>
                             <Entypo name="dots-three-vertical" size={18} color="black" />
                       </TouchableOpacity>
                       {dropdown &&
                       <View className='absolute top-10 right-6 flex flex-col items-center justify-center w-[100px] h-[85px] border-[#cccccc] border-[1px] bg-white rounded-md'>
                              <Pressable onPress={handleReport}>
                                  <Text className={`text-xs text-[#000000] font-["sans-regular"] text-left`}>Report User</Text>
                              </Pressable>

                              <Pressable onPress={handleBlock}
                              className='mt-5'>
                                  <Text className={`text-xs text-[#000000] font-["sans-regular"] text-left`}>Block User</Text>
                              </Pressable>
                       </View>
                       }
  
  
  
                       <View className='flex flex-row items-center justify-center w-full mt-5'>
                             <TouchableOpacity className='flex items-center justify-center bg-[#ffffff] w-[35%] h-10 rounded-xl border-[1px] border-[#cccccc]'>
                                   <Text className={`text-xs text-[#029CFC] font-["sans-medium"]`}>ADD FRIEND</Text>
                             </TouchableOpacity>

                             <TouchableOpacity className='flex items-center justify-center bg-[#ffffff] w-[35%] h-10 rounded-xl ml-5 border-[1px] border-[#cccccc]'>
                                   <Text className={`text-xs text-[#029CFC] font-["sans-medium"]`}>3 FRIENDS</Text>
                             </TouchableOpacity>
                       </View>

                       <TouchableOpacity className='flex items-center justify-center h-12 w-full bg-[#029CFC] rounded-3xl mt-8'>
                             <Text className={`text-sm text-[#ffffff] font-["sans-semibold"]`}>PAY OR REQUEST</Text>
                       </TouchableOpacity>
                 </View>
           </View>

         </View>

           {report && <ReportUser setReport={setReport} setBlock={setBlock} />}
           {block && <BlockUser setBlock={setBlock} />}

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})