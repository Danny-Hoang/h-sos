import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  BackHandler,
  SafeAreaView, PermissionsAndroid,
} from "react-native";
import { Colors, Fonts, Images, Strings } from "../../../Theme";
import { BottomPopup, Popup } from "../../../Components";
import ActionMore from "./ActionMore";
import NavigationService from "../../../Services/NavigationService";
import {RouterName} from "../../../Navigator/RouteName"
import VerifyNumber from "./VerifyNumber";
import ChangePhoneNumber from "./ChangePhoneNumber";
import RowItem from "../../../Components/RowItem";
import Utils from "../../../Utils";
import {connect} from "react-redux";
import AuthActions from "../../../Stores/Auth";
import API from "../../../Services/ApiService";

const strings = Strings.settingTab;

class SettingsTab extends Component {
  state = {
    modalEditVisible: false,
    isShowPopupTwoButton: false,
    modalVerifyVisible: false,
    userName: "Tom",
    modalChangeNumberVisible: false,
    photoUrl: Images.icMaleUser,
    phoneNumber: "+84 356182314",
    inputPhoneNumber: "",
    isShowPopupChangeNumber: false,
  };

  componentDidMount() {
    this.focuslistener = this.props.navigation.addListener('didFocus', () => {
      this.props.getUserInfo()
    })

  }

  onClose = () => {
    this.setState({
      modalEditVisible: false,
      isShowPopupTwoButton: false,
    });
  };

  onClosePopup = () => {
    this.setState(
      {
        isShowPopupChangeNumber: false,
      },
      () => {
        NavigationService.navigateAndReset(RouterName.Login);
      }
    );
  };

  onClickRegisterWatch = async () => {
    let hasCameraPermission = await Utils.requestPermission(PermissionsAndroid.PERMISSIONS.CAMERA)
    if (hasCameraPermission) {
      NavigationService.pushToNewScreen(RouterName.ScanQR)
    }
  }

  editProfile = () => {
    this.setState({
      modalEditVisible: false,
    }, () => {
      NavigationService.navigate(RouterName.EditProfile);
    });

  };

  changePhoneNumber = () => {};

  onSaveNewProfile = (name, url) => {
    this.setState({
      userName: name,
      photoUrl: url,
    });
  };

  clickLogout = () => {
    const {logout} = this.props;
    logout();
    this.setState(
      {
        isShowPopupTwoButton: false,
      },
      () => {
        NavigationService.navigateAndReset(RouterName.Splash);
      }
    );
  };

  static getDerivedStateFromProps(props, prevState) {
    const { userInfo } = props

    if (userInfo !== undefined) {
      return {
        userName: userInfo.nickName,
        phoneNumber: userInfo.phoneNumber,
        photoUrl: userInfo.userImgUrl
      }
    } else {
      return null
    }
  }

