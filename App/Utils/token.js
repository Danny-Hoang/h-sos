import AsyncStorage from '@react-native-community/async-storage'
import Constants from "../Constants";
import log from './log';

export const generateAuthorization = (token) => {
    return `Bearer ${token}`
};

export const saveToken = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value, (e) => log('[saveToken]', e))
    } catch (e) {
        log('[saveToken] error', e)
    }
};

export const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key, (e) => log('[removeItem]', e))
    } catch (e) {
        log('[removeItem] error', e)
    }
};

export const getTokens = async () => {
    const token = await AsyncStorage.getItem(Constants.TOKEN_KEY);
    // log('[getToken]', token)
    const authorization = generateAuthorization(token);
    return {
        token,
        authorization,
    }
};
