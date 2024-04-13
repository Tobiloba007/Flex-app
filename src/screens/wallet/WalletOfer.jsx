import {
  View,
  Text,
  SafeAreaView,
  Switch,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import WalletTop from "../../components/wallet/WalletTop";
import { styles } from "../../constants/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../colors";
import WalletOfferTable from "../../components/wallet/WalletOfferTable";
import WalletOfferBox from "../../components/wallet/WalletOfferBox";

const itemWidth = Dimensions.get("window").width;

const WalletOffer = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <SafeAreaView style={{ flex: 0.92 }}>
      <WalletTop text={"Wallet"} />

      <View
        style={[styles.container, { padding: 15, gap: 15, width: itemWidth }]}
      >
        <View style={[styles.column, { alignItems: "flex-start", gap: 15 }]}>
          <View style={[styles.rowSpace, { width: "100%" }]}>
            <Text style={[styles.smallTxt, { color: colors.primary }]}>
              My Offers
            </Text>

            <View style={[styles.row, { gap: 10 }]}>
              <Text style={[styles.smallTxt, { color: colors.primary }]}>
                Turn Off all offers
              </Text>

              <Switch
                trackColor={{
                  false: "rgba(217, 217, 217, 1)",
                  true: colors.primary,
                }}
                thumbColor={isEnabled ? colors.primary : "#f4f3f4"}
                ios_backgroundColor={"#3e3e3e"}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>

          <Text style={[styles.smallTxt, { color: "gray", fontWeight: "500" }]}>
            Security deposit
          </Text>

          <WalletOfferBox />

          <WalletOfferTable />

          <View style={[styles.rowSpace, { width: "100%", gap: 5 }]}>
            <Text
              style={[
                // styles.textButton,
                {
                  fontSize: itemWidth * 0.025,
                  backgroundColor: "rgba(217, 217, 217, 1)",
                  color: "black",
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                },
              ]}
            >
              Security deposit: 0BTC/ 0.1 BTC
            </Text>
            <Text
              style={[
                // styles.textButton,
                {
                  fontSize: itemWidth * 0.025,
                  backgroundColor: "rgba(217, 217, 217, 1)",
                  color: "black",
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                },
              ]}
            >
              Deposit: 0.1 BTC to active this offer.
            </Text>
          </View>

          <View style={[styles.rowSpace, { width: "100%" }]}>
            <Text style={styles.smallTxt}>My Languages</Text>

            <Pressable style={[styles.button, { width: itemWidth * 0.4 }]}>
              <Text style={[styles.buttonTxt, { color: "white" }]}>
                Create new offer
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WalletOffer;
