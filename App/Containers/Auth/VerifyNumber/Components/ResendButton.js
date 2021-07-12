import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts, Strings } from '../../../../Theme';

const strings = Strings.verifyNumber

class ResendButton extends Component {
    state = {  }
    render() {
        const {onPress} = this.props;
        return (
            <TouchableOpacity onPress={() => onPress()}>
                <View style={styles.container}>
                    <Text style={styles.text}>{strings.resend}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 50,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.darkBlueGrey,
        justifyContent: 'center',        
    },
    text: {
        textAlign: 'center',
        color: Colors.darkBlueGrey,
        fontSize: 18,
        fontFamily: Fonts.family.Medium
    }
})

export default ResendButton;