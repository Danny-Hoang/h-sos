import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts, Images, Strings } from '../../../Theme';

const strings = Strings.sos;

class Header extends Component {

    onClose(){
        const {navigation} = this.props;
        navigation.pop();
    }

    render() {
        const {name} = this.props;
        return (
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => { this.onClose() }}>
                    <View style={styles.closeView}>
                        <Image source={Images.icClose} style={styles.imageClose} />
                    </View>
                </TouchableOpacity>
                <View style={{ alignItems: 'center', flex: 1, marginRight: 65 }}>
                    <Text numberOfLines={2} style={styles.title}>{strings.title + name}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.coral
    },
    closeView: {
        height: 65,
        width: 65,
        justifyContent: "center",
        alignItems: "center",
    },
    imageClose: {
        width: 24,
        height: 24,
    },
    title: {
        fontFamily: Fonts.family.Medium,
        color: Colors.white,
        fontSize: 22,
        textAlign: 'center',
    }
})


export default Header;
