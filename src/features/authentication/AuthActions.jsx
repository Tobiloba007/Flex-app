import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setError,
  setIsLoggedIn,
  setLoading,
  setRegToken,
  setToken,
  setUser,
} from "./AuthSlice";
import { BASE_URL } from "../../config";

// CREATE ACCOUNT
export const createAccount =
  (formData, setError, navigation, handleNextPage, regValues) =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/account/registration/account_registration.php`,
        { method: "POST", body: formData }
      );

      const data = await response.json();

      if (data.status === "success") {
        // console.log("Registration successfull");
        // console.log(data.message);
        handleNextPage(2);
        navigation.navigate("verification", { regValues });
      } else if (data.status === "error") {
        // console.log("Registration failed with status code:", data.status);
        setError(data.message);
        // console.log(regValues);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        // console.log("this is an error");
        // console.error("API Error:", error.response.status);
        setError(
          "An Errror occurred while processing your request!, please try again."
        );
        dispatch(setLoading(false));
      } else if (error.request) {
        // The request was made but no response was received (e.g., network issue)
        setError("Please check your internet connection...");
        // console.error("Network Error:", error.request);
      } else {
        setError(error.request);
        // Something happened in setting up the request or processing the response
        // console.error("Request Error:", error.message);
      }
      dispatch(setLoading(false));
    }
    dispatch(setLoading(false));
    // console.log(formData);
  };

// EMAIL CONFIRMATION TOKEN
export const confirmEmail =
  (verifyData, setErrorMssg, navigation) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/account/verification/email_verification.php`,
        { method: "POST", body: verifyData }
      );

      const data = await response.json();

      if (data.status === "success") {
        console.log("Email confirmed");
        console.log(data.message);
        navigation.navigate("home");
      } else if (data.status === "error") {
        console.log(
          "Email Confirmation failed with status code:",
          response.status
        );
        setErrorMssg(data.message);
        console.log(data.message);
      }
    } catch (error) {
      if (error.response) {
        // The server responded with an error (e.g., HTTP status code 4xx or 5xx)
        console.error("API Error:", error.response.status);
        setError("please input the correct OTP");
      } else if (error.request) {
        // The request was made but no response was received (e.g., network issue)
        setError("Please check your internet connection...");
        console.error("Network Error:", error.request);
      }
    }
    dispatch(setLoading(false));
    // console.log(verifyData);
  };

// RESEND CODE
export const ResendMyCode =
  (forgotData, setSendError, navigation) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/account/verification/email_verification.php`,
        forgotData
      );
      if (response.data.status === "success") {
        console.log("Email confirmed");
        console.log(response.data.message);
        navigation.navigate("verification");
      } else if (response.data.status === "error") {
        console.log(
          "Email Confirmation failed with status code:",
          response.status
        );
        console.log(response.data.message);
        setSendError(response.data.message);
      }
    } catch (error) {
      if (error.request) {
        // The request was made but no response was received (e.g., network issue)
        setSendError("Please check your internet connection...");
        console.error("Network Error:", error.request);
      }
    }
    dispatch(setLoading(false));
    console.log(forgotData);
  };

// LOGIN ACTIONS
export const loginUser =
  (loginData, setLoginError, navigation, url) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`${BASE_URL}/${url}`, {
        method: "POST",
        body: loginData,
      });
      const data = await response.json();

      if (
        data?.message ===
        "It appears this is your first time here. To continue, please take a moment to create a new account."
      ) {
        setLoginError(data?.message);
      }

      if (data.status === "true") {
        // console.log("Registration successful");

        const userData = data.data[0];

        await AsyncStorage.setItem("user_data", JSON.stringify(userData)).then(
          () => {
            console.log("User data stored in AsyncStorage.");
          }
        );

        dispatch(setIsLoggedIn(true));
        navigation.navigate("pin");
      } else if (data.status === "false") {
        console.log("Registration failed with status code:", data.status);
        setLoginError(data.message);
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        // The server responded with an error (e.g., HTTP status code 4xx or 5xx)
        console.error("API Error:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received (e.g., network issue)
        setLoginError("Please check your internet connection...");
        console.error("Network Error:", error.request);
      } else {
        // Something happened in setting up the request or processing the response
        // console.error("Request Error:", error.message);
        setLoginError(error?.message);
      }
    }
    dispatch(setLoading(false));
    // console.log(loginData);
  };
