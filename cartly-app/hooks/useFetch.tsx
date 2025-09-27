import { cartListHandler, cartUpdateHandler } from "@/services/cartApi";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ToastAndroid } from "react-native";


const makeToast = ( msg:string ) => {
    ToastAndroid.show( msg, ToastAndroid.SHORT );
}

export const useFetch = ()=>{

    const router = useRouter();
    const [ data, setData ] = useState<Cart[]>([]);
    const [ loading, setLoading ] = useState(false);
    const [ updateLoading, setUpdateLoading ] = useState<boolean>(false);

    const handleCartLists = async()=>{
        try {
            setLoading(true);
            const res = await cartListHandler();
            // makeToast(res.message);
            setData(res.cartItems);
        } catch (error:any) {
            makeToast("Please login to continue!");
            router.replace('/(auth)/login')
        } finally {
            setLoading(false);
        }
    }

    const handlerUpdateItem = async ( data: Cart[] ) => {
        try {
            setUpdateLoading(true);
            const res = await cartUpdateHandler( data );
            makeToast("✅ Cart items saved!");
        } catch (error:any) {
            makeToast("Please login to continue!");
            router.replace('/(auth)/login')
        } finally {
            setUpdateLoading(false);
        }
    }


    return { data, loading, updateLoading,
        handleCartLists, handlerUpdateItem
    };
}