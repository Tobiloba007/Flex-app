import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { styles } from "../../constants/styles";
import { colors } from "../../../colors";

const itemWidth = Dimensions.get("window").width;

const FriendRequestItem = () => {
  return (
    <View style={[styles.row, { marginVertical: 10 }]}>
      <Image
        source={require("../../../assets/icons/ellipse-28.png")}
        style={{ width: itemWidth * 0.12, height: itemWidth * 0.12 }}
      />

      <View style={[styles.column, { alignItems: "flex-start", gap: 5 }]}>
        <View
          style={[
            styles.row,
            {
              justifyContent: "space-between",
              width: itemWidth * 0.78,
            },
          ]}
        >
          <Text>Prince Adeok</Text>
          <Text style={{ color: "lightgray" }}>2m</Text>
        </View>

        <View
          style={[
            styles.row,
            {
              justifyContent: "space-between",
              width: itemWidth * 0.78,
            },
          ]}
        >
          <Text style={styles.acceptBtn}>Accept</Text>
          <Text
            style={[
              styles.acceptBtn,
              { backgroundColor: "#D4EFFF", color: "#333" },
            ]}
          >
            Reject
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FriendRequestItem;
