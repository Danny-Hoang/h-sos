import React, { Component } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Switch } from 'react-native-switch';
import { BottomPopup, HeaderWithBack } from '../../Components';
import { Colors, Fonts, Images, Strings } from '../../Theme';
import { SensorMode } from '../../Utils';
import SensorModePopup from './Components/SensorModePopup';

const strings = Strings.fallDetection

class FallDetection extends Component {

    state = {
        isEnabled: false,
        sensorMode: SensorMode.Medium,
        sensorModeVisible: false
    }

    toggleSwitch() {
        this.setState({
            isEnabled: !this.state.isEnabled
        })
    }

    render() {
        const { navigation } = this.props;
        const { isEnabled, sensorModeVisible, sensorMode } = this.state;
        return <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ paddingTop: 8 }}>
                    <HeaderWithBack navigation={navigation} title={strings.title} />
                </View>
                <ScrollView>
                    <View style={styles.col}>
                        <TouchableOpacity onPress={() => this.toggleSwitch()}>
                            <View style={styles.item}>
                                <Text style={styles.textItem}>{strings.monitoring}</Text>
                                <Switch
                                    circleSize={30}
                                    value={isEnabled}
                                    backgroundActive={Colors.red}
                                    backgroundInactive={Colors.lightBlueGrey}
                                    activeText={""}
                                    inActiveText={""}
                                    disabled={false}
                                    circleActiveColor={Colors.white}
                                    circleInActiveColor={Colors.white}
                                    onValueChange={(value) => { this.setState({ isEnabled: value }) }}
                                    circleBorderWidth={2}
                                    innerCircleStyle={{
                                        borderColor: isEnabled
                                            ? Colors.red
                                            : Colors.lightBlueGrey,
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.borderView} />
                        <TouchableOpacity onPress={() => this.setState({ sensorModeVisible: true })}>
                            <View style={styles.item}>
                                <Text style={styles.textItem}>{strings.sensorSensitivity}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.sensorMode}>{sensorMode}</Text>
                                    <Image source={Images.btnArrowRight} style={styles.imageItem} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <BottomPopup
                    visible={sensorModeVisible}
                    onRequestClose={() => {
                        this.setState({ sensorModeVisible: false });
                    }}>
                    <View>
                        <SensorModePopup
                            onClose={() => {
                                this.setState({ sensorModeVisible: false });
                            }}
                            onPress={(value) => {
                                this.setState({ sensorModeVisible: false, sensorMode: value });
                            }}
                        />
                    </View>
                </BottomPopup>
            </View>
        </SafeAreaView>
    }
}

const styles = StyleSheet.create({
    col: {
        backgroundColor: Colors.white,
        height: 120,
        marginTop: 20,
    },
    borderView: {
        backgroundColor: Colors.borderColorDateTime,
        height: 1,
        marginLeft: 20,
    },
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
    imageItem: {
        height: 24,
        width: 24,
        alignSelf: "center",
    },
    sensorMode: {
        fontSize: 18,
        color: Colors.slateGrey
    }
})

export default FallDetection;