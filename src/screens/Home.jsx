import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeTop from '../components/home/HomeTop';
import FriendsOnline from '../components/home/FriendsOnline';
import HomeFeeds from '../components/home/HomeFeeds';

export default function Home() {
  const [user, setUser] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('user_data');
        
        if (storedItems !== null) {
          const parsedItems = JSON.parse(storedItems);
          setUser(parsedItems);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView className="flex-1 items-center justify-start w-full mt-4 px-4 bg-white" style={{paddingTop: StatusBar.currentHeight}}>
        <HomeTop />
        <FriendsOnline />
        <ScrollView
        showsVerticalScrollIndicator={false}
        >
            <HomeFeeds />
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})