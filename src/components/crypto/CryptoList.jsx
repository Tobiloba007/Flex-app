import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const CoinCard = ({ coin }) => {
  const priceChangeColor = coin.priceChange > 0 ? "#029CFC" : "#CD0000";

  return (
    <View style={styles.card}>
      <View style={styles.coinInfo}>
        <Text style={styles.symbol}>{coin.symbol}/USDC</Text>
        <Text style={styles.volume}>Vol: {coin.volume}</Text>
      </View>
      <View style={styles.priceInfo}>
        <Text style={styles.topPrice}>Top price: {coin.topPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
        <Text style={styles.lowPrice}>Low price: {coin.lowPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
      </View>
      <View style={styles.priceSection}>
        <Text style={styles.currentPrice}>{coin.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
        <View
          style={[styles.priceChange, { backgroundColor: priceChangeColor }]}
        >
          <Text style={styles.priceChangeText}>{coin.priceChange}%</Text>
        </View>
      </View>
    </View>
  );
};

const CryptoList = () => {
  const [coins, setCoins] = useState([]);

  const fetchCoinData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana"
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        const formattedData = data.map((coin) => ({
          symbol: coin.symbol.toUpperCase(),
          volume: coin.total_volume.toLocaleString(),
          topPrice: coin.high_24h,
          lowPrice: coin.low_24h,
          currentPrice: coin.current_price.toFixed(2),
          priceChange: coin.price_change_percentage_24h.toFixed(2),
        }));

        setCoins(formattedData);
      }
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  useEffect(() => {
    fetchCoinData();
    const interval = setInterval(fetchCoinData, 5000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
    {coins.map((coin) => (
      <CoinCard key={coin.symbol} coin={coin} />
    ))}
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 50,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
    elevation: 1,
    height: 80
  },
  coinInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  symbol: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  volume: {
    fontSize: 12,
    color: "#888",
  },
  priceInfo: {
    flex: 1,
    alignItems: "center",
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  topPrice: {
    fontSize: 12,
    color: "#333",
  },
  lowPrice: {
    fontSize: 12,
    color: "#888",
  },
  priceSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    height: '100%',
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 5,
  },
  priceChange: {
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  priceChangeText: {
    fontSize: 12,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default CryptoList;
