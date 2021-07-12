import { put, call, delay } from 'redux-saga/effects'
import { getTokens } from '../Utils/token';
import StartupActions from "../Stores/Startup"

export function* startup() {
  // NavigationService.navigate(RouterName.Splash)
  const {token} = yield call(getTokens);
  yield put(StartupActions.startupDone(token))
}
