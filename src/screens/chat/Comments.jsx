import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TextInput,
  Pressable,
  Dimensions,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../colors";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../constants/styles";

const itemHeight = Dimensions.get("window").height;
const itemWidth = Dimensions.get("window").width;

const Comments = () => {
  const [message, setMessage] = useState("");
  const [inputHeight, setInputHeight] = useState(itemHeight * 0.06);

  const handleContentSizeChange = (event) => {
    // Set a maximum height for the input container
    setInputHeight(
      Math.max(itemHeight * 0.06, event.nativeEvent.contentSize.height)
    );
  };

  const handleSendMessage = async () => {
    // const messageData = new FormData();

    setMessage("");
    Keyboard.dismiss();

    // messageData.append("user_id", user?.id);
    // item && messageData.append("message_to", item?.id);
    // channel && messageData.append("channel_id", channel?.id);
    // messageData.append("message", message.trim());
    // image && messageData.append("image", image);

    // if (message.trim() !== "" || image) {
    //   try {
    //     await fetch(
    //       item
    //         ? `${BASE_URL}/api/v1/chat/private_message.php`
    //         : `${BASE_URL}/api/v1/chat/channel_message.php`,
    //       {
    //         method: "POST",
    //         body: messageData,
    //       }
    //     );

    //     setMessage("");
    //     setImage(null);
    //     Keyboard.dismiss();

    //     fetchMessages();
    //     fetchChannelMessages();
    //   } catch (error) {}
    // } else {
    //   setMessage("");
    //   Keyboard.dismiss();
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.white} barStyle={"dark-content"} />

      <View style={[styles.container, { flex: 0 }]}>
        <View
          style={{
            height: "100%",
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          <View
            style={[
              styles.chatBubbleRight,
              { maxWidth: itemWidth, alignSelf: "center" },
            ]}
          >
            <Text
              style={[
                styles.smallTxt,
                {
                  textAlign: "left",
                  color: "#eee",
                  marginBottom: 8,
                  fontSize: itemWidth * 0.04,
                  fontWeight: "500",
                },
              ]}
            >
              Isaac Isaac
            </Text>

            <Text className={`float-right ${"text-[#fff]"}`}>
              This is a coment. Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Accusamus perspiciatis quibusdam dicta error
              magnam nisi?
            </Text>
          </View>

          <View
            style={[
              styles.chatBubbleRight,
              { maxWidth: itemWidth, alignSelf: "center" },
            ]}
          >
            <Text
              style={[
                styles.smallTxt,
                {
                  textAlign: "left",
                  color: "#eee",
                  marginBottom: 8,
                  fontSize: itemWidth * 0.04,
                  fontWeight: "500",
                },
              ]}
            >
              Isaac Isaac
            </Text>

            <Text className={`float-right ${"text-[#fff]"}`}>
              This is a coment. Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Accusamus perspiciatis quibusdam dicta error
              magnam nisi?
            </Text>
          </View>

          <View style={styles.msgInputCon}>
            {/* <Entypo name="plus" size={26} color="black" onPress={pickImage} /> */}

            <TextInput
              placeholder="Type a message"
              style={[
                styles.input,
                {
                  width: "82%",
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
              <MaterialIcons name={"send"} size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Comments;
