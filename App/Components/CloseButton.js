import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors, Images } from '../Theme';

const CloseButton = ({onPress}) => {
    return (
        <TouchableOpacity onPress={() => {onPress()}}>
            <View style={styles.closeView}>
                <Image style={styles.closeImage} source={Images.icClose} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    closeImage: {
        width: 24,
        height: 24,
    },
    closeView: {
        width: 40,
        height: 40,
        backgroundColor: Colors.black,
        // opacity: 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
        marginBottom: 5,
        borderRadius: 20
    }
});

export default CloseButton;