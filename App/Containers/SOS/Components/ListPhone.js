import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Fonts, Images, Metrics, Strings } from '../../../Theme';

const strings = Strings.sos.phone;

class ListPhone extends Component {
    render() {
        const { onPress, onClose, phoneNumber, userName } = this.props;
        return <View style={styles.scrollableModal}>
            <TouchableOpacity
                onPress={onClose}>
                <View style={styles.closeView}>
                    <Image style={styles.closeImage} source={Images.icClose} />
                </View>
            </TouchableOpacity>

            <View style={styles.list}>
                <TouchableOpacity
                    onPress={() => {
                        onPress(phoneNumber);
                    }}>
                    <View style={styles.row}>
                        <Text style={styles.text}>{strings.call + "hvn001"}</Text>
                    </View>
                    <View style={styles.underline} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        onPress("911");
                    }}>
                    <View style={styles.row}>
                        <Text style={styles.text}>{strings.call_police}</Text>
                    </View>
                    <View style={styles.underline} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        onPress("911");
                    }}>
                    <View style={styles.row}>
                        <Text style={styles.text}>{strings.call_ambulance}</Text>
                    </View>
                    <View style={styles.underline} />
                </TouchableOpacity>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    scrollableModal: {
        height: 260,
        width: Metrics.screenWidth
    },
    list: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        flex: 1
    },
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
    },
    text: {
        fontSize: 20,
        fontFamily: Fonts.family.Medium,
        color: Colors.darkGrey
    },
    underline: {
        backgroundColor: Colors.paleGrey,
        height: 1
    },
    row: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ListPhone;