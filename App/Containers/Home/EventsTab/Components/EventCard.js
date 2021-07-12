import React, { Component } from 'react';
import { default as styled, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PrimaryIcon from '../../../../Components/Icon';
import { Colors, Fonts, Images, Strings } from '../../../../Theme';
import Constants from "../../../../Constants";
import moment from "moment";
import NavigationService from '../../../../Services/NavigationService';
import SOSCardEvent from './SOSCardEvent';
import { RouterName } from '../../../../Navigator/RouteName';

const TYPE = Constants.EVENT_TYPES;
const ACTION = Constants.EVENT_ACTION;
const LEVEL = Constants.TYPE_LEVEL;
const strings = Strings.event;

class EventCard extends Component {
    renderFirstElement(content) {
        switch (content.eventType) {
            case TYPE.SOS:
                return <View style={styles.row}>
                    <View style={styles.row2}>
                        <Image source={Images.icEventSOS} style={{ height: 24, width: 24 }} />
                        <Text style={{ ...styles.title, textDecorationLine: 'line-through' }}>{strings.pressSOS}</Text>
                    </View>
                    <PrimaryIcon source={Images.btnArrowRight} />
                </View>
            case TYPE.FALL:
                return <View style={styles.row}>
                    <View style={styles.row2}>
                        <Image source={Images.icEventFall} style={{ height: 24, width: 24 }} />
                        <Text style={styles.title}>{strings.detectFall}</Text>
                    </View>
                    <PrimaryIcon source={Images.btnArrowRight} />
                </View>
            case TYPE.LOW_BATTERY:
                return <View style={styles.row}>
                    <View style={styles.row2}>
                        <Image source={Images.icEventLowBattery} style={{ height: 24, width: 24 }} />
                        <Text style={styles.title}>{strings.lowBattery}</Text>
                    </View>
                </View>
            case TYPE.PUT_ON:
                return <View style={styles.row}>
                    <View style={styles.row2}>
                        <Image source={Images.icEventWatch} style={{ height: 24, width: 24 }} />
                        <Text style={styles.title}>{strings.takeOn}</Text>
                    </View>
                </View>
            case TYPE.REMOVAL:
                return <View style={styles.row}>
                    <View style={styles.row2}>
                        <Image source={Images.icEventWatch} style={{ height: 24, width: 24 }} />
                        <Text style={styles.title}>{strings.takeOff}</Text>
                    </View>
                </View>
            case TYPE.CHARGE_BATTERY:
                return <View style={styles.row}>
                    <View style={styles.row2}>
                        <Image source={Images.icEventLowBattery} style={{ height: 24, width: 24 }} />
                        <Text style={styles.title}>{strings.charge}</Text>
                    </View>
                </View>
            case TYPE.INACTIVITY:
                return <View style={styles.row}>
                    <View style={styles.row2}>
                        <Image source={Images.icEventWatch} style={{ height: 24, width: 24 }} />
                        <Text style={styles.title}>"No activity"</Text>
                    </View>
                </View>
            default:
                return <View style={styles.row}>
                    <View style={styles.row2}>
                        <Image source={Images.icEventWatch} style={{ height: 24, width: 24 }} />
                        <Text style={styles.title}>Not defined yet</Text>
                    </View>
                </View>
        }
    }

    renderSecondElement(content) {
        var isResolve = content.resolved
        if(content.cancel){
            isResolve = false
        }
        switch (content.eventType) {
            case TYPE.SOS:
                return <View style={styles.row}>
                    <View style={{ ...styles.row, paddingLeft: 27 }}>
                        <Text numberOfLines={1} style={styles.name}>{content.device.deviceName}</Text>
                        <View style={styles.row3}>
                            <Image style={{ width: 14, height: 14 }} source={isResolve ? Images.icCheckG : Images.icCheckR} />
                            <Text style={isResolve ? styles.status_resolved : styles.status_cancelled}>{isResolve ? strings.action.resolved : strings.action.cancelled}</Text>
                        </View>
                    </View>
                    <Text style={{ ...styles.time, fontSize: 15 }}>{moment(content.createdDate).format('LT')}</Text>
                </View>
            case TYPE.REMOVAL:
                return <View style={styles.row}>
                    <View style={{ ...styles.row, paddingLeft: 27 }}>
                        <Text numberOfLines={1} style={styles.name}>{content.device.deviceName}</Text>
                    </View>
                    <Text style={{ ...styles.time, fontSize: 15 }}>{moment(content.createdDate).format('LT')}</Text>
                </View>
            default:
                return <View style={styles.row}>
                    <Text style={{ ...styles.name, marginLeft: 30 }}>{content.device.deviceName}</Text>
                    <Text style={{ ...styles.time, fontSize: 15 }}>{moment(content.createdDate).format('LT')}</Text>
                </View>
        }
        // return null
    }

    renderNormarlElement(content) {
        return <TouchableOpacity activeOpacity={0.9} onPress={() => {
            if(content.eventType == TYPE.SOS){
                NavigationService.pushToNewScreen(RouterName.SOS, { activityId: content.activityId })
            }
        }}>
            <View style={styles.container}>
                {this.renderFirstElement(content)}
                {this.renderSecondElement(content)}
            </View>
        </TouchableOpacity>
    }

    render() {
        const { content } = this.props
        const isNeedRed = content.eventType == TYPE.SOS && content.typeLevel == LEVEL.EMERGENCY && content.cancel == false && content.resolved == false
        return (
            !isNeedRed
                ? this.renderNormarlElement(content)
                : <SOSCardEvent onPress={() => { NavigationService.pushToNewScreen(RouterName.SOS, { activityId: content.activityId }) }} content={content} />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        // marginBottom: 10,
        paddingHorizontal: 15,
        height: 85,
        justifyContent: 'space-evenly'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    row3: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 88
    },
    title: {
        fontFamily: Fonts.family.Medium,
        fontSize: 18,
        color: Colors.darkGrey,
        marginLeft: 7,
    },
    name: {
        fontFamily: Fonts.family.Regular,
        fontSize: 18,
        color: Colors.darkGrey,
        width: 90,
        marginLeft: 5
    },
    status_resolved: {
        fontFamily: Fonts.family.Medium,
        fontSize: 16,
        color: Colors.green,
    },
    status_cancelled: {
        fontFamily: Fonts.family.Medium,
        fontSize: 16,
        color: Colors.coral,
    },
    time: {
        fontFamily: Fonts.family.Regular,
        fontSize: 15,
        color: Colors.coolGrey,
    },


})

export default EventCard;
