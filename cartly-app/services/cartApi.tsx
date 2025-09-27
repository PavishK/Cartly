import { apiClient } from "./authApi";
import { getToken } from "./storage";

interface AskDataSchema {
  item: string;
}

export const cartListHandler = async() => {

    const token = await getToken();
    const res = await apiClient.get("/api/cart/list-items",{
        headers:{
            "Authorization":`Bearer ${token}`,
        }
    });

    return res.data;
}

export const cartInsertHandler = async ( _id: string) => {
    const saveItem = {
        user:{
            _id,
        },
        item:"",
        checked:false,
    };

    const res = await apiClient.post("/api/cart/save-item", saveItem);
    return res.data;
}

export const cartUpdateHandler = async (data: Cart[]) => {
    
    const token = await getToken();
    const updatedList = {
        items:data
    };
    const res = await apiClient.put(`/api/cart/update-item`, updatedList, {
        headers:{
            "Authorization":`Bearer ${token}`,
        }
    });
    return res.data;
}

export const cartDeleteItem = async ( _id: string ) => {
    const res = await apiClient.delete(`/api/cart/delete-item?_id=${_id}`);
    return res.data;
}

export const askGemini = async ( datas: AskDataSchema[]) => {
    const res = await apiClient.post("/api/cart/ask-gemini",{ datas });
    return res.data;
}