import React from "react";
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'
import EventsTab from '../Containers/Home/EventsTab';
import HomeTab from '../Containers/Home/HomeTab';
import EditOrder from '../Containers/Home/HomeTab/EditOrder';
import SettingsTab from '../Containers/Home/SettingsTab';
import { Image, StyleSheet } from 'react-native';
import { Images, Strings, Colors } from "../Theme";
import ScanQR from "../Containers/RegisterWatch/ScanQR";
import RegisterWatchDigit from "../Containers/RegisterWatch/RegisterWatchDigit";
import WatchConnect from "../Containers/RegisterWatch/WatchConnect";
import Login from "../Containers/Auth/Login";
import SignUp from "../Containers/Auth/SignUp";
import VerifyNumber from "../Containers/Auth/VerifyNumber";
import SetProfile from "../Containers/Auth/SetProfile";
import AdditionalInfo from "../Containers/SetProfile/AdditionalInfo";
import RequiredInfo from "../Containers/SetProfile/RequiredInfo";
import MoreSetting from "../Containers/More";
import Carer from "../Containers/Carer";
import Reminder from "../Containers/Reminder";
import AboutWatch from "../Containers/AboutWatch";
import WatchUpdate from "../Containers/AboutWatch/WatchUpdate";
import CompletionScreen from "../Components/CompletionScreen";
import Disconnection from "../Containers/AboutWatch/Disconnection";
import CompleteAddCarer from "../Containers/Carer/Components/CompleteAddCarer";
import ChangePhoneNumber from "../Containers/Home/SettingsTab/ChangePhoneNumber";
import Geofencing from "../Containers/Geofencing";
import SeniorLocation from "../Containers/SeniorLocation";
import FallDetection from "../Containers/FallDetection";
import SeniorProfile from "../Containers/EditSeniorProfile";
import SOS from "../Containers/SOS";
import Notices from "../Containers/Support/Notices";
import Support from "../Containers/Support/index";
import AppNotification from "../Containers/Home/SettingsTab/AppNotification";
import {AppService} from "../Containers/Home";
import {AppVersion} from "../Containers/Home/SettingsTab/AppService/AppVersion";
import OpenSourceLicense from "../Containers/Home/SettingsTab/AppService/OpenSourceLicense";
import UserAgreement from "../Containers/Home/SettingsTab/AppService/UserAgreement";
import PrivacyPolicy from "../Containers/Home/SettingsTab/AppService/PrivacyPolicy";
import SignInWithMail from "../Containers/SignInWithMail";
import ChangeServerURL from "../Containers/ServerUrl";
import Splash from "../Containers/Splash";
import EditProfile from "../Containers/Home/SettingsTab/EditProfile";
import Summary from "../Containers/Home/HomeTab/Summary";
import DetailSummary from "../Containers/Home/HomeTab/Summary/DetailSummary";


const strings = Strings.home.bottomTabBar
const styles = StyleSheet.create({
    iconMenu: {
        width: 32,
        height: 32,
    },
    botomBar: {
        height: 70,
        paddingBottom: 11,
        paddingTop: 11,
    }
});



const HomeNavigator = createBottomTabNavigator({
        Home: {
            screen: HomeTab,
            navigationOptions: {
                tabBarLabel: strings.home,
                tabBarIcon: ({ focused, tintColor }) => (
                    focused ? <Image source={Images.icHomeOn} style={styles.iconMenu} />
                        : <Image source={Images.icHomeOff} style={styles.iconMenu} />
                )
            }
        },
        Events: {
            screen: EventsTab,
            navigationOptions: {
                tabBarLabel: strings.event,
                tabBarIcon: ({ focused, tintColor }) => (
                    focused ? <Image source={Images.icEventOn} style={styles.iconMenu} />
                        : <Image source={Images.icEventOff} style={styles.iconMenu} />
                )
            }
        },
        Settings: {
            screen: SettingsTab,
            navigationOptions: {
                tabBarLabel: strings.setting,
                tabBarIcon: ({ focused, tintColor }) => (
                    focused ? <Image source={Images.icSettingOn} style={styles.iconMenu} />
                        : <Image source={Images.icSettingOff} style={styles.iconMenu} />
                )
            }
        },

    }, {
        tabBarOptions: {
            showIcon: true,
            activeTintColor: Colors.black,
            inactiveTintColor: Colors.slateGrey,
            style: styles.botomBar,
        },
    }
);

const AppStack = createStackNavigator(
    {
        HomeNavigator: {screen: HomeNavigator},
        ScanQR: {screen: ScanQR},
        RegisterWatchDigit: {screen: RegisterWatchDigit},
        WatchConnect: {screen: WatchConnect},
        Login: {screen: Login},
        SignUp: {screen: SignUp},
        VerifyNumber: {screen: VerifyNumber},
        SetProfile: {screen: SetProfile},
        AdditionalInfo: {screen: AdditionalInfo},
        RequiredInfo: {screen: RequiredInfo},
        MoreSetting: {screen: MoreSetting},
        AppNotification: {screen: AppNotification},
        AppService: {screen: AppService},
        AppVersion: {screen: AppVersion},
        SeniorLocation: {screen: SeniorLocation},
        SeniorProfile: {screen: SeniorProfile},
        ChangePhoneNumber: {screen: ChangePhoneNumber},
        Carer: {screen: Carer},
        CompleteAddCarer: {screen: CompleteAddCarer},
        Geofencing: {screen: Geofencing},
        FallDetection: {screen: FallDetection},
        AboutWatch: {screen: AboutWatch},
        WatchUpdate: {screen: WatchUpdate},
        Disconnection: {screen: Disconnection},
        CompletionScreen: {screen: CompletionScreen},
        SOS: {screen: SOS}, 
        EditOrder: {screen: EditOrder},
        OpenSourceLicense: {screen: OpenSourceLicense},
        UserAgreement: {screen: UserAgreement},
        PrivacyPolicy: {screen: PrivacyPolicy},
        Support: {screen: Support},
        Notices: {screen: Notices},
        SignInWithMail: {screen: SignInWithMail},
        Reminder: {screen: Reminder},
        ChangeServerURL: {screen: ChangeServerURL},
        Splash: {screen: Splash},
        EditProfile: {screen: EditProfile},
        Summary: {screen: Summary},
        DetailSummary: {screen: DetailSummary},
    },
    {
        // initialRouteName: RouterName.Splash,
        initialRouteName: "Splash",
        headerMode: 'none',
    }
);

export default createAppContainer(AppStack)
