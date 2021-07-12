import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors, Fonts, Images, Strings } from '../../../../Theme';

class RowCardInfo extends Component {
    render() {
        const { title, content, onPress, imageValue } = this.props;
        return (
            <TouchableOpacity onPress={() => onPress()}>
                <View style={styles.container}>
                    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <Image source={imageValue} style={{ width: 28, height: 28 }} />
                            <Text style={styles.title}>{title}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <Text style={styles.content}>{content}</Text>
                            <Image style={styles.icon} source={Images.btnArrowRight} />
                        </View>
                    </View>
                    <View style={styles.underline} />

                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    underline: {
        backgroundColor: Colors.paleGrey,
        height: 1
    },
    title: {
        color: Colors.slateGrey,
        fontSize: 18,
        fontFamily: Fonts.family.Medium,
        marginLeft: 9
    },
    content: {
        color: Colors.black,
        fontSize: 18,
        fontFamily: Fonts.family.Regular,
        marginLeft: 20
    },
    icon: {
        width: 24,
        height: 24
    }
})

export default RowCardInfo;