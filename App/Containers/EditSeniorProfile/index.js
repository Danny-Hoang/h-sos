import React, {Component} from "react"
import HeaderWithBack from "../../Components/HeaderWithBack";
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors, Fonts, Images, Strings} from "../../Theme";
import {Row} from "./Components/row";
import {BottomPopup, Loading, PrimaryTextInput} from "../../Components";
import EditSeniorProfile from "./EditSeniorProfile";
import { connect } from "react-redux";
import { DevicesActions } from "../../Stores/Devices";
import {LoaderWrapper} from "../../Components/LoaderWrapper";

const strings = Strings.profile;

class SeniorProfile extends Component {

    constructor(props){
        super();

        this.state = {
            modalEditVisible: false,
            isShowPopupTwoButton: false,
            modalProfileVisible: false,
            modalVerifyVisible: false,
            modalChangeNumberVisible: false,
            isShowPopupChangeNumber: false,
            gender: "0",
            birthday: "1950.12.25",
            height: "170",
            weight: "85"
        };
    }

    editAction = () => {
        this.setState({
            modalProfileVisible: true,
        });
    };

    onSaveNewProfile = (userChange) => {
        const {device} = this.props;
        this.props.postDeviceUpdate(device.deviceId, userChange)
    };

    render() {
        const { navigation, device, loading } = this.props;
        const {
            modalProfileVisible,
            gender,
            birthday,
            height,
            weight
        } = this.state;
        return <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <HeaderWithBack navigation={navigation} title= {device.deviceName + "'s Profile"}/>
                    <TouchableOpacity onPress={() => this.editAction()}>
                        <Text style={styles.addText}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.avatar}>
                        <Image source={device.deviceImgUrl != null ? {uri: device.deviceImgUrl} : Images.icMaleUser} style={styles.image} />
                    </View>

                    <View style={styles.col}>
                        <Row
                            name={strings.name}
                            value={device.deviceName}
                        />
                        <Row
                            name={strings.number}
                            value={device.mobile}
                        />
                        <Row
                            name={strings.address}
                            value={device.address}
                        />
                        <Row
                            name={strings.gender}
                            value={gender === "0" ? "Male" : "Female"}
                        />
                        <Row
                            name={strings.birth}
                            value={birthday}
                        />
                        <Row
                            name={strings.height}
                            value={height}
                            isSub={true}
                            sub={"CM"}
                        />
                        <Row
                            name={strings.weight}
                            value={weight}
                            isSub={true}
                            sub={"KG"}
                        />
                    </View>

                </ScrollView>

                <BottomPopup
                    visible={modalProfileVisible}
                    onRequestClose={() => {
                        this.setState({ modalProfileVisible: false });
                    }}
                >
                    <View style={styles.bottomView}>
                        <EditSeniorProfile
                            name={device.deviceName}
                            url={device.deviceImgUrl}
                            number={device.mobile}
                            address={device.address}
                            gender={gender}
                            birthday={birthday}
                            height={height}
                            weight={weight}
                            onClose={() => {
                                this.setState({ modalProfileVisible: false });
                            }}
                            onSave={(userChange) => {
                                this.onSaveNewProfile(userChange);
                            }}
                        />
                    </View>
                </BottomPopup>
                {loading && (<LoaderWrapper>
                    <Loading />
                </LoaderWrapper>)}
            </View>
        </SafeAreaView>
    }
}

const mapStateToProps = ({ auth: { token, data }, userDevices: { device, emergencyMessages, loading = false, error } }) => {
	return {
		error,
		loading,
		token,
		device,
		emergencyMessages,
		userInfo: data
	}
}
const mapDispatchToProps = (dispatch) => ({
	postDeviceUpdate: (deviceId, userInfo) => dispatch(DevicesActions.postDeviceUpdate(deviceId, userInfo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SeniorProfile)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: Colors.athensGray,
    },

    header: {
        paddingTop: 8,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    noCarerText: {
        fontSize: 20,
        fontFamily: Fonts.family.Regular,
        color: Colors.slateGrey
    },
    addText: {
        fontSize: 20,
        fontFamily: Fonts.family.Medium,
        color: Colors.lightishBlue,
    },
    bottomView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22,
    },
    avatar: {
        width: 90,
        height: 90,
        marginTop: 30,
        alignSelf: 'center',
        marginBottom: 20
    },
    image: {
        height: 90,
        width: 90,
        borderRadius: 45,
    },
    col: {
        backgroundColor: Colors.white,
        height: 420,
        marginTop: 20,
    },
});
