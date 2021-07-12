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
import { BottomPopup, HeaderWithBack, TextButton } from "../../Components";
import NavigationService from "../../Services/NavigationService";
import ContactUs from "../Auth/ContactUs";
import { RouterName } from "../../Navigator/RouteName";

const strings = Strings.support;

const Item = ({ title, hasNews = true }) => (
  <View style={styles.rowContainer}>
    <TouchableOpacity
      style={styles.rowItem}
      onPress={() => {
        if(title === strings.notices){
          NavigationService.pushToNewScreen(RouterName.Notices);
        }
      }}
    >
      <Text style={styles.name}>{title}</Text>
      <View style={{ flexDirection: "row" }}>
        {hasNews && <Image source={Images.icNew} style={styles.imageNew} />}
        <Image source={Images.btnArrowRight} style={styles.image} />
      </View>
    </TouchableOpacity>
    <View style={styles.border} />
  </View>
);

export default class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactUsVisible: false,
    };
  }
  render() {
    const { navigation } = this.props;
    const { contactUsVisible } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <HeaderWithBack navigation={navigation} title={strings.title} />
          <View
            style={{
              paddingTop: 8,
              justifyContent: "space-between",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <View>
              <Item title={strings.notices} hasNews={true} />
              <Item title={strings.faq} hasNews={false} />
            </View>
            <View style={{ marginBottom: 26, paddingHorizontal: 20 }}>
              <TextButton
                onClick={() => {
                  this.setState({ contactUsVisible: true });
                }}
                style={{
                  height: 60,
                  borderRadius: 0,
                }}
              >
                {strings.contactUs}
              </TextButton>
            </View>
          </View>
          <BottomPopup
            visible={contactUsVisible}
            onRequestClose={() => {
              this.setState({ contactUsVisible: false });
            }}
          >
            <View
              style={{ ...styles.bottomView, justifyContent: "flex-start" }}
            >
              <ContactUs
                onClose={() => {
                  this.setState({ contactUsVisible: false });
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
  border: {
    height: 1,
    backgroundColor: Colors.borderColorDateTime,
    marginLeft: 20,
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
});
