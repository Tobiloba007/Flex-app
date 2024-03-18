import { View, Text, Pressable } from "react-native";
import React from "react";
import { styles } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../colors";
import { useNavigation } from "@react-navigation/native";

const BottomNav = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomCon}>
      <Pressable
        style={styles.bottomItem}
        onPress={() => navigation.navigate("home")}
      >
        <MaterialIcons name="home-filled" size={24} color={colors.primary} />
        <Text style={{ color: colors.primary, fontSize: 12 }}>Home</Text>
      </Pressable>

      <Pressable style={styles.bottomItem}>
        <Ionicons name="card" size={24} color={colors.primary} />
        <Text style={{ color: colors.primary, fontSize: 12 }}>Cards</Text>
      </Pressable>

      <Pressable style={styles.bottomItem}>
        <AntDesign name="pluscircle" size={24} color={colors.primary} />
        <Text style={{ color: colors.primary, fontSize: 12 }}>Send Money</Text>
      </Pressable>

      <Pressable
        style={styles.bottomItem}
        onPress={() => navigation.navigate("ChatRoom")}
      >
        <Ionicons name="chatbubble" size={24} color={colors.primary} />
        <Text style={{ color: colors.primary, fontSize: 12 }}>Chats</Text>
      </Pressable>

      <Pressable
        style={styles.bottomItem}
        onPress={() => navigation.navigate("Friend")}
      >
        <MaterialIcons name="people" size={24} color={colors.primary} />
        <Text style={{ color: colors.primary, fontSize: 12 }}>Friends</Text>
      </Pressable>
    </View>
  );
};

export default BottomNav;
