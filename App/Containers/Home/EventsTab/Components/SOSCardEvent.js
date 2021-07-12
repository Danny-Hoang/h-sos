import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PrimaryIcon from '../../../../Components/Icon';
import { Colors, Fonts, Images } from '../../../../Theme';
import moment from "moment";

class SOSCardEvent extends Component {
    state = {}
    render() {
        const {content, onPress} = this.props;
        return (
            <TouchableOpacity activeOpacity={0.6} onPress={()=>{onPress()}}>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <PrimaryIcon source={Images.icTxtSoS} />
                            <Text style={styles.title}>Pressed SOS</Text>
                        </View>
                        <PrimaryIcon source={Images.btnArrowRightW} />
                    </View>

                    <View style={styles.row}>
                    <Text numberOfLines={1} style={styles.content}>{content.device.deviceName}</Text>
                        <Text style={{ ...styles.content, fontSize: 15 }}>{moment(content.createdDate).format('LT')}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.coral,
        // marginBottom: 10,
        paddingHorizontal: 15,
        height: 85,
        justifyContent: 'space-evenly'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: Fonts.family.Bold,
        fontSize: 20,
        color: Colors.white,
        marginLeft: 10
    },
    content: {
        fontFamily: Fonts.family.Regular,
        fontSize: 18,
        color: Colors.white,
    }
})

export default SOSCardEvent;
