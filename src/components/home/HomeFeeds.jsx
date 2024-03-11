import React from 'react'
import { Dimensions, Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { feedData } from '../../feedData';


const HomeFeeds = () => {
    const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView className='flex flex-col items-start justify-start w-full pb-20'>
          <Text className={'text-xs text-black font-["sans-semibold"] mt-5'}>
               Feeds
          </Text>

          <View className='flex flex-col items-start justify-start w-full'>
          {feedData.map((item) => {
            return (
          <View key={item.id} className='flex flex-col items-start justify-start w-full mt-5'>
               <View className={'flex flex-row items-start justify-start w-full'}>
                    {/* LEFT*/}
                    <View className={'flex flex-col items-start justify-start w-[17%]'}>
                          {/* OWNER IMAGE*/}
                         <View className='w-[50px] h-[50px]'>
                              <Image className='w-full h-full rounded-full'
                              source={item.tweetImg} />
                         </View>
                         {/* VERTICAL BORDER*/}
                         <View className='h-6 border-[0.3px] border-[#959292] mt-[6px] ml-6'></View>
                          {/* COMMENT IMAGES*/}
                         <View className={'flex flex-row items-center justify-center mt-1 w-6 ml-2'}>
                               <Image className='w-5 h-5 rounded-full'
                               source={item.replyImg1} />
                               <Image className='w-5 h-5 rounded-full absolute left-3'
                               source={item.replyImg2} />
                         </View>

                         {/* FEATURED BORDER */}

                         {item.featuredComment !== null &&
                         <View className={'flex flex-row items-end justify-start left-6'}>
                              <View className='h-11 border-[0.3px] border-[#959292] mt-[6px]'></View>
                              <View className='w-8 border-[0.3px] border-[#959292] mt-[6px]'></View>
                         </View>
                         }
                    </View>

                    {/* RIGHT */}
                    <View className={'flex flex-col items-start justify-start w-[73%] mt-1'}>
                          {/* RIGHT TOP*/}
                          <View className={'flex flex-row items-center justify-between w-full'}>
                              <View className={'flex flex-row items-center justify-start'}>
                                  <Text numberOfLines={1} ellipsizeMode="tail"
                                  className={'text-[14px] text-black font-["sans-semibold"] mr-3'}>
                                       {item.name}
                                  </Text>
                                  <MaterialIcons name={item.verified} size={18} color="#029CFC" />
                              </View>

                              <View className={'flex flex-row items-center justify-start'}>
                                  <Text className={'text-[12px] text-[#959292] font-["sans-semibold"] mr-3'}>
                                       {item.time}
                                  </Text>
                                  <MaterialCommunityIcons name="dots-horizontal" size={16} color="black" />
                              </View>
                          </View>

                          {/* TWEET*/}
                          <View className='w-[90%]'>
                              <Text numberOfLines={3} ellipsizeMode="tail"
                              className={'text-xs text-[#585859] font-["sans-semibold"] mr-3 leading-5'}>
                                   {item.tweet}
                              </Text>
                          </View>

                          {/* LIKE, COMMENT, SHARE */}
                          <View className='flex flex-row items-start justify-start mt-2'>
                               <TouchableOpacity className={'mr-8'}>
                                  <AntDesign name="hearto" size={15} color="black" />
                               </TouchableOpacity>

                               <TouchableOpacity className={'mr-8'}>
                                  <FontAwesome5 name="comment" size={15} color="black" />
                               </TouchableOpacity>

                               <TouchableOpacity>
                                  <Fontisto name="share-a" size={13} color="black" />
                               </TouchableOpacity>
                          </View>

                          {/* FIRST REPLIES AND LIKES */}
                          <View className='flex flex-row items-start justify-start mt-1'>
                               <Text className={'text-[10px] text-[#959292] font-["sans-semibold"] mr-2'}>
                                    {item.replies} replies - {item.likes} Likes
                               </Text>
                          </View>


                          {/* FEATURED CONTENTS */}

                          { item.featuredComment !== null &&
                            <View>
                          <View className='flex flex-row items-start justify-start w-[75%] mt-2'>
                               <Image className='w-5 h-5 rounded-full'
                               source={item.featuredImg} />
                               <Text numberOfLines={2} ellipsizeMode="tail"
                               className={'text-[10px] text-[#585859] font-["sans-semibold"] ml-2 mt-1'}>
                                      {item.featuredComment}
                               </Text>
                          </View>

                            {/*BOTTOM LIKE, COMMENT, SHARE */}
                          <View className='flex flex-row items-start justify-start mt-2'>
                               <TouchableOpacity className={'mr-4'}>
                                  <AntDesign name="hearto" size={15} color="black" />
                               </TouchableOpacity>

                               <TouchableOpacity className={'mr-4'}>
                                  <FontAwesome5 name="comment" size={15} color="black" />
                               </TouchableOpacity>

                               <TouchableOpacity>
                                  <Fontisto name="share-a" size={13} color="black" />
                               </TouchableOpacity>
                          </View>

                          {/*FIRST REPLIES AND LIKES */}
                          <View className='flex flex-row items-start justify-start mt-1'>
                               <Text className={'text-[10px] text-[#959292] font-["sans-semibold"] mr-2'}>
                                    {item.featuredReplies} replies - {item.featuredLikes} Likes
                               </Text>
                          </View>
                          </View>
                          }
                    </View>

               </View>

               <View className='border-[0.3px] border-[#dddddd] w-full mt-6' style={{ width: screenWidth }}></View>

          </View>
          )
          })}
          </View>

    </SafeAreaView>
  )
}

export default HomeFeeds
