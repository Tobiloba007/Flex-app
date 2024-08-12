import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const ListItem = ({
  name,
  transactions,
  completion,
  price,
  available,
  limit,
}) => (
  <View style={styles.listItem}>
    <View style={{ textAlign: "left" }}>
      <View style={styles.userInfo}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{name}</Text>
        </View>
      </View>
      <View style={styles.priceInfo}>
        <Text style={styles.price}>{price} NGN</Text>
        <Text style={styles.limit}>Limit {limit} USDT</Text>
      </View>
    </View>
    <View>
      <Text style={styles.userStats}>
        {transactions} transactions • {completion}%
      </Text>
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Buy</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Ads = () => {
  const data = [
    {
      id: "1",
      name: "FlexApp",
      transactions: "3,290",
      completion: "99",
      price: "1590",
      available: "32,999.95",
      limit: "10-10,000",
    },
    {
      id: "2",
      name: "FlexApp",
      transactions: "3,290",
      completion: "99",
      price: "1590",
      available: "32,999.95",
      limit: "10-10,000",
    },
    {
      id: "3",
      name: "FlexApp",
      transactions: "3,290",
      completion: "99",
      price: "1590",
      available: "32,999.95",
      limit: "10-10,000",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{justifyContent:'space-between', flexDirection: 'row'}}>
          <TouchableOpacity style={styles.buyTab}>
            <Text style={styles.buyTabText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buyTab, {backgroundColor:'red'}]}>
            <Text style={styles.buyTabText}>Sell</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.usdtContainer}>
          <View style={styles.usdtIcon} />
          <Text style={styles.usdtText}>USDT</Text>
        </View>
        <TouchableOpacity style={styles.menuButton} />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <ListItem {...item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  buyTab: {
    backgroundColor: "#029CFC",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buyTabText: {
    color: "white",
    fontWeight: "bold",
  },
  usdtContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  usdtIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#26A17B",
    marginRight: 8,
  },
  usdtText: {
    fontWeight: "bold",
  },
  menuButton: {
    width: 24,
    height: 24,
    backgroundColor: "#ddd",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    marginBottom: 1,
    paddingLeft: 30,
    paddingRight: 30,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ddd",
    marginRight: 8,
  },
  userName: {
    fontWeight: "bold",
  },
  userStats: {
    fontSize: 12,
    color: "#888",
  },
  priceInfo: {
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  available: {
    fontSize: 12,
    color: "#888",
    marginBottom: 2,
  },
  limit: {
    fontSize: 12,
    color: "#888",
  },
  buyButton: {
    backgroundColor: "#029CFC",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buyButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Ads;
