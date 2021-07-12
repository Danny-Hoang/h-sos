import { createActions, createReducer } from 'reduxsauce'

const { Types, Creators } = createActions({
  startup: null,
  startupDone: ["token"],
})

export const StartupTypes = Types
export default Creators

export const startupDone = (state, {token}) => ({ ...state, token })

export const reducer = createReducer({},{
  [StartupTypes.STARTUP_DONE]: startupDone,
})