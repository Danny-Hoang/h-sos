import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, View, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import HeaderWithBack from '../../../Components/HeaderWithBack';
import NavigationService from '../../../Services/NavigationService';
import { Colors, Strings } from '../../../Theme';
import Body from './Components/Body';
import Configs from "../../../Configs";
import { TextButton } from '../../../Components';
import { RouterName } from '../../../Navigator/RouteName';

const strings = Strings.verifyNumber

class VerifyNumber extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timer: Configs.DEFAULT_TIME_OUT,
            isDisable: true
        }
    }

    onLogin = () => {
        const { navigation } = this.props
        if (navigation.getParam('isFromLogin', true)) {
            NavigationService.pushToNewScreen(RouterName.HomeNavigator);
        } else {
            NavigationService.pushToNewScreen(RouterName.SetProfile);
        }
    }

    onChangeText(text) {
        this.setState({ isDisable: text.length != 6 })
    }

    render() {
        const { loading = false, error, navigation, isFromLogin = true } = this.props
        const { timer, isDisable } = this.state
        return (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <SafeAreaView style={{flex:1}}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                        style={styles.container}
                    >
                        <View style={styles.container}>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <View style={styles.containerContent}>
                                    <View style={{ flex: 1 }}>
                                        <HeaderWithBack title={navigation.getParam('isFromLogin', true) ? strings.login : strings.signUp} navigation={navigation} />
                                    </View>
                                    <View style={{ flex: 3 }}>
                                        <Body
                                            onChangeText={(text) => { this.onChangeText(text) }}
                                            timer={timer}
                                            phoneNumber={navigation.getParam('phoneNumber', "")} />
                                    </View>
                                    {/* {loading && (<LoaderWrapper>
                                <Loading />
                            </LoaderWrapper>)} */}
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={{ marginHorizontal: 20, marginVertical: 27 }}>
                        <TextButton
                            disabled={isDisable}
                            onClick={() => { this.onLogin() }}
                            style={{ borderWidth: 0 }}>
                            {strings.done}
                        </TextButton>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerContent: {
        flex: 1,
        justifyContent: "flex-start"
    },
    centerContainer: {
        height: 200,
        justifyContent: "center",
    },
})

export default VerifyNumber;