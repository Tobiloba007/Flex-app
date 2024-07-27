import { View, Text, Dimensions, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../../../colors";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../../config";

const itemWidth = Dimensions.get("window").width;

const MyOffer = ({ item, isDark }) => {
  const [userDet, setUserDet] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserDet = async () => {
      const formData = new FormData();
      formData.append("name", item?.user_id);

      try {
        const res = await fetch(`${BASE_URL}/profile.php`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        setUserDet(data?.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserDet();
  }, []);

  // console.log(item);

  return (
    <View
      style={[
        styles.column,
        { gap: 10, alignItems: "flex-start", width: "100%" },
      ]}
    >
      <View style={styles.box}>
        <View style={styles.rowSpace}>
          <View style={[styles.row, { gap: 5 }]}>
            <Image
              source={
                userDet?.image
                  ? { uri: userDet?.image }
                  : require("../../../assets/images/dp2.jpg")
              }
              style={{ width: 30, height: 30, borderRadius: 50 }}
            />

            <Text style={styles.smallTxt}>{userDet?.fname}</Text>
          </View>

          <View
            style={[
              styles.row,
              {
                gap: 5,
                backgroundColor: "rgba(2, 156, 252, 0.28)",
                paddingHorizontal: 15,
                paddingVertical: 5,
              },
            ]}
          >
            <MaterialIcons name="verified" size={16} color="black" />
            <Text
              style={[
                styles.smallTxt,
                { fontSize: itemWidth * 0.03, fontWeight: "500" },
              ]}
            >
              Verified
            </Text>
          </View>
        </View>

        <View style={styles.rowSpace}>
          <View style={[styles.row, { gap: 5 }]}>
            <Ionicons name="time-outline" size={16} color="black" />

            <Text
              style={[
                styles.smallTxt,
                { color: colors.primary, fontSize: itemWidth * 0.03 },
              ]}
            >
              Seen 30 min ago{" "}
            </Text>
          </View>

          <Text
            style={[
              styles.smallTxt,
              { color: "gray", fontSize: itemWidth * 0.03 },
            ]}
          >
            Trades: 279_ <Text style={{ color: colors.primary }}>100%</Text>
          </Text>
        </View>
      </View>

      <View style={[styles.rowSpace, { width: "100%" }]}>
        <View>
          <Text
            style={[
              styles.smallTxt,
              {
                textAlign: "left",
                fontWeight: "400",
                fontSize: itemWidth * 0.03,
                color: isDark ? colors.white : colors.black,
              },
            ]}
          >
            {
              "MTN Mobile Money\nRange: 10 - 68 USD\nBuy BTC with MTN Cashout\nTrade speed: Under a minute"
            }
          </Text>
        </View>

        <Pressable
          style={{
            backgroundColor: "lightgray",
            padding: 6,
            paddingHorizontal: 15,
          }}
          onPress={() =>
            navigation.navigate("aboutOffers", { id: item?.offer_id })
          }
        >
          <FontAwesome name="angle-down" size={24} color="black" />
        </Pressable>
      </View>

      <View style={styles.box}>
        <View style={styles.rowSpace}>
          <View>
            <Text style={styles.mediumTxt}>
              {item?.max_trade_amount}{" "}
              <Text
                style={[
                  styles.smallTxt,
                  {
                    color: "rgba(0, 175, 123, 1)",
                    fontSize: itemWidth * 0.028,
                  },
                ]}
              >
                (-3.55%) <Text style={{ color: "gray" }}>{item?.currency}</Text>
              </Text>
            </Text>

            <Text
              style={[
                styles.smallTxt,
                {
                  textAlign: "left",
                  fontWeight: "400",
                  fontSize: itemWidth * 0.03,
                },
              ]}
            >
              {`1,043,133.62 GHS\n1 USD = 1.03 USD of ${item?.currency}`}
            </Text>
          </View>

          <Pressable
            style={[
              styles.row,
              {
                backgroundColor: "rgba(0, 175, 123, 1)",
                gap: 5,
                paddingVertical: 6,
                paddingHorizontal: 15,
                borderRadius: 8,
              },
            ]}
            // onPress={() => navigation.navigate("trade")}
          >
            {/* <View style={styles.btcImgCon}>
              <Image source={require("../../../assets/images/btc.png")} />
            </View> */}

            <Text style={{ color: "white" }}>{item?.status}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MyOffer;
