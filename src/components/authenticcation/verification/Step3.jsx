// Step3.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function Step3({ setCity, city }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="City"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, width: '80%' },
});
