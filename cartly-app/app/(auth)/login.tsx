import { images } from '@/constants/images';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from "expo-router";
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, ToastAndroid, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAuth } from '@/hooks/useAuth';
import Loader from '@/components/Loader';

export default function Login() {

  const router= useRouter();
  const { user, loading, error, handleLogin} = useAuth();
  const [loginData, setLoginData]=useState({email:"", password:""});

  const handleInputChange=( key:string, value:string)=>{
      setLoginData({...loginData,[key]:value});
  }

  const onClickSignin= async()=>{
    if(!loginData.email || !loginData.password){
      ToastAndroid.show("🖋️ Fill out the fields.",ToastAndroid.SHORT);
      return;
    }
    handleLogin(loginData);
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
        <View className="flex items-center justify-center w-full h-80 bg-bg rounded-b-full">
          <Image source={images.signin} className=" w-full h-full" />
        </View>

        {/* Input fields */}
        <View className="mt-10 w-80 items-center gap-y-4">

        <Text className='text-5xl text-secondary font-medium self-start mb-4'>
          Sign In
        </Text>

          <TextInput
            placeholder="Email"
            value={loginData.email}
            onChangeText={(text)=>handleInputChange("email",text)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={"#556B2F"}
            className="w-full text-start px-8 text-secondary border-2 h-16 text-lg rounded-xl border-secondary"
          />

          <TextInput
            secureTextEntry
            placeholder="Password"
            value={loginData.password}
            onChangeText={(text)=>handleInputChange("password",text)}
            placeholderTextColor={"#556B2F"}
            className="w-full text-start px-8 text-secondary border-2 h-16 text-lg rounded-xl border-secondary"
          />

          <View className='flex w-full mt-8 items-center justify-end flex-row gap-x-5'>
            <Text className='text-3xl font-medium text-secondary'>Sign In</Text>
            <Pressable onPress={onClickSignin}>
            <Feather name="arrow-right" size={24} color="#8FA31E" className='bg-accent p-3 rounded-full text-center' />
            </Pressable>
          </View>

          <View className='self-center mt-10 flex flex-row items-center justify-center gap-x-1'>
            <Text className='text-lg text-secondary'>Don&apos;t have an account?</Text>
              <Pressable onPress={()=>router.push("/(auth)/register")}>
                <Text className='text-primary border-b border-primary'>Sign Up</Text></Pressable>
          </View>

        </View>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};