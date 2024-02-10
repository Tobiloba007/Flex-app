import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import PagerView from 'react-native-pager-view';
import Registration1 from '../../components/authenticcation/Registration1';
import RegistrationHeader from '../../components/authenticcation/RegistrationHeader';
import Verification from '../../components/authenticcation/Verification';
import AccountType from './AccountType';

export default function Registration({navigation}) {
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
    <SafeAreaView className="flex-1">
      <RegistrationHeader navigation={navigation} scroll={scroll} />
      <PagerView style={styles.viewPager} ref={pagerRef} initialPage={0} onPageSelected={onPageSelected} scrollEnabled={false}>
        <View key="1">
           <AccountType handleNextPage={handleNextPage} />
        </View>
        <View style={styles.page} key="2">
            <Registration1 handleNextPage={handleNextPage}  />
        </View>
        <View style={styles.page} key="3">
            <Verification />
        </View>
      </PagerView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
      },
      page: {
        justifyContent: 'center',
        alignItems: 'center',
      },
})