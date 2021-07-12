import {SafeAreaView, StyleSheet, View} from "react-native"
import React from "react";
import {HeaderWithBack} from "../../../../Components";
import {Colors, Strings} from "../../../../Theme";

export default class OpenSourceLicense extends React.Component {

    render() {
        const { navigation } = this.props;
        return <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ paddingTop: 8, flex: 1}}>
                    <HeaderWithBack navigation={navigation} title={Strings.settingTab.aboutServiceDetail.openSource} />
                </View>
            </View>
        </SafeAreaView>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: Colors.athensGray,
    },
});