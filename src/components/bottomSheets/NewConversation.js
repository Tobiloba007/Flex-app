import { View, Text, Image, Dimensions, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { styles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../colors";
import axios from "axios";
import { BASE_URL } from "../../config";

const itemHeight = Dimensions.get("window").height;
const itemWidth = Dimensions.get("window").width;

const NewConversationItem = ({ refRBSheet, item }) => {
  const navigation = useNavigation();

  // console.log(item)

  return (
    <Pressable
      android_ripple={{ color: colors.soft }}
      style={[styles.row, { padding: 6 }]}
      onPress={() => {
        refRBSheet?.current?.close();
        navigation.navigate("MessagingRoom", {item});
      }}
    >
      <Image source={{ uri: item?.avatar }} style={styles.profileIcon} />

      <View style={{ alignItems: "flex-start" }}>
        <Text style={{ fontWeight: "400", fontSize: itemWidth * 0.038 }}>
          {item?.fname} {item?.lname}
        </Text>
        <Text
          style={{
            fontWeight: "300",
            color: "gray",
            fontSize: itemWidth * 0.03,
          }}
        >
          ${item?.fname}
        </Text>
      </View>
    </Pressable>
  );
};

const NewConversationItems = ({ user, refRBSheet }) => {
  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/chat/friends.php?user_id=${user?.id}`
      );

      setFriends(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchFriends();
  }, [user]);

  return (
    <View>
      <View style={{ backgroundColor: colors.soft, padding: 16 }}>
        <Text style={{ fontWeight: "800" }}>
          New Conversation . {friends?.length} Friends
        </Text>
      </View>

      <View style={{ padding: 12, gap: 20 }}>
        {friends.map((item, index) => (
          <NewConversationItem
            refRBSheet={refRBSheet}
            key={index}
            item={item}
          />
        ))}
      </View>
    </View>
  );
};

const NewConversation = ({ user, refRBSheet }) => {
  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={itemHeight * 0.9}
        customStyles={{
          draggableIcon: {
            backgroundColor: colors.soft,
            display: "none",
          },
        }}
      >
        <NewConversationItems user={user} refRBSheet={refRBSheet} />
      </RBSheet>
    </View>
  );
};

export default NewConversation;