  render() {
    const {
      isShowPopupTwoButton,
      modalEditVisible,
      modalVerifyVisible,
      modalChangeNumberVisible,
      userName,
      photoUrl,
      phoneNumber,
      inputPhoneNumber,
      isShowPopupChangeNumber,
    } = this.state;

    return (
      <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
        <Text style={styles.header}>{strings.title}</Text>

        <ScrollView>
          <View style={styles.profileRow}>
            <View style={{ flex: 1 }}>
              <Image
                source={
                  (photoUrl !== null && typeof photoUrl === 'string')
                    ? { uri: photoUrl }
                    : Images.icMaleUser
                }
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            <View style={{ flex: 3, paddingLeft: 20 }}>
              <Text style={styles.nameText}>{userName}</Text>
              <Text style={styles.phoneText}>{phoneNumber}</Text>
            </View>

            <TouchableOpacity
              style={{ flex: 1, alignItems: "flex-end", height: 40 }}
              onPress={() => {
                this.setState({ modalEditVisible: true });
              }}
            >
              <Image source={Images.icMore} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
          </View>

          <View style={styles.col}>
            <RowItem
                title={strings.registerWatch}
                onPress={ () => this.onClickRegisterWatch() }
            />
            <View style={styles.borderView} />
            <RowItem
                title={strings.appNotification}
                onPress={ () => { NavigationService.pushToNewScreen(RouterName.AppNotification) }}
            />
          </View>

          <View style={styles.col}>
            <RowItem
                title={strings.support}
                onPress={ () => {NavigationService.pushToNewScreen(RouterName.Support)} }
            />
            <View style={styles.borderView} />
            <RowItem
                title={strings.aboutService}
                onPress={ () => { NavigationService.pushToNewScreen(RouterName.AppService) } }
            />
          </View>

          <View style= {{
            backgroundColor: Colors.white,
            height: 60,
            marginTop: 20,}
          }>
            <RowItem
                title="Change develop environment"
                onPress={ () => {NavigationService.pushToNewScreen(RouterName.ChangeServerURL)} }
            />
          </View>
        </ScrollView>
        <Popup.TwoButtons
          visible={isShowPopupTwoButton}
          title={strings.popupLogOut.title}
          content={strings.popupLogOut.message}
          okText={Strings.common.popup.logout}
          onClose={this.onClose}
          onClickOk={this.clickLogout}
          onClickCancel={this.onClose}
        />

        <Popup.OneButton
          visible={isShowPopupChangeNumber}
          title={strings.popupChangeNumber.title}
          content={strings.popupChangeNumber.message}
          onClickConfirm={this.onClosePopup}
        />

        <BottomPopup
          visible={modalEditVisible}
          onRequestClose={() => {
            this.setState({ modalEditVisible: false });
          }}
        >
          <View style={styles.bottomView}>
            <ActionMore
              onClose={() => {
                this.setState({ modalEditVisible: false });
              }}
              editProfile={() => {
                this.editProfile();
              }}
              changePhoneNumber={() => {
                this.setState({
                  modalChangeNumberVisible: true,
                  modalEditVisible: false});
              }}
              logout={() => {
                this.setState({
                  isShowPopupTwoButton: true,
                  modalEditVisible: false,
                });
              }}
            />
          </View>
        </BottomPopup>

        <BottomPopup
          visible={modalVerifyVisible}
          onRequestClose={() => {
            this.setState({ modalVerifyVisible: false });
          }}
        >
          <View style={styles.bottomView}>
            <VerifyNumber
              inputPhoneNumber={inputPhoneNumber}
              onClose={() => {
                this.setState({ modalVerifyVisible: false });
              }}
              onDone={() => {
                this.setState({
                  modalVerifyVisible: false,
                  modalChangeNumberVisible: false,
                  isShowPopupChangeNumber: true,
                });
              }}
            />
          </View>
        </BottomPopup>

        <BottomPopup
          visible={modalChangeNumberVisible}
          onRequestClose={() => {
            this.setState({ modalChangeNumberVisible: false });
          }}
        >
          <View style={styles.bottomView}>
            <ChangePhoneNumber
              onClose={() => {
                this.setState({ modalChangeNumberVisible: false });
              }}
              verifyNumber={(number) => {
                this.setState(
                  {
                    inputPhoneNumber: number,
                    modalVerifyVisible: true,
                  });
              }}
            />
          </View>
        </BottomPopup>
      </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ auth: { data } }) => ({
  userInfo: data
})

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: () => dispatch(AuthActions.getUserInfo()),
  logout: () => dispatch(AuthActions.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.athensGray,
  },
  phoneText: {
    color: Colors.cobalt,
    fontFamily: Fonts.family.Medium,
    fontSize: Fonts.size.regular,
  },
  fieldText: {
    flex: 3,
    color: Colors.darkGrey,
    fontSize: 16
},
  nameText: {
    fontFamily: Fonts.family.Medium,
    fontSize: Fonts.size.h3,
  },
  col: {
    backgroundColor: Colors.white,
    height: 120,
    marginTop: 20,
  },
  profileRow: {
    flexDirection: "row",
    height: 120,
    backgroundColor: Colors.white,
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 13,
    marginTop: 18,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    fontSize: 28,
    color: Colors.darkGrey,
    fontFamily: Fonts.family.Bold,
  },
  item: {
    height: 60,
    paddingLeft: 20,
    paddingRight: 13,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },
  textItem: {
    fontFamily: Fonts.family.Bold,
    fontSize: Fonts.size.regular,
    color: Colors.darkGrey,
  },
  imageItem: {
    height: 24,
    width: 24,
    alignSelf: "center",
  },
  buttonItem: {
    justifyContent: "center",
    height: 40,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 64/2
  },
  borderView: {
    backgroundColor: Colors.borderColorDateTime,
    height: 1,
    marginLeft: 20,
  },
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
    height: 200,
  },
});
