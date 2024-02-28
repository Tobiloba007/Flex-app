import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, ScrollView, Image } from 'react-native';
const friends = [
    { id: 1, name: 'Alice', image: require('../../../assets/icons/ellipse-28.png') },
    { id: 2, name: 'Bob', image: require('../../../assets/icons/ellipse-29.png') },
    { id: 3, name: 'Charlie', image: require('../../../assets/icons/ellipse-31.png') },
    { id: 4, name: 'Alice', image: require('../../../assets/icons/ellipse-32.png') },
    { id: 5, name: 'Bob', image: require('../../../assets/icons/ellipse-28.png') },
    { id: 6, name: 'Charlie', image: require('../../../assets/icons/ellipse-28.png') },
  ];
const ChatRoom = ( ) => {

  return (
      <View className={'flex-1 flex-row pl-2'} style={{paddingTop: StatusBar.currentHeight}}>
        <View className={'w-[65px] items-center'}>
            <Text className={'text-xl font-semibold text-[#000] pt-6'}>Friends</Text>
            <ScrollView>
                {
                    friends.map((friend) => (
                            <View key={friend.id} className='flex-row items-center p-4'>
                                <Image 
                                    source={friend.image}
                                />
                            </View>
                        )
                    )
                }
            </ScrollView>
        </View>
        <View className={'flex-1'}>
        <View className={'p-4 border-b border-gray-200'}>
          <Text className={'text-[25px] font-bold text-center font-["sans-bold"]'}>Chat Room</Text>
        </View>
        <View className={'p-4'}>
          <Text
            className={'p-2 pl-20 bg-[#02CFFC] rounded-lg'}>Find or start a conversation</Text>
        </View>
        <View className={'flex-1 justify-center items-center p-4'}>
          <Image
            source={require('../../../assets/icons/chat-svg.png') }
          />
          <Text className={'text-xl font-semibold text-[#000] pt-6'}>
            Your Chat Is Empty
          </Text>
          <Text className={'text-center text-[#000000] p-8 text-[15px] font-["sans-regular"]'}>
            It looks like you haven’t messaged anyone yet. Simply click on button below to begin chatting with your friends and colleagues.
          </Text>
          <TouchableOpacity className={'bg-[#029CFC] p-2 rounded-sm w-[237px] h-[49px] items-center justify-center'}>
            <Text className={'text-white font-bold '}>New Chat</Text>
          </TouchableOpacity>
        </View>
        </View>
        
        {/* Add navigation and friends list components here */}
      </View>
  );
};

export default ChatRoom;
