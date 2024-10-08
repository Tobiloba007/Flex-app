import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  Pressable,
  StatusBar,
  Linking,
} from "react-native";
import React from "react";
import { styles } from "../../constants/styles";
import { colors } from "../../../colors";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { changeThemeState } from "../../redux/themeReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { logoutUser } from "../../redux/userReducer";

const itemWidth = Dimensions.get("window").width;

const Settings = () => {
  const { isDark } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleUpdateThemeState = () => {
    dispatch(changeThemeState());
  };

  const handleLogout = async () => {
    await AsyncStorage.setItem("user_data", "");
    dispatch(logoutUser());
    // dispatch(resetMessageState());
    // navigation.navigate("login");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: isDark ? colors.black : "white" }}
    >
      <StatusBar
        backgroundColor={isDark ? colors.black : "white"}
        barStyle={isDark ? "light-content" : "dark-content"}
      />

      <View style={[styles.container, { padding: 15 }]}>
        <View style={[styles.column, { alignItems: "flex-start" }]}>
          <Text
            style={[
              styles.mediumTxt,
              {
                color: isDark ? colors.white : colors.primary,
                fontSize: itemWidth * 0.065,
                fontWeight: "700",
              },
            ]}
          >
            Settings
          </Text>

          <View
            style={[
              styles.column,
              { marginTop: 20, gap: 20, alignItems: "flex-start" },
            ]}
          >
            <Text
              style={[
                {
                  color: "#e1e1e1",
                  fontSize: itemWidth * 0.04,
                  fontWeight: "500",
                },
              ]}
            >
              GENERAL
            </Text>

            <Pressable
              style={[
                styles.rowSpace,
                {
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBlockColor: "#e1e1e1",
                  paddingVertical: 12,
                },
              ]}
              onPress={() => navigation.navigate("editProfile")}
            >
              <View style={styles.row}>
                <AntDesign
                  name="user"
                  size={20}
                  color={isDark ? "white" : colors.black}
                />
                <Text
                  style={[
                    styles.smallTxt,
                    { color: isDark ? "white" : colors.black },
                  ]}
                >
                  Account
                </Text>
              </View>

              <FontAwesome
                name="angle-right"
                size={24}
                color={isDark ? "white" : colors.black}
              />
            </Pressable>

            <Pressable
              style={[
                styles.rowSpace,
                {
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBlockColor: "#e1e1e1",
                  paddingVertical: 12,
                },
              ]}
              onPress={() => navigation.navigate("referral")}
            >
              <View style={styles.row}>
                <AntDesign
                  name="addusergroup"
                  size={20}
                  color={isDark ? "white" : colors.black}
                />
                <Text
                  style={[
                    styles.smallTxt,
                    { color: isDark ? "white" : colors.black },
                  ]}
                >
                  Referral
                </Text>
              </View>

              <FontAwesome
                name="angle-right"
                size={24}
                color={isDark ? "white" : colors.black}
              />
            </Pressable>

            <Pressable
              style={[
                styles.rowSpace,
                {
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBlockColor: "#e1e1e1",
                  paddingVertical: 12,
                },
              ]}
              onPress={() => navigation.navigate("userVerification")}
            >
              <View style={styles.row}>
                <AntDesign
                  name="checkcircleo"
                  size={20}
                  color={isDark ? "white" : colors.black}
                />
                <Text
                  style={[
                    styles.smallTxt,
                    { color: isDark ? "white" : colors.black },
                  ]}
                >
                  Verification
                </Text>
              </View>

              <FontAwesome
                name="angle-right"
                size={24}
                color={isDark ? "white" : colors.black}
              />
            </Pressable>

            <Pressable
              style={[
                styles.rowSpace,
                {
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBlockColor: "#e1e1e1",
                  paddingVertical: 12,
                },
              ]}
            >
              <View style={styles.row}>
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color={isDark ? "white" : colors.black}
                />
                <Text
                  style={[
                    styles.smallTxt,
                    { color: isDark ? "white" : colors.black },
                  ]}
                >
                  Notifications
                </Text>
              </View>

              <FontAwesome
                name="angle-right"
                size={24}
                color={isDark ? "white" : colors.black}
              />
            </Pressable>

            <Pressable
              style={[
                styles.rowSpace,
                {
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBlockColor: "#e1e1e1",
                  paddingVertical: 12,
                },
              ]}
              onPress={handleLogout}
            >
              <View style={styles.row}>
                <MaterialIcons
                  name="logout"
                  size={20}
                  color={isDark ? "white" : colors.black}
                />
                <Text
                  style={[
                    styles.smallTxt,
                    { color: isDark ? "white" : colors.black },
                  ]}
                >
                  Logout
                </Text>
              </View>

              <FontAwesome
                name="angle-right"
                size={24}
                color={isDark ? "white" : colors.black}
              />
            </Pressable>

            <Pressable
              style={[
                styles.rowSpace,
                {
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBlockColor: "#e1e1e1",
                  paddingVertical: 12,
                },
              ]}
              onPress={() => Linking.openURL("https://gotflexapp.com/account")}
            >
              <View style={styles.row}>
                <MaterialCommunityIcons
                  name="delete-forever-outline"
                  size={20}
                  color={isDark ? "white" : colors.black}
                />
                <Text
                  style={[
                    styles.smallTxt,
                    { color: isDark ? "white" : colors.black },
                  ]}
                >
                  Delete Account
                </Text>
              </View>

              <FontAwesome
                name="angle-right"
                size={24}
                color={isDark ? "white" : colors.black}
              />
            </Pressable>

            <Text
              style={[
                {
                  color: "#e1e1e1",
                  fontSize: itemWidth * 0.04,
                  fontWeight: "500",
                  marginTop: 20,
                },
              ]}
            >
              THEME
            </Text>

            <Pressable
              style={[
                styles.rowSpace,
                {
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBlockColor: "#e1e1e1",
                  paddingVertical: 12,
                },
              ]}
            >
              <View style={styles.row}>
                <Ionicons
                  name={isDark ? "moon-sharp" : "sunny"}
                  size={20}
                  color={isDark ? "white" : "black"}
                />
                <Text
                  style={[
                    styles.smallTxt,
                    { color: isDark ? "white" : colors.black },
                  ]}
                >
                  Switch to darkmode
                </Text>
              </View>

              <FontAwesome
                name={isDark ? "toggle-on" : "toggle-off"}
                size={24}
                color={isDark ? "white" : "black"}
                onPress={handleUpdateThemeState}
              />
            </Pressable>

            <Text
              style={[
                {
                  color: "#e1e1e1",
                  fontSize: itemWidth * 0.04,
                  fontWeight: "500",
                  marginTop: 20,
                },
              ]}
            >
              FEEDBACK
            </Text>

            <Pressable
              style={[
                styles.rowSpace,
                {
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBlockColor: "#e1e1e1",
                  paddingVertical: 12,
                },
              ]}
            >
              <View style={styles.row}>
                <Feather
                  name="send"
                  size={20}
                  color={isDark ? "white" : colors.black}
                />
                <Text
                  style={[
                    styles.smallTxt,
                    { color: isDark ? "white" : colors.black },
                  ]}
                >
                  Send feedback
                </Text>
              </View>

              <FontAwesome
                name="angle-right"
                size={24}
                color={isDark ? "white" : colors.black}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
