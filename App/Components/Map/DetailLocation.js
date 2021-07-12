import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextButton } from "../../Components";
import { Fonts, Colors, Strings } from "../../Theme";

export default ({ text, disabled, onLocationSelect }) => {
  return (
    <View style={styles.deatilSection}>
      <Text
        numberOfLines={2}
        style={{ fontSize: 19, fontFamily: Fonts.family.Regular, textAlign: 'center' }}
      >
        {text}
      </Text>
      <TextButton disabled={disabled} onClick={onLocationSelect}>
        {Strings.address.buttonSetLocation}
      </TextButton>
    </View>
  );
};
const styles = StyleSheet.create({
  deatilSection: {
    height: 170,
    backgroundColor: Colors.white,
    padding: 10,
    justifyContent: "space-around",
    shadowColor: Colors.shadowsColor,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: -10,
    },
    elevation: 4,
  },
});
