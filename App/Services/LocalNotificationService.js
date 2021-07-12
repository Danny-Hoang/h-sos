import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import {Platform} from 'react-native';

class LocalNotificationService {

    configure = (onOpenNotification) => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("[LocalNotificationService] onRegister:", token);
            },
            onNotification: function (notification) {
                console.log("[LocalNotificationService] onNotification:", notification);
                if (!notification?.data) {
                    return
                }
                // notification.userInteraction = true;
                onOpenNotification(
                    Platform.OS === 'ios'
                    ? notification.action === undefined 
                        ? notification.userInteraction === true
                            ? notification.data.data
                            : undefined
                        : notification.data.item 
                    : notification.data
                );
                
                if (Platform.OS === 'ios') {
                    // (required) Called when a remote is received or opened, or local notification is opened
                    notification.finish(PushNotificationIOS.FetchResult.NoData)
                }
            },

            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            // Should the initial notification be popped automatically
            // default: true
            popInitialNotification: true,

            /**
             * (optional) default: true
             * - Specified if permissions (ios) and token (android and ios) will requested or not,
             * - if not, you must call PushNotificationsHandler.requestPermissions() later
             * - if you are not using remote notification or do not have Firebase installed, use this:
             *     requestPermissions: Platform.OS === 'ios'
             */
            requestPermissions: true,
        })
        this.createDefaultChannels()
    }

    unregister = () => {
        PushNotification.unregister()
    }

    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            /* Android Only Properties */
            ...this.buildAndroidNotification(id, title, message, data, options),
            /* iOS and Android properties */
            ...this.buildIOSNotification(id, title, message, data, options),
            /* iOS and Android properties */
            title: title || "",
            message: message || "",
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false // BOOLEAN: If the notification was opened by the user from the notification area or not
        });
    }

    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            // id: id,
            channelId: "sound-channel-id",
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_launcher",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || true,
            vibration: options.vibration || 300,
            priority: options.priority || "high",
            importance: options.importance || "high", // (optional) set notification importance, default: high,
            data: data,
            color: options.color || "red",
        }
    }

    buildIOSNotification = (id, title, message, data = {}, options = {}) => {
        return {
            alertAction: options.alertAction || 'view',
            category: options.category || "",
            userInfo: {
                id: id,
                item: data
            }
        }
    }

    cancelAllLocalNotifications = () => {
        if (Platform.OS === 'ios') {
            PushNotificationIOS.removeAllDeliveredNotifications();
        } else {
            PushNotification.cancelAllLocalNotifications();
        }
    }

    removeDeliveredNotificationByID = (notificationId) => {
        console.log("[LocalNotificationService] removeDeliveredNotificationByID: ", notificationId);
        PushNotification.cancelLocalNotifications({id: `${notificationId}`})
    }

    createDefaultChannels() {
        PushNotification.createChannel(
            {
                channelId: "default-channel-id", // (required)
                channelName: `Default channel`, // (required)
                channelDescription: "A default channel", // (optional) default: undefined.
                soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
                // importance: 'high', // (optional) default: Importance.HIGH. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            (created) => console.log(`createChannel 'default-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
        PushNotification.createChannel(
            {
                channelId: "sound-channel-id", // (required)
                channelName: `Sound channel`, // (required)
                channelDescription: "A sound channel", // (optional) default: undefined.
                soundName: "sample.mp3", // (optional) See `soundName` parameter of `localNotification` function
                // importance: 'high', // (optional) default: Importance.HIGH. Int value of the Android notification importance
                vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
            },
            (created) => console.log(`createChannel 'sound-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }
}

export const localNotificationService = new LocalNotificationService()
