import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../../features/authentication/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { android, clientId, ios } from "../../../env.config";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import { colors } from "../../../colors";

WebBrowser.maybeCompleteAuthSession();

const itemWidth = Dimensions.get("window").width;
const itemHeight = Dimensions.get("window").height;

const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export default function Login() {
  const { isDark } = useSelector((state) => state.theme);

  const [close, setClose] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [idToken, setIdToken] = useState("");

  const loading = useSelector((state) => state.auth.loading);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: ios,
    androidClientId: android,
    clientId: clientId,
  });

  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    if (response && response?.type === "success") {
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
      setIdToken(id_token);

      // console.log(response?.params)
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = JSON.stringify(user, null, 2);
        setUserInfo(JSON.parse(userData));
      } else {
        console.log("null");
      }
    });

    return () => unsubscribe();
  }, []);

  // console.log(userInfo)
  // console.log(idToken)

  const handleGoogleLogin = () => {
    if (userInfo) {
      const loginData = new FormData();
      // loginData.append("email", userInfo?.email);
      loginData.append("id_token", idToken);

      dispatch(
        loginUser(
          loginData,
          setLoginError,
          navigation,
          "api/v1/google/signin.php"
        )
      );
    }
  };

  useEffect(() => {
    if (userInfo) {
      handleGoogleLogin();
    }
  }, [userInfo]);

  const handleSubmit = (values) => {
    const loginData = new FormData();
    // Append form field values to FormData
    Object.keys(values).forEach((key) => {
      loginData.append(key, values[key]);
    });
    dispatch(
      loginUser(loginData, setLoginError, navigation, "simplelogin_v6.php")
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? colors.black : colors.white,
        paddingHorizontal: itemWidth * 0.035,
      }}
    >
      <StatusBar
        backgroundColor={isDark ? colors.black : colors.white}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <ScrollView>
        <View
          style={{
            gap: 40,
            height: "auto",
            paddingVertical: itemHeight * 0.05,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ flex: 1 }}
            >
              <SimpleLineIcons
                name="arrow-left"
                size={16}
                color={isDark ? colors.white : colors.black}
              />
            </TouchableOpacity>

            <Text
              className={`text-[15px] font-["sans-semibold"]`}
              style={{ flex: 1, color: isDark ? colors.white : colors.black }}
            >
              Login
            </Text>

            <View style={{ flex: 1 }}></View>
          </View>

          <View
            style={{
              height: itemHeight * 0.15,
              justifyContent: "center",
              gap: 15,
            }}
          >
            <TouchableOpacity
              // className="flex-row items-center justify-center w-full h-[49px] border-[0.5px] border-[#8A8A8A] rounded-[37px] mb-4"
              style={{
                width: "100%",
                borderWidth: 0.5,
                borderColor: "#8A8A8A",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: itemWidth * 0.03,
                borderRadius: 30,
              }}
              onPress={() => promptAsync()}
            >
              <Image
                className="w-[18px] h-[19px] mr-5"
                source={require("../../../assets/icons/google.png")}
              />
              <Text
                className={`text-[14px] font-["sans-regular"]`}
                style={{ color: isDark ? colors.white : colors.primary }}
              >
                Continue with Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              // className="flex-row items-center justify-center w-full h-[49px] border-[0.5px] border-[#8A8A8A] rounded-[37px]"
              style={{
                width: "100%",
                borderWidth: 0.5,
                borderColor: "#8A8A8A",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                padding: itemWidth * 0.03,
                borderRadius: 30,
              }}
              onPress={() => promptAsync()}
            >
              <Image
                className="w-[16px] h-[25px] mr-5"
                source={require("../../../assets/icons/apple.png")}
              />
              <Text
                className={`text-[14px] font-["sans-regular"]`}
                style={{ color: isDark ? colors.white : colors.primary }}
              >
                Continue with Google
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View
              className="border-[0.5px] opacity-25 w-[45%]"
              style={{ borderColor: isDark ? colors.white : colors.black }}
            ></View>
            <Text
              className={`text-[12px] font-["sans-regular"]`}
              style={{ color: isDark ? colors.white : colors.black }}
            >
              or
            </Text>
            <View
              className="border-[0.5px] opacity-25 w-[45%]"
              style={{ borderColor: isDark ? colors.white : colors.black }}
            ></View>
          </View>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              isValid,
              values,
              errors,
            }) => (
              <View>
                <View>
                  <Text
                    className={`text-[12px] font-["sans-regular"]`}
                    style={{ color: isDark ? colors.white : colors.black }}
                  >
                    Email address
                  </Text>

                  <TextInput
                    className={`w-full h-[49px] border-[#029CFC] border-[1px] mt-3 rounded-[6px] pl-4 ${
                      errors.email && "border-red-600"
                    } ${!errors.email && values.email && "border-[#029CFC]"}`}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder="example@gmail.com"
                    placeholderTextColor={isDark ? colors.soft : colors.black}
                    autoCapitalize="none"
                    style={{ color: isDark ? colors.white : colors.black }}
                  />
                  <Text className="text-red-600 text-xs">{errors.email}</Text>
                </View>

                <View className="items-start w-full mb-7">
                  <Text
                    className={`text-[12px] font-["sans-regular"]`}
                    style={{ color: isDark ? colors.white : colors.black }}
                  >
                    Password
                  </Text>

                  <TextInput
                    className={`w-full h-[49px] border-[#029CFC] border-[1px] mt-3 rounded-[6px] pl-4 ${
                      errors.password && "border-red-600"
                    } ${
                      !errors.password && values.password && "border-[#029CFC]"
                    }`}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    placeholder="Password"
                    placeholderTextColor={isDark ? colors.soft : colors.black}
                    autoCapitalize="none"
                    secureTextEntry={close ? true : false}
                    style={{ color: isDark ? colors.white : colors.black }}
                  />
                  <Pressable
                    onPress={() => setClose(!close)}
                    className="absolute bottom-7 right-4"
                  >
                    {close ? (
                      <AntDesign name="eye" size={24} color="#029CFC" />
                    ) : (
                      <Ionicons
                        name="eye-off-sharp"
                        size={24}
                        color={isDark ? colors.white : colors.primary}
                      />
                    )}
                  </Pressable>
                  <Text className="text-red-600 text-xs">
                    {errors.password}
                  </Text>
                </View>

                <View className="flex items-start w-full">
                  {loginError && (
                    <Text className="text-sm text-red-600">{loginError}</Text>
                  )}
                </View>

                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={!isValid}
                  className={`items-center justify-center w-full h-[49px] rounded-[6px] ${
                    isValid && !loading ? "bg-[#029CFC]" : "bg-[#dddddd]"
                  }`}
                >
                  <Text
                    className={`text-[15px] font-["sans-regular"] text-white`}
                  >
                    {loading ? (
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          height: Platform === "ios" && 60,
                        }}
                      >
                        <ActivityIndicator size={"large"} />
                      </View>
                    ) : (
                      "Login"
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>

          <View className="flex-row items-center justify-between w-full">
            <Pressable
              onPress={() => navigation.navigate("forgotPasswordEmail")}
            >
              <Text
                className={`text-[12px] font-["sans-regular"] text-[#029CFC]`}
              >
                Forgot Password?
              </Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("registration")}>
              <Text
                className={`text-[12px] font-["sans-regular"] text-[#029CFC]`}
              >
                Create New Account
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
