import React, { Component } from 'react'
import { View, SafeAreaView, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { HeaderWithBack } from '../../../../Components';
import { RouterName } from '../../../../Navigator/RouteName';
import NavigationService from '../../../../Services/NavigationService';
import { Colors, Fonts, Images, Metrics } from '../../../../Theme';

class Summary extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <HeaderWithBack
                        navigation={navigation}
                        title="Summary"
                    />

                    <ScrollView>
                        <TouchableOpacity activeOpacity={1}
                            onPress={() => { NavigationService.pushToNewScreen(RouterName.DetailSummary, { type: "Activity" }) }}>
                            <View style={styles.titleSection}>
                                <Text style={styles.textSection}>Activity</Text>
                                <Image style={styles.icon} source={Images.btnArrowRight} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.contentSection}>
                            <View style={styles.rowContent}>
                                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                    <Image style={styles.icon} source={Images.icHealthStep} />
                                    <Text style={styles.rowTitle}>Floor</Text>
                                </View>
                                <Text style={styles.rowValue}>7 floors</Text>
                            </View>
                            <View style={styles.sperate} />
                            <View style={styles.rowContent}>
                                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                    <Image style={styles.icon} source={Images.icHealthFloor} />
                                    <Text style={styles.rowTitle}>Step</Text>
                                </View>
                                <Text style={styles.rowValue}>111 steps</Text>
                            </View>
                            <View style={styles.sperate} />
                            <View style={styles.rowContent}>
                                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                    <Image style={styles.icon} source={Images.icHealthDistance} />
                                    <Text style={styles.rowTitle}>Distance</Text>
                                </View>
                                <Text style={styles.rowValue}>3 km</Text>
                            </View>
                        </View>

                        <View style={{ height: 20 }} />

                        <TouchableOpacity activeOpacity={1}
                            onPress={() => { NavigationService.pushToNewScreen(RouterName.DetailSummary, { type: "Health" }) }}>
                            <View style={styles.titleSection}>
                                <Text style={styles.textSection}>Health</Text>
                                <Image style={styles.icon} source={Images.btnArrowRight} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.contentSection}>
                            <View style={styles.rowContent}>
                                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                    <Image style={styles.icon} source={Images.icHealthHeart} />
                                    <Text style={styles.rowTitle}>Heart Rate</Text>
                                </View>
                                <Text style={styles.rowValue}>52 bmp</Text>
                            </View>
                            <View style={{ ...styles.sperate, height: 0.5 }} />
                            <View style={styles.rowContent}>
                                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                    <Image style={styles.icon} source={Images.icHealthVariabi} />
                                    <Text style={styles.rowTitle}>HR Variability</Text>
                                </View>
                                <Text style={styles.rowValue}>50 ms</Text>
                            </View>
                            <View style={styles.sperate} />
                            <View style={styles.rowContent}>
                                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                    <Image style={styles.icon} source={Images.icHealthBreath} />
                                    <Text style={styles.rowTitle}>Breathing</Text>
                                </View>
                                <Text style={styles.rowValue}>13 times</Text>
                            </View>
                            <View style={styles.sperate} />
                            <View style={styles.rowContent}>
                                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                    <Image style={styles.icon} source={Images.icHealthSpo} />
                                    <Text style={styles.rowTitle}>Blood Oxygen</Text>
                                </View>
                                <Text style={styles.rowValue}>95%</Text>
                            </View>
                        </View>

                        <View style={{ height: 20 }} />

                        <TouchableOpacity activeOpacity={1}
                            onPress={() => { NavigationService.pushToNewScreen(RouterName.DetailSummary, { type: "Sleep" }) }}>
                            <View style={styles.titleSection}>
                                <Text style={styles.textSection}>Sleep</Text>
                                <Image style={styles.icon} source={Images.btnArrowRight} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.contentSection}>
                            <View style={styles.rowContent}>
                                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                    <Image style={styles.icon} source={Images.icHealthSleep} />
                                    <Text style={styles.rowTitle}>Sleep Duration</Text>
                                </View>
                                <Text style={styles.rowValue}>8h 30m</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight - 50,
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    titleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
    },
    textSection: {
        color: "#333435",
        fontSize: 20,
        fontFamily: Fonts.family.Regular,
        fontWeight: "500"
    },
    contentSection: {
        backgroundColor: Colors.white,
        margin: 10,
        padding: 15,
        borderRadius: 8
    },
    rowContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    },
    rowTitle: {
        color: "#64696E",
        fontSize: 18,
        fontFamily: Fonts.family.Regular,
        marginLeft: 15
    },
    rowValue: {
        color: "#333435",
        fontSize: 16,
        fontFamily: Fonts.family.Regular,
        marginLeft: 15,
        fontWeight: '500'
    },
    icon: {
        width: 24,
        height: 24
    },
    sperate: {
        height: 0.25,
        backgroundColor: Colors.coolGrey,
        marginVertical: 15
    }
});

export default Summary;