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
import React, { useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { styles } from "../../constants/styles";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../../../colors";
import * as ImagePicker from "expo-image-picker";
import { BASE_URL } from "../../config";

const itemHeight = Dimensions.get("window").height;
const itemWidth = Dimensions.get("window").width;

const ChannelItems = ({
  user,
  setChannelLink,
  refRBSheet,
  refRBChannelLinkSheet,
}) => {
  const [image, setImage] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null)
  const [channelName, setChannelName] = useState("");
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
    });

    const mimeType = result?.assets[0]?.mimeType;

    if (!result?.canceled) {
      setImage(`data:${mimeType};base64,${result?.assets[0]?.base64}`);
      setChannelIcon(result?.assets[0]?.base64)
    }
  };

  const handleCreateChannel = async () => {
    setLoading(true);

    const channelData = new FormData();

    channelData.append("user_id", user?.id);
    channelData.append("flag", "add_channel");
    channelData.append("channel_name", channelName);
    channelData.append("channel_icon", channelIcon);

    try {
      const res = await fetch(`${BASE_URL}/api/v1/channel/index.php`, {
        method: "POST",
        body: channelData,
      });

      const data = await res.json();

      if (data?.status === "success") {
        setChannelLink(data?.message?.ChannelIcon);

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
          onChangeText={(value) => setChannelName(value)}
        />

        <Pressable
          android_ripple={{ color: colors.soft }}
          style={[styles.button, { width: "100%" }]}
          disabled={!channelName}
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
        <ChannelItems
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
