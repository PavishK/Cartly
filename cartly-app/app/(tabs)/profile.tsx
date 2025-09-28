import { View, Text, ToastAndroid, Platform, Pressable, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import NavBar from '@/components/NavBar';
import { profileHandler } from '@/services/authApi';
import { useRouter } from 'expo-router';
import Loader from '@/components/Loader';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { clearToken } from '@/services/storage';

interface ProfileSchema {
  _id: string;
  email: string;
  createdAt: any;
}

const Profile = () => {

  const router = useRouter(); 
  const [ profileData, setProfileData ] = useState<ProfileSchema>({email:"", _id:"", createdAt:""});
  const [ loading, setLoading ] = useState<boolean>(false);

  const mapData = [
    { key:"Email", value: profileData.email},
    { key:"Created at", value: new Date(profileData.createdAt).toDateString()},
    { key:"Platform", value: Platform.OS},
  ];

  const openPortfolio = () => {
    Linking.openURL("https://pavishk.dev");
  }

  const getProfileData = async() => {

    try {
      setLoading(true);
      const res = await profileHandler();
      setProfileData(res.user);
    } catch (error) {
      ToastAndroid.show("Please login to continue", ToastAndroid.SHORT);
      router.replace("/(auth)/login");
    } finally {
      setLoading(false);
    }
  }

  const signOutHandler = async()=>{
    try {
      setLoading(true);
      await clearToken();
      ToastAndroid.show("Signed Out successfully!", ToastAndroid.SHORT);
      router.replace("/(auth)/login");
    } catch (error) {
      ToastAndroid.show("Unable to Sign Out!", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    getProfileData();
  },[])

  return (
    <View className="relative w-full h-full flex-1 flex-col">
      {/* Header */}
      <NavBar email={ profileData.email}/>

      { !loading 

      ? (<View className='flex-1 items-center justify-start mt-6'>

        <View className='size-32 border-2 border-accent rounded-full bg-bg flex items-center justify-center'>
          <Text className='text-6xl capitalize font-bold text-secondary'>{profileData.email[0]}</Text>
        </View>
        <Text className='text-center text-secondary mt-3 text-2xl'>{profileData.email.split('@')[0]}</Text>
        <Text className='text-center mt-0.5 text-secondary text-sm'>{profileData._id}</Text>

        <View className='relative flex-1 mt-6 w-full px-5 flex-col items-center justify-start gap-y-2'>
        { mapData.map((v,i) => (

          <View key={i} className='flex-row border-2 border-accent bg-bg w-full p-4 rounded-xl items-start justify-between'>
            <Text className='text-lg text-secondary font-medium'>
              {v.key}
            </Text>
            <Text className='text-lg text-secondary'>
              {v.value}
            </Text>
          </View>
        ))}

        <Pressable onPress={openPortfolio} className='mt-2'>
          <Text className='text-secondary'>Made with {"</>"} by <Text className='text-primary underline font-medium'>PC</Text></Text>
        </Pressable>
        
        <Pressable onPress={signOutHandler} className='absolute bottom-6 flex-row gap-x-1 border-2 border-red-500 bg-red-50 w-full p-4 rounded-xl items-center justify-center'>
            <MaterialCommunityIcons name="logout" size={24} color="red" />
            <Text className='text-lg text-red-500 font-medium'>
              Sign Out
            </Text>
          </Pressable>
        </View>

      </View>)

      : <Loader/>}

    </View>
  )
}

export default Profile;