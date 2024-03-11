import { ActivityIndicator, Image, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../../features/authentication/AuthActions';
import { useDispatch, useSelector } from 'react-redux';


const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters')
  });


export default function Login() {
    const [close, setClose] = useState(false)
    const [loginError, setLoginError] = useState('')

    const loading = useSelector((state) => state.auth.loading)
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch();

    const navigation = useNavigation();


    const handleSubmit = (values) => {
        const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

        console.log(formData)
        dispatch(loginUser(formData, setLoginError, navigation, isLoggedIn))
      };

  return (
    <SafeAreaView clasName="items-center w-full h-full" style={{paddingTop: StatusBar.currentHeight}}>
        <View className="items-center justify-center w-full mt-5">
            <Text className={`text-[15px] font-["sans-semibold"]`}>Login</Text>
            <TouchableOpacity onPress={()=>navigation.goBack()}
            className="absolute left-5 w-[30px] h-[41px] top-1">
               <SimpleLineIcons name="arrow-left" size={16} color="black" />
            </TouchableOpacity>
        </View>

        <ScrollView>
        <View className="items-center w-full px-5 mt-20">
            <TouchableOpacity className="flex-row items-center justify-center w-full h-[49px] border-[0.5px] border-[#8A8A8A] rounded-[37px] mb-4">
                <Image className="w-[18px] h-[19px] mr-5"
                source={require('../../../assets/icons/google.png')} />
                <Text className={`text-[14px] font-["sans-regular"]`}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-center w-full h-[49px] border-[0.5px] border-[#8A8A8A] rounded-[37px]">
                <Image className="w-[16px] h-[25px] mr-5"
                source={require('../../../assets/icons/apple.png')} />
                <Text className={`text-[14px] font-["sans-regular"]`}>Continue with Google</Text>
            </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between w-full px-5 mt-12">
            <View className="border-[0.5px] opacity-25 w-[47%]"></View>
            <Text className={`text-[12px] font-["sans-regular"]`}>or</Text>
            <View className="border-[0.5px] opacity-25 w-[47%]"></View>
        </View>


        <Formik
             initialValues={{ email: '', password: '' }}
             onSubmit={handleSubmit}
             validationSchema={validationSchema}
           >
           {({ handleChange, handleBlur, handleSubmit, isValid, values, errors }) => (
        <View className="items-center w-full px-5 mt-6">
            <View className="items-start w-full mb-5">
                <Text className={`text-[12px] font-["sans-regular"]`}>Email address</Text>
                <TextInput 
                className={`w-full h-[49px] border-[#029CFC] border-[1px] mt-3 rounded-[6px] pl-4 ${errors.email && 'border-red-600'} ${!errors.email && values.email && 'border-[#029CFC]'}`}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}  
                placeholder='example@gmail.com'
                autoCapitalize="none"
                />
                <Text className="text-red-600 text-xs">{errors.email}</Text>
            </View>

            <View className="items-start w-full mb-7">
                <Text className={`text-[12px] font-["sans-regular"]`}>Password</Text>
                <TextInput 
                className={`w-full h-[49px] border-[#029CFC] border-[1px] mt-3 rounded-[6px] pl-4 ${errors.password && 'border-red-600'} ${!errors.password && values.password && 'border-[#029CFC]'}`}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}  
                placeholder='Password'
                autoCapitalize="none"
                secureTextEntry={close ? true : false}
                />
                <Pressable onPress={()=>setClose(!close)}
                className="absolute bottom-7 right-4">
                    {
                      close 
                      ? <AntDesign name="eye" size={24} color="#029CFC" />
                      : <Ionicons name="eye-off-sharp" size={24} color="#029CFC" />
                    }
                </Pressable>
                <Text className="text-red-600 text-xs">{errors.password}</Text>
            </View>


            <View className="flex items-start w-full">
                {loginError && <Text className="text-sm text-red-600">{loginError}</Text>}
          </View>

            <TouchableOpacity onPress={handleSubmit}
            disabled={!isValid}
            className={`items-center justify-center w-full h-[49px] rounded-[6px] ${isValid && !loading ? 'bg-[#029CFC]' : 'bg-[#dddddd]'} mt-2`}>
                <Text className={`text-[15px] font-["sans-regular"] text-white`}>
                   {
                   loading
                   ?<View style={{alignItems: 'center', justifyContent: 'center', height: Platform === 'ios' && 60}}>
                     <ActivityIndicator size={'large'} />
                    </View>
                   :'Login'
                   }
                </Text>
            </TouchableOpacity>

        </View>
        )}
        </Formik>


        <View className="flex-row items-center justify-between w-full px-5 mt-3">
            <Pressable>
               <Text className={`text-[12px] font-["sans-regular"] text-[#029CFC]`}>Forgot Password?</Text>
            </Pressable>
            <Pressable onPress={()=>navigation.navigate('choose')}>
               <Text className={`text-[12px] font-["sans-regular"] text-[#029CFC]`}>Create New Account</Text>
            </Pressable>
        </View>
        </ScrollView>

    </SafeAreaView>
  )
}
