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
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";

const itemWidth = Dimensions.get("window").width;
const itemHeight = Dimensions.get("window").height;

const ChatHistory = ({
  refRBConversationSheet,
  devicesMessages,
  messages,
  user,
  isDark,
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: messages?.length === 0 ? "center" : "flex-start",
        alignItems: messages?.length === 0 ? "center" : "flex-start",
        paddingVertical:
          messages?.length === 0 ? itemWidth * 0.1 : itemWidth * 0.02,
      }}
    >
      {messages?.length === 0 && (
        <>
          <Image
            source={require("../../../assets/icons/chat-svg.png")}
            style={{
              width: itemWidth * 0.28,
              height: itemWidth * 0.28,
            }}
            resizeMode="contain"
          />

          <Text
            className={"text-xl font-semibold text-[#000] pt-6"}
            style={{ color: isDark ? colors.white : colors.black }}
          >
            Your Chat Is Empty
          </Text>

          <Text
            className={
              'text-center text-[#000000] p-8 text-[15px] font-["sans-regular"]'
            }
            style={{ color: isDark ? colors.white : colors.black }}
          >
            It looks like you haven’t messaged anyone yet. Simply click on
            button below to begin chatting with your friends and colleagues.
          </Text>
        </>
      )}

      {messages?.length > 0 && (
        <View style={{ marginBottom: itemWidth * 0.06, width: "100%" }}>
          {messages?.map((item) => (
            <Pressable
              key={item.id}
              android_ripple={{ color: colors.soft }}
              style={[styles.row, { padding: 6, width: "100%" }]}
              onPress={() => {
                navigation.navigate("MessagingRoom", { item, user });
              }}
            >
              <Image
                source={{ uri: item?.avatar }}
                style={styles.profileIcon}
              />

              <View style={{ alignItems: "flex-start" }}>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <Text
                    style={{
                      fontWeight: "400",
                      fontSize: itemWidth * 0.038,
                      color: isDark ? colors.white : colors.black,
                    }}
                  >
                    {item?.name}
                  </Text>

                  {item?.messageCount === 1 && (
                    <View
                      style={{
                        backgroundColor: colors.primary,
                        height: 8,
                        width: 8,
                        borderRadius: 50,
                      }}
                    ></View>
                  )}
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "88%",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "300",
                      color: "gray",
                      fontSize: itemWidth * 0.03,
                      width: "50%",
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item?.lastMessage?.startsWith("https") ? (
                      <MaterialIcons name="image" size={18} color="#8e8e8e" />
                    ) : (
                      `${item?.lastMessage}`
                    )}
                  </Text>

                  <Text
                    style={{
                      fontWeight: "300",
                      color: "gray",
                      fontSize: itemWidth * 0.03,
                    }}
                  >
                    {moment(item?.time).calendar()}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, { alignSelf: "center" }]}
        activeOpacity={0.8}
        onPress={() => refRBConversationSheet?.current?.open()}
      >
        <Text className={"text-white font-bold "}>New Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatHistory;
