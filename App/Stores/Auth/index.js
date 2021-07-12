import { createActions, createReducer }  from 'reduxsauce'

const {Types, Creators} = createActions({
    checkVerificationCode: ['verificationCode', 'time'],
    checkVerificationCodeLoading: null,
    verificationCodeSuccess: null,
    verificationCodeFailure: ['error'],
    fetchAuth: ['email', 'password', 'isRememberMe'],
    fetchAuthLoading: null,
    fetchAuthSuccess: ['token'],
    fetchAuthFailure: ['error'],
    logout: null,
    logoutSuccess: null,
    getUserInfo: null,
    getUserInfoLoading: null,
    getUserInfoSuccess: ['data'],
    getUserInfoFailure: ['error'],
    updateUserInfo: ['userInfo'],
    updateUserInfoLoading: null,
    updateUserInfoSuccess: ['data'],
    updateUserInfoFailure: ['error'],
})

export const INITIAL_STATE = {
    loading: false,
    error: null,
  }

export const AuthTypes = Types
export default Creators

export const checkVerificationCodeLoading = (state) => (console.log("checkVerificationCodeLoading"),{
    ...state,
    loading: true,
})

export const verificationCodeFailure = (state, {error}) => ({
    ...state,
    loading: false,
    error,
})

export const verificationCodeSuccess = (state) => ({
    ...state,
    loading: false,
})

export const fetchAuthLoading = (state) => ({
    ...state,
    loading: true,
    error: null
})

export const fetchAuthSuccess = (state, {token}) => ({
    ...state,
    token,
    loading: false,
    error: null
})

export  const fetchAuthFailure = (state, {error}) => ({
    ...state,
    loading: false,
    error
})

export const logoutSuccess = (state) => {
    return {...state, token: undefined}
}

export const getUserInfoLoading = (state) => ({
    ...state,
    loading: true,
    error: null
})

export const getUserInfoSuccess = (state, {data}) => ({
    ...state,
    data,
    loading: false,
    error: null
})

export const getUserInfoFailure = (state, {error}) => ({
    ...state,
    loading: false,
    error
})

export const updateUserInfoLoading = (state) => ({
    ...state,
    loading: true,
    error: null
})

export const updateUserInfoSuccess = (state, {data}) => ({
    ...state,
    data,
    loading: false,
    error: null
})

export const updateUserInfoFailure = (state, {error}) => ({
    ...state,
    loading: false,
    error
})

export const reducer = createReducer(INITIAL_STATE, {
    [AuthTypes.CHECK_VERIFICATION_CODE_LOADING]: checkVerificationCodeLoading,
    [AuthTypes.VERIFICATION_CODE_SUCCESS]: verificationCodeSuccess,
    [AuthTypes.VERIFICATION_CODE_FAILURE]: verificationCodeFailure,
    [AuthTypes.FETCH_AUTH_LOADING]: fetchAuthLoading,
    [AuthTypes.FETCH_AUTH_SUCCESS]: fetchAuthSuccess,
    [AuthTypes.FETCH_AUTH_FAILURE]: fetchAuthFailure,
    [AuthTypes.LOGOUT_SUCCESS]: logoutSuccess,
    [AuthTypes.GET_USER_INFO_LOADING]: getUserInfoLoading,
    [AuthTypes.GET_USER_INFO_SUCCESS]: getUserInfoSuccess,
    [AuthTypes.GET_USER_INFO_FAILURE]: getUserInfoFailure,
    [AuthTypes.UPDATE_USER_INFO_LOADING]: updateUserInfoLoading,
    [AuthTypes.UPDATE_USER_INFO_SUCCESS]: updateUserInfoSuccess,
    [AuthTypes.UPDATE_USER_INFO_FAILURE]: updateUserInfoFailure,
})
