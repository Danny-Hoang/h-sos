import React, { Component } from 'react';
import { Provider } from 'react-redux'
import createStore from './Stores'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { MenuProvider } from 'react-native-popup-menu'
import RootScreen from './Containers/Root/RootScreen';
import { LogBox, SafeAreaView } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const { store, persistor } = createStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MenuProvider>
            <RootScreen />
          </MenuProvider>
        </PersistGate>
      </Provider>
    )
  }
}