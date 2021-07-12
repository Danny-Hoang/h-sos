import React, { Component } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts, Images, Strings } from "../../Theme";
import { HeaderWithBack } from "../../Components";
import NavigationService from "../../Services/NavigationService";
import RowItem from "../../Components/RowItem";
import Utils from "../../Utils";
import { PermissionsAndroid } from 'react-native';
import {connect} from "react-redux";
import {DevicesActions} from "../../Stores/Devices";
import { RouterName } from "../../Navigator/RouteName";

const strings = Strings.more;

class MoreSetting extends Component {

    navigateToCarer = () => {
        NavigationService.pushToNewScreen(RouterName.Carer)
    };

    navigateToReminder = () => {
        NavigationService.pushToNewScreen(RouterName.Reminder)
    };

    navigateToGeofencing = async () => {
        let hasLocationPermission = await Utils.requestPermission(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (hasLocationPermission) {
            NavigationService.pushToNewScreen(RouterName.Geofencing)
        }

    };

    navigateToFallDetection() {
        NavigationService.pushToNewScreen(RouterName.FallDetection)
    };

    navigateToSeniorProfile = () => {
        NavigationService.pushToNewScreen(RouterName.SeniorProfile)
    };

    componentDidMount() {
        const {navigation, getDeviceInfo} = this.props
        // const {params} = navigation.state
        const device = navigation.getParam('device')
        getDeviceInfo(device.deviceId)
    }

    render() {
        const { navigation, deviceInfo } = this.props
        const {params} = navigation.state
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                <View style={{ paddingTop: 8 }}>
                    <HeaderWithBack navigation={navigation} title={strings.title} />
                </View>
                <ScrollView>
                    <TouchableOpacity
                        onPress={() => {
                            this.navigateToSeniorProfile()
                        }}>
                        <View style={styles.profileRow}>
                            <View style={{ flex: 1 }}>
                                <Image source={ deviceInfo?.deviceImgUrl === null ? Images.icMaleUser : {uri: deviceInfo?.deviceImgUrl}} style={styles.image} />
                            </View>

                            <View style={{ flex: 3, paddingLeft: 20 }}>
                                <Text numberOfLines={2} style={styles.nameText}>{deviceInfo?.deviceName}</Text>
                                <Text style={styles.phoneText}>{deviceInfo?.mobile}</Text>
                            </View>

                            <TouchableOpacity
                                style={{ flex: 1, alignItems: "flex-end", height: 40 }}
                                onPress={() => {
                                    this.setState({ modalEditVisible: true });
                                    this.navigateToSeniorProfile();
                                }}>
                                <Image source={Images.btnArrowRight} style={{ height: 24, width: 24 }} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.col}>
                        <RowItem
                            title={strings.setting.carer}
                            onPress={ () => {this.navigateToCarer()} }
                        />
                        <View style={styles.borderView} />
                        <RowItem
                            title={strings.setting.reminder}
                            onPress={ () => {this.navigateToReminder()} }
                        />
                    </View>

                    <View style={styles.col2}>
                        <RowItem
                            title={strings.setting.geofencing}
                            onPress={ () => { this.navigateToGeofencing() } }
                        />
                        <View style={styles.borderView} />
                        <RowItem
                            title={strings.setting.fall}
                            onPress={ () => { this.navigateToFallDetection() } }
                        />
                        <View style={styles.borderView} />
                        <RowItem
                            title={strings.setting.advance}
                            onPress={ () => {} }
                        />
                        <View style={styles.borderView} />
                        <RowItem
                            title={strings.setting.about}
                            onPress={ () => { NavigationService.pushToNewScreen(RouterName.AboutWatch) } }
                        />
                    </View>
                </ScrollView>
            </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = ({ userDevices: { device } }) => ( console.log('Output', device), {
    deviceInfo: device
})

const mapDispatchToProps = (dispatch) => ({
    getDeviceInfo: (deviceId) => dispatch(DevicesActions.getDeviceInfo(deviceId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MoreSetting)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: Colors.athensGray,
    },
    phoneText: {
        color: Colors.cobalt,
        fontFamily: Fonts.family.Medium,
        fontSize: Fonts.size.regular,
    },
    nameText: {
        fontFamily: Fonts.family.Medium,
        fontSize: Fonts.size.h3,
    },
    col: {
        backgroundColor: Colors.white,
        height: 120,
        marginTop: 20,
    },
    col2: {
        backgroundColor: Colors.white,
        height: 240,
        marginTop: 20,
    },
    profileRow: {
        flexDirection: "row",
        height: 120,
        backgroundColor: Colors.white,
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 13,
        marginTop: 8,
    },
    header: {
        paddingTop: 20,
        paddingBottom: 10,
        paddingLeft: 20,
        fontSize: 28,
        color: Colors.darkGrey,
        fontFamily: Fonts.family.Bold,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 20,
    },
    buttonItem: {
        justifyContent: "center",
        height: 40,
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 32
    },
    borderView: {
        backgroundColor: Colors.borderColorDateTime,
        height: 1,
        marginLeft: 20,
    },
    bottomView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22,
        height: 200,
    },
});
