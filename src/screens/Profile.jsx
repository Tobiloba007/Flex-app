import { Dimensions, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileTop from '../components/profile/ProfileTop'
import ProfileTransactions from '../components/profile/ProfileTransactions';



export default function Profile() {
    const screenWidth = Dimensions.get('window').width;
  return (
    <SafeAreaView className='flex flex-col items-center justify-start h-full w-full bg-white' style={{paddingTop: StatusBar.currentHeight}}>
        <ScrollView>
           <ProfileTop />
           <ProfileTransactions />
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})