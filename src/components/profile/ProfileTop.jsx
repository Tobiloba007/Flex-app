import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import dp from "../../../assets/images/dp.jpg";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../config";

export default function ProfileTop() {
  const navigation = useNavigation();

  const [user, setUser] = useState();
  const [userProfile, setUserProfile] = useState(null);
  const [userData, setUserData] = useState(null);

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

  const fetchProfile = async () => {
    const formData = new FormData();
    formData.append("name", user?.id);

    try {
      const res = await fetch(`${BASE_URL}/profile.php`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setUserProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let subscribe = true;

    if (subscribe) {
      fetchProfile();
    }

    return () => (subscribe = false);
  }, [user]);

  useEffect(() => {
    setUserData(userProfile?.data[0]);
  }, [userProfile]);

  // console.log(userData);

  return (
    <SafeAreaView className="flex flex-col items-center justify-start w-full pt-12">
      <TouchableOpacity className="absolute top-6 right-5">
        <Ionicons name="settings-sharp" size={27} color="black" />
      </TouchableOpacity>

      <View className="flex flex-col items-center justify-start w-full">
        <View className="flex items-center justify-center w-20 h-20 bg-[#CDEAFC] rounded-full">
          <Image
            className="w-[90%] h-[90%] rounded-full"
            source={{ uri: userData?.image }}
            alt="my displey_picture"
            resizeMode="cover"
          />
        </View>
        <Text className={`text-xl text-[#029CFC] font-["sans-semibold"] mt-2`}>
          {userData?.fname} {userData?.lname}
        </Text>
        <Text className={`text-sm text-[#000000] font-["sans-semibold"]`}>
          ${userData?.fname.toLowerCase()}
        </Text>
      </View>

      <View className="flex flex-row items-center justify-center w-full mt-5">
        <TouchableOpacity
          onPress={() => navigation.navigate("seeRequests")}
          className="flex items-center justify-center bg-[#029CFC] w-[35%] h-11 rounded-xl"
        >
          <Text className={`text-sm text-[#ffffff] font-["sans-medium"]`}>
            SEE REQUESTS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex items-center justify-center bg-[#ffffff] w-[35%] h-11 rounded-xl">
          <Text className={`text-sm text-[#000000] font-["sans-medium"]`}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex flex-row items-center justify-center w-full mt-5">
        <TouchableOpacity className="mr-7">
          <MaterialIcons name="phone-callback" size={24} color="#029CFC" />
        </TouchableOpacity>

        <TouchableOpacity className="mr-7">
          <MaterialIcons name="facebook" size={27} color="#029CFC" />
        </TouchableOpacity>

        <TouchableOpacity className="mr-7">
          <FontAwesome5 name="instagram" size={24} color="#029CFC" />
        </TouchableOpacity>

        <TouchableOpacity className="">
          <FontAwesome6 name="x-twitter" size={24} color="#029CFC" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
