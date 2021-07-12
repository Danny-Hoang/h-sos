import messaging from '@react-native-firebase/messaging'
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import {localNotificationService} from "./LocalNotificationService";
import Constants from "../Constants";
import moment from "moment";
import API from "./ApiService";
class FCMService {

    register = (onRegister, onNotification, onOpenNotification) => {
        this.checkPermission(onRegister)
        this.createNotificationListeners(onRegister, onNotification, onOpenNotification)
    }

    registerAppWithFCM = async() => {
        if (Platform.OS === 'ios') {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true)
        }
    }

    checkPermission = (onRegister) => {
        messaging().hasPermission()
        .then(enabled => {
            if (enabled) {
                // User has permissions
                this.getToken(onRegister)
            } else {
                // User doesn't have permission
                this.requestPermission(onRegister)
            }
        }).catch(error => {
            console.log("[FCMService] Permission rejected ", error)
        })
    }

    getToken = (onRegister) => {
        AsyncStorage.getItem('fcmToken').then(fcmToken => {
            if (!fcmToken) {
                messaging().getToken()
                .then(fcmToken => {
                    if (fcmToken) {
                        onRegister(fcmToken);
                        AsyncStorage.setItem('fcmToken', fcmToken);
                    }else {
                        console.log("[FCMService] User does not have a device token")
                    }
                }).catch(error => {
                    console.log("[FCMService] getToken rejected ", error)
                })
            } else {
                onRegister(fcmToken)
                // console.log('fcmToken = ', fcmToken);
            }
        })

    }

    requestPermission = (onRegister) => {
         messaging().requestPermission()
        .then((authStatus) => {
            this.getToken(onRegister)

            const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;
            if (enabled) {
                console.log('Authorization status:', authStatus);
            } else {
                // User has rejected permissions
                console.log('permission rejected');
            }
        }).catch(error => {
            console.log("[FCMService] Request Permission rejected ", error)
        })
    }

    deleteToken = () => {
        console.log("[FCMService] deleteToken ")
        messaging().deleteToken()
        .catch(error => {
            console.log("[FCMService] Delete token error ", error)
        })
    }

    createNotificationListeners = (onRegister, onNotification, onOpenNotification) => {

        // When the application is running, but in the background
        messaging()
        .onNotificationOpenedApp(remoteMessage => {
            console.log('[FCMService] onNotificationOpenedApp Notification caused app to open from background state:',remoteMessage)
            if (remoteMessage) {
                const notification = remoteMessage.notification
                onOpenNotification(notification)
                // this.removeDeliveredNotification(notification.notificationId)
            }
        });

         // When the application is opened from a quit state.
        messaging()
        .getInitialNotification()
        .then(remoteMessage => {
            console.log('[FCMService] getInitialNotification Notification caused app to open from quit state:',remoteMessage)

            if (remoteMessage) {
                const notification = remoteMessage.notification
                onOpenNotification(notification)
                //  this.removeDeliveredNotification(notification.notificationId)
            }
        });

        // Foreground state messages
        this.messageListener = messaging().onMessage(async remoteMessage => {
            console.log('[FCMService] A new FCM message arrived!', remoteMessage);
            API.activity.didReceivedPush();
            if (remoteMessage) {
                let notification = null
                if (Platform.OS === 'ios') {
                    notification = remoteMessage.data.data
                    this.showNotify(notification);
                } else {
                    notification = remoteMessage.data.data
                    this.showNotify(notification);
                }
                onNotification(notification)
            }
        });

        // Triggered when have new token
        messaging().onTokenRefresh(fcmToken => {
            console.log("[FCMService] New token refresh: ", fcmToken)
            onRegister(fcmToken)
        })

    }

    showNotify = (notify) => {
        let title = "";
        let body = "";
        const data = JSON.parse(notify.replace(/\\"/g, '"'));
        const deviceName = data.device.deviceName ?? "";
        const date = data.createdDate ?? "";
        const userName = data.user?.nickName ?? ""

        if (data.typeLevel === Constants.TYPE_LEVEL.EMERGENCY) {
            switch (data.action) {
                case Constants.ACTION_TYPES.ALERT:
                    title = "SOS Alert";
                    body = data.device.deviceName + " sent SOS at " + moment(date).format('LT')
                    break;
                case Constants.ACTION_TYPES.TAKEN:
                    title = "Help is on the way!";
                    body = userName + " acknowledged " + deviceName + "'s emergency at " + moment(date).format('LT')
                    break;
                case Constants.ACTION_TYPES.RESOLVED:
                    title = "Emergency over";
                    body = userName + " marked the emergency over";
                    break;
                case Constants.ACTION_TYPES.CANCEL:
                    title = deviceName + " canceled SOS";
                    body = "False Alarm! " + deviceName +  " canceled the SOS sent on " + moment(date).format('LT');
                    break
            }

            const options = {
                soundName: 'sample.mp3',
                priority: 'max',
                playSound: true //,
                // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
                // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
            }
            localNotificationService.showNotification(
                0,
                title,
                body,
                data,
                options
            )
        } else if (data.typeLevel === Constants.TYPE_LEVEL.NORMAL) {
            switch (data.eventType) {
                case Constants.EVENT_TYPES.LOW_BATTERY:
                    if ( parseInt(data.battery) <= 10 ) {
                        title = "Low battery";
                        body = deviceName + "'s band is at " + "10%. It will last a few more hours. Please charge it soon.";
                    } else {
                        title = "Low battery";
                        body = deviceName + "'s band is at " + "20%. It will last approximately another day.";
                    }
                    break;
                case Constants.EVENT_TYPES.CHARGE_BATTERY:
                    title = "Battery is being charged.";
                    body = deviceName + "'s band is plugged in and charging.";
                    break;
                case Constants.EVENT_TYPES.INACTIVITY:
                    title = "Band suspended";
                    body = deviceName + "'s band doesn't have an active plan, which means you won't receive any notification. Please contact the account holder to re-activate it.";
                    break;
                case Constants.EVENT_TYPES.REMOVAL:
                    title = "Band not in use";
                    body = deviceName +  " might not be wearing the band, as it has not detected any motion for a while.";
                    break
                case Constants.EVENT_TYPES.PUT_ON:
                    title = "Band now in use";
                    body = "Looks like " + deviceName +  " is wearing the band again.";
                    break
                default:
                    break
            }

            const options = {
                soundName: 'sample.mp3',
                priority: 'max',
                playSound: true //,
                // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
                // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
            }
            localNotificationService.showNotification(
                0,
                title,
                body,
                data,
                options
            )
        }
    }

    unRegister = () => {
        this.messageListener()
    }
}

export const fcmService = new FCMService()
