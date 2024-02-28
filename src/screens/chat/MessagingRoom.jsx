import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
//import { ScrollView } from 'react-native-gesture-handler';
const messages = [
    {
      "sender": "user",
      "message": "Hi there! How can I help you today?"
    },
    {
      "sender": "bot",
      "message": "Hello! I'm here to assist you with any questions or concerns you may have. What can I do for you?"
    },
    {
      "sender": "user",
      "message": "I'm looking for information on your products. Can you tell me about your latest offerings?"
    },
    {
      "sender": "bot",
      "message": "Certainly! We have a range of products including electronics, clothing, and accessories. Is there a specific category you're interested in?"
    },
    {
      "sender": "user",
      "message": "I'm interested in electronics. What new gadgets do you have?"
    },
    {
      "sender": "bot",
      "message": "Great choice! Our latest electronics include cutting-edge smartphones, smartwatches, and virtual reality headsets. Anything specific you'd like to know about?"
    },
    {
      "sender": "user",
      "message": "Tell me more about the smartphones. Any new features or models?"
    },
    {
      "sender": "bot",
      "message": "Certainly! Our newest smartphone models boast improved cameras, longer battery life, and faster processors. We have both flagship and budget-friendly options to suit your needs. Anything else you'd like to inquire about?"
    },
    {
      "sender": "user",
      "message": "That sounds interesting. What colors are available for the flagship smartphones?"
    },
    {
      "sender": "bot",
      "message": "Our flagship smartphones are available in a variety of stylish colors, including Midnight Black, Sapphire Blue, and Rose Gold. You can choose the one that suits your preferences. Anything else I can assist you with?"
    },
    {
      "sender": "user",
      "message": "No, that's all for now. Thanks for the information!"
    },
    {
      "sender": "bot",
      "message": "You're welcome! If you have any more questions in the future, feel free to ask. Have a great day!"
    }
  ]
const MessagingRoom = () => {

  return (
    <View className={'flex-1 pl-2'} style={{paddingTop: StatusBar.currentHeight}}>
      <View className={'pt-5 items-center'}>
        <Text className={'text-xl font-bold text-[25px]'}>Grace</Text>
      </View>
      <ScrollView className={'bg-gray-100 p-4'}>
        { messages.map((message) => (
        <View className={`rounded-lg ${message.sender == 'bot'? 'bg-blue-500 ml-[100px]' : 'bg-gray-300'} p-3 mb-3 w-[240px] float-right`}>
          <Text className={`float-right ${message.sender == 'bot'? 'text-[#fff]' : ''}`}>{message.message}</Text>
        </View>
        )
        )}
      </ScrollView>
      <View className={'flex-row items-center p-4'}>
        <TextInput className={'flex-1 bg-white rounded-full p-2'} placeholder="Type a message" />
        <TouchableOpacity className={'ml-2'}>
          {/* Icons for attachments, emojis, and voice messages would go here */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessagingRoom;
