import { createActions, createReducer } from 'reduxsauce'

const { Types, Creators } = createActions({
    fetchLoading: null,
    getUserDevices: null,
    getUserDevicesSuccess: ['devices'],
    getUserDevicesFailure: ['error'],
    getDetailOutGoingEmergencyMessage: null,
    getDetailOutGoingEmergencyMessageFailure: ['error'],
    getDetailOutGoingEmergencyMessageSuccess: ['emergencyMessages'],
    getDeviceInfo: ['deviceId'],
    getDeviceInfoSuccess: ['device'],
    getDeviceInfoFailure: ['error'],
    connectWatch: ['customerId', 'imei', 'isActive'],
    postDeviceUpdate: ['deviceId', 'userInfo'],
    postDeviceUpdateSuccess: ['device', 'error'],
    postDeviceUpdateFailure: ['error'],
})

export const INITIAL_STATE = {
    devices: null,
    error: null,
    emergencyMessages: null,
    device: null,
    loading: false,
}

export const DevicesTypes = Types
export const DevicesActions = Creators

export const fetchLoading = (state) => ({
   ...state,
   loading: true,
   error: null
});

export const getDetailOutGoingEmergencyMessageSuccess = (state, { emergencyMessages }) => ({
    ...state,
    emergencyMessages: emergencyMessages,
    error: null,
})
export const getDetailOutGoingEmergencyMessageFailure = (state, { error }) => ({
    ...state,
    emergencyMessages: null,
    error,
})

export const getUserDevicesSuccess = (state, { devices }) => ({
    ...state,
    devices,
    error: null,
    loading: false,
})

export const getUserDevicesFailure = (state, { error }) => ({
    ...state,
    devices: null,
    error,
    loading: false,
})

export const getDeviceInfoSuccess = (state, { device }) => ({
    ...state,
    device,
    error: null
})

export const getDeviceInfoFailure = (state, { error }) => ({
    ...state,
    device: null,
    error
})

export const postDeviceUpdateSuccess = (state, { device, error }) => ({
    ...state,
    device: device,
    loading: false,
    error: error
});

export const postDeviceUpdateFailure = (state, { error }) => ({
    ...state,
    device: null,
    loading: false,
    error: error
});

export const reducer = createReducer(INITIAL_STATE, {
    [DevicesTypes.FETCH_LOADING]: fetchLoading,
    [DevicesTypes.GET_USER_DEVICES_FAILURE]: getUserDevicesFailure,
    [DevicesTypes.GET_USER_DEVICES_SUCCESS]: getUserDevicesSuccess,
    [DevicesTypes.GET_DETAIL_OUT_GOING_EMERGENCY_MESSAGE_SUCCESS]: getDetailOutGoingEmergencyMessageSuccess,
    [DevicesTypes.GET_DETAIL_OUT_GOING_EMERGENCY_MESSAGE_FAILURE]: getDetailOutGoingEmergencyMessageFailure,
    [DevicesTypes.GET_DEVICE_INFO_SUCCESS]: getDeviceInfoSuccess,
    [DevicesTypes.GET_DEVICE_INFO_FAILURE]: getDeviceInfoFailure,
    [DevicesTypes.POST_DEVICE_UPDATE_SUCCESS]: postDeviceUpdateSuccess,
    [DevicesTypes.POST_DEVICE_UPDATE_FAILURE]: postDeviceUpdateFailure,
});
