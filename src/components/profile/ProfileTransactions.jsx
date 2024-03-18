import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import image1 from "../../../assets/images/dp2.jpg";
import image2 from "../../../assets/images/dp3.jpg";
import image3 from "../../../assets/images/dp4.jpg";
import CryptoJS from "crypto-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../config";
import moment from "moment";
import { colors } from "../../../colors";

const itemWidth = Dimensions.get("window").width;

export default function ProfileTransactions() {
  const transData = [
    {
      id: 1,
      type: "credit",
      image: image1,
      name: "Janet Sonia",
      details: "₦0.0 03-01-2024",
      balance: "+$55.00",
    },
    {
      id: 2,
      type: "debit",
      image: image2,
      name: "Susan Ini",
      details: "₦0.0 03-01-2024",
      balance: "-$76.02",
    },
    {
      id: 3,
      type: "credit",
      image: image3,
      name: "John Soe",
      details: "₦0.0 03-01-2024",
      balance: "+$250.05",
    },
    {
      id: 4,
      type: "credit",
      image: image1,
      name: "Janet Sonia",
      details: "₦0.0 03-01-2024",
      balance: "+$55.00",
    },
    {
      id: 5,
      type: "debit",
      image: image2,
      name: "Susan Ini",
      details: "₦0.0 03-01-2024",
      balance: "-$76.02",
    },
    {
      id: 6,
      type: "credit",
      image: image3,
      name: "John Soe",
      details: "₦0.0 03-01-2024",
      balance: "+$250.05",
    },
  ];

  const [user, setUser] = useState();
  const [transaction, setTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  function decrypt(cipherText, secret, iv) {
    // IV is a hexadecimal string, no need to decode
    let iv1 = CryptoJS.enc.Utf8.parse(iv);

    const key = CryptoJS.enc.Utf8.parse(secret);

    const cipherBytes = CryptoJS.enc.Base64.parse(cipherText);

    const decrypted = CryptoJS.AES.decrypt({ ciphertext: cipherBytes }, key, {
      iv: iv1,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  const fetchTransaction = async () => {
    // generate appKey of 16 digitstring
    const min = Math.ceil(1000000000000000);
    const max = Math.floor(9000000000000000);
    const appKey = Math.floor(Math.random() * (max - min + 1)) + min;

    setIsLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/transactions/transactions_history.php?id=${user?.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-FLEXAPP-AuthKey": "flexapp",
            "X-Authorisation": appKey,
            "X-Flexapp-appkey": appKey,
          },
        }
      );

      try {
        const encryptedData = res.data;
        const encryptedKey = appKey;
        const iv = encryptedData.slice(0, 16);
        const content = encryptedData.slice(16, encryptedData.length);

        const decryptedData = decrypt(content, encryptedKey, iv);

        try {
          // PARSE JSON only if decryption succeeded
          const data = JSON.parse(decryptedData, 10);

          setTransaction(data);
        } catch (parseError) {
          console.error("Error parsing decrypted data:", parseError);
          // Handle invalid JSON gracefully
        }
      } catch (decryptionError) {
        console.error("Decryption error:", decryptionError);
        // Handle decryption failures
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // console.log(transaction)

  useEffect(() => {
    fetchTransaction();
  }, [user]);

  // console.log(transaction);

  return (
    <View className="flex flex-col items-center justify-start w-full mt-10 px-3 pb-28">
      <Text
        className={`text-base text-[#848485] font-["sans-semibold"] text-start w-full px-6`}
      >
        TRANSACTIONS
      </Text>

      {isLoading ? (
        <View
          style={{
            height: "80%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color={colors.primary} size={"large"} />
        </View>
      ) : (
        <View className="flex flex-col items-center justify-start w-full mt-1">
          {transaction?.map((data, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="flex flex-row items-center justify-between w-full h-16 px-4 py-2 border-[1px] border-[#D9F0FF] rounded-2xl mt-3"
                style={{
                  width: itemWidth * 0.94,
                  justifyContent: "space-between",
                }}
              >
                <View
                  // className="flex flex-row items-center justify-start"
                  style={{
                    flexDirection: "row",
                    width: "68%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    className="h-12 w-12 rounded-full"
                    source={{ uri: data?.avatar }}
                    alt="transaction"
                  />

                  <View className="pl-3">
                    <Text
                      className={`text-sm text-[#585859] font-["sans-semibold"] text-start`}
                      numberOfLines={1}
                    >
                      {data?.name}
                    </Text>
                    <Text
                      className={`text-[9px] text-[#959292] font-["sans-semibold"] text-start`}
                    >
                      {data?.status} {data?.fee}{" "}
                      {moment(data?.date).format("DD-MM-YYYY")}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    width: "28%",
                    alignItems: "flex-end",
                  }}
                >
                  <Text
                    className={`text-base ${
                      data?.type === "2" ? "text-[#00C974]" : "text-[#EA358C]"
                    } font-["sans-semibold"] text-start`}
                  >
                    {data?.amount}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
