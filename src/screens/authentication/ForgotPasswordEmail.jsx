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

const ForgotPasswordEmail = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitEmail = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email.trim());
    formData.append("request_type", "send_code");

    if (!email.trim() || email === "") {
      Alert.alert("Please input your email to continue");
      setLoading(false);
    } else {
      try {
        const res = await fetch(
          `${BASE_URL}/api/v1/account/password/email_verification.php`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        console.log(data);

        if (data.status === "success") {
          Alert.alert(data.message);
          navigation.navigate("forgotPasswordVerify", { email });
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
          Reset Password
        </Text>

        <Text
          style={[styles.smallTxt, { fontWeight: "400", color: "#6e6e6e" }]}
        >
          Are you sure you want to reset your account password? A verification
          code will be send to your email address.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(value) => setEmail(value)}
        />

        <Pressable
          style={[styles.button, { width: "100%" }]}
          onPress={handleSubmitEmail}
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

export default ForgotPasswordEmail;
