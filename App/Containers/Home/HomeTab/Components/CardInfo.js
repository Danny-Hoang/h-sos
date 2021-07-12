import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts, Images, Strings } from '../../../../Theme';
import RowCardInfo from './RowCardInfo';
import NavigationService from "../../../../Services/NavigationService";
import HealthItem from './HealthItem';
import { RouterName } from '../../../../Navigator/RouteName';
import Battery from '../../../../Components/Battery';
import Constants from "../../../../Constants";

const strings = Strings.home
const TYPE = Constants.EVENT_TYPES;

class CardInfo extends Component {
    state = {}

    onLocation = () => {
        NavigationService.pushToNewScreen(RouterName.SeniorLocation);
    }

    onHealth = () => {
    }

    onReminder = () => { }

    render() {
        const { item, onPressMore, onPressSummary } = this.props
        let isMain = true
        const hour = Math.floor(item.sleep/60);
        const minutes = item.sleep%60;
        const sleep = (hour == 0 ? "" : (hour + "h")) +( minutes == 0 ? "" : (minutes + "m"))
        const wear = item.status[0] === TYPE.REMOVAL ? strings.takenOff : strings.wearing;
        return (
            <View style={styles.container}>
                <View style={{ ...styles.header }}>
                    <Image style={styles.image} source={ item.deviceImgUrl === null ? Images.icMaleUser : {uri: item.deviceImgUrl}} />
                    <View style={{ padding: 10, flex: 1, justifyContent: 'space-around' }}>
                        <View style={styles.sectionName}>
                            <View style={{...styles.main, borderColor: isMain ? Colors.lightishBlue : Colors.charcoalGreyTwo,}}>
                                <Text style={{ ...styles.role, color: isMain ? Colors.lightishBlue : Colors.charcoalGreyTwo }}>
                                    {isMain ? strings.main : strings.sub}
                                </Text>
                            </View>
                            <Text numberOfLines={1} style={styles.name}>{item.deviceName}</Text>
                            <TouchableOpacity
                                style={{ alignItems: "flex-end", height: 40, width: 40, justifyContent: 'center'}}
                                onPress={() => {
                                    if (isMain) {
                                        onPressMore();
                                        // NavigationService.pushToNewScreen(RouterName.MoreSetting)
                                    }
                                }}>
                                <Image style={styles.nextIcon} source={Images.btnArrowMore} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ ...styles.statusWatch, marginRight: 10 }}>{wear}</Text>
                                {/* <Image style={styles.nextIcon} source={Images.icBattery} /> */}
                                <Battery percent={item.battery}/>
                                <Text style={{ ...styles.statusWatch, marginRight: 10 }}>{item.battery}%</Text>
                            </View>

                        </View>
                    </View>
                </View>

                <RowCardInfo
                    onPress={() => { this.onLocation() }}
                    title={strings.location}
                    content='Out'
                    imageValue = {Images.icHomeLocation}
                />
                <RowCardInfo
                    onPress={() => { this.onReminder() }}
                    title={strings.pills}
                    content='10:00 PM'
                    imageValue = {Images.icHomeReminder}
                />
                <TouchableOpacity onPress={onPressSummary}>
                <View style={{flexDirection: "row", height: 115, flex: 1, alignItems: 'center'}}>
                    <HealthItem image = {Images.icHealthStep} value={item.steps} unit={"steps"}/>
                    <View style={{backgroundColor: Colors.athensGray, width: 1, height: 70}}/>
                    <HealthItem image = {Images.icHealthHeart} value={item.healthRate} unit={"bmp"}/>
                    <View style={{backgroundColor: Colors.athensGray, width: 1, height: 70}}/>
                    <HealthItem image = {Images.icHealthSleep} value={sleep}/>
                </View>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.borderColorDateTime,
        shadowColor: Colors.borderColorDateTime,
        margin: 5,
        elevation: 4,
        shadowOpacity: 2
    },
    header: {
        flexDirection: 'row',
        borderRadius: 8
    },
    image: {
        aspectRatio: 1,
        // backgroundColor: '#343421',
        height: 64,
        width: 64,
        borderRadius: 32,
        margin: 10
    },
    main: {
        backgroundColor: '#ffffff80',
        marginRight: 8,
        paddingHorizontal: 3,
        borderRadius: 4,
        borderWidth: 1 },
    name: {
        color: Colors.darkGreyTwo,
        fontSize: 20,
        fontFamily: Fonts.family.Bold,
        fontWeight: "500",
        flex:1
    },
    statusWatch: {
        fontSize: 18,
        color: Colors.darkGrey,
        fontFamily: Fonts.family.Regular,
    },
    nextIcon: {
        width: 24,
        height: 24,
    },
    sectionName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    role: {
        fontFamily: Fonts.family.Medium,
        fontSize: 16
    }

})

export default CardInfo;
