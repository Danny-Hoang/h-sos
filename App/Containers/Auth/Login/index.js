import React, { Component } from 'react'
import { View, Keyboard, StyleSheet, Text, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, Image, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import AuthActions from '../../../Stores/Auth';
import { LoaderWrapper } from '../../../Components/LoaderWrapper';
import { Loading, Popup, TextButton } from '../../../Components'
import NavigationService from '../../../Services/NavigationService';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { Colors, Fonts, Images, Metrics, Strings } from '../../../Theme';
import PrefixPhoneModal from './Components/PrefixPhoneModal';
import BottomPopup from '../../../Components/BottomPopup';
import ContactUs from '../ContactUs';
import Configs from "../../../Configs";
import { RouterName } from '../../../Navigator/RouteName';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from '../../../Constants';
import Spinner from "react-native-loading-spinner-overlay";

const strings = Strings.login

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberModalVisible: false,
            contactUsVisible: false,
            isShowPopupError: false,
            selectedCountryCode: Configs.DEFAULT_COUNTRY_ISO_CODE,
            selectedCountryCodeText: Configs.DEFAULT_COUNTRY_CODE,
            phoneNumber: "",
            email: "",
            password: "",
            isDisable: true,
            isRememberMe: false,
            isShowPassword: false
        };

    }

    async componentDidMount(){
        await this.getLocalInfo()
    }

    static getDerivedStateFromProps(nextProps, prevState){
        // const {navigation, startupReducer} = nextProps;
        const {auth} = nextProps;
        if(auth.token != null && typeof(auth.token) != 'undefined') {
            NavigationService.navigateAndReset(RouterName.HomeNavigator)
        }
        // navigation.navigate(startupReducer.token != null ? RouterName.HomeNavigator : RouterName.Login)
        return {}
    }

    async getLocalInfo() {
        let userName = await AsyncStorage.getItem(Constants.USER_NAME);
        let password = await AsyncStorage.getItem(Constants.PASSWORD);
        if(userName != null && userName != "" && password != null && password != ""){
            this.setState({
                email: userName,
                password: password,
                isRememberMe: true,
                isDisable: false
            })
        }
    }

    setModalVisible = (key, visible) => {
        this.setState({ [key]: visible });
    }

    onLogin = () => {
        // const { selectedCountryCodeText, phoneNumber } = this.state;
        // NavigationService.pushToNewScreen(RouterName.VerifyNumber, { phoneNumber: selectedCountryCodeText + " " + phoneNumber });
        const {fetchAuth} = this.props;
        const {email, password, isRememberMe} = this.state;
        fetchAuth(email, password, isRememberMe);
        this.setState({
            isShowPopupError: true
        })
        // NavigationService.pushToNewScreen(RouterName.HomeNavigator);
    }

    chooseNumber = () => {
        this.setModalVisible('numberModalVisible', true);
    }

    onSignUp = () => {
        NavigationService.pushToNewScreen(RouterName.SignUp);
    }

    openContactUs = () => {
        this.setModalVisible('contactUsVisible', true);
    }

    onValidate = () => {
        this.setState({
            // isDisable: !isValidNumber(text, this.state.selectedCountryCode),
            isDisable: this.state.email == "" || this.state.password == "",
            // email: text
        })
    }

    selectedItem = (item) => {
        this.setState({
            selectedCountryCode: item.countryCode,
            selectedCountryCodeText: item.code
        })
    }

    onTapRememberMe = () => {
        const {isRememberMe} = this.state
        this.setState({isRememberMe: !isRememberMe})
    }

    render() {
        const { auth } = this.props
        const {error, loading} = auth;
        const { numberModalVisible, contactUsVisible, isShowPopupError, isShowPassword,
            selectedCountryCodeText, isDisable, email, password, isRememberMe } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {/*<Spinner*/}
                {/*    visible={loading}*/}
                {/*    textContent={'Loading...'}*/}
                {/*    textStyle={{*/}
                {/*        color: '#FFF'*/}
                {/*    }}*/}
                {/*/>*/}
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={styles.container}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.containerContent}>
                                <Header />
                                <View style={{ alignItems: 'center' }}>
                                    <Image style={styles.logoImage} source={Images.icLogo} />
                                </View>
                                <Text style={styles.titleSignInText}>{strings.titleSignIn}</Text>
                                <TextInput
                                    style={styles.userNameText}
                                    onChangeText={text => {
                                        this.setState({ email: text }, () => this.onValidate())
                                    }}
                                    placeholder='Email or Mobile'
                                    placeholderTextColor='#999'
                                    value={email}
                                    autoCompleteType='off'
                                />
                                <View style={{flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: 'gray', alignItems: 'center'}}>
                                    <TextInput
                                        style={styles.passwordText}
                                        onChangeText={text => {
                                            this.setState({ password: text }, () => this.onValidate())
                                        }}
                                        placeholder='Password'
                                        placeholderTextColor='#999'
                                        value={password}
                                        autoCompleteType='off'
                                        secureTextEntry={!isShowPassword}
                                    />
                                    <TouchableOpacity onPress={() => {this.setState({isShowPassword: !isShowPassword})}}>
                                        <Image style={{width: 23, height: 15}}
                                        tintColor={Colors.coolGrey} source={!isShowPassword ? Images.icEye : Images.icHideEye}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{height: 50, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <TouchableOpacity onPress={this.onTapRememberMe}>
                                    <View style={{flexDirection: "row"}}>
                                        <View style={{...styles.checkBoxView, borderColor: isRememberMe ? Colors.backgroundCompleteScreen : "#1212"}}>
                                        {isRememberMe && <Image source={Images.icCheckR} style={{width: 16, height: 16}}/>}
                                        </View>
                                        <Text style={{fontSize: 14}}>Remember me</Text>
                                    </View>
                                    </TouchableOpacity>
                                    <Text style={{fontSize: 14, color: Colors.primaryColor}}>Forgot password?</Text>
                                </View>
                                {/* <PhoneInput
                                        selectedCountryCodeText={selectedCountryCodeText}
                                        onChangeText={text => this.onChangeText(text)}
                                        chooseNumber={() => this.chooseNumber()} /> */}

                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                    <View style={styles.buttonView}>
                        <TextButton
                            disabled={isDisable}
                            onClick={this.onLogin}
                            // longPress={() => this.setModalVisible('isShowPopupOneButton', true)}
                            style={{ borderWidth: 0 }}>
                            {strings.login}
                        </TextButton>
                        <View style={{ marginBottom: 40, marginHorizontal: 30 }}>
                            <Footer signUpAction={() => { this.onSignUp(); }}
                                openContactUs={() => { this.openContactUs() }}
                            />
                        </View>
                    </View>

                    <BottomPopup visible={numberModalVisible} onRequestClose={() => { this.setModalVisible('numberModalVisible', false) }}>
                        <View style={styles.bottomView}>
                            <PrefixPhoneModal selectedItem={(item) => { this.selectedItem(item) }} onClose={() => { this.setModalVisible('numberModalVisible', false); }} />
                        </View>
                    </BottomPopup>

                    <BottomPopup visible={contactUsVisible} onRequestClose={() => { this.setModalVisible('contactUsVisible', false) }}>
                        <View style={{ ...styles.bottomView, justifyContent: 'flex-start' }}>
                            <ContactUs
                                onClose={() => { this.setModalVisible('contactUsVisible', false); }} />
                        </View>
                    </BottomPopup>

                    <Popup.OneButton
                        visible={isShowPopupError && error != null && typeof(error) != 'undefined'}
                        title={strings.errorTitle}
                        content={strings.errorContent}
                        onClickConfirm={() => { this.setModalVisible('isShowPopupError', false) }}
                    />
                    {loading && (<LoaderWrapper>
                        <Loading />
                    </LoaderWrapper>)}
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
    },
    containerContent: {
        padding: 22,
        flex: 1,
        justifyContent: "space-between",
    },
    logoImage: {
        width: 40,
        height: 40,
        justifyContent: "center",
    },
    userNameText: {
        color: Colors.darkGreyTwo,
        alignSelf: 'stretch',
        fontSize: 19,
        flexWrap: 'wrap',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray',
    },
    passwordText: {
        color: Colors.darkGreyTwo,
        alignSelf: 'stretch',
        fontSize: 19,
        flexWrap: 'wrap',
        flex: 1
    },
    centerContainer: {
        justifyContent: "center",
    },
    loginText: {
        fontFamily: Fonts.family.Medium,
        fontSize: 28,
        color: Colors.darkGrey,
    },
    titleSignInText: {
        fontFamily: Fonts.family.Regular,
        fontSize: 24,
        color: Colors.darkGrey,
    },
    bottomView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        height: 360,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    buttonView: {
        justifyContent: "space-between",
        marginHorizontal: 20,
        flex: 2
    },
    checkBoxView: {
        borderWidth: 1,
        borderRadius: 5,
        width: 20,
        height: 20,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center"
    }
});

const mapStateToProps = ({ auth }) => {
    return {auth: auth}
}
const mapDispatchToProps = (dispatch) => ({
    checkVerificationCode: (verificationCode, time) => dispatch(AuthActions.checkVerificationCode(verificationCode, time)),
    fetchAuth: (email, password, isRememberMe) => dispatch(AuthActions.fetchAuth(email, password, isRememberMe)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)
