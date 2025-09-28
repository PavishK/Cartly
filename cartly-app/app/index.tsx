import { Image, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { images } from '@/constants/images';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getToken } from "@/services/storage";
import { useAuth } from "@/hooks/useAuth";
import Loader from "@/components/Loader";
import { apiClient } from "@/services/authApi";

const makeToast = ( msg: string ) =>{
  ToastAndroid.show(msg, ToastAndroid.LONG);
}

export default function Index() {
  const { user, loading, handleProfile } = useAuth();
  const router = useRouter();
  const [ serverStatus, setServerStatus ] = useState(false);

  const connectToserver = async() =>{
    try {
      setServerStatus(true);
      await apiClient.get('/');
      router.push("/(auth)/login");
      makeToast("Server connection is live!");
    } catch (error) {
      makeToast("Could not connect to server. Please try again later.")
    } finally {
      setServerStatus(false);
    }
  }

  useEffect(() => {
    (async () => {
      await apiClient.get('/');
      const token = await getToken();
      if (token && !user) {
        await handleProfile();
      }
    })();
  }, []);

  if (loading || serverStatus) return <Loader />;

  return (
    <View className="flex-1 items-center bg-white flex-col gap-y-1.5 font-poppins">
      <View className="relative flex items-center justify-center bg-bg h-2/3 w-full rounded-b-[30px]">
        <Text className="absolute size-32 left-3 top-6 z-[999] text-4xl font-medium">
          Cartly
        </Text>
        <Image source={images.welcome} className="w-full h-full" />
      </View>

      <View className="flex items-center justify-normal flex-col gap-y-4 bg-bg h-1/2 w-full rounded-t-[30px]">
        <Text className="text-3xl mt-5 text-center text-secondary font-bold">
          Welcome to Cartly!
        </Text>

        <Text className="text-lg text-center text-black/50 px-2">
          Shop smarter, save time, and manage your groceries with ease. Add
          items, track prices, and let Cartly handle the math for you.
        </Text>

        <TouchableOpacity
          onPress={connectToserver}
          className="mt-3 flex items-center justify-center flex-row gap-x-2 min-w-96 h-16 bg-accent rounded-full"
        >
          <Text className="text-center text-secondary text-lg">Get Started</Text>
          <Feather name="arrow-right-circle" size={18} color="#556B2F" />
        </TouchableOpacity>
      </View>
    </View>
  );
}