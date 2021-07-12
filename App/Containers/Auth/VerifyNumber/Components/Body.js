import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Fonts, Strings } from '../../../../Theme';
import CodeInput from './CodeInput';
import ResendButton from './ResendButton';

const strings = Strings.verifyNumber

class Body extends Component {
    render() {
        const {phoneNumber, timer, onChangeText} = this.props
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.title}>{strings.enterVerCode}</Text>
                <Text style={styles.phoneNumber}>{phoneNumber}</Text>
                <CodeInput onChangeText={(text)=>{onChangeText(text)}} timer={timer}/>
                {/* <PrimaryButton title={strings.login} action={() => {resendAction()}}/> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centerContainer: {
        justifyContent: "center",
        marginHorizontal: 20
    },
    title: {
        fontFamily: Fonts.family.Regular,
        fontSize: 24,
        color: Colors.darkGrey,
    },
    phoneNumber: {
        fontFamily: Fonts.family.Medium,
        fontSize: 20,
        color: Colors.primaryColor,
    }
});

export default Body;