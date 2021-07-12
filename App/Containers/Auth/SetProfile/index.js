import React, { Component } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, Keyboard, TouchableWithoutFeedback, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors, Fonts, Images, Strings } from '../../../Theme';
import HeaderWithBack from '../../../Components/HeaderWithBack';
import PrimaryButton from '../../../Components/PrimaryButton';
import AgreeText from './Components/AgreeText';
import Avatar from './Components/Avatar';
import NavigationService from '../../../Services/NavigationService';
import BottomPopup from '../../../Components/BottomPopup';
import ChoosePhotoPopup from '../../../Components/ChoosePhotoPopUp';
import TermScreen from '../Term';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { TextButton } from '../../../Components';
import NameInput from './Components/NameInput';

const strings = Strings.setProfile

class SetProfile extends Component {
    state = {
        isDisable: true,
        nameInput: '',
        modalPhotoVisible: false,
        modalAgreeVisible: false,
        modalPrivacyVisible: false,
        photoUrl: Images.icMaleUser
    };

    setModalVisible = (key, visible) => {
        this.setState({ [key]: visible });
    }

    createAcount = () => {
        NavigationService.pushToNewScreen('HomeNavigator');
    }

    choosePhoto = () => {
        this.setModalVisible('modalPhotoVisible', true);
    }

    takePhotoAction = () => {
        launchCamera({ mediaType: 'photo' }, (response) => {
            if (response.uri != null) {
                this.setState({
                    photoUrl: response.uri
                })
                this.setModalVisible('modalPhotoVisible', false);
            }

        })
    }

    selectGallery = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.uri != null) {
                this.setState({
                    photoUrl: response.uri
                })
                this.setModalVisible('modalPhotoVisible', false);
            }
        })
    }

    useDefaultImage = () => {
        this.setModalVisible('modalPhotoVisible', false);
    }

    render() {
        const { loading = false, error, navigation } = this.props
        const { modalPhotoVisible, modalAgreeVisible, modalPrivacyVisible, photoUrl, isDisable, nameInput } = this.state;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <View style={{ flex: 1, justifyContent: "space-between", backgroundColor: Colors.white }}>
                    <HeaderWithBack title={strings.setProfile} navigation={navigation} />
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                        style={styles.container}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.containerContent}>
                                <View style={styles.avatar}>
                                    <Avatar photoUrl={photoUrl} onPress={() => { this.choosePhoto() }} />
                                </View>
                                <NameInput onChange={(value) => { this.setState({isDisable:value.length==0}) }} />
                                {/* {loading && (<LoaderWrapper>
                                <Loading />
                            </LoaderWrapper>)} */}
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <View style={{ marginHorizontal: 20, marginBottom: 30, justifyContent: 'center' }}>
                            <AgreeText
                                onClickAgree={() => { this.setModalVisible('modalAgreeVisible', true); }}
                                onClickPrivacy={() => { this.setModalVisible('modalPrivacyVisible', true); }}
                            />
                        </View>
                        <View style={{ marginHorizontal: 20, marginBottom: 27 }}>
                            <TextButton
                                disabled={isDisable}
                                onClick={() => { this.createAcount() }}
                                style={{ borderWidth: 0 }}>
                                {strings.createAccount}
                            </TextButton>
                        </View>
                    </View>

                    <BottomPopup visible={modalPhotoVisible} onRequestClose={() => { this.setModalVisible('modalPhotoVisible', false) }}>
                        <View style={styles.bottomView}>
                            <ChoosePhotoPopup onClose={() => { this.setModalVisible('modalPhotoVisible', false); }}
                                takePhotoAction={() => { this.takePhotoAction() }} selectGallery={() => { this.selectGallery() }} useDefaultImage={() => { this.useDefaultImage() }} />
                        </View>
                    </BottomPopup>
                    <BottomPopup visible={modalAgreeVisible} onRequestClose={() => { this.setModalVisible('modalAgreeVisible', false) }}>
                        <View style={styles.bottomView}>
                            <TermScreen title={strings.userAgreement} onClose={() => { this.setModalVisible('modalAgreeVisible', false); }} />
                        </View>
                    </BottomPopup>
                    <BottomPopup visible={modalPrivacyVisible} onRequestClose={() => { this.setModalVisible('modalPrivacyVisible', false) }}>
                        <View style={styles.bottomView}>
                            <TermScreen title={strings.privacy} onClose={() => { this.setModalVisible('modalPrivacyVisible', false); }} />
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
    },
    containerContent: {
        flex: 1,
        backgroundColor: Colors.transparent,
        justifyContent: 'center'
    },
    centerContainer: {
        height: 200,
        justifyContent: "center",
    },
    loginText: {
        fontFamily: Fonts.family.Bold,
        fontSize: 28,
        color: Colors.darkGrey,
    },
    titleSignInText: {
        fontFamily: Fonts.family.Regular,
        fontSize: 24,
        color: Colors.darkGrey,
    },
    titleName: {
        marginLeft: 20,
        fontFamily: Fonts.family.Regular,
        fontSize: 16,
        color: Colors.darkGrey
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
});

export default SetProfile;