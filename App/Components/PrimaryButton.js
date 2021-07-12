import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../Theme';

class PrimaryButton extends Component {
    render() {
        const {action, title, longPress} = this.props
        return (
            <TouchableOpacity 
            onPress={() => action()} 
            onLongPress={() => {longPress()}}
            style={styles.container} 
            activeOpacity={0.7}>
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        backgroundColor: Colors.primaryColor,
        alignItems: "center",
        justifyContent: 'center',
        height: 55,
        borderRadius: 4,
        shadowColor: "rgba(31, 41, 125, 0.25)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    text: {
        fontFamily: Fonts.family.Medium,
        fontSize: 20,
        color: Colors.white,
    }
})

export default PrimaryButton;