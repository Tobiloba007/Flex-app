import { View, Text, Pressable, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../../colors";
import { styles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import SideMenu from "../SideMenu";

const itemWidth = Dimensions.get("window").width;

const SendMoneyTop = ({isDark}) => {
  const [sideMenu, setSideMenu] = useState(false);

  const navigation = useNavigation();

  const handleSideMenu = (value) => {
    setSideMenu(value);
  };

  return (
    <>
      <View style={styles.rowSpace}>
        <View style={styles.row}>
          <Image
            source={require("../../../assets/images/flexLogo.png")}
            style={styles.profileIcon}
          />

          <Text
            style={[
              styles.mediumTxt,
              { fontSize: itemWidth * 0.04, color: colors.primary },
            ]}
          >
            Flex App
          </Text>
        </View>

        <View style={styles.row}>
          <Pressable
            style={styles.buyButton}
            onPress={() => navigation.navigate("offers", { type: 0 })}
          >
            <Text>Buy</Text>
            <FontAwesome name="angle-down" size={24} color="black" />
          </Pressable>

          <Pressable
            style={styles.buyButton}
            onPress={() => navigation.navigate("offers", { type: 1 })}
          >
            <Text>Sell</Text>
            <FontAwesome name="angle-down" size={24} color="black" />
          </Pressable>

          <Pressable
            style={{ backgroundColor: colors.primary, borderRadius: 6 }}
            onPress={() => handleSideMenu(true)}
          >
            <Entypo name="menu" size={22} color="white" />
          </Pressable>
        </View>
      </View>

      {sideMenu && <SideMenu handleSideMenu={handleSideMenu} />}
    </>
  );
};

export default SendMoneyTop;
