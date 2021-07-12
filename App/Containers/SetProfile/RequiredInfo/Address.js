import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback, Text, TouchableOpacity, Image } from 'react-native';
import { Colors, Fonts, Images, Strings, Metrics } from '../../../Theme';
import { Popup, PrimaryTextInput, TextButton } from '../../../Components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Constants from '../../../Constants';
import Configs from "../../../Configs";
import CenterPopup from '../../../Components/CenterPopup';

const strings = Strings.address

class Address extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            city: '',
            state: '',
            isShowPopupOneButton: false
        }
    }

    static getDerivedStateFromProps(nextProps, currentState) {
        if (nextProps.selectedAddress !== null && nextProps.selectedAddress.length > 0) {
            return {
                address: nextProps.selectedAddress,
            }
        }
        return null
    }

    onClickCheckLocation() {
        const { address, city, state } = this.state
        fetch(
            Configs.MAP_URL +
            address +
            "+" +
            city +
            "+" +
            state +
            "&key=" +
            Configs.MAP_KEY
        )
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === Configs.HTTP_OK) {
                    let region = {
                        latitude: responseJson.results[0].geometry.location.lat,
                        longitude: responseJson.results[0].geometry.location.lng,
                    }
                    let userLocation = responseJson.results[0].formatted_address
                    this.props.onCheckLocation(region, userLocation)
                } else {
                    this.setState({ isShowPopupOneButton: true })
                }
            });

    }

    findMyLocation = () => {
        this.props.onFindLocation()
    }

    onChange(key, value) {
        this.setState({
            [key]: value
        })
    }

    render() {
        const { onClose, type = Constants.TYPE_ADD_BOUND } = this.props
        const { address, city, state, isShowPopupOneButton } = this.state
        const isDisable = address.length === 0 || city.length === 0 || state.length === 0
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { onClose() }}>
                        <View style={styles.closeView}>
                            <Image source={Images.icCloseBlack} style={styles.imageClose} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.title}>{type === Constants.TYPE_ADD_ADDRESS ? strings.title :
                        Strings.geofencing.titleAddBound}</Text>
                </View>
                <KeyboardAwareScrollView
                    extraScrollHeight={40}
                    keyboardShouldPersistTaps="handled"
                    style={{
                        flex: 1,
                        padding: 20,

                    }}
                    contentContainerStyle={{ flexGrow: 1 }}>

                    <View style={{ justifyContent: 'space-between', flex: 1 }}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                            <View style={styles.containerContent}>
                                <TouchableOpacity style={styles.locationButton} onPress={(e) => this.findMyLocation()}>
                                    <Image source={Images.icLocation} style={{ height: 24, width: 24 }} />
                                    <Text style={styles.textLocationButton}>{strings.buttonFindLocation}</Text>
                                </TouchableOpacity>
                                <View style={styles.column}>
                                    <Text style={styles.fieldText}>{strings.titleAddress}</Text>
                                    <PrimaryTextInput
                                        style={{ underlineColorAndroid: Colors.transparent, fontFamily: Fonts.family.Bold }}
                                        text={address}
                                        onChange={text => this.onChange("address", text)} />
                                </View>

                                <View style={styles.column}>
                                    <Text style={styles.fieldText}>{strings.city}</Text>
                                    <PrimaryTextInput
                                        style={{ underlineColorAndroid: Colors.transparent, fontFamily: Fonts.family.Regular }}
                                        text={city}
                                        onChange={text => this.onChange("city", text)} />
                                </View>

                                <View style={styles.column}>
                                    <Text style={styles.fieldText}>{strings.state}</Text>
                                    <PrimaryTextInput
                                        style={{ underlineColorAndroid: Colors.transparent, fontFamily: Fonts.family.Regular }}
                                        text={state}
                                        onChange={text => this.onChange("state", text)} />
                                </View>
                            </View>

                        </TouchableWithoutFeedback>
                        <TextButton
                            disabled={isDisable}
                            onClick={this.onClickCheckLocation.bind(this)}>{strings.buttonCheckLocation}</TextButton>
                    </View>

                </KeyboardAwareScrollView>

                <CenterPopup
                    visible={isShowPopupOneButton}
                    doneAction={() => {this.setState({isShowPopupOneButton: false})}}
                    doneTitle={Strings.common.popup.ok}
                    onRequestClose={() => {this.setState({isShowPopupOneButton: false })}}
                    title={strings.popup.title}
                    content={strings.popup.message} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight - 50,
        backgroundColor: Colors.white,
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    column: {
        height: 90,
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        paddingTop: 20,
        borderBottomColor: Colors.borderColorInput
    },
    fieldText: {
        color: Colors.darkGrey,
        fontSize: 16
    },
    locationButton: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: Colors.borderColor,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 34
    },
    textLocationButton: {
        fontFamily: Fonts.family.Bold,
        fontSize: Fonts.size.h3,
        color: Colors.darkBlueGrey,
        marginLeft: 8
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageClose: {
        width: 24,
        height: 24
    },
    closeView: {
        height: 65,
        width: 65,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: Fonts.family.Medium,
        fontSize: 22
    }

});

export default Address;
