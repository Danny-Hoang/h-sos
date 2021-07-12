import React, { Component } from "react";
import styled from 'styled-components'
import { View, Text, StyleSheet, SafeAreaView, Alert, RefreshControl, ActivityIndicator, Platform } from "react-native";
import { Container, Touchable } from "../../../Components";
import { Strings, Fonts, Colors } from "../../../Theme";
import NavigationService from "../../../Services/NavigationService"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import CardInfo from "./Components/CardInfo";
import SOSCard from "./Components/SOSCard";
import { PermissionsAndroid } from 'react-native';
import Utils from "../../../Utils";
import AuthActions from "../../../Stores/Auth";
import { DevicesActions } from "../../../Stores/Devices";
import { connect } from "react-redux";
import { formatSOSTime } from "../../../Utils/time";
import { RouterName } from "../../../Navigator/RouteName";
import { fcmService } from '../../../Services/FCMService';
import { localNotificationService } from "../../../Services/LocalNotificationService";

const strings = Strings.home

const TitleText = styled.Text`
  font-family: ${Fonts.family.Regular};
  font-size: ${Fonts.size.h3};
  line-height: 35px;
  text-align: center;
  color: ${Colors.slateGrey};
`

const RegisterButton = ({ onClick, onLongAction }) => (
	<TouchableOpacity style={{ width: 280, height: 56, marginTop: 18 }} onPress={onClick} onLongPress={() => { onLongAction() }}>
		<View
			style={{
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				borderRadius: 4,
				backgroundColor: Colors.coral,
				flex: 1,
			}}
		>
			<Text
				style={{
					fontFamily: Fonts.family.Regular,
					fontSize: Fonts.size.h3,
					color: Colors.white,
				}}
			>
				{strings.buttonRegisterWatch}
			</Text>
		</View>
	</TouchableOpacity>
)

