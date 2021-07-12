import React, { Component } from "react";
import { throttle } from "lodash";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { Metrics, Colors, Images, Strings } from "../../../Theme";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import Constants from "../../../Constants";
import { PermissionsAndroid } from "react-native";
import Utils from "../../../Utils";
import MapBound from "../../../Components/Map/MapBound";
import CurrentLocation from "../../../Components/Map/CurrentLocation";
import DetailLocation from "../../../Components/Map/DetailLocation";
import SetBound from "../../../Components/Map/SetBound";
import Configs from "../../../Configs";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: undefined,
        longitude: undefined,
        latitudeDelta:
          this.props.typeMap === Constants.TYPE_ADD_BOUND &&
          this.props.type === Constants.TYPE_CHECK
            ? 0.2
            : 0.003,
        longitudeDelta:
          this.props.typeMap === Constants.TYPE_ADD_BOUND &&
          this.props.type === Constants.TYPE_CHECK
            ? 0.2
            : 0.003,
      },
      error: null,
      loading: true,
      isMapReady: false,
      marginTop: 1,
      userLocation: "",
      regionChangeProgress: false,
      bound: 5,
    };
    this.fetchAddressThrottled = throttle(this.fetchAddress, 1000);
  }

  async componentDidMount() {
    const { type, typeMap, formattedLocation, region } = this.props;
    let hasLocationPermission = await Utils.requestPermission(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if (hasLocationPermission) {
      if (type === Constants.TYPE_FIND) {
        this.getCurrentLocation();
      } else {
        this.setState({
          region: {
            ...this.state.region,
            latitude: region.latitude,
            longitude: region.longitude,
          },
          userLocation: formattedLocation,
          loading: false,
          error: null,
        });
      }
    } else {
      this.props.onClose();
    }
  }

  onMapReady = () => {
    this.setState({ isMapReady: true, marginTop: 0 });
  };

  getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState((prevState, props) => ({
          region: {
            ...prevState.region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          loading: false,
          error: null,
        }));
      },
      (error) => {
        alert(error);
        this.setState({
          error: error.message,
          loading: false,
        });
      },
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 }
    );
  };

  fetchAddress = () => {
    fetch(
        Configs.MAP_URL +
        this.state.region.latitude +
        "," +
        this.state.region.longitude +
        "&key=" +
        Configs.MAP_KEY
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('Location', responseJson.results)
        if (responseJson.results[0] !== undefined) {
          const userLocation = responseJson.results[0].formatted_address;
          this.setState({
            userLocation: userLocation,
            regionChangeProgress: false,
          });
        }
      });
  };

  onRegionChange = (region) => {
    if (this.props.type === Constants.TYPE_FIND) {
      this.setState(
        {
          region,
          regionChangeProgress: true,
        },
        () => this.fetchAddressThrottled()
      );
    }
  };

  onChangeBound = (value) => {
    this.setState((prevState, _) => ({
      region: {
        ...prevState.region,
        latitudeDelta: (value * 0.2) / 5,
        longitudeDelta: (value * 0.2) / 5,
      },
      bound: value,
    }));
  };

  onLocationSelect() {
    const { typeMap } = this.props;
    const { userLocation, region } = this.state;
    // if (typeMap === Constants.TYPE_ADD_BOUND) {
      this.props.onSelectLocation(userLocation, region);
    // } else {
    //   this.props.onSelectLocation(userLocation);
    // }
  }

  onSelectBound() {
    const { onSelectBound } = this.props;
    let newBound = {
      id: this.state.userLocation.substring(0, 3),
      title: this.state.userLocation.substring(0, 5),
      address: this.state.userLocation,
      region: {
        latitude: this.state.region.latitude,
        longitude: this.state.region.longitude,
      },
      bound: this.state.bound,
      isActive: true,
    };
    onSelectBound(newBound);
  }

  render() {
    const {
      type = Constants.TYPE_CHECK,
      onClose,
      typeMap = Constants.TYPE_ADD_BOUND,
    } = this.props;
    const { bound, region, regionChangeProgress, loading } = this.state;
    if (loading) {
      return (
        <View style={styles.spinnerView}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            {!!region.latitude && !!region.longitude && (
              <MapView
                style={{ ...styles.map, marginTop: this.state.marginTop }}
                initialRegion={region}
                onMapReady={this.onMapReady}
                region={region}
                onRegionChangeComplete={this.onRegionChange}
              >
                {type === Constants.TYPE_CHECK && (
                  <MapView.Marker
                    coordinate={{
                      latitude: region.latitude,
                      longitude: region.longitude,
                    }}
                    title={"Your Location"}
                    draggable={false}
                  />
                )}
                {typeMap === Constants.TYPE_ADD_BOUND &&
                  type === Constants.TYPE_CHECK && (
                    <MapBound region={region} bound={bound} />
                  )}
              </MapView>
            )}

            {type === Constants.TYPE_FIND && <CurrentLocation />}
            <TouchableOpacity
              onPress={() => {
                onClose();
              }}
              style={styles.closeView}
            >
              <Image source={Images.icCloseBlack} style={styles.imageClose} />
            </TouchableOpacity>
              <TouchableOpacity style={styles.findMyLocation} onPress={() => {this.getCurrentLocation()}}>
                <Image source={Images.icFindMyLocation} style={styles.imageClose} />
              </TouchableOpacity>
          </View>
          {((type === Constants.TYPE_FIND &&
            typeMap === Constants.TYPE_ADD_BOUND) ||
            typeMap === Constants.TYPE_ADD_ADDRESS) && (
            <DetailLocation
              text={
                !regionChangeProgress
                  ? this.state.userLocation
                  : Strings.geofencing.update
              }
              disabled={regionChangeProgress}
              onLocationSelect={this.onLocationSelect.bind(this)}
            />
          )}

          {typeMap === Constants.TYPE_ADD_BOUND &&
            type === Constants.TYPE_CHECK && (
              <SetBound
                value={bound}
                onChangeBound={(value) => this.onChangeBound(value)}
                onSelectBound={this.onSelectBound.bind(this)}
              />
            )}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight - 50,
    flex: 1,
    borderTopLeftRadius: 15,
    overflow: "hidden",
    borderTopRightRadius: 15,
    backgroundColor: Colors.darkGrey,
  },
  map: {
    flex: 1,
  },
  mapMarkerContainer: {
    left: "47%",
    position: "absolute",
    top: "42%",
  },
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
  spinnerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageClose: {
    width: 24,
    height: 24,
    alignSelf: "center",
  },
  closeView: {
    height: 65,
    width: 65,
    position: "absolute",
    justifyContent: "center",
    backgroundColor: Colors.transparent,
  },
  findMyLocation: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.athensGray,
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});

export default Map;
