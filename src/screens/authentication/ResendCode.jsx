import { useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Formik } from 'formik';
import * as yup from 'yup';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { ResendMyCode } from '../../features/authentication/AuthActions';


const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
  });

export default function ResendCode() {
  const [sendError, setSendError] = useState(false);

    const navigation = useNavigation();
    const loading = useSelector((state) => state.auth.loading)
    const dispatch = useDispatch();

    const type = {"request_type": "send_code" }

    const handleSubmit = (values) => {
      const object = {...type, ...values}
      const forgotData = new FormData();
      // Append form field values to FormData
      Object.keys(object).forEach((key) => {
        forgotData.append(key, object[key]);
      });
      dispatch(ResendMyCode(forgotData, setSendError, navigation,))
      console.log(forgotData);
    }

  return (
    <SafeAreaView className="w-full h-full" style={{paddingTop: StatusBar.currentHeight}}>
        <View className="items-center justify-center w-full mt-5">
            <Text className={`text-[15px] font-["sans-semibold"]`}>Resend Code</Text>
            <TouchableOpacity onPress={()=>navigation.goBack()}
            className="absolute left-5 w-[30px] h-[41px] top-1">
               <SimpleLineIcons name="arrow-left" size={16} color="black" />
            </TouchableOpacity>
        </View>

        <View className="items-start w-full px-5 mt-9">
          <Text className={`text-[27px] font-["sans-semibold"]`}>
               We got you covered
           </Text>
          <Text className={`text-13px] font-["sans-regular"] pt-1`}>
               Enter the email you registered your account with and we will send your new security code.
           </Text>
        </View>

      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
      {({ handleChange, handleBlur, handleSubmit, values, isValid, errors }) => (
        <>
        <View className="w-full items-start px-5 mt-8">
               <Text className={`text-[13px] font-["sans-regular"]`}>
                   Email Address
               </Text>
                <TextInput 
                className={`w-full h-[49px] border-[#029CFC] border-[1px] mt-3 rounded-[6px] pl-4 ${errors.email && 'border-red-600'} ${!errors.email && values.email && 'border-[#029CFC]'}`}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder="email@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                />
                <Text className="text-red-600">{isValid ? null : 'Please enter a valid email'}</Text>
        </View>


        <View className="flex items-start w-full mt-10 px-6">
                {sendError && <Text className="text-sm text-red-600">{sendError}</Text>}
        </View>

        <View className="items-center w-full px-5">
          <TouchableOpacity
          onPress={handleSubmit} disabled={!isValid}
           className={`items-center justify-center w-full h-[49px] rounded-[6px] mt-2 ${isValid && !loading ? 'bg-[#029CFC]' : 'bg-[#dddddd]'}`}>
                <Text className={`text-[15px] font-["sans-regular"] text-white`}>
                     {
                      loading
                      ?<ActivityIndicator style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} size={'large'} />
                      :'Confirm your email'
                    }
                </Text>
            </TouchableOpacity>
        </View>
        </>
        )}
       </Formik>

    </SafeAreaView>
  )
}
