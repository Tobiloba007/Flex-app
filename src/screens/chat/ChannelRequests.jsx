import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL2 } from "../../config";
import { colors } from "../../../colors";
import ChannelRequest from "../../components/chat/ChannelRequet";
import { styles } from "../../constants/styles";

const ChannelRequests = ({ route }) => {
  const { id } = route.params;

  const [report, setReport] = useState(false);
  const [block, setBlock] = useState(false);
  const [user, setUser] = useState();
  const [requests, setRequests] = useState(null);
  const [isFriends, setIsFriends] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedItems = await AsyncStorage.getItem("user_data");

        if (storedItems !== null) {
          const parsedItems = JSON.parse(storedItems);
          setUser(parsedItems);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let subscribe = true;

    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL2}/channel-request/${id}/requests`
        );

        setRequests(res.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    if (subscribe) {
      fetchRequests();
    }

    return () => (subscribe = false);
  }, [user]);

  return (
    <SafeAreaView
      className={`flex flex-col items-center justify-start w-full bg-white`}
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      <View
        className={`flex flex-col items-center justify-start w-full h-full bg-white ${
          report | block && "bg-[#cccccc] opacity-50"
        }`}
      >
        <View className="flex items-center justify-center w-full h-[75px] bg-white shadow-3xl border-b-[1px] border-[#eeeeee]">
          <Text
            className={`text-center text-black font-["sans-semibold"] text-base mt-4`}
          >
            {"CHANNEL REQUESTS"}
          </Text>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-8 left-3"
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <ScrollView className=" w-full">
          <View className="flex flex-row items-center justify-center w-full mt-12">
            <TouchableOpacity
              className="flex items-center justify-center h-8 w-28 rounded-2xl bg-[#029CFC] ml-2"
              style={{ backgroundColor: "#029CFC" }}
            >
              <FontAwesome name="users" size={22} color={"white"} />
            </TouchableOpacity>
          </View>

          <>
            {loading ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator size={"large"} color={colors.primary} />
              </View>
            ) : (
              <>
                {requests?.length > 0 ? (
                  <View className="flex items-center justify-start w-full h-full mt-6 px-3">
                    {requests?.map((item) => (
                      <ChannelRequest key={item?.id} user={user} item={item} />
                    ))}
                  </View>
                ) : (
                  <Text
                    style={[
                      styles.smallTxt,
                      { fontWeight: 400, marginTop: 20 },
                    ]}
                  >
                    No request to join this channel at the moment.
                  </Text>
                )}
              </>
            )}
          </>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ChannelRequests;
