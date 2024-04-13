import { View, Text, Dimensions, Image, Pressable } from "react-native";
import React from "react";
import { styles } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../../colors";
import { useNavigation } from "@react-navigation/native";

const itemWidth = Dimensions.get("window").width;

const AboutBuyer = ({ user, offer }) => {
  const navigation = useNavigation();

  const item = {
    id: offer?.user_id,
  };

  // console.log(user)

  return (
    <View
      style={[
        styles.box,
        {
          alignItems: "flex-start",
          borderRadius: 10,
          gap: 20,
          elevation: 5,
          paddingHorizontal: 15,
        },
      ]}
    >
      <View style={[styles.rowSpace, { width: "100%" }]}>
        <View style={styles.row}>
          <Image
            source={{ uri: user?.image }}
            style={{ height: 40, width: 40, borderRadius: 50 }}
            resizeMode="cover"
          />

          <View style={{ alignItems: "flex-start" }}>
            <Text style={styles.smallTxt}>{user?.fname}</Text>

            <View style={[styles.row, { gap: 5 }]}>
              <MaterialIcons name="circle" color={colors.primary} size={10} />
              <Text
                style={[
                  styles.smallTxt,
                  {
                    color: "rgba(0, 0, 0, 0.45)",
                    fontSize: itemWidth * 0.028,
                  },
                ]}
              >
                Online
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          style={[styles.row, { gap: 5 }]}
          onPress={() => navigation.navigate("MessagingRoom", { item })}
        >
          <Ionicons
            name="chatbubble-ellipses-sharp"
            size={22}
            color={colors.primary}
          />
          <Text style={styles.smallTxt}>Chat</Text>
        </Pressable>
      </View>

      <View style={[styles.rowSpace, { width: "100%" }]}>
        <View style={{ alignItems: "flex-start", gap: 5 }}>
          <Text style={{ color: "gray", fontSize: itemWidth * 0.028 }}>
            Trade time limit
          </Text>

          <View style={[styles.row, { gap: 5 }]}>
            <Feather name="thumbs-up" size={20} color={colors.primary} />
            <Text style={[styles.smallTxt]}>508</Text>
          </View>
        </View>

        <View style={{ alignItems: "flex-start", gap: 5 }}>
          <Text style={{ color: "gray", fontSize: itemWidth * 0.028 }}>
            FlexApp
          </Text>
          <View style={[styles.row, { gap: 5 }]}>
            <Feather name="thumbs-down" size={20} color="red" />
            <Text style={[styles.smallTxt]}>0</Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.rowSpace,
          {
            backgroundColor: "rgba(2, 156, 252, 0.03)",
            width: "100%",
            alignItems: "flex-start",
            paddingVertical: 15,
          },
        ]}
      >
        <View>
          <Text style={{ color: "gray" }}>
            <MaterialIcons name="done" size={14} color={colors.primary} /> ID
            {user?.verify ? " verified" : " unverified"}
          </Text>
          <Text style={{ color: "gray" }}>
            <MaterialIcons name="done" size={14} color={colors.primary} /> Email
            {user?.verify ? " verified" : " unverified"}
          </Text>
        </View>

        <View>
          <Text style={{ color: "gray" }}>
            <MaterialIcons name="done" size={14} color={colors.primary} /> ID
            {user?.verify ? " verified" : " unverified"}
          </Text>
          <Text style={{ color: "gray" }}>
            <MaterialIcons name="done" size={14} color={colors.primary} /> Email
            {user?.verify ? " verified" : " unverified"}
          </Text>
        </View>
      </View>

      <View
        style={{ width: "100%", height: 1, backgroundColor: "gray" }}
      ></View>

      <View style={{ alignItems: "flex-start", gap: 5 }}>
        <Text style={{ color: "gray", fontSize: itemWidth * 0.028 }}>
          Average trade speed
        </Text>

        <Text style={[styles.smallTxt]}>1 hour 20 min</Text>
      </View>
    </View>
  );
};

export default AboutBuyer;
