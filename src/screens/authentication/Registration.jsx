import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import Registration1 from "../../components/authenticcation/Registration1";
import RegistrationHeader from "../../components/authenticcation/RegistrationHeader";
import Verification from "../../components/authenticcation/Verification";
import AccountType from "./AccountType";
import { useSelector } from "react-redux";
import { colors } from "../../../colors";

export default function Registration({ navigation }) {
  const { isDark } = useSelector((state) => state.theme);

  const pagerRef = useRef(null);
  const [scroll, setScroll] = useState(0);

  const handleNextPage = (currentPage) => {
    pagerRef.current?.setPage(currentPage);
  };

  const onPageSelected = (e) => {
    setScroll(e.nativeEvent.position);
    // console.log(scroll);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDark ? colors.black : colors.white }}
    >
      <StatusBar
        backgroundColor={isDark ? colors.black : colors.white}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <RegistrationHeader navigation={navigation} scroll={scroll} isDark={isDark} />
      <PagerView
        style={styles.viewPager}
        ref={pagerRef}
        initialPage={0}
        onPageSelected={onPageSelected}
        scrollEnabled={false}
      >
        {/* <View key="1">
           <AccountType handleNextPage={handleNextPage} />
        </View> */}
        <View style={styles.page} key="1">
          <Registration1 handleNextPage={handleNextPage} isDark={isDark} />
        </View>
        <View style={styles.page} key="2">
          <Verification isDark={isDark} />
        </View>
      </PagerView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
});
