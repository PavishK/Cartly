import axios from 'axios';
import { clearToken, getToken, saveToken } from './storage';


export const apiClient = axios.create({
    baseURL:process.env.EXPO_PUBLIC_SERVER_URL,
    timeout:5000,
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json"
    }
});

export const loginHandler = async(data:any)=>{
   const res = await apiClient.post("/api/user/login",data);
   const { message, token, user } = res.data;
   await saveToken(token);
   return { message, user };
}

export const registerHandler = async(data:any)=>{
    const res = await apiClient.post("/api/user/register",data)
   const { message, token, user } = res.data;
   await saveToken(token);
   return { message, user };
}

export const profileHandler =async()=>{
    try {
        const token = await getToken();
        const res = await apiClient.get("/api/user/verify-session",{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        });
        return res.data;
    } catch (error:any) {
        await clearToken();
        throw new Error(error.response.data.message);
    }
}