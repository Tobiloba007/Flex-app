import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Button,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../colors";
import { styles } from "../../constants/styles";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ResetPinModal from "./ResetPinModal";
import PinComponent from "./PinComponent";
import { BASE_URL } from "../../config";

const itemWidth = Dimensions.get("window").width;
const itemHeight = Dimensions.get("window").height;

const Pin = () => {
  const navigation = useNavigation();

  const [pin, setPin] = useState([]);
  const [newPin, setNewPin] = useState(null);
  const [confirmPin, setConfirmPin] = useState([]);
  const [isNewPin, setIsNewPin] = useState(false);
  const [isConfirmPin, setIsConfirmPin] = useState(false);
  const [isPinSet, setIsPinSet] = useState(false);
  const [isMaxPin, setIsMaxPin] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userPin, setUserPin] = useState();
  const [existing, setExistingPin] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getPin = async () => {
      const storedPin = await AsyncStorage.getItem("@user_pin");

      if (storedPin === null) {
        setUserPin(storedPin);
      } else {
        setUserPin(storedPin);
      }

      setIsPinSet(false);
    };

    getPin();
  }, [isPinSet]);

  const handlePin = (num) => {
    if (pin.length < 4) {
      setPin((prev) => [...prev, num]);
    }
  };

  const removePin = () => {
    if (pin.length > 0) {
      pin.pop();
      setPin((prev) => [...prev]);
    }
  };

  useEffect(() => {
    if (!userPin && !isNewPin && pin.length === 4) {
      setNewPin(pin.toString());
      setIsNewPin(true);
      setPin([]);
    }
  }, [pin]);

  useEffect(() => {
    if (!userPin && isNewPin && pin.length === 4) {
      setConfirmPin(pin.toString());
      setIsNewPin(false);
      setIsConfirmPin(true);
    }
  }, [pin]);

  const handleSaveNewPin = async () => {
    if (newPin === confirmPin) {
      await AsyncStorage.setItem("@user_pin", pin.toString()).then(() => {
        setMessage(
          "Pin saved successfully! You can now access this application with your set pin."
        );

        setTimeout(() => {
          setMessage("");
        }, 3000);
      });

      setIsPinSet(true);
      setIsConfirmPin(false);
      setPin([]);
    } else {
      setMessage("Comfirm pin must match the pin you set, please try again.");

      setIsConfirmPin(false);
      setPin([]);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  useEffect(() => {
    if (isConfirmPin) {
      handleSaveNewPin();
    }
  }, [isConfirmPin]);

  useEffect(() => {
    if (pin.length === 4 && userPin) {
      if (pin.toString() === userPin) {
        navigation.navigate("tab");
        setPin([]);
      } else {
        setMessage(
          "The pin you input is incorrect, please try again or use forgot pin"
        );

        setTimeout(() => {
          setPin([]);
          setMessage("");
        }, 3000);
      }
    }
  }, [pin.length]);

  // console.log(userPin);

  const handlePrompt = () => {
    setModalVisible(true);
  };

  const handleResetPin = async () => {
    if (!email && !password) {
      setMessage(
        "Input cannot be empty! Please input a valid data and try again."
      );
      // Close the modal
      setModalVisible(false);
    } else {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      try {
        const response = await fetch(`${BASE_URL}/simplelogin_v6.php`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        // console.log(data);

        if (data.status === "true") {
          await AsyncStorage.setItem("@user_pin", "").then(() => {
            setMessage(
              "Pin reset successfully! You can now enter a new pin to continue."
            );
          });

          setIsPinSet(true);
        }

        if (data.status === "false") {
          setMessage(data?.message);
        }
        // Close the modal
        setModalVisible(false);

        setTimeout(() => {
          setMessage("");
        }, 3000);
      } catch (error) {
        Alert.alert(error?.response?.data);
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PinComponent
            isNewPin={isNewPin}
            userPin={userPin}
            message={message}
            handlePin={handlePin}
            isMaxPin={isMaxPin}
            handlePrompt={handlePrompt}
            pin={pin}
            removePin={removePin}
          />
        </ScrollView>

        <ResetPinModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          setInputValue={setInputValue}
          setEmail={setEmail}
          setPassword={setPassword}
          handleResetPin={handleResetPin}
        />
      </View>
    </SafeAreaView>
  );
};

export default Pin;
