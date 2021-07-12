import React, { Component } from "react";
import {
	Image,
	Keyboard,
	KeyboardAvoidingView,
	PermissionsAndroid,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { BottomPopup, PhoneInput, TextButton } from "../../../Components";
import ViewPresent from "../../../Components/ViewPresent";
import Configs from "../../../Configs";
import NavigationService from "../../../Services/NavigationService";
import { Colors, Fonts, Images, Metrics, Strings } from "../../../Theme";
import { isValidNumber } from "../../../Utils";
import PrefixPhoneModal from "../../Auth/Login/Components/PrefixPhoneModal";
import Contacts from 'react-native-contacts';
import { selectContactPhone } from 'react-native-select-contact';

const strings = Strings.carer;

class AddCarer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			numberModalVisible: false,
			selectedCountryCode: Configs.DEFAULT_COUNTRY_ISO_CODE,
			selectedCountryCodeText: Configs.DEFAULT_COUNTRY_CODE,
			phoneNumber: "",
			isDisable: true,
		};
	}

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

	chooseNumber = () => {
		this.setState({ numberModalVisible: true })
	};

	chooseContact() {
		if (Platform.OS === "android") {
			PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
				title: "Contacts",
				message: "This app would like to view your contacts."
			}).then(() => {
				this.loadContacts();
			});
		} else {
			this.loadContacts();

		}

	}

	loadContacts() {
		const { inviteAction } = this.props;
		selectContactPhone()
        .then(selection => {
            if (!selection) {
                return null;
            }
            let { selectedPhone } = selection;
			inviteAction(selectedPhone.number)
            return selectedPhone.number;
        });  
		Contacts.checkPermission();
	}

	render() {
		const { loading = false, onClose, inviteAction } = this.props;
		const {
			numberModalVisible,
			selectedCountryCodeText,
			isDisable,
		} = this.state;
		return (
			<View style={styles.container}>
				<KeyboardAvoidingView
					behavior={Platform.OS == "ios" ? "padding" : "height"}
					style={{ flex: 1 }}>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={styles.containerContent}>
							<View style={styles.header}>
								<TouchableOpacity
									onPress={() => {
										onClose();
									}}>
									<View style={styles.closeView}>
										<Image source={Images.icCloseBlack} style={styles.imageClose} />
									</View>
								</TouchableOpacity>
								<Text style={styles.title}>{strings.changeNumber}</Text>
							</View>
							<View style={{flex:1, justifyContent: 'space-between'}}>
							<View style={styles.centerContainer}>
								<Text style={styles.titleSignInText}>
									{strings.titleAddCarer}
								</Text>
								<PhoneInput
									selectedCountryCodeText={selectedCountryCodeText}
									onChangeText={(text) => this.onChangeText(text)}
									chooseNumber={() => {
										this.chooseNumber();
									}} />
								<View style={{ flexDirection: 'row-reverse' }}>
									<TouchableOpacity onPress={() => this.chooseContact()}>
										<View style={styles.contactView}>
											<Text style={styles.contactText}>{strings.contacts}</Text>
										</View>
									</TouchableOpacity>
								</View>
							</View>
							<View style={{ marginHorizontal: 20, marginBottom: 27 }}>
								<TextButton
									disabled={isDisable}
									onClick={() => {
										inviteAction(this.state.selectedCountryCodeText + " " + this.state.phoneNumber)
									}}
									style={{ borderWidth: 0 }}>
									{strings.invite}
								</TextButton>
							</View>
							</View>
							
						</View>
					</TouchableWithoutFeedback>
				</KeyboardAvoidingView>
				<BottomPopup
					visible={numberModalVisible}
					onRequestClose={() => {
						this.setState({ numberModalVisible: false });
					}}>
					<View style={styles.bottomView}>
						<PrefixPhoneModal
							selectedItem={(item) => {
								this.selectedItem(item);
							}}
							onClose={() => {
								this.setState({ numberModalVisible: false });
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
		backgroundColor: Colors.transparent,
	},
	centerContainer: {
		marginHorizontal: 20,
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
	contactText: {
		fontSize: 18,
		fontFamily: Fonts.family.Medium,
		color: Colors.darkBlueGrey
	},
	contactView: {
		width: 150,
		height: 50,
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: Colors.darkBlueGrey,
		borderWidth: 1
	},
});

export default AddCarer;
