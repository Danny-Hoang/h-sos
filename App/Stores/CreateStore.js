import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer, persistStore } from 'redux-persist'

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'root',
    timeout: 0,
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
}

export default (rootReducer, rootSaga) => {
    const middleware = []
    const enhancers = []

    // Connect the sagas to the redux store
    const sagaMiddleware = createSagaMiddleware()
    middleware.push(sagaMiddleware)

    enhancers.push(applyMiddleware(...middleware))

    // Redux persist
    const persistedReducer = persistReducer(persistConfig, rootReducer)

    let store
    if (__DEV__) {
        const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000 })
        store = createStore(persistedReducer, composeEnhancers(...enhancers))
    } else {
        store = createStore(persistedReducer, compose(...enhancers))
    }
    const persistor = persistStore(store)

    // Kick off the root saga
    sagaMiddleware.run(rootSaga)

    return { store, persistor }
}
