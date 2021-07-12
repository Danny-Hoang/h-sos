import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { Colors, Fonts, Images, Strings } from '../../../../Theme';

const strings = Strings.login


class Header extends Component {
    render() {
        return (
            <View style={{ height: 50 }}>
                <Text style={styles.loginText}>{strings.login}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    loginText: {
        fontFamily: Fonts.family.Bold,
        fontSize: 28,
        color: Colors.darkGrey,
    },
});

export default Header;