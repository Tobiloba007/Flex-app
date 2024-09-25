import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { colors } from "../../../colors";
import SendMoneyTop from "../../components/sendMoney/SendMoneyTop";
import padAnsix923 from "crypto-js/pad-ansix923";
import PaymentMethod from "../../components/sendMoney/PaymentMethod";

const CreateAd = () => {
  const { isDark } = useSelector((state) => state.theme);

  const navigation = useNavigation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedItems = await AsyncStorage.getItem("user_data");
        // console.log(storedItems);

        if (storedItems !== null) {
          const parsedItems = JSON.parse(storedItems);
          setUser(parsedItems);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDark ? colors.black : colors.white }}
    >
      <StatusBar
        backgroundColor={isDark ? colors.black : colors.white}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <View style={styles.container}>
        <SendMoneyTop />

        <PaymentMethod />

        {/* <View style={styles.header}>
          <View style={styles.iconPlaceholder} />
          <View style={[styles.tabContainer, { alignSelf: "center" }]}>
            <Text style={[styles.tabText, styles.activeTab]}>P2P</Text>
          </View>
          <View style={styles.avatarPlaceholder}>
            <Image
              source={{ uri: user?.image }}
              style={{ height: "100%", width: "100%", borderRadius: 50 }}
            />
          </View>
        </View> */}

        <View style={styles.content}>
          {/* <Text style={styles.emptyStateText}>
            You haven't posted any ads yet
          </Text> */}
          <TouchableOpacity
            style={styles.postButton}
            onPress={() => navigation.navigate("createbuysellad")}
          >
            <Text style={styles.postButtonText}>Post an ad</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerIcon} />
          <View style={styles.footerIcon} />
          <View style={[styles.footerIcon, styles.activeFooterIcon]}>
            <Text style={styles.footerIconText}>Ads</Text>
          </View>
          <View style={styles.footerIcon} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    padding: 4,
    width: "30%",
    justifyContent: "center",
  },
  tabText: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: "#888",
    width: "100%",
    textAlign: "center",
  },
  activeTab: {
    backgroundColor: "white",
    borderRadius: 16,
    color: "black",
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    backgroundColor: "#E0E0E0",
    borderRadius: 16,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateIcon: {
    width: 48,
    height: 48,
    backgroundColor: "#E0E0E0",
    marginBottom: 16,
  },
  emptyStateText: {
    color: "#888",
    marginBottom: 24,
  },
  postButton: {
    backgroundColor: "#029CFC",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  postButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingVertical: 16,
  },
  footerIcon: {
    width: 24,
    height: 24,
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
  },
  activeFooterIcon: {
    backgroundColor: "transparent",
    alignItems: "center",
  },
  footerIconText: {
    color: "#3050FF",
    fontSize: 12,
    marginTop: 4,
  },
};

export default CreateAd;
