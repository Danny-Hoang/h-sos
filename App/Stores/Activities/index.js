import { createActions, createReducer }  from 'reduxsauce'

const {Types, Creators} = createActions({
    getActivities: ['params'],
    getCurrentActivities: null,
    getActivitiesLoading: null,
    getActivitiesSuccess: ['data', 'total'],
    getActivitiesFailure: ['error'],
})

export const INITIAL_STATE = {
    loading: false,
    error: null,
  }

export const ActivitiesTypes = Types
export default Creators

export const currentActivities = (state) => state.activities

export const getActivitiesLoading = (state) => ({
    ...state,
    loading: true,
})

export const getActivitiesFailure = (state, {error}) => ({
    ...state,
    loading: false,
    error,
})

export const getActivitiesSuccess = (state, {data, total}) => ({
    ...state,
    data,
    total,
    loading: false,
})

export const getCurrentActivities = (state, {data, total}) => {data, total}

export const reducer = createReducer(INITIAL_STATE, {
    [ActivitiesTypes.GET_CURRENT_ACTIVITIES]: getCurrentActivities,
    [ActivitiesTypes.GET_ACTIVITIES_LOADING]: getActivitiesLoading,
    [ActivitiesTypes.GET_ACTIVITIES_SUCCESS]: getActivitiesSuccess,
    [ActivitiesTypes.GET_ACTIVITIES_FAILURE]: getActivitiesFailure
})