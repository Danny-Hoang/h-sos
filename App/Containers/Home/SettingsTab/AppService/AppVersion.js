import React, {Component} from 'react'
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {BottomPopup, HeaderWithBack, TextButton} from "../../../../Components";
import {Colors, Fonts, Strings} from "../../../../Theme";
import {RowAppNoti} from "../AppNotification/RowAppNoti";
import DeviceInfo from 'react-native-device-info';
import TermScreen from "../../../Auth/Term";

const strings = Strings.settingTab;

export class AppVersion extends Component{

    constructor(props) {
        super(props);
        this.state = {
            modalUpdateVisible: false
        }
    }

    render() {
        const { navigation, isLatest = false } = this.props;
        const { modalUpdateVisible } = this.state;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={{ paddingTop: 8, flex: 1}}>
                        <HeaderWithBack navigation={navigation} title={strings.aboutServiceDetail.appVersion} />
                        <RowAppNoti
                            name={strings.aboutServiceDetail.installedVersion}
                            value={"v" + DeviceInfo.getVersion()}
                        />
                        <View style={styles.borderView} />
                        {!isLatest && <View style={{ height: 20 }} />}

                        {!isLatest && <RowAppNoti
                            name={strings.aboutServiceDetail.latestVersion}
                            value={"v" + DeviceInfo.getVersion() + "." + 1}/>
                        }

                        {!isLatest && <View style={styles.borderView} />}

                        {!isLatest && (
                            <View style={styles.row}>
                                <Text style={styles.updateContent}>
                                    {Strings.aboutwatch.updateContent}
                                </Text>
                                <Text style={styles.updateMessage}>
                                    {Strings.aboutwatch.updateMessage + "..."}
                                </Text>
                                <TextButton
                                    style={styles.seeMore}
                                    onClick={() => {
                                        this.setState({ modalUpdateVisible: true });
                                    }}
                                >
                                    {Strings.aboutwatch.seeMore}
                                </TextButton>
                            </View>
                        )}
                    </View>

                    <View>
                        {!isLatest && (
                            <View style={{ paddingHorizontal: 20, marginBottom: 20}}>
                                <TextButton
                                    onClick={() => {}}
                                    style={{
                                        color: Colors.white,
                                        backgroundColor: Colors.coral,
                                    }}
                                >
                                    {Strings.aboutwatch.updateNow}
                                </TextButton>
                            </View>
                        )}
                    </View>

                    <BottomPopup
                        visible={modalUpdateVisible}
                        onRequestClose={() => {
                            this.setState({ modalUpdateVisible: false });
                        }}
                    >
                        <View style={styles.bottomView}>
                            <TermScreen
                                title={Strings.aboutwatch.updateContent}
                                content={Strings.aboutwatch.updateMessage + Strings.aboutwatch.updateMessage + Strings.aboutwatch.updateMessage}
                                onClose={() => {
                                    this.setState({ modalUpdateVisible: false });
                                }}
                            />
                        </View>
                    </BottomPopup>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: Colors.athensGray,
    },
    borderView: {
        backgroundColor: Colors.borderColorDateTime,
        height: 1,
        marginLeft: 20,
    },
    row: { paddingHorizontal: 20, backgroundColor: Colors.white },
    updateMessage: {
        color: Colors.charcoalGreyTwo,
        fontSize: Fonts.size.medium,
    },
    seeMore: {
        fontFamily: Fonts.family.Bold,
        fontSize: Fonts.size.medium,
        backgroundColor: Colors.white,
        color: Colors.brightBlue,
        alignSelf: "flex-end",
        textDecorationLine: 'underline'
    },
    updateContent: {
        fontSize: 17,
        color: Colors.darkGrey,
        paddingVertical: 15,
    },

});