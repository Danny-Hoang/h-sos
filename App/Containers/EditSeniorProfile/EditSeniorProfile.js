import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    Text, BackHandler, StatusBar,
} from "react-native";
import { Colors, Fonts, Images, Strings, Metrics } from "../../Theme";
import {
    NameInput,
    Avatar,
    BottomPopup,
    ChoosePhotoPopup,
    TextButton,
} from "../../Components";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { PrimaryTextInput } from "../../Components";
import DatePickerComponent from "../SetProfile/AdditionalInfo/DatePicker";
import Constants from "../../Constants";
import Address from "../SetProfile/RequiredInfo/Address";
import Map from "../SetProfile/RequiredInfo/Map";

const stringEdit = Strings.setProfile;
const stringAdd = Strings.additionalInfo;
const strings = Strings.profile;

let initialName = "";
let initialImage = "";
let initialAddress = "";
let initialBirthday = "";
let initialNumber = "";
let initialGender = "";
let initialHeight = "";
let initialWeight = "";


class EditSeniorProfile extends Component {
    constructor(props) {
        super(props);
        initialName = this.props.name;
        initialImage = this.props.url;
        initialAddress = this.props.address;
        initialBirthday = this.props.birthday;
        initialNumber = this.props.number;
        initialGender = this.props.gender;
        initialHeight = this.props.height;
        initialWeight = this.props.weight;
        this.state = {
            modalPhotoVisible: false,
            modalAddressVisible: false,
            modalMapVisible: false,
            selectedAddress: this.props.address,
            photoUrl: this.props.url,
            selectedPhoto: undefined,
            nameInput: this.props.name,
            gender: this.props.gender,
            modalDatePickerVisible: false,
            date: this.props.birthday,
            number: this.props.number,
            address: this.props.address,
            height: this.props.height,
            weight: this.props.weight,
            region: undefined,
        };
    }

    takePhotoAction = () => {
        launchCamera({ mediaType: "photo" }, (response) => {
            if (response.uri != null) {
                this.setState({
                    photoUrl: response.uri,
                    selectedPhoto: this.mapPhotoObject(response),
                });
                this.setState({ modalPhotoVisible: false })
            }
        });
    };

    selectGallery = () => {
        launchImageLibrary({ mediaType: "photo" }, (response) => {
            if (response.uri != null) {
                this.setState({
                    photoUrl: response.uri,
                    selectedPhoto: this.mapPhotoObject(response),
                });
                this.setState({ modalPhotoVisible: false })
            }
        });
    };

    mapPhotoObject = (response) => {
        let photoObject = {}
        photoObject.name = response.fileName
        photoObject.uri = response.uri
        photoObject.type = response.type
        return photoObject
    }

    onSelectGender = (gender) => {
        this.setState({ gender: gender })
    };

    onSelectDateOfBirth = (date) => {
        this.setState({ date: date })
    };

    setModalVisible = (key, visible) => {
        this.setState({ [key]: visible }, () => {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        })
    };

    selectAddress = () => {
        this.setModalVisible('modalAddressVisible', true);
    };

    onCheckLocation(region, formattedLocation) {
        this.setState({
            modalMapVisible: true,
            region,
            selectedAddress: formattedLocation,
            typeOpenMap: Constants.TYPE_CHECK,
        })
    }

    onFindLocation() {
        this.setState({
            modalMapVisible: true,
            typeOpenMap: Constants.TYPE_FIND,
        })
    }

    onSelectLocation(selectedAddress, region) {
        this.setState({
            modalMapVisible: false,
            modalAddressVisible: false,
            selectedAddress,
            region,
        })
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        return true
    };

