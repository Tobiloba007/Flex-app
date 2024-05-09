import { View, Text, Image, Dimensions } from "react-native";
import React from "react";

const itemHeight = Dimensions.get("window").height;
const itemWidth = Dimensions.get("window").width;

const PhotoDisplay = ({ route }) => {
  const { image } = route.params;
  return (
    <View
      style={{ backgroundColor: "black", height: itemHeight, width: itemWidth }}
    >
      <Image
        source={{ uri: image }}
        style={{ width: "100%", height: "100%" }}
        resizeMode='contain'
      />
    </View>
  );
};

export default PhotoDisplay;
