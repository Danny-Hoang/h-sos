import {Colors, Fonts, Strings} from "../../../../Theme";
import React, {Component} from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import {HeaderWithBack} from "../../../../Components";
import {RowAppNoti} from "./RowAppNoti";
import {Switch} from "react-native-switch";

const strings = Strings.settingTab;

export default class AppNotification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sound: true,
            vibration: true
        }
    }

    render() {
        const { navigation } = this.props;
        const { sound, vibration } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ paddingTop: 8 }}>
                        <HeaderWithBack navigation={navigation} title={strings.appNotification} />
                    </View>
                    <ScrollView>

                        <View style={styles.col}>
                            <View style={styles.row1}>
                                <Text
                                    style={{
                                        fontFamily: Fonts.family.Bold,
                                        fontSize: Fonts.size.regular,
                                        color: Colors.darkGrey,
                                    }}
                                >
                                    {strings.appNotificationSetting.sound}
                                </Text>

                                <Switch
                                    circleSize={30}
                                    value={sound}
                                    backgroundActive={Colors.red}
                                    backgroundInactive={Colors.lightBlueGrey}
                                    activeText={""}
                                    inActiveText={""}
                                    disabled={false}
                                    circleActiveColor={Colors.white}
                                    circleInActiveColor={Colors.white}
                                    onValueChange={(val) => this.setState({ sound: val })}
                                    circleBorderWidth={2}
                                    innerCircleStyle={{
                                        borderColor: sound
                                            ? Colors.red
                                            : Colors.lightBlueGrey,
                                    }}
                                />
                            </View>
                            <View style={styles.borderView} />
                            <View style={styles.row1}>
                                <Text
                                    style={{
                                        fontFamily: Fonts.family.Bold,
                                        fontSize: Fonts.size.regular,
                                        color: Colors.darkGrey,
                                    }}
                                >
                                    {strings.appNotificationSetting.vibration}
                                </Text>

                                <Switch
                                    circleSize={30}
                                    value={vibration}
                                    backgroundActive={Colors.red}
                                    backgroundInactive={Colors.lightBlueGrey}
                                    activeText={""}
                                    inActiveText={""}
                                    disabled={false}
                                    circleActiveColor={Colors.white}
                                    circleInActiveColor={Colors.white}
                                    onValueChange={(val) => this.setState({ vibration: val })}
                                    circleBorderWidth={2}
                                    innerCircleStyle={{
                                        borderColor: vibration
                                            ? Colors.red
                                            : Colors.lightBlueGrey,
                                    }}
                                />
                            </View>
                        </View>

                        <View style={styles.col2}>
                            <RowAppNoti
                                name={strings.appNotificationSetting.sos}
                                value={strings.appNotificationSetting.soundOption}
                            />
                            <View style={styles.borderView} />
                            <RowAppNoti
                                name={strings.appNotificationSetting.fall}
                                value={strings.appNotificationSetting.off}
                            />
                            <View style={styles.borderView} />
                            <RowAppNoti
                                name={strings.appNotificationSetting.geo}
                                value={strings.appNotificationSetting.on}
                            />
                            <View style={styles.borderView} />
                            <RowAppNoti
                                name={strings.appNotificationSetting.inactivity}
                                value={strings.appNotificationSetting.on}
                            />
                            <View style={styles.borderView} />
                            <RowAppNoti
                                name={strings.appNotificationSetting.battery}
                                value={strings.appNotificationSetting.soundOption}
                            />
                            <View style={styles.borderView} />
                            <RowAppNoti
                                name={strings.appNotificationSetting.reminder}
                                value={strings.appNotificationSetting.off}
                            />
                            <View style={styles.borderView} />
                            <RowAppNoti
                                name={strings.appNotificationSetting.takenOff}
                                value={strings.appNotificationSetting.off}
                            />
                            <View style={styles.borderView} />
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: Colors.athensGray,
    },
    col: {
        backgroundColor: Colors.white,
        height: 120,
        marginTop: 20,
    },
    col2: {
        backgroundColor: Colors.white,
        height: 420,
        marginTop: 20,
    },
    borderView: {
        backgroundColor: Colors.borderColorDateTime,
        height: 1,
        marginLeft: 20,
    },
    row1: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60,
        alignItems: "center",
        paddingRight: 3,
        marginLeft: 20,
        marginRight: 20
    },
});