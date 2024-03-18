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
import React, { useCallback, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ReportUser from "../components/modals/ReportUser";
import BlockUser from "../components/modals/BlockUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../config";
import SeeRequest from "../components/seeRequest/SeeRequest";
import AddRequest from "../components/seeRequest/AddRequest";
import { colors } from "../../colors";

export default function SeeRequests() {
  const [dropdown, setDropdown] = useState(false);
  const [report, setReport] = useState(false);
  const [block, setBlock] = useState(false);
  const [user, setUser] = useState();
  const [requests, setRequests] = useState(null);
  const [friends, setFriends] = useState(null);
  const [reportAccountId, setReportAccountId] = useState();
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

  const fetchFriends = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/user_people.php`);

      setFriends(res.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    let subscribe = true;

    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/notification/notifications.php?id=${user?.id}`
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

      // fetchFriends();
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
            {isFriends ? "ADD FRIEND" : "FRIEND REQUESTS"}
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
              className="flex items-center justify-center h-8 w-28 rounded-2xl bg-[#D9D9D9]"
              style={{ backgroundColor: isFriends ? "#D9D9D9" : "#029CFC" }}
              onPress={() => setIsFriends(false)}
            >
              <FontAwesome
                name="user"
                size={24}
                color={isFriends ? "black" : "white"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex items-center justify-center h-8 w-28 rounded-2xl bg-[#029CFC] ml-2"
              style={{ backgroundColor: isFriends ? "#029CFC" : "#D9D9D9" }}
              onPress={() => setIsFriends(true)}
            >
              <FontAwesome
                name="users"
                size={22}
                color={!isFriends ? "black" : "white"}
              />
            </TouchableOpacity>
          </View>

          {!isFriends && (
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
                <View className="flex items-center justify-start w-full h-full mt-6 px-3">
                  {requests?.map((item) => (
                    <SeeRequest
                      key={item?.id}
                      user={user}
                      item={item}
                      dropdown={dropdown}
                      setDropdown={setDropdown}
                      setReportAccountId={setReportAccountId}
                      setBlock={setBlock}
                      setReport={setReport}
                    />
                  ))}
                </View>
              )}
            </>
          )}

          {isFriends && (
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
                <View className="flex items-center justify-start w-full h-full mt-6 px-3">
                  {requests?.map((item) => (
                    <AddRequest
                      key={item?.id}
                      user={user}
                      item={item}
                      dropdown={dropdown}
                      setDropdown={setDropdown}
                      setReportAccountId={setReportAccountId}
                      setBlock={setBlock}
                      setReport={setReport}
                    />
                  ))}
                </View>
              )}
            </>
          )}
        </ScrollView>
      </View>

      {report && (
        <ReportUser
          setReport={setReport}
          setBlock={setBlock}
          user_id={user?.id}
          reportAccountId={reportAccountId}
        />
      )}
      {block && (
        <BlockUser
          setBlock={setBlock}
          user_id={user?.id}
          reportAccountId={reportAccountId}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
