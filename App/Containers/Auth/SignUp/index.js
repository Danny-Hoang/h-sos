import React, { Component } from 'react';
import { View, KeyboardAvoidingView, StyleSheet, Keyboard, TouchableWithoutFeedback, Text, SafeAreaView } from 'react-native';
import { Colors, Fonts, Strings } from '../../../Theme';
import HeaderWithBack from '../../../Components/HeaderWithBack';
import NavigationService from '../../../Services/NavigationService';
import PrefixPhoneModal from '../Login/Components/PrefixPhoneModal';
import BottomPopup from '../../../Components/BottomPopup';
import PhoneInput from '../../../Components/PhoneInput';
import { isValidNumber } from '../../../Utils';
import { TextButton } from '../../../Components';
import Configs from "../../../Configs";
import { RouterName } from '../../../Navigator/RouteName';

const strings = Strings.signup

class SignUp extends Component {
	state = {
		modalVisible: false,
		selectedCountryCode: Configs.DEFAULT_COUNTRY_ISO_CODE,
		selectedCountryCodeText: Configs.DEFAULT_COUNTRY_CODE,
		isDisable: true,
		phoneNumber: ""
	};

	setModalVisible = (visible) => {
		this.setState({ modalVisible: visible });
	}

	chooseNumber = () => {
		this.setModalVisible(true);
	}

	signUpAction = () => {
		const { selectedCountryCodeText, phoneNumber } = this.state;
		NavigationService.pushToNewScreen(RouterName.VerifyNumber, { isFromLogin: false, phoneNumber: selectedCountryCodeText + " " + phoneNumber });
	}

	onChangeText = (text) => {
		this.setState({
			isDisable: !isValidNumber(text, this.state.selectedCountryCode),
			phoneNumber: text
		})
	}

	selectedItem = (item) => {
		this.setState({
			selectedCountryCode: item.countryCode,
			selectedCountryCodeText: item.code
		})
	}

	render() {
		const { loading = false, error, navigation } = this.props
		const { modalVisible, selectedCountryCodeText, isDisable } = this.state;
		return (
			<View style={{ flex: 1, justifyContent: "space-between", backgroundColor: Colors.white }}>
				<KeyboardAvoidingView
					behavior={Platform.OS == "ios" ? "padding" : "height"}
					style={styles.container}>
					<SafeAreaView style={{ flex: 1 }}>
						<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
							<View style={styles.containerContent}>
								<View style={{ flex: 1 }}>
									<HeaderWithBack title={strings.signUp} navigation={navigation} />
								</View>
								<View style={{ flex: 3 }}>
									<View style={styles.centerContainer}>
										<Text style={styles.titleSignInText}>{strings.titleSignUp}</Text>
										<PhoneInput
											selectedCountryCodeText={selectedCountryCodeText}
											onChangeText={text => this.onChangeText(text)}
											chooseNumber={() => { this.chooseNumber() }} />
									</View>
								</View>
							</View>
						</TouchableWithoutFeedback>
						<View style={{ marginHorizontal: 20, marginBottom: 27 }}>
							{/* <PrimaryButton title={strings.signUp} action={() => { this.signUpAction() }} /> */}
							<TextButton
								disabled={isDisable}
								onClick={() => { this.signUpAction() }}
								longPress={() => { this.setModalVisible('isShowPopupOneButton', true) }}
								style={{ borderWidth: 0 }}>
								{strings.verifyNumber}
							</TextButton>
						</View>
					</SafeAreaView>


				</KeyboardAvoidingView>
				<BottomPopup visible={modalVisible} onRequestClose={() => { this.setModalVisible(false); }}>
					<View style={styles.bottomView}>
						<PrefixPhoneModal selectedItem={(item) => { this.selectedItem(item) }} onClose={() => { this.setModalVisible(false); }} />
					</View>
				</BottomPopup>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	containerContent: {
		flex: 1,
		justifyContent: "flex-start"
	},
	centerContainer: {
		height: 200,
		marginHorizontal: 20,
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
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
});

export default SignUp;