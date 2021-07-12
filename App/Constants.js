export default {
    KEYS: {
        DEV_ENV: "DevelopEnvironment",
        DEV_APP_API_URL: "DEV_APP_API_URL"
    },
    CONNECT_WATCH: 'connectWatch',
    UPDATE_WATCH: 'updateWatch',
    COMPLETE_WATCH: 'completeRegister',
    SEARCH_WATCH: 'searchRegister',
    TYPE_CHECK: 'checkCurrentLocationOnMap',
    TYPE_FIND: 'findLocationOnMap',
    TYPE_ADD_BOUND: 'addBound',
    TYPE_ADD_ADDRESS: 'addAddress',
    EVENT_TYPES: {
        LOW_BATTERY: "LOW_BATTERY",
        FALL: "FALL",
        SOS: "SOS",
        PUT_ON: "PUT_ON",
        CHARGE_BATTERY: "CHARGE_BATTERY",
        SWITCH_ON: "SWITCH_ON",
        SWITCH_OFF: "SWITCH_OFF",
        EMERGENCY_CANCEL: "EMERGENCY_CANCEL",
        REMOVAL: "REMOVAL",
        INACTIVITY: "INACTIVITY"
    },
    TYPE_LEVEL: {
        NORMAL: "NORMAL",
        EMERGENCY: "EMERGENCY"
    },
    TYPE_REMINDER: {
        MEDICINE: "medicine",
        HOSPITAL: "hospital",
        GENERAL: "general",
        MEAL: "meal",
        WORKOUT: "workout",
        CUSTOME: "custome",
    },
    STATUS: {
        OK: "OK",
        SOS: "SOS",
        FALL: "FALL",
        REMOVAL: "REMOVAL",
        LOW_BATTERY: "LOW_BATTERY",
        SWITCH_OFF: "SWITCH_OFF",
        INACTIVITY: "INACTIVITY"
    },
    EVENT_ACTION: {
        HELP: 0,
        RESOLVED: 1,
        CANCELLED: 2,
    },
    ACTION_TYPES: {
        ALERT: 'ALERT',
        TAKEN: 'TAKEN',
        RESOLVED: 'RESOLVED',
        PLAIN_MSG: 'PLAIN_MSG',
        CALL_MSG: 'CALL_MSG',
        LOC_SHARE_AGREE_MSG: 'LOC_SHARE_AGREE_MSG',
        LOC_TAKER_INFO_MSG: 'LOC_TAKER_INFO_MSG',
        LOC_DEVICE_INFO_MSG: 'LOC_DEVICE_INFO_MSG',
        CANCEL: 'CANCEL'
    },
    DIRECTION_TYPES: {
        ASC: 'ASC',
        DESC: 'DESC'
    },
    USER_NAME: 'user_name',
    PASSWORD: 'password',
    TOKEN_KEY: 'token_id',
    AUTH_TOKEN_KEY: 'auth_token_id',
    HTTP_AUTHORIZATION: "Authorization",
    HTTP_VERSION_CODE: "Version-Code",
    HTTP_MOBILE_MODEL: "Mobile-Model",
    HTTP_MOBILE_TYPE: "Mobile-Type",
    HTTP_APP_PUSH_TYPE: "App-Push-Type",
    HTTP_APP_PUSH_ID: "App-Push-ID",
    HTTP_ACCEPT_LANGUAGE: "Accept-Language",
    HTTP_TRANSACTION: "vfeb-transaction-id",
    HTTP_IMEI: "imei",
    PUSH_TYPE_ANDROID: 'GCM',
    PUSH_TYPE_IOS: 'APNS',
}
