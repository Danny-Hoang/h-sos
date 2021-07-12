import React, { Component } from "react";

import { View, Text, Image, BackHandler } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { Metrics, Strings, Fonts, Colors, Images } from "../../../Theme";
import { Touchable, Popup } from "../../../Components";
import NavigationService from "../../../Services/NavigationService";
import Constants from '../../../Constants'
import {RouterName} from "../../../Navigator/RouteName";

const strings = Strings.scanQR

const SCREEN_HEIGHT = Metrics.screenHeight;
const SCREEN_WIDTH = Metrics.screenWidth;
const overlayColor = "rgba(0,0,0,0.4)";
const rectDimensions = SCREEN_WIDTH * 0.65;

const CannotBeReadButton = ({ onClick }) => (
  <Touchable style={{ height: 56, alignSelf: 'stretch' }} onPress={onClick}>
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: Colors.white,
        flex: 1,
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.family.Regular,
          fontSize: Fonts.size.h3,
          lineHeight: 20,
        }}
      >
        {strings.buttonCannotBeRead}
      </Text>
    </View>
  </Touchable>
)
class ScanQR extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isShow: false,
      contentError: '',
    }
    this.scanner = React.createRef();
  }

  clickConfirm = () => {
    this.setState({
      isShow: false,
    }, () => {
      this.scanner.reactivate();
    })
  }

  UNSAFE_componentWillMount() {
    const {navigation} = this.props;
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.focuslistener = navigation.addListener('didFocus', () => {
			this.scanner.reactivate();
		})
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick = () => {
    if (this.state.isShow) {
      return true;
    }
  };

  onSuccess(e) {

    console.log('QR code result: ', e.data)
    NavigationService.pushToNewScreen(RouterName.WatchConnect, { type: Constants.CONNECT_WATCH, imei: e.data })

    // var randomNumber = Math.floor(Math.random() * 3) + 1;
    // if (randomNumber === 3) {
    //   NavigationService.pushToNewScreen('WatchConnect', { type: Constants.CONNECT_WATCH })
    // } else if (randomNumber === 2) {
    //   this.setState({
    //     isShow: true,
    //     contentError: strings.errorInvalidCode,
    //   })
    // } else {
    //   this.setState({
    //     isShow: true,
    //     contentError: strings.errorOverlapCode,
    //   })
    // }
  }

  back() {
    const { navigation } = this.props
    navigation.pop()
  }

  openRegisterWatchDigit = () => {
    NavigationService.pushToNewScreen('RegisterWatchDigit')
  }

  render() {
    const { isShow, contentError } = this.state
    return (
      <QRCodeScanner
        showMarker
        onRead={this.onSuccess}
        ref={node => {this.scanner = node}}
        cameraStyle={{ height: SCREEN_HEIGHT }}
        customMarker={
          <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay}>
              <Touchable onPress={() => this.back()}>
                <View style={{ justifyContent: 'center', width: 70, height: 70, alignItems: 'center' }}>
                  <Image style={{ width: 24, height: 24, tintColor: Colors.white }} source={Images.iconArrowLeft} />
                </View>
              </Touchable>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.leftAndRightOverlay} />

              <View style={styles.rectangle} >
                {/* <Row>
                  <View style={styles.rectangleTopLeft} />
                  <View style={styles.rectangleTopRight} />
                </Row>
                <Row>
                  <View style={styles.rectangleBottomLeft} />
                  <View style={styles.rectangleBottomRight} />
                </Row> */}

              </View>


              <View style={styles.leftAndRightOverlay} />

            </View>

            <View style={styles.bottomOverlay} >
              <Text style={{ fontSize: 22, color: "white", textAlign: "center" }}>
                {strings.title}
              </Text>

              <CannotBeReadButton onClick={() => this.openRegisterWatchDigit()} />
            </View>
            <Popup.OneButton
              visible={isShow}
              title={strings.titleError}
              content={contentError}
              onClickConfirm={this.clickConfirm}
            />
          </View>
        }
      />
    );
  }
}

const styles = {
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.transparent
  },

  rectangleTopLeft: {
    height: 40,
    width: 40,
    // borderWidth: 3,
    // borderTopColor: Colors.cobalt,
    // borderLeftColor: Colors.cobalt,
    // borderRightColor: Colors.transparent,
    // borderBottomColor: Colors.transparent,
    backgroundColor: Colors.transparent,
  },

  rectangleTopRight: {
    height: 40,
    width: 40,
    // borderWidth: 3,
    // borderTopColor: Colors.cobalt,
    // borderLeftColor: Colors.transparent,
    // borderRightColor: Colors.cobalt,
    // borderBottomColor: Colors.transparent,
    backgroundColor: Colors.transparent,
  },

  rectangleBottomLeft: {
    height: 40,
    width: 40,
    // borderWidth: 3,
    // borderTopColor: Colors.transparent,
    // borderLeftColor: Colors.cobalt,
    // borderRightColor: Colors.transparent,
    // borderBottomColor: Colors.cobalt,
    backgroundColor: Colors.transparent,
  },

  rectangleBottomRight: {
    height: 40,
    width: 40,
    // borderWidth: 3,
    // borderTopColor: Colors.transparent,
    // borderLeftColor: Colors.transparent,
    // borderRightColor: Colors.cobalt,
    // borderBottomColor: Colors.cobalt,
    backgroundColor: Colors.transparent,
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    flexDirection: 'column',
    backgroundColor: Colors.transparent,
    justifyContent: 'space-between'
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    alignItems: "flex-start"
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: 50,
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between",
    alignItems: "center"
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

};

export default ScanQR;
