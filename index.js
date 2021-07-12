/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App/App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import {fcmService} from "./App/Services/FCMService";
import API from "./App/Services/ApiService";
import React from "react";

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    API.activity.didReceivedPush();
    if (Platform.OS === 'ios') {
        fcmService.showNotify(remoteMessage.data.data)
    } else {
        fcmService.showNotify(remoteMessage.data.data)
    }
});
//

function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
    return <App />;
  }

AppRegistry.registerComponent(appName, () => HeadlessCheck);

