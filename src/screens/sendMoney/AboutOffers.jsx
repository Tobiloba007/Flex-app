import { View, Text, SafeAreaView, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../../constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../colors";
import AboutOffer from "../../components/sendMoney/AboutOffer";
import AboutBuyer from "../../components/sendMoney/AboutBuyer";
import WalletTop from "../../components/wallet/WalletTop";
import { BASE_URL_P2P, BASE_URL } from "../../config";
import axios from "axios";

const itemWidth = Dimensions.get("window").width;

const AboutOffers = ({ route }) => {
  const { id } = route.params;

  const [offer, setOffer] = useState(null);
  const [user, setUser] = useState(null);

  const getOffer = async () => {
    try {
      const res = await axios.get(`${BASE_URL_P2P}/offers/${id}`);

      setOffer(res.data?.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(offer)

  useEffect(() => {
    getOffer();
  }, []);

  const fetchProfile = async () => {
    const formData = new FormData();
    formData.append("name", offer?.user_id);

    try {
      const res = await fetch(`${BASE_URL}/profile.php`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setUser(data?.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let subscribe = true;

    if (subscribe) {
      fetchProfile();
    }

    return () => (subscribe = false);
  }, [offer]);

  // console.log(user);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WalletTop text={"About this offer"} />

      <View
        style={[
          styles.container,
          {
            paddingVertical: 15,
            gap: 15,
            width: itemWidth,
            paddingHorizontal: 15,
          },
        ]}
      >
        <View style={[styles.column, { alignItems: "flex-start", gap: 15 }]}>
          <View style={[styles.row, { gap: 10 }]}>
            <MaterialCommunityIcons
              name="hand-extended"
              size={24}
              color={colors.primary}
            />

            <Text style={[styles.smallTxt, { color: colors.primary }]}>
              About this offer
            </Text>
          </View>

          <AboutOffer offer={offer} />

          <View style={[styles.row, { gap: 10 }]}>
            <Ionicons name="person-sharp" size={20} color={colors.primary} />

            <Text style={[styles.smallTxt, { color: colors.primary }]}>
              About this seller
            </Text>
          </View>

          <AboutBuyer user={user} offer={offer} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AboutOffers;
