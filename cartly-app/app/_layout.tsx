import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    
    useEffect(() => {
      const init = async () => {
        await SplashScreen.hideAsync();    
      };
      const timer = setTimeout(init, 1500);
      return () => clearTimeout(timer);
    }, []);

  return (
    <>
    <StatusBar style="auto" backgroundColor="#EFF5D2" />
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <Stack screenOptions={{ headerShown: false, animation: "fade" }} />
      </SafeAreaView>
    </SafeAreaProvider>
    </>
  );
}