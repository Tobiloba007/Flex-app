import { View, Text, Switch, Dimensions } from "react-native";
import React, { useState } from "react";
import { styles } from "../../constants/styles";
import { colors } from "../../../colors";

const itemWidth = Dimensions.get("window").width;

const WalletOfferTable = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View
      style={[styles.box, { borderWidth: 1, padding: 0, paddingVertical: 0 }]}
    >
      <View
        style={[
          styles.rowSpace,
          {
            width: "100%",
            backgroundColor: "rgba(2, 156, 252, 0.28)",
            padding: 10,
          },
        ]}
      >
        <Text style={[styles.smallTxt, { flex: 2, textAlign: "left" }]}>
          Type
        </Text>

        <View style={[styles.row, { flex: 2 }]}>
          <Text style={styles.textButton}>View</Text>
          <Text style={styles.textButton}>Edit</Text>
        </View>

        <View style={[styles.row, { flex: 1.1, gap: 5 }]}>
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

          <Text>Sell</Text>
        </View>
      </View>

      <View
        style={[
          styles.rowSpace,
          {
            width: "100%",
            padding: 10,
            borderBottomWidth: 1,
            borderBlockColor: "gray",
          },
        ]}
      >
        <Text style={[styles.smallTxt, { flex: 2, textAlign: "left" }]}>
          Rate per BTC
        </Text>

        <View style={[styles.row, { flex: 2 }]}>
          <Text style={{ fontSize: itemWidth * 0.024, color: "gray" }}>
            8621.93 USD +5.00%
          </Text>
        </View>

        <View style={[styles.row, { flex: 1.1, gap: 5 }]}></View>
      </View>

      <View
        style={[
          styles.rowSpace,
          {
            width: "100%",
            padding: 10,
            borderBottomWidth: 1,
            borderBlockColor: "gray",
          },
        ]}
      >
        <Text style={[styles.smallTxt, { flex: 2, textAlign: "left" }]}>
          Min- Max Amount
        </Text>

        <View style={[styles.row, { flex: 2 }]}>
          <Text style={{ fontSize: itemWidth * 0.024, color: "gray" }}>
            8621.93 USD +5.00%
          </Text>
        </View>

        <View style={[styles.row, { flex: 1.1, gap: 5 }]}></View>
      </View>

      <View
        style={[
          styles.rowSpace,
          {
            width: "100%",
            padding: 10,
            borderBottomWidth: 1,
            borderBlockColor: "gray",
          },
        ]}
      >
        <Text style={[styles.smallTxt, { flex: 2, textAlign: "left" }]}>
          Payment Method
        </Text>

        <View style={[styles.row, { flex: 2 }]}>
          <Text style={{ fontSize: itemWidth * 0.024, color: "gray" }}>
            Amazon Gift Card
          </Text>
        </View>

        <View style={[styles.row, { flex: 1.1, gap: 5 }]}></View>
      </View>

      <View
        style={[
          styles.rowSpace,
          {
            width: "100%",
            padding: 10,
            borderBottomWidth: 1,
            borderBlockColor: "gray",
          },
        ]}
      >
        <Text style={[styles.smallTxt, { flex: 2, textAlign: "left" }]}>
          Speed
        </Text>

        <View style={[styles.row, { flex: 2 }]}>
          <Text
            style={[
              styles.textButton,
              { backgroundColor: "rgba(12, 24, 84, 1)" },
            ]}
          >
            New
          </Text>
        </View>

        <View style={[styles.row, { flex: 1.1, gap: 5 }]}></View>
      </View>
    </View>
  );
};

export default WalletOfferTable;
