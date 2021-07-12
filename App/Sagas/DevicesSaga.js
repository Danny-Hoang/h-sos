import { call, put, all, delay } from "redux-saga/effects";
import API from "../Services/ApiService";
import { DevicesActions } from '../Stores/Devices'
import Constants from "../Constants";
import NavigationService from "../Services/NavigationService";
import { RouterName } from "../Navigator/RouteName";

export function* getUserDevices() {
    yield put(DevicesActions.fetchLoading())
    yield delay(3000) // We will remove this line when maintain
    let result = yield call(API.devices.getUserDevices)
    if (result) {
        yield put(DevicesActions.getUserDevicesSuccess(result))
    } else {
        yield put(DevicesActions.getUserDevicesFailure("Error occur"))
    }
}

export function* getDetailOutGoingEmergencyMessage() {
    const resultOutGoing = yield call(API.devices.getOutGoingEmergency)
    if (resultOutGoing !== undefined && resultOutGoing !== null) {
        const result = yield all(resultOutGoing.map(a => {
            let params = {
                activityId: a.activityId,
                excludeFilters: Constants.ACTION_TYPES.LOC_DEVICE_INFO_MSG + ', ' + Constants.ACTION_TYPES.LOC_TAKER_INFO_MSG,
            }
            return call(API.activity.getActivityDetail, params)
        }));
        let finalValue = result.map(listActivity => {
            let index = listActivity.total
            let newestSOS = listActivity.data[index - 1];
            let takenAct = listActivity.data.filter( (activity) => { return activity.action === Constants.ACTION_TYPES.TAKEN } )
            if (takenAct !== null && takenAct.length !== 0) {
                newestSOS.isTaken = true;
                newestSOS.takerName = takenAct[0].user.nickName;
            }
            return newestSOS
        })
        yield put(DevicesActions.getDetailOutGoingEmergencyMessageSuccess(finalValue))
    } else {
        yield put(DevicesActions.getDetailOutGoingEmergencyMessageFailure(""))
    }

}

export function* connectWatch({customerId, imei, isActive}) {
    const result = yield call(API.devices.connectWatch,{customerId, imei, isActive})
    // if (result) {
    //     NavigationService.replaceToNewScreen(RouterName.RequiredInfo)
    // }
}

export function* postDeviceUpdate({deviceId, userInfo}) {
    yield put(DevicesActions.fetchLoading())
    const result = yield call(API.devices.postDeviceUpdate,{deviceId, userInfo})
    if (result) {
        yield put(DevicesActions.postDeviceUpdateSuccess(result, 'NoError'))
    } else {
        yield put(DevicesActions.postDeviceUpdateFailure('Error'))
    }
}

export function* getDeviceInfo(deviceId) {
    let result = yield call(API.devices.getDeviceInfo, deviceId)
    if (result) {
        yield put(DevicesActions.getDeviceInfoSuccess(result))
    } else {
        yield put(DevicesActions.getDeviceInfoFailure('Error'))
    }
}
