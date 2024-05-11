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
import React, { useEffect, useState } from "react";
import { styles } from "../../constants/styles";
import { colors } from "../../../colors";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../../config";

const itemWidth = Dimensions.get("window").width;

const ForgotPasswordVerify = ({ route }) => {
  const { email } = route.params;

  const navigation = useNavigation();

  const [code, setCode] = useState();
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const handleVerifyEmail = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("verification_code", code);
    formData.append("request_type", "verify_code");

    if (!code?.trim() || !code) {
      Alert.alert(
        "Please input the code you received in your email to continue."
      );
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
          navigation.navigate("forgotPasswordNew", { email, code });
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const handleResendCode = async () => {
    const formData = new FormData();
    formData.append("email", email.trim());
    formData.append("request_type", "send_code");

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
        setSeconds(30);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (seconds <= 0) return;

    const countdownInterval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [seconds]);

  // Format seconds into seconds
  const remainingSeconds = seconds % 60;

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
          { justifyContent: "center", height: "100%", gap: itemWidth * 0.04 },
        ]}
      >
        <Text style={[styles.mediumTxt, { fontWeight: "700" }]}>
          Verify Code
        </Text>

        <Text
          style={[styles.smallTxt, { fontWeight: "400", color: "#6e6e6e" }]}
        >
          {`We've sent a verification code to ${email}`}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter verification code"
          autoCapitalize="none"
          keyboardType="number-pad"
          onChangeText={(value) => setCode(value)}
        />

        <Pressable
          style={[styles.button, { width: "100%" }]}
          onPress={handleVerifyEmail}
        >
          {loading ? (
            <ActivityIndicator color={"white"} />
          ) : (
            <Text style={styles.buttonTxt}>Verify</Text>
          )}
        </Pressable>

        <Text
          style={[styles.smallTxt, { fontWeight: "400", color: "#6e6e6e" }]}
        >
          Didn't receive code?
        </Text>

        <Text
          style={[
            styles.smallTxt,
            {
              color: seconds === 0 ? colors.primary : "#7e7e7e",
            },
          ]}
          onPress={() => {
            if (seconds === 0) {
              handleResendCode();
            }
          }}
        >
          {seconds === 0
            ? "Resend"
            : `${remainingSeconds.toString().padStart(2, "0")}s`}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordVerify;
