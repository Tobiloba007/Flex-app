import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { styles } from "../../constants/styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../../../colors";
import { BASE_URL2 } from "../../config";
import axios from "axios";
import { launchImageLibrary } from "react-native-image-picker";

const itemHeight = Dimensions.get("window").height;
const itemWidth = Dimensions.get("window").width;

const CreateChannel = ({
  user,
  setChannelLink,
  refRBSheet,
  refRBChannelLinkSheet,
}) => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);
  const [channelName, setChannelName] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
    });

    if (!result.didCancel) {
      setImage(result.assets[0].uri);
      setFile(result);
    }
  };

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

      setChannelIcon(res.data?.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (file) {
      handleUploadImage();
    }
  }, [file]);

  const channelData = {
    name: channelName,
    icon: channelIcon,
    owner_id: user?.id,
  };

  const handleCreateChannel = async () => {
    setLoading(true);

    // const channelData = new FormData();

    // channelData.append("user_id", user?.id);
    // channelData.append("flag", "add_channel");
    // channelData.append("name", channelName);
    // channelData.append("icon", channelIcon);

    try {
      const res = await fetch(`${BASE_URL2}/channel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(channelData),
      });

      const data = await res.json();

      // console.log(data)

      if (data?.message === "Channel Created successfully!") {
        setChannelLink(
          `https://gotflexapp.com/${data?.channel_id}/MessagingRoom`
        );

        refRBSheet?.current?.close();
        refRBChannelLinkSheet?.current?.open();
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.column, { paddingTop: 20, paddingHorizontal: 20 }]}>
      <Text style={[styles.mediumTxt]}>Create Your Channel</Text>

      <Text style={[styles.smallTxt]}>
        Your channel is where you and your friends chat. Make yours and start
        talking.
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        className="flex-row items-center p-0"
        style={styles.channelUpload}
        onPress={pickImage}
      >
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 100,
            }}
          />
        )}

        {!image && (
          <>
            <FontAwesome5 name="camera" size={24} color="gray" />

            <Text
              style={[
                styles.smallTxt,
                { fontSize: 12, fontWeight: "500", color: "gray" },
              ]}
            >
              UPLOAD
            </Text>
          </>
        )}

        <View
          style={{
            backgroundColor: colors.primary,
            position: "absolute",
            right: 0,
            borderRadius: 10,
            top: 0,
          }}
        >
          <Entypo name="plus" size={24} color={colors.white} />
        </View>
      </TouchableOpacity>

      <View
        style={{
          width: itemWidth * 0.9,
          marginTop: 20,
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <Text style={[styles.mediumTxt, { fontSize: itemWidth * 0.035 }]}>
          CHANNEL NAME
        </Text>

        <TextInput
          placeholder="Enter channel name"
          style={styles.input}
          cursorColor={"gray"}
          onChangeText={(value) => setChannelName(value.trim())}
        />

        <Pressable
          android_ripple={{ color: colors.soft }}
          style={[
            styles.button,
            {
              width: "100%",
              backgroundColor:
                !channelName && !channelIcon ? "#9e9e9e" : colors.primary,
            },
          ]}
          disabled={!channelName && !channelIcon}
          onPress={handleCreateChannel}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.buttonTxt}>Create Cannel</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const Channel = ({
  user,
  setChannelLink,
  refRBSheet,
  refRBChannelLinkSheet,
}) => {
  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={itemHeight * 0.7}
        customStyles={{
          draggableIcon: {
            backgroundColor: "lightgray",
          },
        }}
      >
        <CreateChannel
          user={user}
          setChannelLink={setChannelLink}
          refRBSheet={refRBSheet}
          refRBChannelLinkSheet={refRBChannelLinkSheet}
        />
      </RBSheet>
    </View>
  );
};

export default Channel;
