import { loginHandler, profileHandler, registerHandler } from "@/services/authApi";
import { useState } from "react"
import { useRouter } from "expo-router";
import { ToastAndroid } from "react-native";


const makeToast = ( msg:string ) =>{
    ToastAndroid.show(msg, ToastAndroid.SHORT);
}


export const useAuth = () => {

    const router= useRouter();
    const [user,setUser]=useState(null);
    const [error, setError]= useState(null);
    const [loading, setLoading]= useState(false);

    const handleLogin = async (data: any) => {
    try {
        setLoading(true);
        const res = await loginHandler(data);
        makeToast("✅ " + res.message);
        setUser(res.user);
        router.replace({pathname:"/(tabs)/dashboard", params:res.user});
    } catch (error: any) {
        console.log(error);
        makeToast("❗ "+error.response.data.message);
    } finally {
        setLoading(false);
    }
    };


    const handleRegister = async( data:any) =>{
        try {
            setLoading(true);
            const res = await registerHandler(data);
            makeToast("✅ "+res.message);
            setUser(res.user);
            router.replace({pathname:"/(tabs)/dashboard", params:res.user});
        } catch (error:any) {
            makeToast("❗ "+error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    const handleProfile = async () => {
    if (loading) return;

    try {
        setLoading(true);
        const res = await profileHandler();  
        if (res?.user?.email) {
            setUser(res.user);           
            makeToast("👋 Welcome, "+res.user.email.split('@')[0]);
            router.replace({pathname:"/(tabs)/dashboard", params:res.user});
        } else {
            throw new Error("⚠️ Invalid session"); 
        }

    } catch (error: any) {
        makeToast(error.response?.data?.message || error.message || "Session expired");
        setError(error);
        router.replace("/(auth)/login");
    } finally {
        setLoading(false);
    }
    };
    return { user, loading, error, handleLogin, handleRegister, handleProfile}
}