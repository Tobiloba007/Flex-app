import {
  View,
  Text,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { styles } from "../../constants/styles";
import { colors } from "../../../colors";

const itemWidth = Dimensions.get("window").width;
const Transactions = ({isSend, isDark}) => {
  return (
    <View
      style={[
        styles.box,
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottomWidth: 1,
          borderColor: "lightgray",
          backgroundColor: isDark ? colors.black : colors.white
        },
      ]}
    >
      <View style={styles.row}>
        <Image
          source={require("../../../assets/images/dp3.jpg")}
          style={{
            width: itemWidth * 0.1,
            height: itemWidth * 0.1,
            borderRadius: 50,
          }}
          resizeMode="cover"
        />

        <View style={{ alignItems: "flex-start" }}>
          <Text style={[styles.smallTxt, { color: isDark ? colors.white : "gray" }]}>Jone</Text>
          <Text
            style={[
              styles.smallTxt,
              { color: isDark ? colors.white : "gray", fontSize: itemWidth * 0.024 },
            ]}
          >
            03-01-2024
          </Text>
        </View>
      </View>

      <Text
        style={[
          styles.smallTxt,
          {
            color: isSend ? "red" : colors.primary,
            padding: 15,
            backgroundColor: "rgba(75, 249, 197, 0.08)",
            borderRadius: 8,
          },
        ]}
      >
        -$55.00
      </Text>
    </View>
  );
};

export default Transactions;
