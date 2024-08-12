// Step5.js
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
    Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../../../../colors";

const width = Dimensions.get("window").width;
export default function Step5({ setSelfie }) {
  const [image, setImage] = useState(null);

  const takeSelfie = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      setSelfie(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selfie</Text>
      <View>
              {!image &&
                  <View>
                  <Text style={{paddingLeft: 40}}>Selfie Format</Text>
                  <Image
          style={{ width: width - 40, height: 300 }}
          source={require("../../../../assets/images/id_verification.png")}
        /></View>}
      {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
      {!image && <TouchableOpacity style={styles.button} onPress={takeSelfie}>
        <Text style={styles.buttonText}>Take a Selfie</Text>
      </TouchableOpacity>}
      {image && <TouchableOpacity style={styles.button} onPress={takeSelfie}>
        <Text style={styles.buttonText}>Retake Selfie</Text>
      </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    marginBottom: 50,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
      borderRadius: 5,
      marginTop: Dimensions.get('window').height * 0.1,
    width: width * 0.5
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: { width: 300, height: 300, marginTop: 20, borderRadius: 150 },
});
