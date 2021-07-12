import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts, Images, Metrics, Strings } from "../../../Theme";

const strings = Strings.settingTab;

const ActionMore = ({ onClose, editProfile, changePhoneNumber, logout }) => {
  return (
    <View style={{ ...styles.scrollableModal, height: 260 }}>
      <TouchableOpacity
        onPress={() => {
          onClose();
        }}
      >
        <View style={styles.closeView}>
          <Image style={styles.closeImage} source={Images.icClose} />
        </View>
      </TouchableOpacity>

      <View style={styles.list}>
        <TouchableOpacity
          onPress={() => {
            editProfile();
          }}
        >
          <View style={styles.row}>
            <Text style={styles.text}>{strings.editProfile}</Text>
          </View>
          <View style={styles.underline} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            changePhoneNumber();
          }}
        >
          <View style={styles.row}>
            <Text style={styles.text}>{strings.changeNumber}</Text>
          </View>
          <View style={styles.underline} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logout();
          }}
        >
          <View style={styles.row}>
            <Text style={{ ...styles.text, color: Colors.red }}>
              {strings.logout}
            </Text>
          </View>
          <View style={styles.underline} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  scrollableModal: {
    height: 260,
    width: Metrics.screenWidth,
  },
  list: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flex: 1,
  },
  closeImage: {
    width: 24,
    height: 24,
  },
  closeView: {
    width: 40,
    height: 40,
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
    marginBottom: 5,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: Fonts.family.Medium,
    color: Colors.darkGrey,
  },
  underline: {
    backgroundColor: Colors.paleGrey,
    height: 1,
  },
  row: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ActionMore;
