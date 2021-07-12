
import React, {Component} from 'react'
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {HeaderWithBack} from "../../../../Components";
import {Colors, Fonts, Images, Strings} from "../../../../Theme";
import RowItem from "../../../../Components/RowItem";
import NavigationService from "../../../../Services/NavigationService";
import { RouterName } from '../../../../Navigator/RouteName';

const strings = Strings.settingTab;

export class AppService extends Component {

    render() {
        const { navigation } = this.props;
        return (<SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ paddingTop: 8 }}>
                    <HeaderWithBack navigation={navigation} title={strings.aboutService} />
                </View>
                <ScrollView>
                    <TouchableOpacity onPress={() => NavigationService.pushToNewScreen(RouterName.AppVersion)}>
                        <View style={styles.item}>
                            <Text style={styles.textItem}>{strings.aboutServiceDetail.appVersion}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={Images.icNew} style={styles.imageNew} />
                                <Image source={Images.btnArrowRight} style={styles.imageItem} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.borderView} />

                    <View style={styles.col}>
                        <RowItem
                            title={strings.aboutServiceDetail.openSource}
                            onPress={ () => { NavigationService.pushToNewScreen(RouterName.OpenSourceLicense) } }
                        />
                        <View style={styles.borderView} />
                        <RowItem
                            title={strings.aboutServiceDetail.agreement}
                            onPress={ () => { NavigationService.pushToNewScreen(RouterName.UserAgreement)} }
                        />
                        <View style={styles.borderView} />
                        <RowItem
                            title={strings.aboutServiceDetail.privacy}
                            onPress={ () => {NavigationService.pushToNewScreen(RouterName.PrivacyPolicy)} }
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        height: 60,
        paddingLeft: 20,
        paddingRight: 13,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.white,
    },
    textItem: {
        fontFamily: Fonts.family.Medium,
        fontSize: Fonts.size.regular,
        color: Colors.darkGrey,
    },
    imageNew: {
        height: 20,
        width: 20,
        alignSelf: "center",
    },
    imageItem: {
        height: 24,
        width: 24,
        alignSelf: "center",
    },
    borderView: {
        backgroundColor: Colors.borderColorDateTime,
        height: 1,
        marginLeft: 20,
    },
    col: {
        backgroundColor: Colors.white,
        height: 180,
        marginTop: 20,
    },
});