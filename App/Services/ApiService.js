import { getTokens } from "../Utils/token";
import DeviceInfo from "react-native-device-info";
import { create } from 'apisauce'
import Config from "../Configs";
import * as _ from "lodash";
import Constants from "../Constants";
import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";

const { delay } = require("redux-saga/effects")

const retry = async (promise) => {
    let res
    let count = 3
    while (count > 0) {
        res = await promise()
        const resOk = res && res.ok && _.has(res, ['data'])
        if (resOk) {
            return res
        } else {
            count--
        }
    }
    return res
};

export const AUTH_API = create({
    baseURL: Config.AUTH_API_URL,
});

export const APP_API = create({
    baseURL: Config.API_URL,
});

export async function headers() {
    try {
        const env = await AsyncStorage.getItem(Constants.KEYS.DEV_ENV);
        if (env !== null) {
            switch (env) {
                case Config.ENVIRONMENT.DEV:
                    try {
                        let url = await AsyncStorage.getItem(Constants.KEYS.DEV_APP_API_URL);
                        if (url === null) { url = Config.API_URL_DEV }
                        APP_API.setBaseURL(url);
                    } catch (e) { }
                    AUTH_API.setBaseURL(Config.AUTH_API_URL_DEV);
                    break;
                case Config.ENVIRONMENT.PRE_PROD:
                    APP_API.setBaseURL(Config.API_URL_PRE_PROD);
                    AUTH_API.setBaseURL(Config.AUTH_API_URL_PRE_PROD);
                    break;
                case Config.ENVIRONMENT.PROD:
                    APP_API.setBaseURL(Config.API_URL_PROD);
                    AUTH_API.setBaseURL(Config.AUTH_API_URL_PROD);
                    break;
            }
        }
    } catch (e) {
        console.log('Fail to get development environment')
    }

    // console.log(`omg base url now at ${APP_API.getBaseURL()}`);

    const { token, authorization } = await getTokens()
    const version = DeviceInfo.getVersion();
    const deviceName = await DeviceInfo.getDeviceName();
    let deviceToken = "";
    const imei = DeviceInfo.getUniqueId();
    const ln = 'en';
    let mobileType = 'Android';
    let pushType = Constants.PUSH_TYPE_ANDROID;

    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (fcmToken) {
        deviceToken = fcmToken;
    }

    if (Platform.OS === 'ios') {
        mobileType = 'iOS';
        pushType = Constants.PUSH_TYPE_IOS
    }

    let result = {
        [Constants.HTTP_AUTHORIZATION]: authorization,
        [Constants.HTTP_MOBILE_MODEL]: deviceName,
        [Constants.HTTP_MOBILE_TYPE]: mobileType,
        [Constants.HTTP_APP_PUSH_ID]: deviceToken,
        [Constants.HTTP_APP_PUSH_TYPE]: pushType,
        [Constants.HTTP_VERSION_CODE]: version,
        [Constants.HTTP_ACCEPT_LANGUAGE]: ln,
        [Constants.HTTP_TRANSACTION]: '',
        [Constants.HTTP_IMEI]: imei,
    }

    return result
}

const headerConfig = async () => {

    try {
        const env = await AsyncStorage.getItem(Constants.KEYS.DEV_ENV);
        if (env !== null) {
            switch (env) {
                case Config.ENVIRONMENT.DEV:
                    try {
                        let url = await AsyncStorage.getItem(Constants.KEYS.DEV_APP_API_URL);
                        if (url === null) { url = Config.API_URL_DEV }
                        APP_API.setBaseURL(url);
                    } catch (e) { }
                    AUTH_API.setBaseURL(Config.AUTH_API_URL_DEV);
                    break;
                case Config.ENVIRONMENT.PRE_PROD:
                    APP_API.setBaseURL(Config.API_URL_PRE_PROD);
                    AUTH_API.setBaseURL(Config.AUTH_API_URL_PRE_PROD);
                    break;
                case Config.ENVIRONMENT.PROD:
                    APP_API.setBaseURL(Config.API_URL_PROD);
                    AUTH_API.setBaseURL(Config.AUTH_API_URL_PROD);
                    break;
            }
        }

    } catch (e) {
        console.log('Fail to get development environment')
    }

    // console.log(`omg base url now at ${APP_API.getBaseURL()}`);

    const { token, authorization } = await getTokens()
    const version = DeviceInfo.getVersion();
    const deviceName = await DeviceInfo.getDeviceName();
    let deviceToken = "";
    const imei = DeviceInfo.getUniqueId();
    const ln = 'en';
    let mobileType = 'Android';
    let pushType = Constants.PUSH_TYPE_ANDROID;

    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (fcmToken) {
        deviceToken = fcmToken;
    }

    if (Platform.OS === 'ios') {
        mobileType = 'iOS';
        pushType = Constants.PUSH_TYPE_IOS
    }

    let result = {
        [Constants.HTTP_AUTHORIZATION]: authorization,
        [Constants.HTTP_MOBILE_MODEL]: deviceName,
        [Constants.HTTP_MOBILE_TYPE]: mobileType,
        [Constants.HTTP_APP_PUSH_ID]: deviceToken,
        [Constants.HTTP_APP_PUSH_TYPE]: pushType,
        [Constants.HTTP_VERSION_CODE]: version,
        [Constants.HTTP_ACCEPT_LANGUAGE]: ln,
        [Constants.HTTP_TRANSACTION]: '',
        [Constants.HTTP_IMEI]: imei,
    }

    return { headers: result }
}

