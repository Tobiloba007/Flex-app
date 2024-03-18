import {
  View,
  Text,
  Dimensions,
  Pressable,
  TextInput,
  Share,
} from "react-native";
import React from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { styles } from "../../constants/styles";
import { colors } from "../../../colors";

const itemHeight = Dimensions.get("window").height;

const ChannelDetail = ({ channelLink, refRBSheet }) => {
  const onShare = async () => {
    try {
      await Share.share({
        title: "Flex App | Join my channel on Flex App" + "\n\n" + channelLink,
        message:
          "Flex App | Join my channel on Flex App" + "\n\n" + channelLink,
        url: channelLink,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View
      style={[
        styles.column,
        { gap: 10, paddingTop: 20, paddingHorizontal: 20 },
      ]}
    >
      <Text style={styles.mediumTxt}>Add some people</Text>

      <Text style={[styles.smallTxt, { width: "90%" }]}>
        You'll need a few friend to get the most out of your channel
      </Text>

      <Text
        style={[
          {
            marginVertical: 10,
            textAlign: "center",
            backgroundColor: "#9D9D9D21",
            paddingVertical: 18,
            paddingHorizontal: 10,
            borderRadius: 6,
            fontWeight: "500",
            width: "100%",
          },
        ]}
        numberOfLines={1}
      >
        {channelLink}
      </Text>

      <Pressable style={[styles.button, { width: "100%" }]} onPress={onShare}>
        <Text style={styles.buttonTxt}>Share Link</Text>
      </Pressable>
    </View>
  );
};

const ChannelLink = ({ channelLink, refRBSheet }) => {
  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={itemHeight * 0.7}
        customStyles={{
          draggableIcon: {
            backgroundColor: colors.soft,
          },
        }}
      >
        <ChannelDetail channelLink={channelLink} refRBSheet={refRBSheet} />
      </RBSheet>
    </View>
  );
};

export default ChannelLink;
