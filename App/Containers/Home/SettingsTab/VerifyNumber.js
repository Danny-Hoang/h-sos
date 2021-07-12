import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Image,
  Text,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Colors, Strings, Metrics, Images, Fonts } from "../../../Theme";
import Body from "../../Auth/VerifyNumber/Components/Body";
import Configs from "../../../Configs";
import { TextButton, Popup } from "../../../Components";

const strings = Strings.settingTab;

class VerifyNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: Configs.DEFAULT_TIME_OUT,
      isDisable: true,
      inputPhoneNumber: this.props.inputPhoneNumber,
    };
  }

  onChangeText(text) {
    this.setState({ isDisable: text.length != 6 });
  }

  render() {
    const { timer, isDisable, inputPhoneNumber } = this.state;
    const { onClose, onDone } = this.props;
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
          <Text style={styles.title}>{Strings.settingTab.changeNumber}</Text>
        </View>
        <KeyboardAwareScrollView
          extraScrollHeight={40}
          keyboardShouldPersistTaps="handled"
          style={{
            flex: 1,
            padding: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.containerContent}>
                <View style={{ flex: 3, marginTop: 50 }}>
                  <Body
                    onChangeText={(text) => {
                      this.onChangeText(text);
                    }}
                    timer={timer}
                    phoneNumber={inputPhoneNumber}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAwareScrollView>
        <View style={{ marginHorizontal: 20, marginVertical: 27 }}>
          <TextButton
            disabled={isDisable}
            onClick={() => {
              onDone();
            }}
            style={{ borderWidth: 0 }}
          >
            {Strings.common.done}
          </TextButton>
        </View>
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
  containerContent: {
    flex: 1,
    justifyContent: "flex-start",
  },
  centerContainer: {
    height: 200,
    justifyContent: "center",
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
});

export default VerifyNumber;
