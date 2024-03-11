import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import image1 from '../../../assets/images/dp2.jpg'
import image2 from '../../../assets/images/dp3.jpg'
import image3 from '../../../assets/images/dp4.jpg'

export default function ProfileTransactions() {
  const transData = [
    {
      id: 1,
      type: 'credit',
      image: image1,
      name: 'Janet Sonia',
      details: '₦0.0 03-01-2024',
      balance: '+$55.00'
    },
    {
      id: 2,
      type: 'debit',
      image: image2,
      name: 'Susan Ini',
      details: '₦0.0 03-01-2024',
      balance: '-$76.02'
    },
    {
      id: 3,
      type: 'credit',
      image: image3,
      name: 'John Soe',
      details: '₦0.0 03-01-2024',
      balance: '+$250.05'
    },
    {
      id: 4,
      type: 'credit',
      image: image1,
      name: 'Janet Sonia',
      details: '₦0.0 03-01-2024',
      balance: '+$55.00'
    },
    {
      id: 5,
      type: 'debit',
      image: image2,
      name: 'Susan Ini',
      details: '₦0.0 03-01-2024',
      balance: '-$76.02'
    },
    {
      id: 6,
      type: 'credit',
      image: image3,
      name: 'John Soe',
      details: '₦0.0 03-01-2024',
      balance: '+$250.05'
    },
  ]

  return (
    <View className='flex flex-col items-center justify-start w-full mt-10 px-3 pb-28'>
          <Text className={`text-base text-[#848485] font-["sans-semibold"] text-start w-full px-6`}>TRANSACTIONS</Text>

          <View className='flex flex-col items-center justify-start w-full mt-1'>
               {transData.map((data) => {
                return(
                  <TouchableOpacity key={data.id} className='flex flex-row items-center justify-between w-full h-16 px-4 py-2 border-[1px] border-[#D9F0FF] rounded-2xl mt-3'>
                       <View className='flex flex-row items-center justify-start'>
                             <Image className='h-12 w-12 rounded-full'
                             source={data.image} alt='transaction' />
                             <View className='pl-5'>
                                 <Text className={`text-sm text-[#585859] font-["sans-semibold"] text-start`}>
                                      {data.name}
                                 </Text>
                                 <Text className={`text-[9px] text-[#959292] font-["sans-semibold"] text-start`}>
                                      {data.details}
                                 </Text>
                             </View>
                       </View>
   
                       <Text className={`text-base ${data.type === 'credit' ? 'text-[#00C974]' :  'text-[#EA358C]'} font-["sans-semibold"] text-start`}>
                                    {data.balance}
                       </Text>
                  </TouchableOpacity>
                )
               })}
          </View>

    </View>
  )
}

const styles = StyleSheet.create({})