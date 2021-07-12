import React, { Component } from "react";
import { View, StyleSheet, Text, Image, BackHandler } from "react-native";
import { Colors, Fonts, Images, Strings } from "../Theme";
import NavigationService from "../Services/NavigationService";
import { TextButton } from "../Components";
import { RouterName } from "../Navigator/RouteName";

class CompletionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: !NavigationService.hasRouter(RouterName.ScanQR),
    };
  }

  onClickDone = () => {
    if (this.state.isUpdate) {
      NavigationService.navigate(RouterName.AboutWatch);
    } else {
      NavigationService.pushToNewScreen(RouterName.RequiredInfo, {imei: this.props.navigation.getParam('imei')});
    }
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
    return true;
  };

  render() {
    const { isUpdate } = this.state;
    const strings = isUpdate
      ? Strings.completionScreen.updateWatch
      : Strings.completionScreen.registerProfile;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          backgroundColor: Colors.backgroundCompleteScreen,
        }}
      >
        <View style={styles.contentTop}>
          {<Image source={Images.icCompleteConnect} style={styles.image} />}
          <Text style={[styles.title, { marginBottom: 17 }]}>
            {Strings.completionScreen.title}
          </Text>
          <Text style={styles.message}>{strings.message}</Text>
        </View>
        <View style={styles.contentBottom}>
          <TextButton style={styles.button} onClick={this.onClickDone}>
            {strings.button}{" "}
          </TextButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.family.Bold,
    fontSize: 28,
    textAlign: "center",
    color: Colors.white,
  },
  message: {
    fontFamily: Fonts.family.Regular,
    fontSize: 18,
    textAlign: "center",
    color: Colors.white,
    opacity: 0.7,
  },
  contentTop: {
    flex: 5,
    paddingTop: 156,
    justifyContent: "center",
  },
  contentBottom: {
    flex: 5,
    justifyContent: "flex-end",
    paddingBottom: 27,
    paddingHorizontal: 20,
  },
  image: {
    height: 80,
    width: 80,
    alignSelf: "center",
    marginBottom: 27,
  },
  button: {
    backgroundColor: Colors.white,
    color: Colors.darkBlueGrey,
  },
});

export default CompletionScreen;
