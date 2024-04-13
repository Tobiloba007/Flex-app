import {
  View,
  Text,
  Dimensions,
  Pressable,
  TextInput,
  Share,
} from "react-native";
import React, { useEffect, useState } from "react";
import RBSheet from "react-native-raw-bottom-sheet";
import { styles } from "../../constants/styles";
import { colors } from "../../../colors";
import axios from "axios";
import { dynamicLinkApiKey } from "../../../env.config";

const itemHeight = Dimensions.get("window").height;

const ChannelDetail = ({ channelLink, refRBSheet }) => {
  const [channelUrl, setChannelUrl] = useState(null);

  const buildLink = async () => {
    try {
      let link = await axios({
        method: "POST",
        url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${dynamicLinkApiKey}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          dynamicLinkInfo: {
            domainUriPrefix: "https://flexchannel.page.link",
            link: "https://gotflexapp.com",
            androidInfo: {
              androidPackageName: "com.flex.flexapp",
            },
            iosInfo: {
              iosBundleId: "com.flex.flexapp",
            },
          },
        },
      });

      if (link.status === 200) {
        return link.data.shortLink;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let shareUrl;

    const getBuildLink = async () => {
      try {
        shareUrl = await buildLink();
        setChannelUrl(shareUrl);
      } catch (error) {
        console.log(error?.response?.data);
      }
    };

    getBuildLink();
  }, [channelLink]);

  const onShare = async () => {
    try {
      if (channelUrl) {
        await Share.share({
          title: "Flex App | Join my channel on Flex App" + "\n\n" + channelUrl,
          message:
            "Flex App | Join my channel on Flex App" + "\n\n" + channelUrl,
          url: channelUrl,
        });
      }
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
        {channelUrl}
      </Text>

      <Pressable style={[styles.button, { width: "100%" }]} onPress={onShare}>
        <Text style={styles.buttonTxt}>Share your channel link to friends</Text>
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
