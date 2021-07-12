import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, SafeAreaView, View, TouchableOpacity } from 'react-native';
import { ChoosePhotoPopup, BottomPopup, Popup, TextButton } from '../../../Components';
import ViewPresent from '../../../Components/ViewPresent';
import { Strings } from '../../../Theme';
import ChooseType from './Components/ChooseType';
import EmailInput from './Components/EmailInput';
import ImportPicture from './Components/ImportPicture';
import LargeContentText from './Components/LargeContentText';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { validateEmail } from '../../../Utils';
import ListTypePopup from './Components/ListTypePopup';
import CenterPopup from '../../../Components/CenterPopup';

const strings = Strings.contactus

class ContactUs extends Component {
    state = {
        isDisable: true, 
        images: [], 
        modalPhotoVisible: false,
        modalChooseTypeVisible: false,
        isShowPopupConfirmContactUs: false,
        isShowPopupReceivedContactUs: false,
        type: '',
        email: ''
    }

    setModalVisible = (key, visible) => {
        this.setState({ [key]: visible });
    }

    chooseImage = () => {
        this.setModalVisible('modalPhotoVisible', true);
    }

    choosePhoto = () => {
        this.setModalVisible('modalPhotoVisible', true);
    }

    onSubmitContactUs(){
        this.setModalVisible('isShowPopupConfirmContactUs', true);
    }

    onConfirmContactUs(){
        this.setModalVisible('isShowPopupConfirmContactUs', false);
        this.setModalVisible('isShowPopupReceivedContactUs', true);
    }

    onSubmitSuccess(){
        const { onClose } = this.props;
        this.setModalVisible('isShowPopupReceivedContactUs', false);
        onClose()
    }

    takePhotoAction = () => {
        launchCamera({ mediaType: 'photo' }, (response) => {
            if(response.uri!=null){
                let images = this.state.images;
                images.push({
                    name: response.fileName,
                    url: response.uri
                })
                this.setState({images: images})
                this.setModalVisible('modalPhotoVisible', false);
            }
            
        })
    }

    selectGallery = () =>{
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if(response.uri!=null){
                let images = this.state.images;
                images.push({
                    name: response.fileName,
                    url: response.uri
                })
                this.setState({images: images})
                this.setModalVisible('modalPhotoVisible', false);
            }
        })
    }

    render() {
        const { onClose } = this.props;
        const { isDisable, images, modalPhotoVisible, 
            modalChooseTypeVisible, type, isShowPopupConfirmContactUs, 
            email, isShowPopupReceivedContactUs } = this.state
        return (
            <ViewPresent title={strings.contactus} onClose={() => { onClose() }}>
                <KeyboardAwareScrollView  style={styles.scrollView}>
                    <EmailInput onChangeText={(text) => {
                        this.setState({
                            isDisable: !validateEmail(text),
                            email: text
                        })
                    }}/>
                    <TouchableOpacity onPress={()=>{this.setModalVisible('modalChooseTypeVisible', true)}}>
                        <ChooseType type={type} />
                    </TouchableOpacity>
                    <LargeContentText/>
                    <ImportPicture images={images} chooseImage={() => {this.chooseImage()}}/>
                    <TextButton
                        disabled={isDisable && type==''}
                        onClick={() => {
                            this.onSubmitContactUs();
                        }}>
                        {Strings.contactus.submit}
                    </TextButton>
                </KeyboardAwareScrollView>
                <BottomPopup visible={modalPhotoVisible} onRequestClose={() => {this.setModalVisible('modalPhotoVisible', false)}}>
                    <View style={styles.bottomView}>
                        <ChoosePhotoPopup onClose={() => { this.setModalVisible('modalPhotoVisible', false); }} 
                        takePhotoAction={()=>{this.takePhotoAction()}} selectGallery={()=>{this.selectGallery()}}/>
                    </View>
                </BottomPopup>
                <BottomPopup visible={modalChooseTypeVisible} onRequestClose={() => {this.setModalVisible('modalChooseTypeVisible', false)}}>
                    <View style={styles.bottomView}>
                        <ListTypePopup 
                        selectedItem={(item)=>{this.setState({type: item.title})}} 
                        onClose={() => { this.setModalVisible('modalChooseTypeVisible', false); }}/>
                    </View>
                </BottomPopup>
                <CenterPopup
                    visible={isShowPopupConfirmContactUs}
                    cancelAction={() => { this.setModalVisible('isShowPopupConfirmContactUs', false) }}
                    doneAction={() => { this.onConfirmContactUs() }}
                    doneTitle={Strings.common.submit}
                    onRequestClose={() => { this.setModalVisible('isShowPopupConfirmContactUs', false) }}
                    title={strings.contactus}
                    content={strings.notifi + email} />
                <CenterPopup
                    visible={isShowPopupReceivedContactUs}
                    doneAction={() => { this.onSubmitSuccess() }}
                    canBack={false}
                    title={strings.contactus}
                    content={strings.received} />
            </ViewPresent>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 42,
    },
    bottomView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22,
        height: 140,
    },
});

export default ContactUs;