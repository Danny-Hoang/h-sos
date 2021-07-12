import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Colors, Fonts, Images, Strings, Metrics } from "../../Theme";
import { NameInput, PrimarySwitch, TextButton } from "../../Components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Slider from "react-native-slider-custom";

const strings = Strings.geofencing;

class Bound extends Component {
  constructor(props) {
    super(props);
    const item = this.props.item;
    this.state = {
      bound: item.bound,
      monitoring: item.isActive,
      nameInput: item.title,
    };
  }

  onClickDelete() {
    this.props.onDelete(this.props.item);
  }

  render() {
    const { onClose, item } = this.props;
    const { monitoring, bound, nameInput } = this.state;
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
          <Text style={styles.title}>{strings.bound}</Text>
        </View>
        <KeyboardAwareScrollView
          extraScrollHeight={40}
          keyboardShouldPersistTaps="handled"
          style={{
            flex: 1,
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20,
          }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ justifyContent: "space-between", flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.containerContent}>
                <View
                  style={{
                    borderBottomColor: Colors.borderColorDateTime,
                    borderBottomWidth: 1,
                  }}
                >
                  <PrimarySwitch
                    title={strings.monitoring}
                    value={monitoring}
                    onChange={(val) => this.setState({ monitoring: val })}
                  />
                </View>

                <View style={styles.address}>
                  <Text
                    style={{
                      flex: 1,
                      ...styles.textField,
                    }}
                  >
                    {strings.address}
                  </Text>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{
                      flex: 2,
                      fontFamily: Fonts.family.Bold,
                      fontSize: Fonts.size.regular,
                      color: Colors.darkGrey,
                    }}
                  >
                    {item.address}
                  </Text>
                </View>

                <View style={styles.bound}>
                  <Text
                    style={{
                      ...styles.textField,
                      marginBottom: 5,
                    }}
                  >
                    {strings.setTheBound}
                  </Text>
                  <Slider
                    value={bound}
                    onValueChange={(value) => this.setState({ bound: value })}
                    maximumTrackTintColor={Colors.lightBlueGrey}
                    minimumTrackTintColor={Colors.darkGrey}
                    step={1}
                    maximumValue={10}
                    minimumValue={1}
                    thumbStyle={styles.thumbStyle}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>{bound}km</Text>
                    <Text>10km</Text>
                  </View>
                </View>

                <View style={styles.name}>
                  <Text style={{ ...styles.textField, flex: 1 }}>
                    {strings.name}
                  </Text>
                  <NameInput
                    style={{ fontFamily: Fonts.family.Regular, flex: 2 }}
                    initialValue={nameInput}
                    maxLength={15}
                    onChange={(text) => this.setState({ nameInput: text })}
                    containUnderline={false}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
            <TextButton
              style={styles.buttonDelete}
              onClick={this.onClickDelete.bind(this)}
            >
              {Strings.common.delete}
            </TextButton>
          </View>
        </KeyboardAwareScrollView>
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
  buttonDelete: {
    backgroundColor: Colors.white,
    color: Colors.red,
    borderColor: Colors.red,
    borderWidth: 1,
  },
  name: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColorDateTime,
    flexDirection: "row",
    alignItems: "center",
  },
  monitor: {
    flexDirection: "row",
    borderBottomColor: Colors.borderColorDateTime,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    height: 60,
    alignItems: "center",
    paddingRight: 3,
  },
  address: {
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColorDateTime,
    flexDirection: "row",
    alignItems: "center",
  },
  bound: {
    marginTop: 10,
    height: 110,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColorDateTime,
    paddingTop: 10,
  },
  textField: {
    color: Colors.darkGrey,
    fontSize: 16,
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
  thumbStyle: {
    width: 32,
    height: 32,
    borderRadius: 17,
    borderColor: Colors.charcoalGreyTwo,
    backgroundColor: Colors.white,
    borderWidth: 1,
  },
});

export default Bound;
