import { ActivityIndicator, Dimensions, Image, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import RegistrationHeader from './RegistrationHeader'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount } from '../../features/authentication/AuthActions';
import { setError } from '../../features/authentication/AuthSlice';
import { useNavigation } from '@react-navigation/native';
import Verification from './Verification';



const validationSchema = yup.object().shape({
     first_name: yup.string().required('First name is required')
     .min(2, 'First name must be at least 2 characters')
     .max(30, 'First name must not exceed 30 characters')
     .matches(/^[A-Za-z]+$/, 'First name can only contain letters'),
     last_name: yup.string().required('First name is required')
     .min(2, 'First name must be at least 2 characters')
     .max(30, 'First name must not exceed 30 characters')
     .matches(/^[A-Za-z]+$/, 'First name can only contain letters'),
     email: yup.string().email('Invalid email').required('Email is required'),
     phone: yup.string().required('Email is required').matches(/^(?:\+234|0)[789]\d{9}$/),
     // avatar: yup.mixed().required(),
     password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
     confirmPassword: yup.string().required('Confirm Password is required')
     .oneOf([yup.ref('password'), null], 'Passwords must match'),
     referral_id: yup .string().matches(/^[a-zA-Z0-9]{6}$/, 'Invalid referral code format. It should be alphanumeric and 6 characters long')
   });


