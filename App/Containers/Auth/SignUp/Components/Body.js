import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PhoneInput from '../../../../Components/PhoneInput';
import { Fonts, Colors, Strings } from '../../../../Theme';

const strings = Strings.signup

class Body extends Component {
    
    render() {
        const {chooseNumber} = this.props
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.titleSignInText}>{strings.titleSignUp}</Text>
                <PhoneInput chooseNumber={() => {chooseNumber()}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centerContainer: {
        height:200,
        justifyContent: "center",
        marginHorizontal: 20
    },
    titleSignInText: {
        fontFamily: Fonts.family.Regular,
        fontSize: 24,
        color: Colors.darkGrey,
    }
});

export default Body;