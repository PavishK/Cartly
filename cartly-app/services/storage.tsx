import * as SecureStore from 'expo-secure-store';

const key = "authToken";

export async function saveToken( token:string ) {
    try {
        await SecureStore.setItemAsync(key, token);
    } catch (_) {
        return null;
    }
}

export async function getToken():Promise<string | null> {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (_) {
        return null;
    }
}

export async function clearToken() {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (_) {
        return null;
    }
}