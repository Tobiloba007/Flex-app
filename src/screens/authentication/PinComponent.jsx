import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { colors } from "../../../colors";
import { styles } from "../../constants/styles";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const itemWidth = Dimensions.get("window").width;
const itemHeight = Dimensions.get("window").height;

const PinComponent = ({
  isNewPin,
  userPin,
  message,
  handlePin,
  isMaxPin,
  handlePrompt,
  pin,
  removePin,
}) => {
  const { isDark } = useSelector((state) => state.theme);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        paddingVertical: itemHeight * 0.075,
      }}
    >
      <Text
        style={[
          styles.mediumTxt,
          { fontWeight: "700", color: isDark ? colors.white : colors.black },
        ]}
      >
        {isNewPin ? "Confirm Pin" : "Enter PIN"}
      </Text>

      <Text
        style={[
          styles.smallTxt,
          {
            fontSize: itemWidth * 0.045,
            fontWeight: "500",
            width: itemWidth * 0.7,
            color: isDark ? colors.white : colors.black,
          },
        ]}
      >
        {userPin === null
          ? "Please set your four-digit pin to access this application"
          : "Please input your four-digit to continue"}
      </Text>

      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          marginTop: itemHeight * 0.02,
        }}
      >
        <View
          style={[
            styles.pinInput,
            {
              backgroundColor:
                pin[0] && isDark ? "#e1e1e1" : pin[0] ? "#333" : "transparent",
            },
          ]}
        ></View>
        <View
          style={[
            styles.pinInput,
            {
              backgroundColor:
                pin[1] && isDark ? "#e1e1e1" : pin[1] ? "#333" : "transparent",
            },
          ]}
        ></View>
        <View
          style={[
            styles.pinInput,
            {
              backgroundColor:
                pin[2] && isDark ? "#e1e1e1" : pin[2] ? "#333" : "transparent",
            },
          ]}
        ></View>
        <View
          style={[
            styles.pinInput,
            {
              backgroundColor:
                pin[3] && isDark ? "#e1e1e1" : pin[3] ? "#333" : "transparent",
            },
          ]}
        ></View>
      </View>

      {message && (
        <Text
          style={[
            styles.smallTxt,
            {
              fontSize: itemWidth * 0.04,
              fontWeight: "400",
              width: itemWidth * 0.7,
              color:
                message ===
                "The pin you input is incorrect, please try again or use forgot pin"
                  ? "red"
                  : colors.primary,
            },
          ]}
        >
          {message}
        </Text>
      )}

      <View style={styles.pinCon}>
        <View style={styles.pinWrap}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(1)}
          >
            <Text style={[styles.smallTxt, {fontSize: itemWidth * 0.07}]}>1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(2)}
          >
            <Text style={[styles.smallTxt, {fontSize: itemWidth * 0.07}]}>2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(3)}
          >
            <Text style={[styles.smallTxt, {fontSize: itemWidth * 0.07}]}>3</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(4)}
          >
            <Text style={[styles.smallTxt, {fontSize: itemWidth * 0.07}]}>4</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(5)}
          >
            <Text style={[styles.smallTxt, {fontSize: itemWidth * 0.07}]}>5</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(6)}
          >
            <Text style={[styles.smallTxt, {fontSize: itemWidth * 0.07}]}>6</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(7)}
          >
            <Text style={[styles.smallTxt, {fontSize: itemWidth * 0.07}]}>7</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(8)}
          >
            <Text style={[styles.smallTxt, {fontSize: itemWidth * 0.07}]}>8</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(9)}
          >
            <Text style={[styles.smallTxt, {fontSize: itemWidth * 0.07}]}>9</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              {
                borderColor: "none",
                backgroundColor: "transparent",
              },
            ]}
          >
            <Text style={[styles.smallTxt, {fontSize: itemWidth * 0.07}]}></Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.pinBtn,
              isMaxPin && { borderWidth: 1, borderColor: "red" },
            ]}
            onPress={() => handlePin(0)}
          >
            <Text style={[styles.smallTxt, {fontSize: itemWidth * 0.07}]}>0</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.pinBtn, { backgroundColor: "transparent" }]}
            onPress={removePin}
          >
            <Feather
              name="delete"
              size={30}
              color={isDark ? colors.soft : colors.black}
            />
          </TouchableOpacity>
        </View>
      </View>

      {userPin && (
        <Text
          onPress={handlePrompt}
          style={[styles.smallTxt, { color: colors.primary, fontSize: itemWidth * 0.045 }]}
        >
          Forgotten your PIN?
        </Text>
      )}
    </View>
  );
};

export default PinComponent;
