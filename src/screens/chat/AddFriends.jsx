import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, ScrollView, Image } from 'react-native';
const friends = [
    { id: 1, name: 'Alice Joe', image: require('../../../assets/icons/ellipse-28.png') },
    { id: 2, name: 'Bob Marley', image: require('../../../assets/icons/ellipse-29.png') },
    { id: 3, name: 'Charlie Gabbage', image: require('../../../assets/icons/ellipse-31.png') },
  ];
  const people = [
    { id: 1, name: 'Alice Joe', image: require('../../../assets/icons/ellipse-28.png') },
    { id: 2, name: 'Bob Marley', image: require('../../../assets/icons/ellipse-29.png') },
    { id: 3, name: 'Charlie Gabbage', image: require('../../../assets/icons/ellipse-31.png') },
    { id: 4, name: 'Katera Lucy', image: require('../../../assets/icons/ellipse-28.png') },
  ];
const FriendRequests = ( ) => {

  return (
      <View className={'flex-1 pl-2'} style={{paddingTop: StatusBar.currentHeight}}>
        <View className={'pb-3 border-b border-gray-200'}>
            <Text className={'text-[27px] font-semibold text-[#000] pt-6 pl-5'}>Friends</Text>
        </View>
        <View className={'pt-1 border-b border-gray-200 pb-3'}>
            <View className={'flex-row items-center justify-between pl-2 pr-4'}>
                <Text className={'text-xl font-semibold text-[#000] pt-2 pb-3'}>Friend Requests</Text>
                <TouchableOpacity>
                    <Text>show all</Text>
                </TouchableOpacity>
            </View>
            
            <ScrollView>
                {
                    friends.map((friend) => (
                        <View className={'flex-row justify-between items-center p-3'} key={friend.id}>
                        <View className={'flex-row items-center'}>
                          <View className={'rounded-full bg-gray-300 w-12 h-12'}>
                            <Image
                                source={friend.image}
                            />
                          </View>
                          <View className={'ml-4'}>
                            <Text className={'text-lg font-bold text-[#000] mb-2'}>{friend.name}</Text>
                            <View className={'flex-row justify-between w-[280]'}>
                                <TouchableOpacity className={'bg-[#029CFC] p-2 rounded-lg w-[136px] h-[33px] items-center justify-center'}>
                                    <Text className={'text-[#fff]'}>Accept</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className={'bg-[#fa021f] p-2 rounded-lg w-[136px] h-[33px] items-center justify-center'}>
                                    <Text className={'text-[#fff]'}>Reject</Text>
                                </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                        )
                    )
                }
            </ScrollView>
        </View>
        <View>
            <Text className={'text-xl font-semibold text-[#000] pl-3 pt-2 pb-3'}>New People</Text>
            <ScrollView>
                {
                    people.map((friend) => (
                        <View className={'flex-row justify-between items-center p-3'} key={friend.id}>
                        <View className={'flex-row items-center'}>
                          <View className={'rounded-full bg-gray-300 w-12 h-12'}>
                            <Image
                                source={friend.image}
                            />
                          </View>
                          <View className={'ml-4'}>
                            <Text className={'text-lg font-bold text-[#000] mb-2'}>{friend.name}</Text>
                            <View className={'flex-row justify-between w-[280]'}>
                                <TouchableOpacity className={'bg-[#029CFC] p-2 rounded-lg w-[236px] h-[33px] items-center justify-center'}>
                                    <Text className={'text-[#fff]'}>Add Friend</Text>
                                </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                        )
                    )
                }
            </ScrollView>
        </View>
      </View>
  );
};

export default FriendRequests;
