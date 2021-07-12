import React, { Component } from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Colors, Fonts, Strings, Metrics, Images } from "../../../Theme";
import PrefixPhoneModal from "../../Auth/Login/Components/PrefixPhoneModal";
import { BottomPopup, PhoneInput, TextButton } from "../../../Components";
import { isValidNumber } from "../../../Utils";
import Configs from "../../../Configs";

const strings = Strings.settingTab;

class ChangePhoneNumber extends Component {
  state = {
    modalVisible: false,
    selectedCountryCode: Configs.DEFAULT_COUNTRY_ISO_CODE,
    selectedCountryCodeText: Configs.DEFAULT_COUNTRY_CODE,
    isDisable: true,
    phoneNumber: "",
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  chooseNumber = () => {
    this.setModalVisible(true);
  };

  onChangeText = (text) => {
    this.setState({
      isDisable: !isValidNumber(text, this.state.selectedCountryCode),
      phoneNumber: text,
    });
  };

  selectedItem = (item) => {
    this.setState({
      selectedCountryCode: item.countryCode,
      selectedCountryCodeText: item.code,
    });
  };

  render() {
    const { modalVisible, selectedCountryCodeText, isDisable, phoneNumber } = this.state;
    const {verifyNumber, onClose} = this.props
    return (
      <View
        style={styles.container}
      >
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
          <Text style={styles.title}>{strings.changeNumber}</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{flex:1}}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.containerContent}>
                <View style={styles.centerContainer}>
                  <Text style={styles.titleSignInText}>
                    {strings.messageChangeNumber}
                  </Text>
                  <PhoneInput
                    selectedCountryCodeText={selectedCountryCodeText}
                    onChangeText={(text) => this.onChangeText(text)}
                    chooseNumber={() => {
                      this.chooseNumber();
                    }}
                  />
                </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={{ marginHorizontal: 20, marginBottom: 27 }}>
            <TextButton
              disabled={isDisable}
              onClick={() => {
                verifyNumber(selectedCountryCodeText + " "+ phoneNumber);
              }}
              longPress={() => {
                this.setModalVisible("isShowPopupOneButton", true);
              }}
              style={{ borderWidth: 0 }}
            >
              {strings.buttonVerifyNumber}
            </TextButton>
          </View>
        </KeyboardAvoidingView>
        <BottomPopup
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <View style={styles.bottomView}>
            <PrefixPhoneModal
              selectedItem={(item) => {
                this.selectedItem(item);
              }}
              onClose={() => {
                this.setModalVisible(false);
              }}
            />
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
  containerContent: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "flex-start",
  },
  centerContainer: {
    height: 200,
    marginHorizontal: 20,
    justifyContent: "center",
    marginTop: 50,
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
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
    height: 360,
  },
  modalView: {
    height: 360,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ChangePhoneNumber;
