import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native';
import { Colors, Images } from '../../../../../Theme';

export default class DateSelect extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.button}>
                    <Image source={Images.btnArrowRight} style={{ ...styles.icon, transform: [{ rotate: "180deg" }] }} />
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.dateText}>Today</Text>
                </View>

                <View style={styles.button}>
                    <Image source={Images.btnArrowRight} style={styles.icon} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        justifyContent: "space-evenly",
        marginTop: 30,
        marginBottom: 20
    },
    button: {
        width: 46,
        height: 46,
        backgroundColor: Colors.white,
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.coolGrey,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    dateText: {
        color: '#334435',
        fontSize: 24,
        fontWeight: '500'
    },
    icon: {
        width: 24,
        height: 24
    }
})