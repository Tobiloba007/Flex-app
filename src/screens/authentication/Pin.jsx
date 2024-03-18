import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../colors";
import { styles } from "../../constants/styles";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const itemWidth = Dimensions.get("window").width;

const Pin = () => {
  const navigation = useNavigation();

  const [pin, setPin] = useState([]);
  const [isMaxPin, setIsMaxPin] = useState(false);

  const handlePin = (num) => {
    if (pin.length < 4) {
      setPin((prev) => [...prev, num]);
    }

    // if (pin.length === 4) {
    //   //   setIsMaxPin(true);
    //   //   setTimeout(() => {
    //   //     setIsMaxPin(false);
    //   //   }, 2000);
    // }
  };

  const removePin = () => {
    if (pin.length > 0) {
      pin.pop();
      setPin((prev) => [...prev]);
    }
  };

  useEffect(() => {
    if (pin.length === 4) {
      navigation.navigate("tab");
    }
  }, [pin.length]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          marginTop: 30,
          padding: 40,
        }}
      >
        <Text style={[styles.mediumTxt, { fontWeight: "700" }]}>Enter PIN</Text>
        <Text
          style={[
            styles.smallTxt,
            {
              fontSize: itemWidth * 0.04,
              fontWeight: "500",
              width: itemWidth * 0.7,
            },
          ]}
        >
          Please input your four-digit to continue
        </Text>

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View
            style={[
              styles.pinInput,
              { backgroundColor: pin[0] ? "#333" : "transparent" },
            ]}
          ></View>
          <View
            style={[
              styles.pinInput,
              { backgroundColor: pin[1] ? "#333" : "transparent" },
            ]}
          ></View>
          <View
            style={[
              styles.pinInput,
              { backgroundColor: pin[2] ? "#333" : "transparent" },
            ]}
          ></View>
          <View
            style={[
              styles.pinInput,
              { backgroundColor: pin[3] ? "#333" : "transparent" },
            ]}
          ></View>
        </View>

        <View style={styles.pinCon}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(1)}
          >
            <Text style={styles.smallTxt}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(2)}
          >
            <Text style={styles.smallTxt}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(3)}
          >
            <Text style={styles.smallTxt}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(4)}
          >
            <Text style={styles.smallTxt}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(5)}
          >
            <Text style={styles.smallTxt}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(6)}
          >
            <Text style={styles.smallTxt}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(7)}
          >
            <Text style={styles.smallTxt}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(8)}
          >
            <Text style={styles.smallTxt}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(9)}
          >
            <Text style={styles.smallTxt}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(0)}
          >
            <Text style={styles.smallTxt}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.pinBtn, { backgroundColor: "transparent" }]}
            onPress={removePin}
          >
            <Feather name="delete" size={28} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={[styles.smallTxt, { color: colors.primary }]}>
          Forgotten your PIN?
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Pin;
