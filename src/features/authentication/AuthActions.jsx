import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setError, setIsLoggedIn, setLoading, setRegToken, setToken, setUser } from './AuthSlice';
import { BASE_URL } from '../../config';



    // CREATE ACCOUNT
    export const createAccount = (formData, setError, navigation, handleNextPage, regValues) => async (dispatch) => {
        dispatch(setLoading(true));
        try{
          const response = await axios.post(`${BASE_URL}/api/v1/account/registration/account_registration.php`, formData);
          if (response.data.status === 'success') {
            console.log('Registration successfull');
            console.log(response.data.message);
            handleNextPage(2)
            navigation.navigate('verification', {regValues})
          } else if (response.data.status === 'error') {
            console.log('Registration failed with status code:', response.status);
            setError(response.data.message)
            console.log(regValues);
          } 
        } catch(error) {
          if (error.response) { 
            console.log('this is an error');
            console.error('API Error:', error.response.status);
            setError('An Errror occurred while processing your request!, please try again.')
            dispatch(setLoading(false))
      
          } else if (error.request) {
            // The request was made but no response was received (e.g., network issue)
            setError('Please check your internet connection...')
            console.error('Network Error:', error.request);
          } else {
            setError(error.request)
            // Something happened in setting up the request or processing the response
            console.error('Request Error:', error.message);
          }
          dispatch(setLoading(false));
        };
        dispatch(setLoading(false));
        console.log(formData);
      };



      // EMAIL CONFIRMATION TOKEN
export const confirmEmail = (verifyData, setErrorMssg, navigation) => async (dispatch) => {
  dispatch(setLoading(true));
  try{
    const response = await axios.post(`${BASE_URL}/api/v1/account/verification/email_verification.php`, verifyData
    );
    if (response.data.status === 'success') {
      console.log('Email confirmed');
      console.log(response.data.message);
      navigation.navigate('home')

    } else if (response.data.status === 'error') {
      console.log('Email Confirmation failed with status code:', response.status)
      setErrorMssg(response.data.message)
      console.log(response.data.message)
    } 
  } catch(error) {
    if (error.response) {
      // The server responded with an error (e.g., HTTP status code 4xx or 5xx)
      console.error('API Error:', error.response.status);
      setError('please input the correct OTP')
    } else if (error.request) {
      // The request was made but no response was received (e.g., network issue)
      setError('Please check your internet connection...')
      console.error('Network Error:', error.request);
    } 
  };
  dispatch(setLoading(false));
  console.log(verifyData);
};    



      // RESEND CODE
      export const ResendMyCode = (forgotData, setSendError, navigation) => async (dispatch) => {
        dispatch(setLoading(true));
        try{
          const response = await axios.post(`${BASE_URL}/api/v1/account/verification/email_verification.php`, forgotData
          );
          if (response.data.status === 'success') {
            console.log('Email confirmed');
            console.log(response.data.message);
            navigation.navigate('verification')
      
          } else if (response.data.status === 'error') {
            console.log('Email Confirmation failed with status code:', response.status)
            console.log(response.data.message)
            setSendError(response.data.message)
          } 
        } catch(error) {
           if (error.request) {
            // The request was made but no response was received (e.g., network issue)
            setSendError('Please check your internet connection...')
            console.error('Network Error:', error.request);
          } 
        };
        dispatch(setLoading(false));
        console.log(forgotData);
      };  



          // LOGIN ACTIONS
export const loginUser = (formData, setLoginError, navigation) => async (dispatch) => {
  dispatch(setLoading(true));
  try{
    const response = await axios.post(`${BASE_URL}/simplelogin_v6.php`, formData);
    if (response.data.status === 'true') {
      console.log('Registration successful');
      console.log(response.data.message);
      console.log(response.data.data[0]);
      const userData = response.data.data[0]
      console.log(userData.email);
      await AsyncStorage.setItem('user_data', JSON.stringify(userData))
      .then(() => {
        console.log('User data stored in AsyncStorage.');
      })
      dispatch(setIsLoggedIn(true))
      navigation.navigate('tab')
    } else if (response.data.status === 'false') {
      console.log('Registration failed with status code:', response.status);
      console.log(response.data.message)
      setLoginError(response.data.message)
    } 
  }
  catch(error) {
    if (error.response) {
      // The server responded with an error (e.g., HTTP status code 4xx or 5xx)
      console.error('API Error:', error.response.status);

    } else if (error.request) {
      // The request was made but no response was received (e.g., network issue)
      setLoginError('Please check your internet connection...')
      console.error('Network Error:', error.request);
    } else {
      // Something happened in setting up the request or processing the response
      console.error('Request Error:', error.message);
    }
  };
  dispatch(setLoading(false));
  console.log(loginData);
};
  