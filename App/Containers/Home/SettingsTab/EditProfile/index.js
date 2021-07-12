import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Text,
  SafeAreaView
} from "react-native";
import { Colors, Fonts, Images, Strings, Metrics } from "../../../../Theme";
import {
  NameInput,
  Avatar,
  BottomPopup,
  ChoosePhotoPopup,
  TextButton,
  HeaderWithBack,
} from "../../../../Components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import { connect } from "react-redux";
import AuthActions from "../../../../Stores/Auth";
import PrimaryTextInput from '../../../../Components/PrimaryTextInput';

const strings = Strings.setProfile;

class EditProfile extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      modalPhotoVisible: false,
      photoSelected: {uri: props.userInfo.userImgUrl},
      nameInput: props.userInfo.nickName
    };
  }

  static getDerivedStateFromProps(props, prevState) {
    const { userInfo, navigation } = props
    return null
  }

  takePhotoAction = () => {
    launchCamera({ mediaType: "photo" }, (response) => {
      if (response.uri != null) {
        this.setState({
          photoSelected: mapPhotoObject(response),
        });
        this.setState({ modalPhotoVisible: false })
      }
    });
  };

  selectGallery = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.uri != null) {
        this.setState({
          photoSelected: this.mapPhotoObject(response),
        });
        this.setState({ modalPhotoVisible: false })
      }
    });
  };

  mapPhotoObject = (response) => {
    let photoObject = {}
    photoObject.name = response.fileName
    photoObject.uri = response.uri
    photoObject.type = response.type
    return photoObject
  }

  render() {
    const { navigation, updateUserInfo, userInfo } = this.props;
    const { modalPhotoVisible, photoSelected, nameInput } = this.state;
    const isDisable = (nameInput == userInfo.nickName || nameInput == "") && photoSelected.uri == userInfo.userImgUrl
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <View style={styles.container}>
          <HeaderWithBack
            navigation={navigation}
            title={strings.editProfile}
          />

          <KeyboardAwareScrollView
            extraScrollHeight={40}
            keyboardShouldPersistTaps="handled"
            style={{
              flex: 1,
              paddingHorizontal: 20,
              paddingBottom: 20,
            }}
            contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ justifyContent: "space-between", flex: 1 }}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                  <View style={styles.avatar}>
                    <Avatar
                      photoUrl={photoSelected.uri}
                      onPress={() => {
                        this.setState({ modalPhotoVisible: true })
                      }}
                    />
                  </View>
                  <NameInput
                    initialValue={userInfo.nickName}
                    placeholder={userInfo.nickName}
                    maxLength={15}
                    onChange={(text) => this.setState({ nameInput: text })}
                    titleName={strings.name}
                  />
                </View>
              </TouchableWithoutFeedback>
              <TextButton
                disabled={isDisable}
                onClick={() => {
                  var data = { nickName: nameInput }
                  if(photoSelected.uri != userInfo.userImgUrl){
                    data = {...data, userImg: photoSelected}
                  }
                  updateUserInfo({userInfo: data});
                  navigation.pop();
                }}>
                {Strings.common.save}
              </TextButton>
            </View>
          </KeyboardAwareScrollView>

          <BottomPopup
            visible={modalPhotoVisible}
            onRequestClose={() => {
              this.setState({ modalPhotoVisible: false })
            }}>
            <View style={styles.bottomView}>
              <ChoosePhotoPopup
                onClose={() => {
                  this.setState({ modalPhotoVisible: false })
                }}
                takePhotoAction={() => {
                  this.takePhotoAction();
                }}
                selectGallery={() => {
                  this.selectGallery();
                }}
                useDefaultImage={() => {
                  this.setState({ modalPhotoVisible: false })
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
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - 50,
    backgroundColor: Colors.white,
    flex: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  titleName: {
    marginLeft: 20,
    fontFamily: Fonts.family.Regular,
    fontSize: 16,
    color: Colors.darkGrey,
  },
  avatar: {
    width: 110,
    height: 110,
    alignSelf: "center",
    marginBottom: 40,
  },
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
    height: 200,
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
  underline: {
    height: 3,
    backgroundColor: Colors.darkGreyTwo
  },
});

const mapStateToProps = ({ auth: { data } }) => ({
  userInfo: data
})

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: () => dispatch(AuthActions.getUserInfo()),
  updateUserInfo: (userInfo) => dispatch(AuthActions.updateUserInfo(userInfo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)