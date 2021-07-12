import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, BackHandler } from 'react-native';
import { Colors, Fonts, Images, Metrics, Strings } from '../../../Theme';
import NavigationService from "../../../Services/NavigationService";
import * as Progress from 'react-native-progress';
import { Popup } from "../../../Components";
import Constants from '../../../Constants'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { connect } from "react-redux";
import { DevicesActions } from "../../../Stores/Devices";
import { RouterName } from '../../../Navigator/RouteName';
import API from "../../../Services/ApiService";

class WatchConnect extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isShowPopupOneButton: false,
            isShowPopupTwoButton: false,
            progress: 0,
            indeterminate: true,
            popupTwoButtonTitle: '',
            popupTwoButtonMessage: '',
            popupOneButtonTitle: '',
            popupOneButtonMessage: ''
        };
    }

    componentDidMount() {
        // const { userInfo } = this.props
        // const imei = this.props.navigation.getParam('imei')
        // let customerId = userInfo.userId
        // let isActive = true
        // this.props.connectWatch(customerId, imei, isActive)
        this.registerWatch();
    }

    registerWatch = async () => {
        const { userInfo, devices } = this.props;

        if (devices != null && typeof devices != 'undefined') {
            if (device && device.length !== 0) {
                this.setState({
                    isShowPopupOneButton: true,
                    popupOneButtonTitle: 'Registration Error',
                    popupOneButtonMessage: 'Already registered watch\n' +
                        'Please check again.'
                })
                return;
            }
            const device = devices.filter((device) => {
                return device.imei === this.props.navigation.getParam('imei');
            });
        }

        const imei = this.props.navigation.getParam('imei');
        let customerId = userInfo.userId;
        let isActive = true;

        const params = {customerId, imei, isActive};
        const result = await API.devices.connectWatch(params);
        if (result === true) {
            NavigationService.replaceToNewScreen(RouterName.CompletionScreen, {imei: this.props.navigation.getParam('imei')})
        } else {
            this.setState({
                isShowPopupOneButton: true,
                popupOneButtonTitle: 'Registration Error',
                popupOneButtonMessage: 'Invalid code.\n' +
                    'Please check again.'
            })
            // let strings = Strings.watchConnect.connect.error
            // this.setState({
            //     isShowPopupTwoButton: true,
            //     popupTwoButtonTitle: strings.title,
            //     popupTwoButtonMessage: strings.message
            // })
        }
    }

    navigateTo() {
        const type = this.props.navigation.getParam('type')
        if (type === Constants.CONNECT_WATCH) {
            NavigationService.pushToNewScreenWithoutCheckDuplicate(RouterName.WatchConnect, { type: Constants.UPDATE_WATCH, imei: this.props.navigation.getParam('imei') })
        } else if (type === Constants.SEARCH_WATCH) {
            NavigationService.pushToNewScreenWithoutCheckDuplicate(RouterName.WatchConnect, { type: Constants.UPDATE_WATCH })
        }else if(type === Constants.UPDATE_WATCH){
            NavigationService.replaceToNewScreen(RouterName.CompletionScreen, {imei: this.props.navigation.getParam('imei')})
        }
    }

    clickTryAgain = () => {
        this.registerWatch();
        const type = this.props.navigation.getParam('type')
        this.setState({
            isShowPopupTwoButton: false,
        }, () => {
            if(type === Constants.UPDATE_WATCH){
                NavigationService.pushToNewScreenWithoutCheckDuplicate(RouterName.WatchConnect, { type: Constants.SEARCH_WATCH })
            }
        })
    }

    showPopup = () => {
        const type = this.props.navigation.getParam('type')
        if (type === Constants.CONNECT_WATCH) {
            let strings = Strings.watchConnect.connect.error
            this.setState({
                isShowPopupTwoButton: true,
                popupTwoButtonTitle: strings.title,
                popupTwoButtonMessage: strings.message
            })
        } else if (type == Constants.UPDATE_WATCH) {
            var randomBoolean = Math.random() < 0.5;
            let strings = Strings.watchConnect.update.error
            if (randomBoolean) {
                this.setState({
                    isShowPopupTwoButton: true,
                    popupTwoButtonTitle: strings.title,
                    popupTwoButtonMessage: strings.messageUpdateNotFound
                })
            } else {
                this.setState({
                    isShowPopupOneButton: true,
                    popupOneButtonTitle: Strings.watchConnect.update.error.title,
                    popupOneButtonMessage: Strings.watchConnect.update.error.messageUpdateFail
                })
            }
        }
    }

    onClose = () => {
        this.setState({
            isShowPopupOneButton: false,
            isShowPopupTwoButton: false,
        }, () => {
            this.props.navigation.pop();
            // NavigationService.navigate('HomeNavigator')
        })
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        return true;
    };


    animate() {
        let progress = 0;
        this.setState({ progress });
        setTimeout(() => {
            this.setState({ indeterminate: true });
            setInterval(() => {
                progress += Math.random() / 5;
                if (progress > 1) {
                    progress = 1;
                }
                this.setState({ progress },
                    () => {
                        if (progress === 1) {
                            NavigationService.replaceToNewScreen('CompleteRegister')
                        }
                    })

            }, 500);
        }, 500);
    }

    render() {
        const { navigation } = this.props
        const type = navigation.getParam('type')
        const { isShowPopupOneButton, isShowPopupTwoButton, popupTwoButtonTitle, popupTwoButtonMessage, popupOneButtonTitle, popupOneButtonMessage } = this.state
        let strings
        if (type === Constants.CONNECT_WATCH) {
            strings = Strings.watchConnect.connect
        } else if (type === Constants.UPDATE_WATCH) {
            strings = Strings.watchConnect.update
        } else {
            strings = Strings.watchConnect.search
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: Colors.athensGray }}>
                {/*<TouchableWithoutFeedback style={styles.content} onPress={this.navigateTo.bind(this)} onLongPress={this.showPopup}>*/}
                    {/* {<Image source={Images.icCompleteConnect} style={styles.image}/>} */}
                    <View>
                        {/*<Text style={[styles.title, { marginBottom: 17 }]}>{strings.title}</Text>*/}
                        {/*<Text style={styles.message}>{strings.message}</Text>*/}
                        <Text style={[styles.title, { marginBottom: 17 }]}>Registering...</Text>
                    </View>
                    {type === Constants.UPDATE_WATCH &&
                        <Progress.Bar
                            width={null}
                            color={Colors.red}
                            progress={0.3}
                            style={styles.progressBar}
                            unfilledColor={Colors.lightBlueGrey} />
                    }
                {/*</TouchableWithoutFeedback>*/}

                <Popup.OneButton
                    visible={isShowPopupOneButton}
                    title={popupOneButtonTitle}
                    content={popupOneButtonMessage}
                    onClickConfirm={this.onClose}
                />

                <Popup.TwoButtons
                    visible={isShowPopupTwoButton}
                    title={popupTwoButtonTitle}
                    content={popupTwoButtonMessage}
                    okText={Strings.common.popup.tryAgain}
                    // onClose={this.onClose}
                    onClickOk={this.clickTryAgain}
                    onClickCancel={this.onClose}
                />
            </View>
        )
    }
}

const mapStateToProps = ({ auth: { loading = false, error, token, data }, userDevices: { devices, emergencyMessages } }) => {
	return {
		error,
		loading,
		token,
		devices,
		emergencyMessages,
		userInfo: data
	}
}
const mapDispatchToProps = (dispatch) => ({
	connectWatch: (customerId, imei, isActive) => dispatch(DevicesActions.connectWatch(customerId, imei, isActive)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchConnect)

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.family.Bold,
        fontSize: 26,
        textAlign: 'center',
        color: Colors.darkGreyTwo,
    },
    message: {
        fontFamily: Fonts.family.Regular,
        fontSize: 18,
        textAlign: 'center',
        color: Colors.slateGrey,
    },
    bottomButton: {
        borderWidth: 0,
    },
    content: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight * 0.5,
        marginBottom: Metrics.screenHeight * 0.3,
        justifyContent: 'space-around',
    },
    progressBar: {
        width: Metrics.screenWidth * 0.9,
        alignSelf: 'center',
        // backgroundColor: Colors.lightBlueGrey,
        borderWidth: 0,
    },
    image: {
        height: 80,
        width: 80,
    }
});
