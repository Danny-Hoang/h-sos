import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  BackHandler,
} from "react-native";
import { Colors, Fonts, Strings } from "../../Theme";
import { HeaderWithBack, Popup, TextButton } from "../../Components";
import NavigationService from "../../Services/NavigationService";
import { RouterName } from "../../Navigator/RouteName";

const strings = Strings.aboutwatch;

export default class Disconnection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayPopupTwoButton: false,
      isDisplayPopupOneButton: false,
    };
  }

  clickOk = () => {
    this.setState(
      {
        isDisplayPopupOneButton: false,
      },
      () => {
        NavigationService.navigate(RouterName.HomeNavigator);
      }
    );
  };
  onClose = () => {
    this.setState({
      isDisplayPopupTwoButton: false,
    });
  };

  onClickDisconnect = () => {
    this.setState({
      isDisplayPopupTwoButton: false,
      isDisplayPopupOneButton: true,
    });
  };

  UNSAFE_componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = () => {
    return (
      this.state.isDisplayPopupOneButton || this.state.isDisplayPopupTwoButton
    );
  };

  render() {
    const { navigation } = this.props;
    const { isDisplayPopupOneButton, isDisplayPopupTwoButton } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <HeaderWithBack
            navigation={navigation}
            title={strings.disconnection}
          />
          <View style={styles.viewContent}>
            <Text style={styles.messsage}>{strings.disconnectionMessage}</Text>
            <View style={styles.buttons}>
              <TextButton
                style={styles.cancel}
                onClick={() => {
                  navigation.pop();
                }}
              >
                {Strings.common.cancel}
              </TextButton>
              <TextButton
                style={styles.delete}
                onClick={() => {
                  this.setState({ isDisplayPopupTwoButton: true });
                }}
              >
                {Strings.common.delete}
              </TextButton>
            </View>
          </View>

          <Popup.TwoButtons
            visible={isDisplayPopupTwoButton}
            title={strings.popup.title}
            content={strings.popup.messageWarning}
            okText={Strings.common.disconnect}
            onClose={this.onClose}
            onClickOk={this.onClickDisconnect}
            onClickCancel={this.onClose}
          />
          <Popup.OneButton
            visible={isDisplayPopupOneButton}
            title={strings.popup.title}
            content={strings.popup.messageCompleted}
            onClickConfirm={this.clickOk}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.athensGray,
  },
  cancel: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.coolGrey,
    color: Colors.darkGrey,
  },
  delete: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.red,
    color: Colors.red,
  },
  buttons: {
    marginBottom: 26,
    justifyContent: "space-between",
    height: 124,
  },
  messsage: {
    color: Colors.darkGrey,
    fontFamily: Fonts.family.Regular,
    fontSize: Fonts.size.regular,
  },
  viewContent: {
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 20,
    flexDirection: "column",
    flex: 1,
  },
});
