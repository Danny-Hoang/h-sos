import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Strings, Colors, Fonts } from '../../../../Theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

const strings = Strings.login

class Footer extends Component {
    state = {  }
    render() {
        const {signUpAction, openContactUs} = this.props
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: "space-between", 
                marginHorizontal: 46
              }}>
                <TouchableOpacity onPress={() => signUpAction()}>
                    <Text style={styles.text}>{strings.signUp}</Text>
                </TouchableOpacity>
                <View style={styles.divider}/>
                <TouchableOpacity onPress={() => openContactUs()}>
                    <Text style={styles.text}>{strings.help}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#472478'
    },
    divider: {
        width:1,
        backgroundColor: Colors.coolGrey,
    },
    text: {
        color: Colors.darkGrey,
        fontSize: 19,
        fontFamily: Fonts.family.Medium
    }
})

export default Footer;