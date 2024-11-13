import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const countryDetails = {
  Nigeria: {
    fields: [
      { label: 'Recipient Name', name: 'recipientName', placeholder: 'Enter recipient name' },
      { label: 'Bank Name', name: 'bankName', placeholder: 'Enter bank name' },
      { label: 'Account Number', name: 'accountNumber', placeholder: 'Enter account number' },
      { label: 'Amount', name: 'amount', placeholder: 'Enter amount to withdraw' }
    ]
  },
  Kenya: {
    fields: [
      { label: 'Recipient Name', name: 'recipientName', placeholder: 'Enter recipient name' },
      { label: 'Mobile Money Provider', name: 'provider', placeholder: 'Enter mobile money provider' },
      { label: 'Phone Number', name: 'phoneNumber', placeholder: 'Enter phone number' },
      { label: 'Amount', name: 'amount', placeholder: 'Enter amount to withdraw' }
    ]
  },
  Ghana: {
    fields: [
      { label: 'Recipient Name', name: 'recipientName', placeholder: 'Enter recipient name' },
      { label: 'Bank Name', name: 'bankName', placeholder: 'Enter bank name' },
      { label: 'Account Number', name: 'accountNumber', placeholder: 'Enter account number' },
      { label: 'Amount', name: 'amount', placeholder: 'Enter amount to withdraw' }
    ]
  }
};

const WithdrawalForm = ({ route, navigation }) => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const country = route.params.location.trim();

  useEffect(() => {
      const countryInfo = countryDetails[country];
    if (countryInfo) {
      setFields(countryInfo.fields);
    } else {
      setFields([]);
    }
  }, [country]);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleWithdraw = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Withdrawal request submitted successfully!');
      navigation.goBack();
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send Funds to {country}</Text>
      {fields.map((field) => (
        <View key={field.name} style={styles.inputContainer}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={styles.input}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChangeText={(value) => handleChange(field.name, value)}
            keyboardType={field.name === 'amount' || field.name === 'accountNumber' ? 'numeric' : 'default'}
          />
        </View>
      ))}
      {loading ? (
        <ActivityIndicator size="large" color="#029CFC" />
      ) : (
        <Button title="Send" onPress={handleWithdraw} color="#029CFC" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#029CFC',
    marginBottom: 70,
    textAlign: 'center'
  },
  inputContainer: {
    marginBottom: 30
  },
  label: {
    fontSize: 16,
    color: '#3F3665',
    marginBottom: 5
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E5E5E5'
  }
});

export default WithdrawalForm;
