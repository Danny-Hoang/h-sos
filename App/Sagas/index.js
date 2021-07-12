import { takeLatest } from "redux-saga/effects";
import { all } from 'redux-saga/effects'
import { AuthTypes } from "../Stores/Auth";
import { DevicesTypes } from "../Stores/Devices";
import { StartupTypes } from "../Stores/Startup"
import { checkVerificationCode, fetchAuth, getUserInfo, updateUserInfo, logout } from "./AuthSaga";
import { getUserDevices, getDetailOutGoingEmergencyMessage, getDeviceInfo, connectWatch, postDeviceUpdate } from './DevicesSaga'
import { startup } from "../Sagas/StartupSaga";
import { ActivitiesTypes } from "../Stores/Activities";
import { getActivities } from "./ActivitySaga";

export function* root(){
    yield all([
        takeLatest(AuthTypes.CHECK_VERIFICATION_CODE, checkVerificationCode),
        takeLatest(StartupTypes.STARTUP, startup),
        takeLatest(AuthTypes.FETCH_AUTH, fetchAuth),
        takeLatest(AuthTypes.UPDATE_USER_INFO, updateUserInfo),
        takeLatest(AuthTypes.LOGOUT, logout),
        takeLatest(AuthTypes.GET_USER_INFO, getUserInfo),
        takeLatest(ActivitiesTypes.GET_ACTIVITIES, getActivities),
        takeLatest(DevicesTypes.GET_USER_DEVICES, getUserDevices),
        takeLatest(DevicesTypes.GET_DETAIL_OUT_GOING_EMERGENCY_MESSAGE, getDetailOutGoingEmergencyMessage),
        takeLatest(DevicesTypes.GET_DEVICE_INFO, getDeviceInfo),
        takeLatest(DevicesTypes.CONNECT_WATCH, connectWatch),
        takeLatest(DevicesTypes.POST_DEVICE_UPDATE, postDeviceUpdate),
    ])
}
