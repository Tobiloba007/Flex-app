import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import PagerView from 'react-native-pager-view';
import React, { useRef, useState } from 'react'
import SplashScreen from '../components/splashScreens/SplashScreen';
import { colors } from '../../colors';

export default function Splash({navigation}) {
    const title1 = 'Send Money to those who matter'
    const titleWidth1 = '80%'
    const desc1 = 'Make international transfers to local bank account and mobile money wallets.'
    const image1 = require('../../assets/images/splash1.png')
    const imageStyle1 = 'h-[275px] w-full'

    const title2 = 'Safe and secure transfers'
    const titleWidth2 = '80%'
    const desc2 = 'Your transactions and personal data are securely protected.'
    const image2 = require('../../assets/images/splash2.png')
    const imageStyle2 = 'h-[325px] w-full'

    const title3 = 'Find local events and activities around you.'
    const titleWidth3 = '100%'
    const desc3 = ''
    const image3 = require('../../assets/images/splash3.png')
    const imageStyle3 = 'h-[289px] w-[80%]'

    const title4 = 'Meet new people and explore what your friends are doing'
    const titleWidth4 = '100%'
    const desc4 = ''
    const image4 = require('../../assets/images/splash4.png')
    const imageStyle4 = 'h-[289px] w-[80%]'

    const pagerRef = useRef(null);
    const [scroll, setScroll] = useState(0)
     
    const handleNextPage = (currentPage) => {
      pagerRef.current?.setPage(currentPage);
    };

    const onPageSelected = (e) => {
        setScroll(e.nativeEvent.position)
        // console.log(scroll);
      };

 


  return (
    <SafeAreaView className="h-full w-full" style={{paddingTop: StatusBar.currentHeight}}>
        <View ref={pagerRef} className="flex-row justify-start items-start w-full px-5 pb-5 pt-4">
            <View className={`bg-[#D9D9D9] h-[6px] w-[6px] rounded-full mr-[2px] ${scroll === 0 && `bg-[${colors.primary}] w-[16px]` }`}></View>
            <View className={`bg-[${scroll === 1 ? colors.primary : '#D9D9D9'}] h-[6px] w-[${scroll === 1 ? '16px' : '6px'}] rounded-full mr-[2px]`}></View>
            <View className={`bg-[#D9D9D9] h-[6px] w-[6px] rounded-full mr-[2px] ${scroll === 2 && `bg-[${colors.primary}] w-[16px]` }`}></View>
            <View className={`bg-[#D9D9D9] h-[6px] w-[6px] rounded-full mr-[2px] ${scroll === 3 && `bg-[${colors.primary}] w-[16px]` }`}></View>
        </View>
        <PagerView className="h-full w-full" ref={pagerRef} pageMargin={20} onPageSelected={onPageSelected}>
            <View key="1" className="items-center justify-center">
                <SplashScreen title={title1} desc={desc1} image={image1} 
                titleWidth={titleWidth1} imageStyle={imageStyle1} 
                handleBtn={() => handleNextPage(1)}
                />
            </View>
            <View key="2" className="items-center justify-center">
                <SplashScreen title={title2} desc={desc2} image={image2} 
                titleWidth={titleWidth2} imageStyle={imageStyle2} 
                handleBtn={() => handleNextPage(2)}
                />
            </View>
            <View key="3" className="items-center justify-center h-full w-full">
                <SplashScreen  title={title3} desc={desc3} image={image3} 
                titleWidth={titleWidth3} imageStyle={imageStyle3} 
                handleBtn={() => handleNextPage(3)}
                />
            </View>
            <View key="4" className="items-center justify-center h-full w-full">
                <SplashScreen  title={title4} desc={desc4} image={image4} 
                titleWidth={titleWidth4} imageStyle={imageStyle4} 
                handleBtn={() => navigation.navigate('choose')}
                />
            </View>
        </PagerView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})