// CombinedStep.js
import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import User from '../../User';

export default function Step1({
  setFullName,
  fullName,
  setNationality,
  nationality,
  setCity,
  city,
  setAddress,
  address,
}) {
  
  const { user } = User();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <TextInput
        placeholder="Full Name"
        value={user? `${user.fname} ${user.lname}` : ""}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        placeholder="Nationality"
        value={nationality}
        onChangeText={setNationality}
        style={styles.input}
      />
      <TextInput
        placeholder="City"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />
      <TextInput
        placeholder="Address"
        value={user? user.address : ''}
        onChangeText={setAddress}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 50,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: 16,
  },
});
