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
import styled from "styled-components";
import { Colors, Fonts, Images, Strings } from "../../Theme";
import {
  BottomPopup,
  HeaderWithBack,
  PrimarySwitch,
  TextButton,
} from "../../Components";
import TermScreen from "../Auth/Term";
import NavigationService from "../../Services/NavigationService";
import Constants from "../../Constants";
import { RouterName } from "../../Navigator/RouteName";

const strings = Strings.aboutwatch;

const ItemUpdate = ({ version }) => (
  <View style={styles.rowContainer}>
    <View style={styles.rowItem}>
      <Text style={styles.name}>{strings.watchUpdate}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.value}>{version}</Text>
        <Image source={Images.btnArrowRight} style={styles.image} />
      </View>
    </View>
    <View style={styles.border} />
  </View>
);

export default class WatchUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuto: true,
      modalUpdateVisible: false,
    };
  }

  render() {
    const { navigation, isLatest = false } = this.props;
    const { isAuto, modalUpdateVisible } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={{ paddingTop: 8, flex: 1 }}>
            <HeaderWithBack navigation={navigation} title={strings.title} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <ItemUpdate version={"v1.1.2"} />
              {!isLatest && <View style={{ height: 20 }} />}

              {!isLatest && <ItemUpdate version={"v1.1.2"} />}

              {!isLatest && (
                <View style={styles.row}>
                  <Text style={styles.updateContent}>
                    {strings.updateContent}
                  </Text>
                  <Text style={styles.updateMessage}>
                    {strings.updateMessage}
                  </Text>
                  <TextButton
                    style={styles.seeMore}
                    onClick={() => {
                      this.setState({ modalUpdateVisible: true });
                    }}
                  >
                    {strings.seeMore}
                  </TextButton>
                </View>
              )}
              <View style={{ height: 20 }} />
              <View style={styles.row}>
                <PrimarySwitch
                  title={strings.automaticInstall}
                  value={isAuto}
                  onChange={(val) => this.setState({ isAuto: val })}
                />
              </View>

              <View style={{ height: 20 }} />

              <Text style={styles.message}>{strings.message}</Text>
              <View style={{ height: 35 }} />
              {!isLatest && (
                <View style={{ paddingHorizontal: 20, marginBottom: 26 }}>
                  <TextButton
                    onClick={() => {
                      NavigationService.pushToNewScreen(
                        RouterName.WatchConnect,
                        { type: Constants.SEARCH_WATCH }
                      );
                    }}
                    style={{
                      color: Colors.white,
                      backgroundColor: Colors.coral,
                    }}
                  >
                    {strings.updateNow}
                  </TextButton>
                </View>
              )}
            </ScrollView>
          </View>

          <BottomPopup
            visible={modalUpdateVisible}
            onRequestClose={() => {
              this.setState({ modalUpdateVisible: false });
            }}
          >
            <View style={styles.bottomView}>
              <TermScreen
                title={strings.updateContent}
                onClose={() => {
                  this.setState({ modalUpdateVisible: false });
                }}
              />
            </View>
          </BottomPopup>
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
  row: { paddingHorizontal: 20, backgroundColor: Colors.white },
  value: { color: Colors.slateGrey },
  border: {
    height: 1,
    backgroundColor: Colors.borderColorDateTime,
    marginLeft: 20,
  },
  message: {
    fontSize: Fonts.size.medium,
    color: Colors.slateGrey,
    paddingHorizontal: 20,
  },
  imageNew: { width: 20, height: 20, alignSelf: "center" },
  image: { height: 24, width: 24 },
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
    height: 200,
  },
  updateMessage: {
    color: Colors.charcoalGreyTwo,
    fontSize: Fonts.size.medium,
  },
  seeMore: {
    fontFamily: Fonts.family.Bold,
    fontSize: Fonts.size.medium,
    backgroundColor: Colors.white,
    color: Colors.brightBlue,
    alignSelf: "flex-end",
  },
  updateContent: {
    fontSize: 17,
    color: Colors.darkGrey,
    paddingVertical: 15,
  },
});
