import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
  TextInput,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import React from "react";
import { styles } from "../../constants/styles";
import ChannelMsg from "../../screens/chat/ChannelMsg";
import UserMsg from "../../screens/chat/UserMsg";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const itemHeight = Dimensions.get("window").height;

const MessagingRoomComp = ({
  channel,
  item,
  lastSeen,
  user,
  setDropDown,
  dropDown,
  messages,
  channelMemberStatus,
  createChannelRequest,
  channels,
  pickImage,
  handleContentSizeChange,
  message,
  setMessage,
  inputHeight,
  handleSendMessage,
  channelMembers,
}) => {
  const navigation = useNavigation();

  const reverseMsg = [...messages].reverse();
  const reverseChannel = [...channels].reverse();

  const renderMsgItem = (item) => {
    return <UserMsg message={item.item} user={user} />;
  };

  const renderChannelItem = (item) => {
    return <ChannelMsg message={item.item} user={user} />;
  };

  return (
    <View style={[styles.container, { flex: 0 }]}>
      <View style={{ height: "100%" }}>
        <View style={styles.chatBar}>
          <View style={styles.row}>
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color="black"
              onPress={() => navigation.goBack()}
            />

            <Image
              source={
                channel?.icon
                  ? { uri: channel?.icon }
                  : item?.avatar
                  ? { uri: item?.avatar }
                  : require("../../../assets/images/flexLogo.png")
              }
              style={[styles.profileIcon, { marginLeft: -10 }]}
            />

            <View style={{ alignItems: "flex-start" }}>
              <Text className={"text-xl font-bold text-18px]"}>
                {channel?.name ? channel?.name : item?.name}
              </Text>
              <Text
                style={[
                  styles.smallTxt,
                  { color: "#7e7e7e", fontWeight: "400", textAlign: "left" },
                ]}
              >
                {item ? lastSeen : `${channelMembers?.length} members`}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            {channel?.owner_id === user?.id && (
              <Feather
                name="more-vertical"
                size={24}
                color="black"
                onPress={() => setDropDown((prev) => !prev)}
              />
            )}
          </View>
        </View>

        {dropDown && (
          <Pressable
            style={{
              backgroundColor: "white",
              position: "absolute",
              right: 0,
              padding: 20,
              top: 60,
              zIndex: 999,
              elevation: 5,
            }}
            onPress={() =>
              navigation.navigate("channelRequests", {
                id: channel?.owner_id,
              })
            }
          >
            <Text>See channel requests</Text>
          </Pressable>
        )}

        {messages.length > 0 && (
          <ImageBackground
            source={require("../../../assets/images/bg.png")}
            style={styles.bgImg}
            resizeMode="cover"
          >
            <FlatList
              data={reverseMsg}
              renderItem={renderMsgItem}
              key={(item) => item.id}
              showsVerticalScrollIndicator={false}
              inverted
              contentContainerStyle={{
                paddingVertical: itemHeight * 0.06,
                paddingBottom: itemHeight * 0.02,
              }}
            />
          </ImageBackground>
        )}

        <ImageBackground
          source={require("../../../assets/images/bg.png")}
          style={styles.bgImg}
          resizeMode="cover"
        >
          {channel?.owner_id !== user?.id &&
            channelMemberStatus?.status?.trim() === "rejected" && (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: itemHeight * 0.8,
                }}
              >
                <Pressable
                  style={[styles.button]}
                  onPress={createChannelRequest}
                >
                  <Text style={styles.buttonTxt}>
                    Request to join this channel
                  </Text>
                </Pressable>
              </View>
            )}

          {channel?.owner_id !== user?.id &&
            channelMemberStatus?.status?.trim() === "pending" && (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: itemHeight * 0.8,
                }}
              >
                <Pressable style={styles.button}>
                  <Text style={styles.buttonTxt}>
                    Channel request is pending
                  </Text>
                </Pressable>
              </View>
            )}

          {channel?.owner_id !== user?.id &&
            channelMemberStatus?.status?.trim() === "accepted" && (
              <FlatList
                data={reverseChannel}
                renderItem={renderChannelItem}
                key={(item) => item.id}
                showsVerticalScrollIndicator={false}
                inverted
                contentContainerStyle={{
                  paddingVertical: itemHeight * 0.06,
                  paddingBottom: itemHeight * 0.02,
                }}
              />
            )}

          {channel?.owner_id === user?.id && (
            <Pressable
              onPress={() => setDropDown(false)}
              style={{ height: "auto" }}
            >
              {channels?.length > 0 && (
                <FlatList
                  data={reverseChannel}
                  renderItem={renderChannelItem}
                  key={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  inverted
                  contentContainerStyle={{
                    paddingVertical: itemHeight * 0.06,
                    paddingBottom: itemHeight * 0.02,
                  }}
                />
              )}
            </Pressable>
          )}
        </ImageBackground>

        {channelMemberStatus?.status?.trim() === "accepted" ||
        channel?.owner_id === user?.id ? (
          <View style={styles.msgInputCon}>
            <Entypo name="plus" size={26} color="black" onPress={pickImage} />

            <TextInput
              placeholder="Type a message"
              style={[
                styles.input,
                {
                  width: "73%",
                  height: inputHeight,
                  maxHeight: itemHeight * 0.13,
                },
              ]}
              multiline
              cursorColor={"gray"}
              onContentSizeChange={handleContentSizeChange}
              onChangeText={(value) => setMessage(value)}
              value={message}
            />

            <Entypo name="emoji-happy" size={24} color="black" />

            <Pressable disabled={!message} onPress={handleSendMessage}>
              <MaterialIcons
                name={message !== "" ? "send" : "mic-none"}
                size={24}
                color="black"
              />
            </Pressable>
          </View>
        ) : null}

        {item && (
          <View style={styles.msgInputCon}>
            <Entypo name="plus" size={26} color="black" onPress={pickImage} />

            <TextInput
              placeholder="Type a message"
              style={[
                styles.input,
                {
                  width: "73%",
                  height: inputHeight,
                  maxHeight: itemHeight * 0.13,
                },
              ]}
              multiline
              cursorColor={"gray"}
              onContentSizeChange={handleContentSizeChange}
              onChangeText={(value) => setMessage(value)}
              value={message}
            />

            <Entypo name="emoji-happy" size={24} color="black" />

            <Pressable disabled={!message} onPress={handleSendMessage}>
              <MaterialIcons
                name={message !== "" ? "send" : "mic-none"}
                size={24}
                color="black"
              />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default MessagingRoomComp;
