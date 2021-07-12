import React, { Component } from 'react';
import { View, StyleSheet, Keyboard, TouchableWithoutFeedback, Text, BackHandler } from 'react-native';
import { Colors, Images, Strings } from '../../../Theme';
import { NameInput, Avatar, ChoosePhotoPopup, PrimaryTextInput, HeaderWithBack, TextButton, BottomPopup } from '../../../Components';
import NavigationService from '../../../Services/NavigationService';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Address from './Address';
import Map from './Map';
import Constants from '../../../Constants';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { RouterName } from '../../../Navigator/RouteName';
import AuthActions from "../../../Stores/Auth";
import {DevicesActions} from "../../../Stores/Devices";
import {connect} from "react-redux";

const strings = Strings.registerSenior

class RequiredInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            number: '',
            region: undefined,
            modalPhotoVisible: false,
            modalAddressVisible: false,
            modalMapVisible: false,
            selectedAddress: '',
            typeOpenMap: Constants.TYPE_FIND,
            photoUrl: null,
            selectedPhoto: undefined,
        }
    }

    onClickNext() {
        const {name, number, region, photoUrl, selectedAddress, selectedPhoto} = this.state
        const { devices } = this.props;

        const device = devices.filter((device) => {
            return device.imei === this.props.navigation.getParam('imei');
        });
        const id = device.length === 0 ? '' :  device[0].deviceId;

        let userInfo = {
            deviceName: name,
            ...(selectedPhoto !== undefined && {deviceImg: selectedPhoto}),
            mobile: number,
            ...(typeof region != 'undefined' && {beaconLat: region.latitude}),
            ...(typeof region != 'undefined' && {beaconLng: region.longitude}),
            address: selectedAddress ?? '',
        }
        NavigationService.pushToNewScreen(RouterName.AdditionalInfo, {userInfo, id})
    }

    setModalVisible = (key, visible) => {
        this.setState({ [key]: visible }, () => {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        })
    }

    onCheckLocation(region, formattedLocation){
        this.setState({
            modalMapVisible: true,
            region,
            selectedAddress: formattedLocation,
            typeOpenMap: Constants.TYPE_CHECK,
        })
    }
    onFindLocation(){
        this.setState({
            modalMapVisible: true,
            typeOpenMap: Constants.TYPE_FIND,
        })
    }

    onSelectLocation(selectedAddress, region){
        this.setState({
            modalMapVisible: false,
            modalAddressVisible: false,
            selectedAddress,
            region,
        })
    }

    choosePhoto = () => {
        this.setModalVisible('modalPhotoVisible', true);
    }

    selectAddress = () => {
        this.setModalVisible('modalAddressVisible', true);
    }

    onChange(key, value) {
        this.setState({
            [key]: value
        })
    }

    mapPhotoObject = (response) => {
        let photoObject = {}
        photoObject.name = response.fileName
        photoObject.uri = response.uri
        photoObject.type = response.type
        return photoObject
    }

    takePhotoAction = () => {
        launchCamera({ mediaType: 'photo' }, (response) => {
            if(response.uri!=null){
                this.setState({
                    photoUrl: response.uri,
                    selectedPhoto: this.mapPhotoObject(response),
                })
                this.setModalVisible('modalPhotoVisible', false);
            }

        })
    }

    selectGallery = () =>{
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if(response.uri!=null){
                this.setState({
                    photoUrl: response.uri,
                    selectedPhoto: this.mapPhotoObject(response),
                })
                this.setModalVisible('modalPhotoVisible', false);
            }
        })
    }

    useDefaultImage = () => {
        this.setModalVisible('modalPhotoVisible', false);
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidMount () {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.props.getUserDevices();
    }

    handleBackButtonClick = () => {
        NavigationService.navigate('ScanQR')
        return true
    };

    render() {
        const { navigation } = this.props
        const { modalPhotoVisible, name, number, modalAddressVisible ,
            modalMapVisible, selectedAddress, region, typeOpenMap, photoUrl } = this.state;
        let isDisable = name.length === 0 || number.length === 0;
        return (
            <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: Colors.white }}>
                <HeaderWithBack title={strings.title} navigation={navigation} callBack={this.handleBackButtonClick} />
                <KeyboardAwareScrollView
                    extraScrollHeight={40}
                    keyboardShouldPersistTaps="handled"
                    style={{
                        paddingHorizontal: 20,
                    }}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.containerContent}>
                            <View style={styles.avatar}>
                                <Avatar photoUrl={photoUrl} onPress={() => { this.choosePhoto() }} />
                            </View>
                            <NameInput
                                placeholder={strings.placeHolderName}
                                maxLength={15}
                                onChange={text => this.onChange("name", text)}
                                titleName={strings.titleName} />

                            <View style={styles.rowBirthday}>
                                <Text style={styles.fieldText}>{strings.numberInput}</Text>
                                <PrimaryTextInput
                                    style={{ flex: 6, underlineColorAndroid: Colors.transparent }}
                                    placeholder={'without “-“'}
                                    typeInput={"numeric"}
                                    maxLength={15}
                                    onChange={text => this.onChange("number", text)} />
                            </View>

                            <View style={styles.rowAddress}>
                                <Text style={styles.fieldText}>{strings.address}</Text>
                                <Text onPress={() => { this.selectAddress() }}>{selectedAddress}</Text>
                            </View>
                        </View>

                    </TouchableWithoutFeedback>


                </KeyboardAwareScrollView>

                <View style={{ paddingHorizontal: 20, paddingBottom: 27 }}>
                    <TextButton
                        disabled={isDisable}
                        onClick={this.onClickNext.bind(this)}
                        style={styles.bottomButton}>
                        {Strings.common.next}
                    </TextButton>
                </View>


                <BottomPopup visible={modalAddressVisible} onRequestClose={() => {this.setModalVisible('modalAddressVisible', false)}}>
                    <View style={styles.bottomView}>
                        <Address
                        type={Constants.TYPE_ADD_ADDRESS}
                        onClose={() => { this.setModalVisible('modalAddressVisible', false); }}
                        selectedAddress = {selectedAddress}
                        onCheckLocation = {this.onCheckLocation.bind(this)}
                        onFindLocation = {this.onFindLocation.bind(this)} />
                    </View>
                </BottomPopup>

                <BottomPopup visible={modalMapVisible} onRequestClose={() => {this.setModalVisible('modalMapVisible', false)}}>
                    <View style={styles.bottomView}>
                        <Map
                        typeMap={Constants.TYPE_ADD_ADDRESS}
                        onClose={() => { this.setModalVisible('modalMapVisible', false); }}
                        onSelectLocation = {this.onSelectLocation.bind(this)}
                        type={typeOpenMap}
                        region={region}
                        formattedLocation={selectedAddress}/>
                    </View>
                </BottomPopup>


                <BottomPopup visible={modalPhotoVisible} onRequestClose={() => {this.setModalVisible('modalPhotoVisible', false)}}>
                    <View style={styles.bottomView}>
                        <ChoosePhotoPopup onClose={() => { this.setModalVisible('modalPhotoVisible', false); }}
                        takePhotoAction={()=>{this.takePhotoAction()}} selectGallery={()=>{this.selectGallery()}} useDefaultImage={()=>{this.useDefaultImage()}}/>
                    </View>
                </BottomPopup>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerContent: {
        justifyContent: 'space-between',
        flex: 1,
    },
    contentTop: {
        justifyContent: "center",
    },
    fieldText: {
        flex: 3,
        color: Colors.darkGrey,
        fontSize: 16
    },
    rowBirthday: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: Colors.athensGray,

    },
    rowAddress: {
        height: 90,
        justifyContent: 'flex-start',
        paddingTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.athensGray,
    },
    avatar: {
        width: 110,
        height: 110,
        alignSelf: 'center',
        marginBottom: 40
    },
    bottomView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22,
        height: 200,
    },
    bottomButton: {
        borderColor: Colors.transparent,
    }
});

const mapStateToProps = ({ userDevices: { devices } }) => {
    console.log('devices: ', devices);
    return {
        devices,
    }
}
const mapDispatchToProps = (dispatch) => ({
    getUserDevices: () => dispatch(DevicesActions.getUserDevices()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RequiredInfo)
