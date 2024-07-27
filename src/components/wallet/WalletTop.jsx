import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "../../constants/styles";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../../../colors";
import SideMenu from "../SideMenu";
import { useNavigation } from "@react-navigation/native";

const WalletTop = ({ text, isDark }) => {
  const [sideMenu, setSideMenu] = useState(false);

  const navigation = useNavigation();

  const handleSideMenu = (value) => {
    setSideMenu(value);
  };

  return (
    <>
      <View
        style={[
          styles.rowSpace,
          {
            backgroundColor: isDark ? colors.black : colors.white,
            paddingVertical: 10,
            elevation: 5,
            paddingHorizontal: 15,
          },
        ]}
      >
        <Entypo
          name="home"
          size={24}
          color={isDark ? colors.white : colors.black}
        />

        <Text
          style={[
            styles.mediumTxt,
            { fontWeight: "600", color: isDark ? colors.white : colors.black },
          ]}
        >
          {text}
        </Text>

        <Pressable
          style={{ backgroundColor: colors.primary, borderRadius: 6 }}
          onPress={() => handleSideMenu(true)}
        >
          <Entypo name="menu" size={22} color="white" />
        </Pressable>
      </View>

      {sideMenu && <SideMenu handleSideMenu={handleSideMenu} />}
    </>
  );
};

export default WalletTop;
