import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback, Text, SafeAreaView } from 'react-native';
import { Colors, Strings } from '../../../Theme';
import { HeaderWithBack, PrimaryTextInput, TextButton } from '../../../Components';
import NavigationService from "../../../Services/NavigationService";
import Constants from '../../../Constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RouterName } from '../../../Navigator/RouteName';

const strings = Strings.registerWatchDigit

class RegisterWatchDigit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDisable: true,
            inputValue: '', //'473648273940292',
        }
    }

    updateState = (value) => {
        this.setState({
            inputValue: value
        })
        if (value.length === 15 && /^\d+$/.test(value)) {
            this.setState({
                isDisable: false
            })
        } else {
            this.setState({
                isDisable: true
            })
        }
    }

    onClickNext = () => {
        NavigationService.pushToNewScreen(RouterName.WatchConnect, { type: Constants.CONNECT_WATCH, imei: this.state.inputValue })
    }

    render() {
        const { navigation } = this.props
        const { isDisable, inputValue } = this.state
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={{ flex: 1, justifyContent: "space-between", backgroundColor: Colors.white }}>
                <HeaderWithBack navigation={navigation} title={strings.title} />
                <KeyboardAwareScrollView
                    extraScrollHeight={40}
                    keyboardShouldPersistTaps="handled"
                    style={{
                        flex: 1,
                    }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.containerContent}>


                            <View style={styles.centerContainer}>
                                <Text style={styles.message}>{strings.message}</Text>
                                <PrimaryTextInput
                                    style={{ underlineColorAndroid: Colors.transparent }}
                                    placeholder={strings.textInputPlaceholder}
                                    text={inputValue}
                                    onChange={text => this.updateState(text)}
                                    typeInput={"numeric"}
                                    maxLength={15} />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAwareScrollView>
                <View style={{ marginHorizontal: 20, marginBottom: 27 }}>
                    <TextButton
                        disabled={isDisable}
                        onClick={this.onClickNext}
                        style={styles.bottomButton}>
                        {Strings.common.next}
                    </TextButton>
                </View>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    containerContent: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: "flex-start",
        paddingHorizontal: 20
    },
    centerContainer: {
        height: 200,
        justifyContent: "flex-end",
        borderBottomWidth: 3,

    },
    message: {
        fontFamily: "Roboto-Regular",
        fontSize: 24,
        color: Colors.darkGrey,
        marginBottom: 22
    },
    bottomButton: {
        borderWidth: 0,
    },
});

export default RegisterWatchDigit;
