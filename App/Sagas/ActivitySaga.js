import API from "../Services/ApiService"
import { put, call, select, all, delay } from 'redux-saga/effects'
import ActivityActions, {currentActivities} from '../Stores/Activities';

export function* getActivities({params}){
    yield put(ActivityActions.getActivitiesLoading())
    let result = yield call(API.activity.getActivities,params)
    var value = []
    if(params.page > 0){
        var valueObject = yield select(currentActivities)
        value = valueObject.data
    }
    if(result && result.data && result.ok){
        value = value.concat(result.data.data)
        yield put(ActivityActions.getActivitiesSuccess(value, result.data.total))
    }else{
        yield put(ActivityActions.getActivitiesFailure())
    }
}
