import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { colors } from "../../../colors";
import { styles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import WalletTop from "../../components/wallet/WalletTop";

const itemWidth = Dimensions.get("window").width;
const itemHeight = Dimensions.get("window").height;

const SuccessTransaction = () => {
  const { isDark } = useSelector((state) => state.theme);

  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDark ? colors.black : colors.white }}
    >
      <StatusBar
        backgroundColor={isDark ? colors.black : colors.white}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <WalletTop text={"Transaction Completed"} isDark={isDark} />

      <View
        style={[
          styles.container,
          {
            padding: 15,
            gap: 20,
            width: itemWidth,
            height: itemHeight,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Image source={require("../../../assets/images/success.png")} />

        <Text style={styles.mediumTxt}>Transaction successful</Text>

        <Pressable
          style={[styles.button, { alignSelf: "center" }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.buttonTxt, {}]}>Done</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SuccessTransaction;