    render() {
        const { onClose, onSave } = this.props;
        const {
            modalDatePickerVisible,
            modalPhotoVisible,
            modalMapVisible,
            photoUrl,
            nameInput,
            date,
            address,
            number,
            gender,
            height,
            weight,
            modalAddressVisible,
            selectedAddress,
            region,
            typeOpenMap,
            selectedPhoto
        } = this.state;

        const isEnable = photoUrl !== initialImage
            || ((nameInput !== initialName && nameInput !== "") && (number !== initialNumber && number !== ""))
            || selectedAddress !== initialAddress
            || date !== initialBirthday
            || gender !== initialGender
            || height !== initialHeight
            || weight !== initialWeight;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => {
                            onClose();
                        }}
                    >
                        <View style={styles.closeView}>
                            <Image source={Images.icCloseBlack} style={styles.imageClose} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.title}>{stringEdit.editProfile}</Text>
                </View>

                <KeyboardAwareScrollView
                    extraScrollHeight={40}
                    keyboardShouldPersistTaps="handled"
                    style={{
                        flex: 1,
                        paddingHorizontal: 20,
                        paddingBottom: 20,
                    }}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <View style={{ justifyContent: "space-between", flex: 1 }}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View>
                                <View style={styles.avatar}>
                                    <Avatar
                                        photoUrl={photoUrl}
                                        onPress={() => {
                                            this.setState({ modalPhotoVisible: true })
                                        }}
                                    />
                                </View>
                                <NameInput
                                    initialValue={nameInput}
                                    // maxLength={15}
                                    onChange={(text) => this.setState({ nameInput: text })}
                                    titleName={strings.name}
                                />

                                <View style={styles.rowBirthday} >
                                    <Text style={styles.fieldText}>{strings.number}</Text>
                                    <PrimaryTextInput style={{ flex: 6, underlineColorAndroid: Colors.transparent }} text={number} font={Fonts.family.Medium} typeInput={"numeric"} onChange={(text) => this.setState({ number: text })} />
                                </View>
                                <View style={styles.rowBirthday} >
                                    <Text style={styles.fieldText}>{strings.address}</Text>
                                    <TouchableWithoutFeedback style={{ alignItems: 'flex-start' }} onPress={(e) => { this.selectAddress() }}>
                                        <Text numberOfLines={2} style={{ flex: 7, color: Colors.darkGreyTwo, fontSize: 18, textAlign: 'left', fontFamily: Fonts.family.Medium }}>{selectedAddress}</Text>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.rowGender}>
                                    <Text style={styles.fieldText}>{strings.gender}</Text>
                                    {
                                        stringAdd.gender.map(item => {
                                            return (
                                                <TouchableOpacity style={styles.gender} onPress={(e) => this.onSelectGender(item.id)} key={item.id}>
                                                    <TouchableOpacity style={this.state.gender === item.id ? styles.circle : styles.circleDis} onPress={(e) => this.onSelectGender(item.id)}>
                                                        {this.state.gender === item.id && (<View style={styles.checkItem} />)}
                                                    </TouchableOpacity>
                                                    <Text style={styles.textGender}>{item.name}</Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                                <View style={styles.rowBirthday} >
                                    <Text style={styles.fieldText}>{strings.birth}</Text>
                                    <TouchableWithoutFeedback style={{ alignItems: 'flex-start' }} onPress={(e) => { this.setModalVisible('modalDatePickerVisible', true) }}>
                                        <Text style={{ flex: 7, color: Colors.darkGreyTwo, fontSize: 18, textAlign: 'left', fontFamily: Fonts.family.Medium }}>{date}</Text>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.rowBirthday}>
                                    <Text style={styles.fieldText}>{strings.height}</Text>
                                    <PrimaryTextInput style={{ flex: 6, underlineColorAndroid: Colors.transparent }} font={Fonts.family.Medium} text={height} placeholder={'170'} typeInput={"numeric"} onChange={(text) => this.setState({ height: text })} />
                                    <Text style={styles.sub}>{stringAdd.cm}</Text>
                                </View>
                                <View style={styles.rowBirthday}>
                                    <Text style={styles.fieldText}>{strings.weight}</Text>
                                    <PrimaryTextInput style={{ flex: 6, underlineColorAndroid: Colors.transparent }} text={weight} font={Fonts.family.Medium} placeholder={'85'} typeInput={"numeric"} onChange={(text) => this.setState({ weight: text })} />
                                    <Text style={styles.sub}>{stringAdd.kg}</Text>
                                </View>

                            </View>

                        </TouchableWithoutFeedback>
                        <TextButton
                            disabled={!isEnable}
                            onClick={() => {
                                let userChange = {
                                    ...(photoUrl !== initialImage && { deviceImg: selectedPhoto }),
                                    ...(nameInput !== initialName && { deviceName: nameInput }),
                                    ...(selectedAddress !== initialAddress && { address: selectedAddress }),
                                    ...(number !== initialNumber && { mobile: number }),
                                    ...(typeof region != 'undefined' && { beaconLat: region.latitude }),
                                    ...(typeof region != 'undefined' && { beaconLng: region.longitude }),
                                }
                                onSave(userChange);
                                onClose();
                            }}>
                            {Strings.common.done}
                        </TextButton>
                    </View>
                </KeyboardAwareScrollView>

                <BottomPopup
                    visible={modalPhotoVisible}
                    onRequestClose={() => {
                        this.setState({ modalPhotoVisible: false })
                    }}>
                    <View style={styles.bottomView}>
                        <ChoosePhotoPopup
                            onClose={() => {
                                this.setState({ modalPhotoVisible: false })
                            }}
                            takePhotoAction={() => {
                                this.takePhotoAction();
                            }}
                            selectGallery={() => {
                                this.selectGallery();
                            }}
                            useDefaultImage={() => {
                                this.setState({ modalPhotoVisible: false })
                            }}
                        />
                    </View>
                </BottomPopup>

                <BottomPopup visible={modalDatePickerVisible} onRequestClose={() => { this.setModalVisible('modalDatePickerVisible', false) }}>
                    <View style={styles.bottomViewDate}>
                        <DatePickerComponent onChange={this.onSelectDateOfBirth} date={date} onClose={() => { this.setModalVisible('modalDatePickerVisible', false); }} />
                    </View>
                </BottomPopup>


                <BottomPopup visible={modalAddressVisible} onRequestClose={() => { this.setModalVisible('modalAddressVisible', false) }}>
                    <View style={styles.bottomView}>
                        <Address
                            type={Constants.TYPE_ADD_ADDRESS}
                            onClose={() => { this.setModalVisible('modalAddressVisible', false); }}
                            selectedAddress={selectedAddress}
                            onCheckLocation={this.onCheckLocation.bind(this)}
                            onFindLocation={this.onFindLocation.bind(this)} />
                    </View>
                </BottomPopup>

                <BottomPopup visible={modalMapVisible} onRequestClose={() => { this.setModalVisible('modalMapVisible', false) }}>
                    <View style={styles.bottomView}>
                        <Map
                            typeMap={Constants.TYPE_ADD_ADDRESS}
                            onClose={() => { this.setModalVisible('modalMapVisible', false); }}
                            onSelectLocation={this.onSelectLocation.bind(this)}
                            type={typeOpenMap}
                            region={region}
                            formattedLocation={selectedAddress} />
                    </View>
                </BottomPopup>

            </View>
        );
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
    titleName: {
        marginLeft: 20,
        fontFamily: Fonts.family.Regular,
        fontSize: 16,
        color: Colors.darkGrey,
    },
    avatar: {
        width: 90,
        height: 90,
        alignSelf: "center",
        marginBottom: 40,
    },
    bottomView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22,
        height: 200,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    imageClose: {
        width: 24,
        height: 24,
    },
    closeView: {
        height: 65,
        width: 65,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontFamily: Fonts.family.Medium,
        fontSize: 22,
    },
    sub: {
        fontFamily: Fonts.family.Medium,
        fontSize: 17,
        color: Colors.slateGrey,
        flex: 1,
        textAlign: 'right'
    },

    containerContent: {
        paddingHorizontal: 20,
    },
    message: {
        fontFamily: Fonts.family.Regular,
        fontSize: 20,
        color: Colors.darkGrey,
        marginTop: 20,
        marginBottom: 42,
    },
    circle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.coral,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circleDis: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Colors.coolGrey,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkItem: {
        width: 11,
        height: 11,
        borderRadius: 7,
        backgroundColor: Colors.red,
    },
    fieldText: {
        flex: 3,
        color: Colors.darkGrey,
        fontSize: 16
    },
    gender: {
        flexDirection: 'row',
        flex: 3
    },
    textGender: {
        fontFamily: Fonts.family.Bold,
        fontSize: Fonts.size.regular,
        color: Colors.darkGreyTwo,
        marginLeft: 8,
    },
    rowGender: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColorDateTime,
    },
    rowBirthday: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColorDateTime,
    },
    rowHeightAndWeight: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    bottomViewDate: {
        justifyContent: "flex-end",
        alignItems: 'flex-end',
        height: 325,
    },
});

export default EditSeniorProfile;
