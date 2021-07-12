import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors, Fonts } from "../Theme";
import { Switch } from "react-native-switch";

class PrimarySwitch extends Component {
  render() {
    const { onChange, title, value } = this.props;
    return (
      <View style={styles.monitor}>
        <Text
          style={{
            fontFamily: Fonts.family.Bold,
            fontSize: Fonts.size.regular,
            color: Colors.darkGrey,
          }}
        >
          {title}
        </Text>

        <Switch
          circleSize={30}
          value={value}
          backgroundActive={Colors.red}
          backgroundInactive={Colors.lightBlueGrey}
          renderActiveText={false}
          renderInActiveText={false}
          disabled={false}
          circleActiveColor={Colors.white}
          circleInActiveColor={Colors.white}
          onValueChange={(val) => onChange(val)}
          circleBorderWidth={2}
          innerCircleStyle={{
            borderColor: value ? Colors.red : Colors.lightBlueGrey,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  monitor: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    backgroundColor: Colors.white,
    alignItems: "center",
    paddingRight: 3,
  },
});

export default PrimarySwitch;