export default function Registration1({handleNextPage}) {
    const [close, setClose] = useState(false);
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [error, setError] = useState(false);

    const screenWidth = Dimensions.get('window').width;

    const [image, setImage] = useState(null);
  
    const pickImage = async () => {
     let result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.All,
       allowsEditing: true,
       aspect: [4, 3],
       quality: 1,
     });
 
     // console.log(result.assets[0].fileName);
     // setImage(result.assets[0].fileName)
 
     if (!result.canceled) {
       setImage(result.assets[0].fileName);
       console.log(image);
     }
   };

   const imageInput = {avatar: image}

   const navigation = useNavigation();
   const loading = useSelector((state) => state.auth.loading)
   const dispatch = useDispatch();



    const handleSubmit = (values) => {
     const { confirmPassword, ...otherValues } = values;
     const regValues = {...otherValues, ...imageInput}
     const formData = new FormData();
     // Append form field values to FormData
     Object.keys(regValues).forEach((key) => {
       formData.append(key, regValues[key]);
     });
     dispatch(createAccount(formData, setError, navigation, handleNextPage, regValues))
     // console.log(regValues);
   };

  return (
    <SafeAreaView className="items-center w-full" style={{paddingTop: StatusBar.currentHeight}}>
        <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{width: screenWidth, paddingBottom: 50}}
        >
        <View className="items-start w-full px-5 mt-11">
           <Text className={`text-[27px] font-["sans-semibold"]`}>
                Confirm your details
           </Text>

           <Formik
             initialValues={{ first_name: '', last_name: '', email: '', phone: '', password: '', referral_id: '' }}
             onSubmit={handleSubmit}
             validationSchema={validationSchema}
           >
           {({ handleChange, handleBlur, handleSubmit, isValid, values, errors }) => (
           <>
           <View className="flex-row items-start justify-between w-full mt-8">
              <View className="items-start w-[48%]">
                  <Text className={`text-[12px] font-["sans-regular"]`}>
                       First Name
                  </Text>
                  <TextInput
                  className={`h-[49px] w-full pl-4 border-[1px] border-[#8A8A8A] rounded-[6px] mt-2 text-[13px] ${errors.first_name && 'border-red-600'} ${!errors.first_name && values.first_name  && 'border-[#029CFC]'}`}
                  onChangeText={handleChange('first_name')}
                  onBlur={handleBlur('first_name')}
                  value={values.first_name}      
                  placeholder='John'
                  keyboardType="default"
                   />
                   <Text className="text-red-600 text-xs">{errors.first_name}</Text>
              </View>

              <View className="items-start w-[48%]">
                  <Text className={`text-[12px] font-["sans-regular"]`}>
                       Last Name
                  </Text>
                  <TextInput
                  className={`h-[49px] w-full pl-4 border-[1px] border-[#8A8A8A] rounded-[6px] mt-2 text-[13px] ${errors.last_name && 'border-red-600'} ${!errors.last_name && values.last_name  && 'border-[#029CFC]'}`}
                  onChangeText={handleChange('last_name')}
                  onBlur={handleBlur('last_name')}
                  value={values.last_name} 
                  placeholder='Doe'
                  keyboardType="default"
                   />
                   <Text className="text-red-600 text-xs">{errors.last_name}</Text>
              </View>
           </View>
           <Text className={`text-[11px] font-["sans-regular"] text-[#8A8A8A]`}>
                Please ensure this is first and last name on your Government ID document.
           </Text>

           <View className="items-start w-full mt-6">
                  <Text className={`text-[12px] font-["sans-regular"]`}>
                        Email address
                  </Text>
                  <TextInput
                  className={`h-[49px] w-full pl-4 border-[1px] border-[#8A8A8A] rounded-[6px] mt-2 text-[13px] ${errors.email && 'border-red-600'} ${!errors.email && values.email  && 'border-[#029CFC]'}`}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}      
                  placeholder='name@gmail.com'
                  keyboardType="email-address"
                   />
                   <Text className="text-red-600 text-xs">{errors.email}</Text>
           </View>

           <View className="items-start w-full mt-6">
                  <Text className={`text-[12px] font-["sans-regular"]`}>
                        Phone Number
                  </Text>
                  <TextInput
                  className={`h-[49px] w-full pl-4 border-[1px] border-[#8A8A8A] rounded-[6px] mt-2 text-[13px] ${errors.phone && 'border-red-600'} ${!errors.phone && values.phone  && 'border-[#029CFC]'}`}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  placeholder='090 0000 0000'
                  keyboardType="phone-pad"
                   />
                   <Text className="text-red-600 text-xs">{errors.phone}</Text>
           </View>

           <View className="items-start w-full mt-6">
                  <Text className={`text-[12px] font-["sans-regular"]`}>
                        Add Image
                  </Text>
                  <TextInput
                  className={`h-[49px] w-full pl-4 border-[1px] border-[#8A8A8A] rounded-[6px] mt-2 text-[13px] ${!isValid && 'border-red-600'} ${image  !== null  && 'border-[#029CFC]'}`}
                  editable={false}
                   />
                   <View className="absolute bottom-[7px] left-2 flex-row w-full items-center justify-start">
                      <TouchableOpacity onPress={pickImage}
                      className="items-center justify-center h-[35px] w-28 border-[1px] border-[#8A8A8A] rounded-[4px] bg-[#029CFC]">
                         <Text className={`text-[13px] font-["sans-regular"] text-white`}>
                             Choose Image
                         </Text>
                      </TouchableOpacity>
                      <Text className={`text-[13px] font-["sans-regular"] ml-2`}>
                          {image} 
                      </Text> 
                   </View>
           </View>

           <View className="items-start w-full mt-6">
                  <Text className={`text-[12px] font-["sans-regular"]`}>
                       Create password
                  </Text>
                  <TextInput
                  className={`h-[49px] w-full pl-4 border-[1px] border-[#8A8A8A] rounded-[6px] mt-2 text-[13px] ${errors.password && 'border-red-600'} ${!errors.password && values.password  && 'border-[#029CFC]'}`}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder='password'
                  keyboardType="default"
                  secureTextEntry={close ? false : true}
                   />
                   <Pressable onPress={()=>setClose(!close)}
                   className="absolute right-4 bottom-[28px]">
                       <Ionicons name={close ? 'eye-off-outline' : 'eye-outline'} size={23} color="black" />
                   </Pressable>
                   <Text className="text-red-600 text-xs">{errors.password}</Text>
           </View>

           <View className="items-start w-full mt-6">
                  <Text className={`text-[12px] font-["sans-regular"]`}>
                       Confirm password
                  </Text>
                  <TextInput
                  className={`h-[49px] w-full pl-4 border-[1px] border-[#8A8A8A] rounded-[6px] mt-2 text-[13px] ${errors.confirmPassword && 'border-red-600'} ${!errors.confirmPassword && values.confirmPassword  && 'border-[#029CFC]'}`}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  placeholder='confirmPassword'
                  keyboardType="default"
                  secureTextEntry={close ? false : true}
                   />
                   <Pressable onPress={()=>setClose(!close)}
                   className="absolute right-4 bottom-[28px]">
                       <Ionicons name={close ? 'eye-off-outline' : 'eye-outline'} size={23} color="black" />
                   </Pressable>
                   <Text className="text-red-600 text-xs">{errors.confirmPassword}</Text>
           </View>

           <View className="items-start w-full mt-6">
                  <Text className={`text-[12px] font-["sans-regular"]`}>
                       Referral Code (optional)
                  </Text>
                  <TextInput
                  className={`h-[49px] w-full pl-4 border-[1px] border-[#8A8A8A] rounded-[6px] mt-2 text-[13px] ${errors.referral_id && 'border-red-600'} ${!errors.referral_id && values.referral_id  && 'border-[#029CFC]'}`}
                  onChangeText={handleChange('referral_id')}
                  onBlur={handleBlur('referral_id')}
                  placeholder='000000'
                  keyboardType="numeric"
                   />
                   <Text className="text-red-600 text-xs">{errors.referral_id}</Text>
           </View>

           <View className="flex-row items-start justify-start w-full mt-8">
                 <Pressable onPress={()=>setCheck1(!check1)}
                  className="h-[17px] w-[14px] pl-4 border-[1px] border-[#029CFC] rounded-[4px] items-center justify-center"
                  >
                     {check1 && <Feather style={{position: 'absolute'}} name="check" size={16} color="black" />} 
                  </Pressable>
                  <Text className={`text-[10px] font-["sans-regular"] px-5`}>
                       I acknowledge that I have read, understand, and agree to be bound by Flex App's Merchant Service Agreement (MSA). Terms and Conditions, and Privacy Notice
                  </Text>
           </View>

           <View className="flex-row items-start justify-start w-full mt-7">
                  <Pressable onPress={()=>setCheck2(!check2)}
                  className="h-[17px] w-[14px] pl-4 border-[1px] border-[#029CFC] rounded-[4px] items-center justify-center"
                  >
                     {check2 && <Feather style={{position: 'absolute'}} name="check" size={16} color="black" />} 
                  </Pressable>

                  <Text className={`text-[10px] font-["sans-regular"] px-5`}>
                  I agree to receive news, offers, and promotional materials from Flex App.
                  </Text>
           </View>

           <View className="flex items-start w-full mt-7">
                {error && <Text className="text-sm text-red-600">{error}</Text>}
          </View>


           <TouchableOpacity onPress={handleSubmit}
           disabled={!isValid || image === null || !check1 || !check2}
           className={`items-center justify-center w-full h-[49px] rounded-[6px] 
           ${isValid && image !== null  && !loading && check1 && check2 ? 'bg-[#029CFC]' : 'bg-[#dddddd]'}  mt-4`}>
                <Text className={`text-[15px] font-["sans-regular"] text-white`}>
                    {
                      loading
                      ?<ActivityIndicator style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} size={'large'} />
                      :'Create your account'
                    }
                </Text>
            </TouchableOpacity>
            </>
          )}
          </Formik>
        </View>
        </ScrollView>

    </SafeAreaView>
  )
}
