import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FlexApp = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>FlexApp</Text>
        <Text style={styles.sell}>Sell</Text>
        <View style={styles.buyContainer}>
          <Text style={styles.buy}>Buy</Text>
          <Ionicons name="chevron-down" size={24} color="black" />
        </View>
        <Ionicons name="menu" size={24} color="black" />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>USDC</Text>
          <Text style={styles.cardSubtitle}>1 USDC = 43,736.80 USD</Text>
          <Text style={styles.cardAmount}>120.08 USD</Text>
          <Text style={styles.cardSubAmount}>0.00245343 USDC</Text>
          <View style={styles.cardButtons}>
            <TouchableOpacity style={styles.cardButton} onPress={()=> navigation.navigate('MoneyTransfer')} >
              <Ionicons name="send" size={24} color="white" />
              <Text style={styles.cardButtonText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardButton}>
              <MaterialCommunityIcons name="sale" size={24} color="white" />
              <Text style={styles.cardButtonText}>Sell</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardButton}>
              <FontAwesome5 name="shopping-cart" size={24} color="white" />
              <Text style={styles.cardButtonText}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardButton}>
              <Ionicons name="swap-horizontal" size={24} color="white" />
              <Text style={styles.cardButtonText}>Swap</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>HOW FLEX WORKS</Text>
          <Text style={styles.infoCardSubtitle}>How to Buy</Text>
          <Text style={styles.infoCardText}>We provide you with over 100 payment methods to exchange your local currency to coins.</Text>
          <Text style={styles.infoCardLink}>Learn More</Text>
        </View>

        <View style={styles.paidCard}>
          <Text style={styles.paidCardTitle}>Get paid in FlexApp</Text>
          <Text style={styles.paidCardText}>FlexApp is a web3-powered remittance product that allow individuals and businesses to send, receive, and save via stablecoin peer to peer. We are enabling real-time cross-border payments with multiple exchange rates.</Text>
        </View>

        <View style={styles.marketSection}>
          <Text style={styles.marketTitle}>Market</Text>
          {/* Market data components would go here */}
        </View>
      </ScrollView>

      <View style={styles.tabBar}>
        {/* Tab bar icons would go here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066cc',
  },
  sell: {
    fontSize: 16,
  },
  buyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buy: {
    fontSize: 16,
    marginRight: 5,
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: '#0066cc',
    borderRadius: 10,
    padding: 20,
    margin: 15,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: 'white',
    fontSize: 14,
  },
  cardAmount: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardSubAmount: {
    color: 'white',
    fontSize: 14,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cardButton: {
    alignItems: 'center',
  },
  cardButtonText: {
    color: 'white',
    marginTop: 5,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 15,
  },
  infoCardTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoCardSubtitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  infoCardText: {
    marginBottom: 10,
  },
  infoCardLink: {
    color: '#0066cc',
  },
  paidCard: {
    backgroundColor: '#333366',
    borderRadius: 10,
    padding: 20,
    margin: 15,
  },
  paidCardTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  paidCardText: {
    color: 'white',
  },
  marketSection: {
    margin: 15,
  },
  marketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});

export default FlexApp;