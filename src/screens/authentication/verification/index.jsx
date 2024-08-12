// App.js
import React, { useState, useRef } from "react";
import {
  View,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Text,
} from "react-native";
import { colors } from "../../../../colors";
import axios from "axios";
import PagerView from "react-native-pager-view";
import Ionicons from "@expo/vector-icons/Ionicons";
import Step1 from "../../../components/authenticcation/verification/Step1";
import Step5 from "../../../components/authenticcation/verification/Step5";
import Step6 from "../../../components/authenticcation/verification/Step6";
import Step7 from "../../../components/authenticcation/verification/Step7";

const width = Dimensions.get("window").width;
export default function App() {
  const pagerRef = useRef(null);
  const [page, setPage] = useState(0);

  const [full_name, setFullName] = useState("");
  const [nationality, setNationality] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [selfie, setSelfie] = useState("");
  const [proofOfAddress, setProofOfAddress] = useState("");
  const [identityDoc, setIdentityDoc] = useState("");

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
    // const data = new FormData();

    // data.append("user_id", "245"); //Edit this
    // data.append("full_name", full_name);
    // data.append("nationality", nationality);
    // data.append("city", city);
    // data.append("address", address);

    const data = {
      "user_id": "245",
      full_name,
      nationality,
      city,
      address,
      "live_selfie": "selfie.jpg",
      "proof_of_address": "proofOfAddress.jpg",
      "identity_document": "identityDoc.jpg",
    };

    if (selfie) {
      // data.append("live_selfie", {
      //   uri: selfie,
      //   type: "image/jpeg",
      //   name: "selfie.jpg",
      // });
      //data.append("live_selfie", "selfie.jpg")
    }

    if (proofOfAddress) {
      // data.append("proof_of_address", {
      //   uri: proofOfAddress,
      //   type: "image/jpeg",
      //   name: "proofOfAddress.jpg",
      // });
      //data.append("proof_of_address", "proofOfAddress.jpg");
    }

    if (identityDoc) {
      // data.append("identity_document", {
      //   uri: identityDoc,
      //   type: "image/jpeg",
      //   name: "identityDoc.jpg",
      // });
      //data.append("identity_document", "identityDoc.jpg")
    }

    try {
      const response = await axios.post(
        "https://gotflexapp.com/blockchain/api/v1/verification/user_verification.php",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
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
        return (
          full_name.length > 0 &&
          nationality.length > 0 &&
          city.length > 0 &&
          address.length > 0
        );
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
});
