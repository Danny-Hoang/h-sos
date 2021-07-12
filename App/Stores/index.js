import { root as rootSaga} from '../Sagas'
import {reducer as auth } from './Auth' 
import {reducer as activities } from './Activities' 
import {reducer as userDevices } from './Devices' 
import {reducer as startupReducer } from './Startup' 
import configureStore from './CreateStore'
import { combineReducers } from 'redux'
export default createStore = () => {
    const rootReducer = combineReducers({
        auth,
        activities,
        userDevices,
        startupReducer,
    })
    return configureStore(rootReducer, rootSaga)
}