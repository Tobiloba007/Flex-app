import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import PagerView from 'react-native-pager-view';
import Registration1 from '../../components/authenticcation/Registration1';
import RegistrationHeader from '../../components/authenticcation/RegistrationHeader';
import Verification from '../../components/authenticcation/Verification';

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
            <Registration1  handleBtn={() => handleNextPage(1)}/>
        </View>
        <View style={styles.page} key="2">
            <Verification />
        </View>
        <View style={styles.page} key="3">
          <Text>Third page</Text>
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