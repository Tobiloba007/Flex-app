import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TextInput,
  Pressable,
  Dimensions,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../colors";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../constants/styles";
import axios from "axios";
import { BASE_URL2 } from "../../config";

const itemHeight = Dimensions.get("window").height;
const itemWidth = Dimensions.get("window").width;

const Comments = ({ route }) => {
  const { post_id, user_id } = route.params;

  const [message, setMessage] = useState("");
  const [inputHeight, setInputHeight] = useState(itemHeight * 0.06);
  const [postComments, setPostComments] = useState([]);

  const handleContentSizeChange = (event) => {
    // Set a maximum height for the input container
    setInputHeight(
      Math.max(itemHeight * 0.06, event.nativeEvent.contentSize.height)
    );
  };

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(`${BASE_URL2}/comment/post/${post_id}`);

      setPostComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostComments();
  }, [post_id]);

  const handleSendComment = async () => {
    const messageData = {
      user: user_id,
      post: post_id,
      comment: message,
    };

    setMessage("");
    Keyboard.dismiss();

    if (message.trim() !== "") {
      try {
        const res = await fetch(`${BASE_URL2}/comment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageData),
        });

        const data = await res.json();
        console.log(data);

        setMessage("");
        setImage(null);
        Keyboard.dismiss();

        fetchPostComments();
      } catch (error) {
        console.log(error?.response?.data);
      }
    } else {
      setMessage("");
      Keyboard.dismiss();
    }
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
          <View style={{ height: "90%" }}>
            {postComments.length === 0 && (
              <Text
                style={[styles.smallTxt, { fontWeight: "400", marginTop: 50 }]}
              >
                Comments will appear here
              </Text>
            )}

            {postComments.length > 0 && (
              <ScrollView showsVerticalScrollIndicator={false}>
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
                    adipisicing elit. Accusamus perspiciatis quibusdam dicta
                    error magnam nisi?
                  </Text>
                </View>
              </ScrollView>
            )}
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

            <Pressable disabled={!message} onPress={handleSendComment}>
              <MaterialIcons name={"send"} size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Comments;
