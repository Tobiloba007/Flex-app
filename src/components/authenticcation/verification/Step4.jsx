// Step4.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function Step4({ setAddress, address }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, width: '80%' },
});
