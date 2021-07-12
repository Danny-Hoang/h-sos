import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PrimaryIcon from '../../../../Components/Icon';
import { Colors, Fonts, Images } from '../../../../Theme';

class SOSCard extends Component {
    state = {}
    render() {
        const {onPress, deviceName, time, resolved, helper = "Someone"} = this.props;
        return (
            <TouchableOpacity activeOpacity={0.6} onPress={()=>{onPress()}}>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <PrimaryIcon source={Images.icTxtSoS} />
                            <Text style={styles.title}>{deviceName} Pressed SOS</Text>
                        </View>
                        <PrimaryIcon source={Images.btnArrowRightW} />
                    </View>

                    <View style={styles.row}>
                        {resolved ? <Text style={styles.content}>{helper} is taking care now</Text>
                        : <Text style={styles.content}>No one has responded</Text>}
                        <Text style={{ ...styles.content, fontSize: 15 }}>{time}</Text>
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
        minHeight: 85,
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

export default SOSCard;
