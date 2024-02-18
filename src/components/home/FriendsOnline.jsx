import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import image1 from '../../../assets/images/dp.jpg'
import image2 from '../../../assets/images/dp2.jpg'
import image3 from '../../../assets/images/dp3.jpg'
import image4 from '../../../assets/images/dp4.jpg'
import image5 from '../../../assets/images/dp5.jpg'


export default function FriendsOnline() {
    const friends = [image1, image2, image3, image4, image5, image1,]

  return (
    <View style={styles.wrapper} className={'flex flex-col items-start justify-start w-full overflow-hidden h-[135px] p-4 rounded-2xl bg-[#E6F6FF] mt-5'}>
      <View className={'flex flex-row items-center justify-between w-full'}>
           <Text className={'text-[16px] font-["sans-semibold"] text-[#565657]'}>
                Friends online
           </Text>
           <Text className={'text-[12px] font-["sans-semibold"] text-[#000000]'}>
                Show all
           </Text>
      </View>

      <View className={'flex flex-row items-center justify-start overflow-hidden w-full mt-3'}>
           {friends.map((item, index) => {
            return(
                <View key={index} className={'h-[60px] w-14 mr-4'}>
                     <Image className={'h-[59px] w-[59px] rounded-full'}
                     source={item} />
                     <View className={'absolute right-0 top-[2px] h-3 w-3 bg-[#97FC73] rounded-full'}></View>
                </View>
            )
           })}
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
    wrapper: {
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 2,
    },
})