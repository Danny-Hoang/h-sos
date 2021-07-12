import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Slider from "react-native-slider-custom";
import { Colors, Strings } from "../../Theme";
import { TextButton } from "../../Components";
export default ({ value, onChangeBound, onSelectBound }) => {
  return (
    <View style={styles.deatilSection}>
      <View>
        <Slider
          value={value}
          onValueChange={(value) => onChangeBound(value)}
          maximumTrackTintColor={Colors.lightBlueGrey}
          minimumTrackTintColor={Colors.lightishBlue}
          step={1}
          maximumValue={10}
          minimumValue={1}
          thumbStyle={{
            width: 32,
            height: 32,
            borderRadius: 17,
            borderColor: Colors.lightishBlue,
            backgroundColor: Colors.white,
            borderWidth: 2,
          }}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{value}Km</Text>
          <Text>10Km</Text>
        </View>
      </View>
      <TextButton onClick={onSelectBound}>
        {Strings.geofencing.buttonSetAsBound}
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
