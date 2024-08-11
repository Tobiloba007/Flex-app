// Step6.js
import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../../../colors';

export default function Step6({ setProofOfAddress }) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      setProofOfAddress(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Proof of Address</Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {!image && <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Select Proof of Address</Text>
          </TouchableOpacity>}
          {image && <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Change Proof of Address</Text>
      </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', alignItems: 'center', padding: 20 },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 150
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  image: { width: 300, height: 400, marginTop: 20 },
});
