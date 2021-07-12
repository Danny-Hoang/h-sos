import React, { Component } from 'react';
import { Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors, Fonts } from '../../../../Theme';
import { secondsToMS } from '../../../../Utils';
import ResendButton from './ResendButton';
import Configs from "../../../../Configs";

const MAX_VALUE_LENGTH = 6;

class CodeInput extends Component {
    state = {
        value: "",
        timer: Configs.DEFAULT_TIME_OUT,
    }

    componentDidMount() {
        this.interval = setInterval(
            () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
            1000
        );
    }

    componentDidUpdate() {
        if (this.state.timer === 0) {
            clearInterval(this.interval);
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    resendAction() {
        this.setState({timer: Configs.DEFAULT_TIME_OUT})
        clearInterval(this.interval);

        this.interval = setInterval(
            () => this.setState((prevState) => ({ timer: prevState.timer - 1 })),
            1000
        );
    }

    render() {
        const { onChangeText } = this.props
        const { timer, value } = this.state
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TextInput
                        style={styles.phoneNumber}
                        onChangeText={text => {
                            this.setState({value: text});
                            if(text.length==6){
                                Keyboard.dismiss();
                            }
                            onChangeText(text);
                        }}
                        placeholder='6 digits'
                        placeholderTextColor='#999'
                        value={value}
                        autoCompleteType='off'
                        keyboardType={'numeric'}
                        maxLength={MAX_VALUE_LENGTH}
                    />
                    <View style={{ justifyContent: 'center' }}>
                        <Text style={styles.time}>{secondsToMS(timer)}</Text>
                    </View>
                </View>
                <View style={styles.underline} />
                <View style={{ flexDirection: 'row-reverse', marginTop: 15 }}>
                    <ResendButton onPress={() => {this.resendAction()}} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    phoneNumber: {
        color: Colors.darkGreyTwo,
        alignSelf: 'stretch',
        fontSize: 19,
        width: 200
    },
    underline: {
        height: 1.5,
        marginTop: 5,
        backgroundColor: Colors.darkGreyTwo
    },
    time: {
        color: Colors.primaryColor,
        fontSize: 18,
        fontFamily: Fonts.family.Medium
    }
});

export default CodeInput;