import React, { useState } from 'react';
import { Image, Text, ToastAndroid, TextInput, Pressable, View, Platform, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images } from '@/constants/images';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from "expo-router";
import { useAuth } from '@/hooks/useAuth';
import Loader from '@/components/Loader';

const makeToast = ( msg:string ) =>{
    ToastAndroid.showWithGravity(msg, ToastAndroid.CENTER, ToastAndroid.SHORT);
}


const Register = () => {

  const {user, loading, handleRegister} =useAuth();
  const router= useRouter();
  const [registerData, setRegisterData]= useState({email:"", password:"", confirm_Password:""});

  const handleInputChage = (key:string, value:string)=>{
    setRegisterData({...registerData,[key]:value});
  }

  const onClickSignup = async() =>{

    if(!registerData.email || !registerData.password || !registerData.confirm_Password){
      makeToast("🖋️ Fill out the fields");
      return;
    }

    else if(registerData.password!==registerData.confirm_Password){
      makeToast("‼️Invalid confirm password");
      return;
    }

    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)){
      makeToast("❗Invalid email format");
      return;
    }

    else if(registerData.password.length > 15 || registerData.password.length < 8){
      makeToast("👉 Password length must between 8 and 15");
      return;
    }
    handleRegister(registerData);
  }
  
  if(loading) return <Loader/>

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={70}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{alignItems: 'center', justifyContent: 'flex-start', paddingBottom: 40 }}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View className="flex items-center justify-center flex-row h-80 bg-bg rounded-b-full w-[420px]">
          <Text className="text-5xl w-fit font-medium text-secondary mt-16 ml-3">
            Create{"\n"}Account
          </Text>
          <Image source={images.signup} className="self-start w-48 h-52" />
        </View>

        {/* Input fields */}
        <View className="mt-10 w-80 items-center gap-y-4">
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            value={registerData.email}
            onChangeText={(text)=>handleInputChage("email", text)}
            autoCapitalize="none"
            placeholderTextColor={"#556B2F"}
            className="w-full text-start px-8 text-secondary border-2 h-16 text-lg rounded-xl border-secondary"
          />

          <TextInput
            secureTextEntry
            placeholder="Password"
            value={registerData.password}
            onChangeText={(text)=>handleInputChage("password", text)}
            placeholderTextColor={"#556B2F"}
            className="w-full text-start px-8 text-secondary border-2 h-16 text-lg rounded-xl border-secondary"
          />

          <TextInput
            secureTextEntry
            placeholder="Confirm Password"
            value={registerData.confirm_Password}
            onChangeText={(text)=>handleInputChage("confirm_Password", text)}
            placeholderTextColor={"#556B2F"}
            className="w-full text-start px-8 text-secondary border-2 h-16 text-lg rounded-xl border-secondary"
          />

          <TouchableOpacity
          onPress={onClickSignup}
          className='flex w-full mt-8 items-center justify-end flex-row gap-x-5'>
            <Text className='text-3xl font-medium text-secondary'>Sign Up</Text>
            <Feather name="arrow-right" size={24} color="#8FA31E" className='bg-accent p-3 rounded-full text-center' />
          </TouchableOpacity>

          <View className='self-center mt-10 flex items-center justify-center flex-row gap-x-1'>
            <Text className='text-lg text-secondary'>Already have an account?</Text>
              <Pressable onPress={()=>router.push("/(auth)/login")}>
                <Text className='text-primary border-b border-primary'>signin</Text></Pressable>
          </View>

        </View>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;