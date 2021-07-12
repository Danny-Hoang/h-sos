import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts, Images } from '../../../../Theme';

class CountryPhoneRow extends Component {
    render() {
        const { item, onPress, style } = this.props;
        return (
            <TouchableOpacity onPress={onPress}>
                <View>
                    <View style={styles.container}>
                        <View style={styles.countryInfo}>
                            <Image style={styles.image} source={item.flag} />
                            <Text style={styles.countryName}>{item.title}</Text>
                        </View>
                        <View>
                            <Text style={styles.countryCode}>{item.code}</Text>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    countryInfo: {
        flexDirection: 'row'
    },
    countryName: {
        color: Colors.darkGrey,
        fontFamily: Fonts.family.Medium,
        fontSize: 20
    },
    countryCode: {
        color: Colors.darkGrey,
        fontFamily: Fonts.family.Regular,
        fontSize: 20,
        marginRight: 20
    },
    image: {
        width: 30,
        height: 30,
        marginLeft: 20,
        marginRight: 15
    },
    underline: {
        backgroundColor: Colors.paleGrey,
        height: 1
    }
})

export default CountryPhoneRow;