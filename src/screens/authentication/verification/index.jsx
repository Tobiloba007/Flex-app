import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Text,
  Image
} from "react-native";
import { colors } from "../../../../colors";
import axios from "axios";
import User from "../../../components/User";
import PagerView from "react-native-pager-view";
import Ionicons from "@expo/vector-icons/Ionicons";
import Step1 from "../../../components/authenticcation/verification/Step1";
import Step5 from "../../../components/authenticcation/verification/Step5";
import Step6 from "../../../components/authenticcation/verification/Step6";
import Step7 from "../../../components/authenticcation/verification/Step7";

import { BASE_URL_BLOCKCHAIN } from "../../../config";
import mime from "mime";
import { DevMenu } from "expo-dev-client";

const width = Dimensions.get("window").width;
export default function UserVerification() {
  const pagerRef = useRef(null);
  const [page, setPage] = useState(0);
  const { user } = User();

  const [full_name, setFullName] = useState("");
  const [nationality, setNationality] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [selfie, setSelfie] = useState("");
  const [proofOfAddress, setProofOfAddress] = useState("");
  const [identityDoc, setIdentityDoc] = useState("");

  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setFullName(`${user.fname} ${user.lname}` || "");
      setAddress(user.address || "");
      fetchVerificationStatus(user.id);
    }
  }, [user]);

  const fetchVerificationStatus = async (userId) => {
    try {
      const response = await axios.get(
        `${BASE_URL_BLOCKCHAIN}/api/v1/verification/user_verification.php`, 
        { params: { user_id: userId }}
      );
      if (response.data.verification_status_code != 0) {
        setIsVerified(response.data.verification_status);
      }
      
    } catch (error) {
      console.error("Error fetching verification status", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (pagerRef.current) {
      pagerRef.current.setPage(page + 1);
      setPage(page + 1);
    }
  };

  const handleBack = () => {
    if (pagerRef.current) {
      pagerRef.current.setPage(page - 1);
      setPage(page - 1);
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();

    data.append("user_id", user?.id || "245");
    data.append("full_name", full_name);
    data.append("nationality", nationality);
    data.append("city", city);
    data.append("address", address);

    const appendFile = (key, uri) => {
      if (uri) {
        data.append(key, {
          uri: uri,
          name: uri.split("/").pop(),
          type: mime.getType(uri),
        });
      } else {
        console.log(`${key} is not set`);
      }
    };
  
    appendFile("live_selfie", selfie);
    appendFile("proof_of_address", proofOfAddress);
    appendFile("identity_document", identityDoc);
    try {
      const response = await axios.post(
        `${BASE_URL_BLOCKCHAIN}/api/v1/verification/user_verification.php`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      console.log("Upload success", response.data);
    } catch (error) {
      console.log(data)
      console.error("Upload error", error.message);
    }
  };

  const isStepValid = () => {
    switch (page) {
      case 0:
        return nationality.length > 0 && city.length > 0;
      case 1:
        return selfie.length > 0;
      case 2:
        return proofOfAddress.length > 0;
      case 3:
        return identityDoc.length > 0;
      default:
        return false;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (isVerified) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text style={{
          fontSize: 25,
          fontWeight: '700'
        }}>Verification {isVerified}!</Text>
          <Image 
          source={require("../../../../assets/icons/verified.png")}
          />
        </View>
    )
  }
  
  return (
    <SafeAreaView
      className="h-full w-full"
      style={{ paddingTop: StatusBar.currentHeight }}
    >
        <View
        className="flex-row"
        style={{
          width: width * 0.83,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {page > 0 && (
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="chevron-back-outline" size={32} color="black" />
          </TouchableOpacity>
        )}
        <View
          ref={pagerRef}
          className="flex-row justify-start items-start w-full px-5 pb-5 pt-4"
        >
          <View
            className={`bg-[#D9D9D9] h-[6px] w-[6px] rounded-full mr-[2px] ${
              page === 0 && `bg-[${colors.primary}] w-[16px]`
            }`}
          ></View>
          <View
            className={`bg-[${
              page === 1 ? colors.primary : "#D9D9D9"
            }] h-[6px] w-[${
              page === 1 ? "16px" : "6px"
            }] rounded-full mr-[2px]`}
          ></View>
          <View
            className={`bg-[#D9D9D9] h-[6px] w-[6px] rounded-full mr-[2px] ${
              page === 2 && `bg-[${colors.primary}] w-[16px]`
            }`}
          ></View>
          <View
            className={`bg-[#D9D9D9] h-[6px] w-[6px] rounded-full mr-[2px] ${
              page === 3 && `bg-[${colors.primary}] w-[16px]`
            }`}
          ></View>
        </View>
        {page < 3 && (
          <TouchableOpacity
            style={[!isStepValid() && { display: "none" }]}
            onPress={handleNext}
            disabled={!isStepValid()}
          >
            <Ionicons name="chevron-forward-outline" size={32} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        scrollEnabled={false}
        ref={pagerRef}
      >
        <View key="1">
          <Step1
            setFullName={setFullName}
            full_name={full_name}
            setNationality={setNationality}
            nationality={nationality}
            setCity={setCity}
            city={city}
            setAddress={setAddress}
            address={address}
          />
        </View>
        <View key="2">
          <Step5 setSelfie={setSelfie} />
        </View>
        <View key="3">
          <Step6 setProofOfAddress={setProofOfAddress} />
        </View>
        <View key="4">
          <Step7 setIdentityDoc={setIdentityDoc} />
          <View className="w-full px-5 absolute bottom-24">
            <TouchableOpacity
              onPress={handleSubmit}
              className={`h-[49px] w-full items-center justify-center bg-[#029CFC] rounded-[25px] shadow-md`}
            >
              <Text
                className={`text-[15px] font-["sans-regular"] text-[#ffffff]`}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </PagerView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  pagerView: { flex: 1 },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  navButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
  },
  navButtonDisabled: {
    backgroundColor: "#ccc",
  },
  navButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
