import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts, Metrics, Strings } from '../../../../Theme';

const strings = Strings.setProfile

const AgreeText = ({ onClickAgree, onClickPrivacy }) => {
    return (
        <Text style={styles.text}>
            {strings.titleAgree}
            <View style={{ flexDirection: 'row', justifyContent:'center', alignItems: "center", width: Metrics.screenWidth-40 }}>
                <TouchableOpacity onPress={() => { onClickAgree() }}>
                    <Text style={styles.clickText}>
                        {strings.userAgreement}
                    </Text>
                </TouchableOpacity>
                <Text style={styles.text}>
                    {"& "}
                </Text>
                <TouchableOpacity onPress={() => { onClickPrivacy() }}>
                    <Text style={styles.clickText}>
                        {strings.privacy}
                    </Text>
                </TouchableOpacity>
            </View>
        </Text>
    );
}

const styles = StyleSheet.create({
    clickText: {
        textDecorationLine: 'underline',
        fontSize: 16,
        color: Colors.brightBlue,
        fontFamily: Fonts.family.Bold,
    },
    text: {
        fontSize: 16,
        color: Colors.charcoalGrey,
        fontFamily: Fonts.family.Regular,
        textAlign: 'center',
        lineHeight:25
    }
})

export default AgreeText;