import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";

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


  return (
    <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Hello, {user.fname}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})