class HomeTab extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cardItems: [],
			time: 0,
			messageSos: [],
			refreshing: false,
		};
	}

	async componentDidMount() {

		//we check if user has granted permission to receive push notifications.
		const { getUserDevices, getDetailOutGoingEmergencyMessage, navigation, fetchAuth } = this.props
		this.focuslistener = navigation.addListener('didFocus', () => {
			console.log("Getting device list ...")
			getUserDevices()
			getDetailOutGoingEmergencyMessage()
		})
		fcmService.registerAppWithFCM();
		fcmService.register(this.onRegister.bind(this), this.onNotification.bind(this), this.onOpenNotification.bind(this));
		localNotificationService.configure(this.onOpenLocalNotification.bind(this))
	}

	componentWillUnmount() {
		fcmService.unRegister()
		localNotificationService.unregister()
	}

	onRegister(token) {
		console.log("[App] onRegister: ", token)
	}

	onNotification(notify) {
		console.log("[App] onNotification: ", notify)
		this.handleNotification(notify)
	}

	onOpenNotification(notify) {
		console.log("[App] onOpenNotification: ", notify)
		this.handleNotification(notify)
	}

	onOpenLocalNotification(notify) {
		console.log("[App] onOpenLocalNotification: ", notify)
		if (notify != undefined && (notify.typeLevel || JSON.parse(notify).typeLevel) === "EMERGENCY") {
			if (Platform.OS === 'ios') {
				if (notify !== undefined) {
					NavigationService.pushToNewScreen(RouterName.SOS, { 'activityId': notify.activityId || JSON.parse(notify).activityId})
				}
			} else {
				NavigationService.pushToNewScreen(RouterName.SOS, { 'activityId': notify.activityId || JSON.parse(notify).activityId })
			} 
		}
	}

	static getDerivedStateFromProps(props, prevState) {
		const { emergencyMessages, devices } = props
		const { messageSos } = prevState
		let sosItems = []
		let messageSOS = messageSos

		if (Array.isArray(emergencyMessages)) {
			sosItems = emergencyMessages.map(message => {
				return {
					deviceName: message.device.deviceName,
					createDate: message.createdDate,
					location: message.location,
					statusLevel: message.device.statusLevel,
					resolved: message.isTaken,
					activityId: message.activityId,
					takerName: message.takerName,
					isTaken: message.isTaken
				}
			})
		}

		// if (messageSos.length > 0) {
		// 	sosItems = []
		// }
		//
		// if (emergencyMessages == null) {
		// 	messageSOS = []
		// }

		if (devices != null && devices.length > 0) {
			return {
				cardItems: [...sosItems, ...devices]
			}
		} else {
			return null
		}
	}

	handleNotification(remoteMessage) {
		const { getDetailOutGoingEmergencyMessage } = this.props
		getDetailOutGoingEmergencyMessage();

		// if (remoteMessage !== null) {
		// 	const newMessage = remoteMessage.data.data.replace(/\\"/g, '"')
		// 	console.log(newMessage);
		// 	API.activity.didReceivedPush();
		//
		// 	if (JSON.parse(newMessage).typeLevel === Constants.TYPE_LEVEL.EMERGENCY) {
		// 		this.props.getDetailOutGoingEmergencyMessage()
		// 		switch (JSON.parse(newMessage).action) {
		// 			case Constants.ACTION_TYPES.ALERT:
		// 				const itemSOS = {
		// 					deviceName: JSON.parse(newMessage).device.deviceName,
		// 					createDate: JSON.parse(newMessage).createdDate,
		// 					location: JSON.parse(newMessage).location,
		// 					statusLevel: JSON.parse(newMessage).device.statusLevel,
		// 					resolved: JSON.parse(newMessage).resolved,
		// 					activityId: JSON.parse(newMessage).activityId
		// 				}
		// 				this.setState({
		// 					cardItems: [itemSOS, ...this.state.cardItems],
		// 					messageSos: [itemSOS, ...this.state.messageSos]
		// 				})
		// 				break
		// 			case Constants.ACTION_TYPES.RESOLVED:
		// 				this.setState({
		// 					cardItems: [this.props.devices],
		// 					messageSos: []
		// 				})
		// 				break
		// 			case Constants.ACTION_TYPES.CANCEL:
		// 				this.setState({
		// 					cardItems: [this.props.devices],
		// 					messageSos: []
		// 				})
		// 				break
		// 		}
		// 	}
		// }
	}

	onClickRegisterWatch = async () => {
		let hasCameraPermission = await Utils.requestPermission(PermissionsAndroid.PERMISSIONS.CAMERA)
		if (hasCameraPermission) {
			NavigationService.pushToNewScreen(RouterName.ScanQR)
		}
	}

	onPressSOS(activityId) {
		NavigationService.pushToNewScreen(RouterName.SOS, { 'activityId': activityId })
	}

	onRefresh() {
		console.log('refreshing...')
		const { getUserDevices, getDetailOutGoingEmergencyMessage } = this.props;
		getUserDevices()
		getDetailOutGoingEmergencyMessage()
	}

	onPressSummary() {
		NavigationService.pushToNewScreen(RouterName.Summary)
	}

	ItemSeparator = () => {
		return (
			<View
				style={{
					height: 10,
					width: "100%",
					backgroundColor: Colors.athensGray,
				}}
			/>
		);
	}

	ItemFooter = () => {
		return (
			<TouchableOpacity onPress={() => { NavigationService.pushToNewScreen(RouterName.EditOrder) }}>
				<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
					<View style={styles.editView}>
						<Text style={styles.editText}>{strings.edit}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	buildContent = () => {
		const { cardItems, refreshing } = this.state;
		const { devices, loading } = this.props

		if ((devices == null || devices.length == 0) && loading == false) {
			return <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
				<TitleText>{strings.titleRegisterWatch}</TitleText>
				<RegisterButton
					onClick={() => this.onClickRegisterWatch()}
					onLongAction={() => {
						// this.setState({ isShowRegisterButton: true });
					}} />
				{/*<Text style={{ paddingHorizontal: 40, fontSize: 12, color: Colors.borderColor }}>Long press to register watch button to display demo card list</Text>*/}
			</Container>
		} else if (devices != null && devices.length != 0) {
			return <Container style={{ backgroundColor: Colors.athensGray }}>
				{cardItems && <FlatList
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh.bind(this)} />
					}
					data={cardItems}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item, index, separators }) => {
						if (typeof item.users === 'undefined') {
							// this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000 * 60);
							return <SOSCard onPress={() => { this.onPressSOS(item.activityId) }}
								deviceName={item.deviceName}
								time={formatSOSTime(item.createDate)}
								resolved={item.resolved}
								helper={item.takerName}
							/>
						} else {
							return <CardInfo item={item} onPressMore={() => {
								NavigationService.pushToNewScreen(RouterName.MoreSetting, { device: item })
							}} onPressSummary={this.onPressSummary} />
						}
					}}

					scrollEventThrottle={16}
					ItemSeparatorComponent={this.ItemSeparator}
					ListFooterComponent={devices.length >= 2 ? this.ItemFooter : null}
				/>
				}
			</Container>
		} else {
			return <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
				<ActivityIndicator size="large" color={Colors.backgroundCompleteScreen} />
			</View>
		}
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1, backgroundColor: Colors.athensGray }}>
				{this.buildContent()}
			</SafeAreaView>
		);
	}
}

