import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { styles } from "../../constants/styles";
import { colors } from "../../../colors";
import { useNavigation } from "@react-navigation/native";

const itemWidth = Dimensions.get("window").width;

const ChatHistory = ({ refRBConversationSheet, devicesMessages }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: "100%",
        height: "80%",
        justifyContent: devicesMessages?.length === 0 ? "center" : "flex-start",
        alignItems: devicesMessages?.length === 0 ? "center" : "flex-start",
        paddingVertical:
          devicesMessages?.length === 0 ? itemWidth * 0.1 : itemWidth * 0.02,
      }}
    >
      {devicesMessages?.length === 0 && (
        <>
          <Image
            source={require("../../../assets/icons/chat-svg.png")}
            style={{
              width: itemWidth * 0.28,
              height: itemWidth * 0.28,
            }}
            resizeMode="contain"
          />

          <Text className={"text-xl font-semibold text-[#000] pt-6"}>
            Your Chat Is Empty
          </Text>

          <Text
            className={
              'text-center text-[#000000] p-8 text-[15px] font-["sans-regular"]'
            }
          >
            It looks like you haven’t messaged anyone yet. Simply click on
            button below to begin chatting with your friends and colleagues.
          </Text>
        </>
      )}

      {devicesMessages?.length > 0 && (
        <View style={{ marginBottom: itemWidth * 0.06, width: "100%" }}>
          {devicesMessages?.map((item) => (
            <Pressable
              key={item.id}
              android_ripple={{ color: colors.soft }}
              style={[styles.row, { padding: 6, width: "100%" }]}
              onPress={() => {
                navigation.navigate("MessagingRoom", { item });
              }}
            >
              <Image
                source={{ uri: item?.avatar }}
                style={styles.profileIcon}
              />

              <View style={{ alignItems: "flex-start" }}>
                <Text
                  style={{ fontWeight: "400", fontSize: itemWidth * 0.038 }}
                >
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
          ))}
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, { position: "absolute", bottom: 0 }]}
        activeOpacity={0.8}
        onPress={() => refRBConversationSheet?.current?.open()}
      >
        <Text className={"text-white font-bold "}>New Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatHistory;
