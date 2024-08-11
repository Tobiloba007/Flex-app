import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const data = [
  { title: "Wrapped Ether", subtitle: "ETH: 1", id: "$3272.53" },
  { title: "Tether USDT", subtitle: "USDT: 250", id: "$250" },
  { title: "USDC", subtitle: "USDC: 100", id: "$100" },
  { title: "Uniswap", subtitle: "UNI: 10", id: "$73.4" },
  { title: "Chainlink", subtitle: "LINK: 10", id: "$131.3" },
];

const Wallet = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WALLET</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>$3827.23</Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={{alignItems:'center'}}>
            <Ionicons style={{borderColor:'#fff', borderWidth: 2, borderRadius: 100, alignSelf: 'center', padding: 7}} name="arrow-down" size={40} color="#fff" />
            <Text style={{color: '#fff', fontSize: 18}}>Receive</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems:'center'}}>
            <Ionicons style={{borderColor:'#fff', borderWidth: 2, borderRadius: 100, alignSelf: 'center', padding: 7}} name="arrow-up" size={40} color="#fff" />
            <Text style={{color: '#fff', fontSize: 18}}>Send</Text>
          </TouchableOpacity>
          
        </View>
      </View>

      <ScrollView>
        <View style={styles.listSection}>
          <Text style={styles.listHeader}>Available Tokens: </Text>
          {data.map((item, index) => (
            <TouchableOpacity key={index} style={styles.listItem}>
              <Image
                source={{ uri: "https://via.placeholder.com/50" }}
                style={styles.avatar}
              />
              <View style={styles.itemTextContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
              </View>
              <Text style={styles.itemId}>{item.id}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    height: '100%',
    maxHeight: '92%',
  },
  header: {
    flexDirection: "column",
    backgroundColor: "#029CFC",
    padding: 36,
    height: "25%",
    width: '90%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-between',
    borderCurve: 'circular',
    alignSelf: 'center',
    marginTop: 34
  },
  headerTitle: {
    color: "#fff",
    fontSize: 30,
    fontStyle: "normal",
    fontFamily: "serif",
    fontWeight: '800'
  },
  iconButton: {
    marginLeft: 16,
  },
  icon: {
    color: "#ffffff",
    fontSize: 24,
  },
  balanceContainer: {
    padding: 16,
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '60%',
    alignContent: 'center',
    alignSelf: 'center',
  },
  balanceText: {
    color: "#ffffff",
    fontSize: 36,
  },
  ethText: {
    color: "#ffffff",
    fontSize: 16,
  },
  listSection: {
    padding: 26,
    paddingRight: 40,
  },
  listHeader: {
    fontSize: 22,
    marginBottom: 36,
    marginTop: 20,
    fontWeight: "bold",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderTopColor: '#029CFC',
    borderTopWidth: 0.5,
    padding: 6,
    paddingTop: 16
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontSize: 16,
  },
  itemSubtitle: {
    color: "#888888",
  },
  itemId: {
    color: "#888888",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#029CFC",
    alignItems: "center",
    justifyContent: "center",
  },
  fabIcon: {
    color: "#ffffff",
    fontSize: 24,
  },
});

export default Wallet;
