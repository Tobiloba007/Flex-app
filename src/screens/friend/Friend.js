import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { styles } from "../../constants/styles";
import { colors } from "../../../colors";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../../components/bottomNav/BottomNav";
import FriendRequestItem from "../../components/friend/FriendRequestItem";

const itemWidth = Dimensions.get("window").width;
const itemHeight = Dimensions.get("window").height;

const Friend = () => {
  const { height } = useWindowDimensions();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.white} barStyle={"dark-content"} />

      <View
        style={[
          styles.row,
          {
            backgroundColor: colors.white,
            justifyContent: "space-between",
            padding: 20,
            paddingHorizontal: 10,
            borderBottomWidth: 1,
            borderBlockColor: colors.soft,
          },
        ]}
      >
        <Text
          style={[
            styles.mediumTxt,
            { fontWeight: "700", fontSize: itemWidth * 0.05 },
          ]}
        >
          Friends
        </Text>

        <Ionicons name="search" size={24} color="black" />
      </View>

      <View
        style={[
          styles.container,
          {
            paddingHorizontal: 10,
            backgroundColor: colors.white,
            height: itemHeight * 0.81,
            flex: 0,
          },
        ]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBlockColor: colors.soft,
              paddingBottom: 20,
            }}
          >
            <View
              style={[
                styles.row,
                { justifyContent: "space-between", marginVertical: 20 },
              ]}
            >
              <Text
                style={[
                  styles.smallTxt,
                  { fontSize: itemWidth * 0.04, fontWeight: "700" },
                ]}
              >
                Friend Requests
              </Text>

              <Text style={styles.smallTxt}>Show all</Text>
            </View>

            <FriendRequestItem />
            <FriendRequestItem />
          </View>

          <View
            style={{
              borderBottomWidth: 1,
              borderBlockColor: colors.soft,
              paddingBottom: 20,
            }}
          >
            <View style={[styles.row, { marginVertical: 20 }]}>
              <Text
                style={[
                  styles.smallTxt,
                  { fontSize: itemWidth * 0.04, fontWeight: "700" },
                ]}
              >
                New People
              </Text>
            </View>

            <FriendRequestItem />
            <FriendRequestItem />
            <FriendRequestItem />
            <FriendRequestItem />
            <FriendRequestItem />
            <FriendRequestItem />
            <FriendRequestItem />
          </View>
        </ScrollView>
      </View>

      <BottomNav />
    </SafeAreaView>
  );
};

export default Friend;
