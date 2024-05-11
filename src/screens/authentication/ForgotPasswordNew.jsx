import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { styles } from "../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../../config";

const itemWidth = Dimensions.get("window").width;

const ForgotPasswordNew = ({ route }) => {
  const { email, code } = route.params;

  const navigation = useNavigation();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewPassword = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("verification_code", code);
    formData.append("password", password);

    if (!password?.trim() || !password) {
      Alert.alert("Please input your new password to continue.");
      setLoading(false);
    } else {
      try {
        const res = await fetch(
          `${BASE_URL}/api/v1/account/password/password_reset.php`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        console.log(data);

        if (data.status === "success") {
          Alert.alert(data.message);
          navigation.navigate("login");
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: itemWidth * 0.04,
      }}
    >
      <View
        style={[
          styles.column,
          { justifyContent: "center", height: "100%", gap: itemWidth * 0.06 },
        ]}
      >
        <Text style={[styles.mediumTxt, { fontWeight: "700" }]}>
          Set New Password
        </Text>

        <Text
          style={[styles.smallTxt, { fontWeight: "400", color: "#6e6e6e" }]}
        >
          Enter a new password to complete your actions.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter new password"
          keyboardType="default"
          autoCapitalize="none"
          secureTextEntry
          onChangeText={(value) => setPassword(value)}
        />

        <Pressable
          style={[styles.button, { width: "100%" }]}
          onPress={handleNewPassword}
        >
          {loading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <Text style={styles.buttonTxt}>Continue</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordNew;