const mapStateToProps = ({ auth: { error, token, data }, userDevices: { devices, emergencyMessages, loading } }) => {
	return {
		error,
		loading,
		token,
		devices,
		emergencyMessages,
		userInfo: data
	}
}
const mapDispatchToProps = (dispatch) => ({
	fetchAuth: (email, password) => dispatch(AuthActions.fetchAuth(email, password)),
	getUserDevices: () => dispatch(DevicesActions.getUserDevices()),
	getDetailOutGoingEmergencyMessage: () => dispatch(DevicesActions.getDetailOutGoingEmergencyMessage()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab)

const styles = StyleSheet.create({
	item: {
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 2,
	},
	title: {
		fontSize: 32,
	},
	editView: {
		width: 76,
		height: 36,
		borderRadius: 18,
		backgroundColor: "#E1E1E6",
		marginBottom: 50,
		alignItems: 'center',
		justifyContent: 'center'
	},
	editText: {
		fontFamily: Fonts.family.Medium,
		fontSize: 20,
		color: Colors.darkGrey
	}
});


//
// {
// 	"typeLevel": "EMERGENCY",
// 	"eventType": "SOS",
// 	"message": null,
// 	"battery": 80,
// 	"transactionId": "38d4ba8d-6b3a-4f4d-b05c-bc73cf0d3f20-3773259677",
// 	"isSeries": true,
// 	"activityId": "165715b3-360c-40e3-abf5-1b5d9eca2906",
// 	"createdDate": "2021-06-01T09:17:46Z",
// 	"isShareTakenUserLocation": false,
// 	"taken": false,
// 	"modifiedDate": "2021-06-01T09:17:46Z",
// 	"action": "ALERT",
// 	"location": {
// 	"createdDate": "2021-06-01T09:17:46Z",
// 		"lng": 105.7817651,
// 		"accuracy": 145,
// 		"source": "LBS",
// 		"lat": 21.0176078
// },
// 	"user": null,
// 	"device": {
// 	"address": "14f Phạm Hùng, Mễ Trì, Từ Liêm, Hà Nội, Vietnam",
// 		"city": null,
// 		"mobile": "1111",
// 		"landLine": null,
// 		"battery": 80,
// 		"deviceId": "93ba98ef-8969-11e8-9679-02fff359650f",
// 		"deviceName": "yuy",
// 		"createdDate": "2018-07-17T02:31:57Z",
// 		"beacon": null,
// 		"deviceImgUrl": "https://vfeb-pre-device-image.s3.eu-central-1.amazonaws.com/93ba98ef-8969-11e8-9679-02fff359650f/93ba98ef-8969-11e8-9679-02fff359650f_profile.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20210601T091746Z&X-Amz-SignedHeaders=host&X-Amz-Expires=21600&X-Amz-Credential=AKIAI4JWAAXZHY4SFSQQ%2F20210601%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Signature=045810a90700b374a14bdfbebefcbfd188314f5c428b1e9f459cdb6f0b7d7806",
// 		"modifiedDate": "2021-06-01T09:17:29Z",
// 		"imei": "473648273940291",
// 		"deviceUid": "473648273940291",
// 		"initialize": true,
// 		"subMobile": null,
// 		"statusLevel": "EMERGENCY",
// 		"status": [
// 		"SOS"
// 	],
// 		"activated": true
// },
