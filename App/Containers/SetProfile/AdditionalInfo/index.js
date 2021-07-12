import React, { Component, useState } from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import { Colors, Fonts, Strings } from '../../../Theme';
import HeaderWithBack from '../../../Components/HeaderWithBack';
import PrimaryButton from '../../../Components/PrimaryButton';
import {PrimaryTextInput, BottomPopup, Loading} from '../../../Components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DatePickerComponent from "./DatePicker"
import { formatDateToString } from '../../../Utils/time';
import { connect } from "react-redux";
import { DevicesActions } from "../../../Stores/Devices";
import {LoaderWrapper} from "../../../Components/LoaderWrapper";
import NavigationService from "../../../Services/NavigationService";
import {RouterName} from "../../../Navigator/RouteName";

const strings = Strings.additionalInfo

class AdditionalInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gender: '0',
            modalDatePickerVisible: false,
            date: "1988.01.01"
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        const { device, error, loading } = nextProps;
        if(device != null && typeof(device) != 'undefined' && error === 'NoError') {
            NavigationService.navigate(RouterName.HomeNavigator)
        } else {
            //show error pop-up
        }
        return {}
    }

    onSelectGender = (gender) => {
        this.setState({ gender: gender })
    }

    onSelectDateOfBirth = (date) => {
        let dateString = formatDateToString(date)
        this.setState({ date: dateString })
    }

    setModalVisible = (key, visible) => {
        this.setState({ [key]: visible }, () => {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        })
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        return true
    };

    render() {
        const { navigation, loading } = this.props
        const { modalDatePickerVisible, date } = this.state
        return (
            <View style={{ flex: 1, justifyContent: "space-between", backgroundColor: Colors.white }}>
                <HeaderWithBack title={strings.header} navigation={navigation} />
                <KeyboardAwareScrollView
                    extraScrollHeight={40}
                    keyboardShouldPersistTaps="handled"
                    style={{
                        flex: 1,
                        padding: 10,
                    }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                        <View style={styles.containerContent}>
                            <Text style={styles.message}>{strings.message}</Text>
                            <View style={styles.rowGender}>
                                <Text style={styles.fieldText}>{strings.genderTitle}</Text>
                                {
                                    strings.gender.map(item => {
                                        return (
                                            <TouchableOpacity style={styles.gender} onPress={(e) => this.onSelectGender(item.id)} key={item.id}>
                                                <TouchableOpacity style={styles.circle} onPress={(e) => this.onSelectGender(item.id)}>
                                                    {this.state.gender === item.id && (<View style={styles.checkItem} />)}
                                                </TouchableOpacity>
                                                <Text style={styles.textGender}>{item.name}</Text>
                                            </TouchableOpacity>
                                        )
                                    })

                                }

                            </View>
                            <View style={styles.rowBirthday} >
                                <Text style={styles.fieldText}>{strings.birthday}</Text>
                                <TouchableWithoutFeedback style={{ alignItems: 'flex-start' }} onPress={(e) => { this.setModalVisible('modalDatePickerVisible', true) }}>
                                    <Text style={{ flex: 7, color: Colors.darkGreyTwo, fontSize: 18, textAlign: 'left' }}>{date}</Text>
                                </TouchableWithoutFeedback>

                            </View>

                            <View style={styles.rowBirthday}>
                                <Text style={styles.fieldText}>{strings.height}</Text>
                                <PrimaryTextInput style={{ flex: 6, underlineColorAndroid: Colors.transparent }} placeholder={'170'} typeInput={"numeric"} />
                                <Text style={{ flex: 1, textAlign: 'right' }}>{strings.cm}</Text>
                            </View>
                            <View style={styles.rowBirthday}>
                                <Text style={styles.fieldText}>{strings.weight}</Text>
                                <PrimaryTextInput style={{ flex: 6, underlineColorAndroid: Colors.transparent }} placeholder={'85'} typeInput={"numeric"} />
                                <Text style={{ flex: 1, textAlign: 'right' }}>{strings.kg}</Text>
                            </View>
                        </View>

                    </TouchableWithoutFeedback>
                </KeyboardAwareScrollView>
                <View style={{ marginHorizontal: 20, marginBottom: 27 }}>
                    <PrimaryButton title={Strings.common.done} action={() => {
                        let userInfo = navigation.getParam('userInfo');
                        let deviceId = navigation.getParam('id');
                        console.log('info', userInfo);
                        this.props.postDeviceUpdate(deviceId, userInfo)

                        // NavigationService.navigate(RouterName.HomeNavigator)
                    }}/>
                </View>

                <BottomPopup visible={modalDatePickerVisible} onRequestClose={() => { this.setModalVisible('modalDatePickerVisible', false) }}>
                    <View style={styles.bottomView}>
                        <DatePickerComponent onChange={this.onSelectDateOfBirth} date={new Date(date.substr(0, 4), date.substr(5, 2) - 1, date.substr(8, 2))} onClose={() => { this.setModalVisible('modalDatePickerVisible', false); }} />
                    </View>
                </BottomPopup>
                {loading && (<LoaderWrapper>
                    <Loading />
                </LoaderWrapper>)}
            </View>
        )
    }
}


const mapStateToProps = ({ auth: { token, data }, userDevices: { device, emergencyMessages, loading = false, error }}) => {
	return {
		error,
		loading,
		token,
		device,
		emergencyMessages,
		userInfo: data
	}
}
const mapDispatchToProps = (dispatch) => ({
	postDeviceUpdate: (deviceId, userInfo) => dispatch(DevicesActions.postDeviceUpdate(deviceId, userInfo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdditionalInfo)

const styles = StyleSheet.create({
    containerContent: {
        paddingHorizontal: 20,
    },
    message: {
        fontFamily: Fonts.family.Regular,
        fontSize: 20,
        color: Colors.darkGrey,
        marginTop: 20,
        marginBottom: 42,
    },
    circle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.coolGrey,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkItem: {
        width: 11,
        height: 11,
        borderRadius: 7,
        backgroundColor: Colors.black,
    },
    fieldText: {
        flex: 3,
        color: Colors.darkGreyTwo,
        fontSize: 16
    },
    gender: {
        flexDirection: 'row',
        flex: 3
    },
    textGender: {
        fontFamily: Fonts.family.Bold,
        fontSize: Fonts.size.regular,
        color: Colors.darkGreyTwo,
        marginLeft: 8,
    },
    rowGender: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        borderBottomWidth: 3,
        borderBottomColor: Colors.darkGreyTwo
    },
    rowBirthday: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    rowHeightAndWeight: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    bottomView: {
        justifyContent: "flex-end",
        alignItems: 'flex-end',
        height: 325,
    },
});