const activity = {

    getActivities: async (params) => {
        let header = await headers();
        APP_API.setHeaders(header)
        return APP_API.get('/vfeb/v1/api/activities', params)
    },

    getActivityDetail: async (params) => { //,
        const config = await headerConfig()
        const res = await APP_API.get(`/vfeb/v1/api/activities/${params.activityId}/series`,
            params,
            config)
        if (res && res.ok) {
            return res.data
        }
    },

    takeCare: async (activityId) => {
        const config = await headerConfig()
        let eventTime = moment().format('yyyy-MM-DDTHH:mm:ss') + 'Z';
        const res = await APP_API.post(
            `/vfeb/v1/api/activities/${activityId}/take`,
            {
                eventTime: eventTime
            },
            config
        )
        if (res && res.ok) {
            return res.data
        } else {
            console.log('Fail')
        }
    },

    takeResolve: async (activityId, message) => {
        const config = await headerConfig()
        let eventTime = moment().format('yyyy-MM-DDTHH:mm:ss') + 'Z';
        const res = await APP_API.post(
            `/vfeb/v1/api/activities/${activityId}/resolve`,
            {
                message,
                eventTime: eventTime
            },
            config
        )
        if (res && res.ok) {
            return res.data
        }
    },

    didReceivedPush: async (type, data) => {
        const config = await headerConfig();
        const res = await APP_API.post(
            '/vfeb/v1/api/push/notification/received',
            {
                type,
                data
            },
            config
        )
        console.log("Did received push notification", res.ok, res.data);
        if (res && res.ok) {
            return res.data
        }
    }

}

const devices = {
    getUserDevices: async () => {
        const config = await headerConfig()
        const res = await APP_API.get(`/vfeb/v1/api/users/me/devices`, {}, config)
        if (res && res.ok) {
            return res.data.devices
        }
    },

    getOutGoingEmergency: async () => {
        const config = await headerConfig()
        const res = await APP_API.get(`/vfeb/v1/api/activities/ongoing`, {}, config)
        if (res && res.ok) {
            return res.data
        }
    },

    getDeviceInfo: async (deviceId) => {
        const config = await headerConfig()
        console.log('device id: ', deviceId)
        const res = await APP_API.get(`/vfeb/v1/api/devices/${deviceId.deviceId}/users`, {}, config)
        if (res && res.ok) {
            return res.data
        }
    },

    updateDeviceInfo: async (deviceId) => {
        const config = await headerConfig()
        const res = await APP_API.post(`/vfeb/v1/api/devices/${deviceId.deviceId}/modify`, params, config)
        if (res && res.ok) {
            return res.data
        }
    },

    connectWatch: async ({ customerId, imei, isActive }) => {
        const config = await headerConfig();
        console.log('Active band params: ', customerId, imei, isActive)
        const result = await APP_API.post(
            `/vfeb/v1/api/activities/status/update`,
            {
                customer_id: customerId,
                imei,
                account_state: isActive ? "active" : "inactive"
            },
            config
        );
        console.log("Active band status", result.ok)
        if (result) {
            return result.ok;
        }
    },

    postDeviceUpdate: async ({ deviceId, userInfo }) => {
        const config = await headerConfig();
        const data = new FormData()
        for (var key in userInfo) {
            data.append(key, userInfo[key]);
        }
        const result = await APP_API.post(
            `/vfeb/v1/api/devices/${deviceId}/modify`,
            data,
            config
        );
        console.log("Update device info", result);
        if (result && result.ok) {
            return result.data;
        }
    },
};

const auth = {
    checkVerificationCode: async ({ verificationCode, time }) => {
        // await delay(3000)
        return true
    },
    signIn: async (email, password) => {
        return retry(() =>
            AUTH_API.post('/api/v1/auth', {
                // client_id: 'a@mail.com',
                // password: 'a1'
                client_id: email,
                password: password
            })
        )
    },
    getUserInfo: async () => {
        let header = await headers();
        APP_API.setHeaders(header)

        return APP_API.get('/vfeb/v1/api/users/me')
    },
    updateUserInfo: async ({userInfo}) => {
        const config = await headerConfig();
        const data = new FormData()
        console.log("hhduong dataTest", userInfo)
        for (var key in userInfo) {
            data.append(key, userInfo[key]);
        }
        const result = await APP_API.post(
            `/vfeb/v1/api/users/me/modify`,
            data,
            config
        );
        console.log('hhduong updateUserInfo', result)
        if (result && result.ok) {
            return result;
        }
    }
};

const API = {
    auth,
    activity,
    devices,
}

export default API
