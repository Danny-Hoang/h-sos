import React, { Component } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, Fonts, Images, Strings } from "../../Theme";
import { HeaderWithBack, PrimarySwitch, TextButton } from "../../Components";
import NavigationService from "../../Services/NavigationService";
import { connect } from "react-redux";
import { RouterName } from "../../Navigator/RouteName";

const strings = Strings.aboutwatch;

const ItemInfor = ({ name, value }) => (
  <View style={styles.rowContainer}>
    <View style={styles.rowItem}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
    <View style={styles.border} />
  </View>
);
const ItemUpdate = ({ isLatest = true }) => (
  <View style={styles.rowContainer}>
    <TouchableOpacity
      style={styles.rowItem}
      onPress={() => {
        NavigationService.pushToNewScreen(RouterName.WatchUpdate, {
          isLatest: false,
        });
      }}
    >
      <Text style={styles.name}>{strings.watchUpdate}</Text>
      <View style={{ flexDirection: "row" }}>
        {isLatest && <Image source={Images.icNew} style={styles.imageNew} />}
        <Image source={Images.btnArrowRight} style={styles.image} />
      </View>
    </TouchableOpacity>
    <View style={styles.border} />
  </View>
);

class AboutWatch extends Component {
  render() {
    const { navigation, device } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{ paddingTop: 8 }}>
            <HeaderWithBack navigation={navigation} title={strings.title} />
            <ItemInfor name={strings.name} value={device.deviceName} />
            <ItemUpdate isLatest={true} />
            <View style={{ height: 15 }} />
            <ItemInfor name={strings.imei} value={device.imei} />
            <ItemInfor name={strings.simId} value="12341234" />
            <ItemInfor name={strings.snc} value="123412341234" />
            <View style={{ height: 25 }} />
            <TextButton
              onClick={() => {
                NavigationService.pushToNewScreen(RouterName.Disconnection);
              }}
              style={{
                backgroundColor: Colors.white,
                color: Colors.red,
                height: 60,
                borderRadius: 0,
              }}
            >
              {strings.disconnection}
            </TextButton>
          </View>
          <ScrollView></ScrollView>
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
  rowContainer: {
    backgroundColor: Colors.white,
  },
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  name: {
    fontFamily: Fonts.family.Bold,
    fontSize: Fonts.size.regular,
    color: Colors.darkGrey,
  },
  value: { color: Colors.slateGrey },
  border: {
    height: 1,
    backgroundColor: Colors.borderColorDateTime,
    marginLeft: 20,
  },
  imageNew: { width: 20, height: 20, alignSelf: "center" },
  image: { height: 24, width: 24 },
});

const mapStateToProps = ({ userDevices: { device } }) => {
	return {
		device,
	}
}
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(AboutWatch)
