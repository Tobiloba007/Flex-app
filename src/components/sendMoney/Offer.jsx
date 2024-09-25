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

const Offer = ({ item, type, isDark }) => {
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
    <Pressable
      style={[
        styles.column,
        {
          alignItems: "flex-start",
          width: "100%",
          backgroundColor: colors.white,
          borderBottomWidth: 1,
          borderColor: isDark ? colors.soft : "#e1e1e1",
          paddingVertical: 15,
        },
      ]}
      onPress={() => navigation.navigate("aboutOffers", { id: item?.offer_id })}
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
            <MaterialIcons name="verified" size={16} color={colors.primary} />
          </View>

          <Text
            style={[
              styles.smallTxt,
              { color: "gray", fontSize: itemWidth * 0.03 },
            ]}
          >
            Trades: 279_ <Text style={{ color: colors.primary }}>100%</Text>
          </Text>

          {/* <View
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
          </View> */}
        </View>

        <View style={styles.rowSpace}>
          <View style={[styles.row, { gap: 5 }]}>
            <Ionicons name="time-outline" size={14} color="black" />

            <Text
              style={[
                styles.smallTxt,
                { color: colors.primary, fontSize: itemWidth * 0.028 },
              ]}
            >
              Seen few min ago{" "}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.box}>
        <View style={styles.rowSpace}>
          <View style={{ alignItems: "flex-start" }}>
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
                <Text style={{ color: "gray", fontSize: itemWidth * 0.028 }}>
                  {item?.currency}
                </Text>
              </Text>
            </Text>
            {/* 
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text
                style={[
                  styles.smallTxt,
                  {
                    fontWeight: "400",
                    fontSize: itemWidth * 0.028,
                    color: "#b1b1b1",
                  },
                ]}
              >
                Available
              </Text>
              <Text
                style={[
                  styles.smallTxt,
                  { fontWeight: "400", fontSize: itemWidth * 0.028 },
                ]}
              >
                {`32,000.96 ${item?.currency}`}
              </Text>
            </View> */}

            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text
                style={[
                  styles.smallTxt,
                  {
                    fontWeight: "400",
                    fontSize: itemWidth * 0.03,
                    color: "#b1b1b1",
                  },
                ]}
              >
                Limit
              </Text>
              <Text
                style={[
                  styles.smallTxt,
                  { fontWeight: "400", fontSize: itemWidth * 0.03 },
                ]}
              >
                {`${item.min_trade_amount} - ${item.max_trade_amount} ${item?.currency}`}
              </Text>
            </View>
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
                width: itemWidth * 0.2,
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
            onPress={() =>
              navigation.navigate("trade", {
                id: item?.user_id,
                adId: item.ad_id,
                amount: item?.max_trade_amount
              })
            }
          >
            {/* <View style={styles.btcImgCon}>
              <Image source={require("../../../assets/images/btc.png")} />
            </View> */}

            <Text style={{ color: "white" }}>
              {type === 0 ? "Buy" : "Sell"}
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

export default Offer;
