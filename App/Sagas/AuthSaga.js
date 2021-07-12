import { put, call, select, all } from 'redux-saga/effects'
import API from '../Services/ApiService';
import AuthActions from '../Stores/Auth';
import { generateAuthorization, removeItem, saveToken } from '../Utils/token'
import Constants from "../Constants";

export function* checkVerificationCode({ verificationCode, time }) {
    yield put(AuthActions.checkVerificationCodeLoading())
    let result = yield call(API.auth.checkVerificationCode, { verificationCode, time })
    if (result) {
        yield put(AuthActions.verificationCodeSuccess())
    } else {
        yield put(AuthActions.verificationCodeFailure())
    }
}

export function* fetchAuth({ email, password, isRememberMe }) {
    yield put(AuthActions.fetchAuthLoading())
    let result = yield call(API.auth.signIn, email, password)
    if (result && result.ok && result.data) {
        if (isRememberMe) {
            yield all([
                call(saveToken, Constants.USER_NAME, email),
                call(saveToken, Constants.PASSWORD, password),
            ])
        } else {
            yield all([
                call(removeItem, Constants.USER_NAME),
                call(removeItem, Constants.PASSWORD)
            ])
        }
        const authorization = generateAuthorization(result.data.access_token)
        yield all([
            call(API.auth.getUserInfo),
            call(saveToken, Constants.TOKEN_KEY, result.data.access_token),
            call(saveToken, Constants.AUTH_TOKEN_KEY, authorization),
            put(AuthActions.fetchAuthSuccess(result.data.access_token))],
        )
    } else {
        yield put(AuthActions.fetchAuthFailure(result))
    }
}

export function* logout() {
    yield all([
        call(removeItem, Constants.TOKEN_KEY),
        call(removeItem, Constants.AUTH_TOKEN_KEY)
    ])
    yield put(AuthActions.logoutSuccess())
}

export function* getUserInfo() {
    yield put(AuthActions.getUserInfoLoading())
    let result = yield call(API.auth.getUserInfo)
    if (result && result.ok && result.data) {
        yield put(AuthActions.getUserInfoSuccess(result.data))
    } else {
        yield put(AuthActions.getUserInfoFailure())
    }
}

export function* updateUserInfo({ userInfo }) {
    yield put(AuthActions.updateUserInfoLoading())
    let result = yield call(API.auth.updateUserInfo, userInfo)
    if (result && result.ok && result.data) {
        yield put(AuthActions.updateUserInfoSuccess(result.data))
    } else {
        yield put(AuthActions.updateUserInfoFailure())
    }
}