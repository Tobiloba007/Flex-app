import {
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BASE_URL2 } from "../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../../colors";
import { styles } from "../../constants/styles";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const SendImage = ({ route }) => {
  const { file, channel } = route.params;

  const navigation = useNavigation();

  const [channelImage, setChannelImage] = useState(null);
  const [user, setUser] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedItems = await AsyncStorage.getItem("user_data");

        if (storedItems !== null) {
          const parsedItems = JSON.parse(storedItems);
          setUser(parsedItems);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // upload channel image and retrieve the image url
  const handleUploadImage = async () => {
    try {
      const formData = new FormData();
      // Append the selected image to the FormData object
      formData.append("image", {
        uri: file.assets[0].uri,
        name: file.assets[0].fileName,
        type: file.assets[0].type,
      });

      const res = await axios.post(`${BASE_URL2}/storage/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setChannelImage(res.data?.url);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    if (file) {
      handleUploadImage();
    }
  }, [file]);

  const handleSendMessage = async () => {
    const channelData = {
      user: user?.id,
      channel: channel?.channel_id,
      post: channelImage,
      likes_users: [],
    };

    try {
      const res = await fetch(`${BASE_URL2}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(channelData),
      });

      const data = await res.json();
      console.log(data);

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {error && (
        <View
          style={{
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={[styles.smallTxt, { color: "black" }]}>
            Unable to upload your image due to an error that occured, please try
            again.
          </Text>
        </View>
      )}

      {!error && (
        <>
          <Image
            source={{ uri: file?.assets[0]?.uri }}
            style={{ height: "100%", width: "100%" }}
            resizeMode="contain"
          />
          <View
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              top: 0,
              backgroundColor: "black",
              opacity: !channelImage ? 0.5 : 0,
            }}
          ></View>

          <Pressable
            onPress={handleSendMessage}
            style={[
              styles.button,
              {
                position: "absolute",
                bottom: 10,
                alignSelf: "center",
                backgroundColor: !channelImage ? "#9e9e9e" : colors.primary,
              },
            ]}
            disabled={!channelImage}
          >
            <Text style={styles.buttonTxt}>Send</Text>
          </Pressable>

          {!channelImage && (
            <ActivityIndicator
              style={{ position: "absolute", alignSelf: "center", top: "50%" }}
              color={colors.primary}
              size={"large"}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default SendImage;
