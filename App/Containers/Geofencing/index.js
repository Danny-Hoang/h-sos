import React, { Component } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { TextButton, BottomPopup } from "../../Components";
import Address from "../SetProfile/RequiredInfo/Address";
import Map from "../SetProfile/RequiredInfo/Map";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { Colors, Fonts, Images, Metrics, Strings } from "../../Theme";
import Constants from "../../Constants";
import Header from "./Header";
import Configs from "../../Configs";
import Bound from "./Bound";

const strings = Strings.geofencing;

const Item = ({ item, onClickEdit }) => (
  <View style={styles.deatilSection}>
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 17 }}>
      <View
        style={{
          backgroundColor: item.isActive
            ? Colors.monitorActive
            : Colors.cloudyBlue,
          height: 12,
          width: 12,
          borderRadius: 6,
        }}
      />
      <Text
        style={{
          marginLeft: 10,
          fontFamily: Fonts.family.Bold,
          fontSize: Fonts.size.h3,
          color: item.isActive ? Colors.darkGrey : Colors.cloudyBlue,
        }}
      >
        {item.title}
      </Text>
    </View>
    <Text
      numberOfLines={2}
      style={{
        fontSize: 19,
        fontFamily: Fonts.family.Regular,
        color: item.isActive ? Colors.darkGrey : Colors.cloudyBlue,
      }}
    >
      {item.address}
    </Text>
    <View
      style={{ height: 36, width: 76, alignSelf: "flex-end", marginBottom: 10 }}
    >
      <TextButton
        onClick={onClickEdit}
        style={{
          height: 36,
          width: 76,
          backgroundColor: Colors.lightBlueGrey,
          textAlign: "center",
          color: Colors.darkGrey,
          borderRadius: 18,
        }}
      >
        {Strings.common.edit}
      </TextButton>
    </View>
  </View>
);

export default class Geofencing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boundCount: undefined,
      selectedBound: undefined,
      lastIndex: 0,
      typeOpenMap: Constants.TYPE_FIND,
      region: {
        latitude: 21.01667336106592,
        longitude: 105.78196210320247,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      },
      flatlistScrollEnd: true,
      error: null,
      loading: false,
      isMapReady: false,
      marginBottom: 1,
      userLocation: "",
      regionChangeProgress: false,
      modalAddressVisible: false,
      modalMapFindVisible: false,
      modalMapCheckVisible: false,
      modalEditVisible: false,
    };
  }

  renderItem = ({ item }) => (
    <Item
      item={item}
      onClickEdit={() => {
        this.setState({
          selectedBound: item,
          modalEditVisible: true,
        });
      }}
    />
  );

  fetchCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            ...this.state.region,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          loading: false,
          error: null,
        });
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

  onMapReady = () => {
    this.setState({ isMapReady: true, marginBottom: 0 });
  };

  onRegionChange = (region) => {
    this.setState(
      {
        region,
        regionChangeProgress: true,
      },
      () => this.fetchAddress()
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
        const userLocation = responseJson.results[0].formatted_address;
        this.setState({
          userLocation: userLocation,
          regionChangeProgress: false,
        });
      });
  };

  onCheckLocation(region, formattedLocation) {
    this.setState({
      modalMapCheckVisible: true,
      region: {
        ...this.state.region,
        latitude: region.latitude,
        longitude: region.longitude,
      },
      userLocation: formattedLocation,
      typeOpenMap: Constants.TYPE_CHECK,
    });
  }

  onFindLocation() {
    this.setState({
      modalMapFindVisible: true,
      typeOpenMap: Constants.TYPE_FIND,
    });
  }

  onSelectBound(newBound) {
    this.setState(
      {
        boundCount: [newBound, ...this.state.boundCount],
        modalAddressVisible: false,
        modalMapFindVisible: false,
        modalMapCheckVisible: false,
      },
      () => {
        this.flatListRef.scrollToIndex({ index: 0 });
      }
    );
  }

  onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems.length > 0) {
      this.setState({
        lastIndex: viewableItems[0].index,
      });
    }
  };

  onSelectLocation(formatLocation, region) {
    this.setState({
      userLocation: formatLocation,
      modalMapCheckVisible: true,
      region: region,
      typeOpenMap: Constants.TYPE_CHECK,
    });
  }

  onDeleteBound(item) {
    var array = this.state.boundCount.filter((bound) => bound !== item);
    this.setState({
      modalEditVisible: false,
      boundCount: this.state.boundCount.filter((bound) => bound !== item),
      lastIndex: 0,
      region: {
        ...this.state.region,
        latitude: array[0].region.latitude,
        longitude: array[0].region.longitude,
      },
    });
  }

  setDumyData() {
    let arr = [
      {
        id: "1",
        title: "Home",
        address: "Handico Tower, Pham Hung, Me Tri, Nam Tu Liem, Viet Nam ",
        region: {
          latitude: 21.01667336106592,
          longitude: 105.78196210320247,
        },
        bound: 1,
        isActive: true,
      },
      {
        id: "2",
        title: "Work place",
        address: "Big C Thang Long, Tran Duy Hung, Trung Hoa, Cau Giay",
        region: {
          latitude: 21.007273448234105,
          longitude: 105.79350195478047,
        },
        bound: 2,
        isActive: false,
      },
      {
        id: "3",
        title: "Work place",
        address: "Beta Cineplex My Dinh, Goden place, Me Tri, Tu Liem, Ha Noi",
        region: {
          latitude: 21.01186080951389,
          longitude: 105.77504759774999,
        },
        bound: 5,
        isActive: true,
      },
    ];
    this.setState({ boundCount: [...arr] });
  }
  render() {
    const {
      modalAddressVisible,
      modalMapFindVisible,
      modalMapCheckVisible,
      modalEditVisible,
      typeOpenMap,
      region,
      userLocation,
      lastIndex,
      boundCount,
      loading,
      selectedBound,
    } = this.state;
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <Header
          onClickAdd={() => {
            this.setState({ modalAddressVisible: true });
          }}
          onClickBack={() => {
            navigation.pop();
          }}
        />
        {loading && (
          <View style={styles.spinnerView}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
        {!loading && (
          <View style={styles.container}>
            <View style={{ flex: 1 }}>
              {!!region.latitude && !!region.longitude && (
                <MapView
                  style={{
                    ...styles.map,
                    marginBottom: this.state.marginBottom,
                  }}
                  initialRegion={region}
                  onMapReady={this.onMapReady}
                  showsUserLocation={true}
                  onRegionChangeComplete={this.onRegionChange}
                  region={region}
                />
              )}

              <View style={styles.mapMarkerContainer}>
                <Image
                  style={{ height: 50, width: 40 }}
                  source={Images.icCurrentLocation}
                />
              </View>
            </View>

            {!!boundCount && (
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  paddingLeft: 20,
                  marginBottom: 25,
                }}
              >
                <FlatList
                  style={{ height: 170 }}
                  ref={(ref) => {
                    this.flatListRef = ref;
                  }}
                  data={this.state.boundCount}
                  renderItem={this.renderItem}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  keyExtractor={(item) => item.id}
                  onMomentumScrollBegin={() => {
                    this.setState({ flatlistScrollEnd: false });
                  }}
                  onMomentumScrollEnd={() => {
                    this.setState({
                      region: {
                        ...this.state.region,
                        latitude: boundCount[lastIndex].region.latitude,
                        longitude: boundCount[lastIndex].region.longitude,
                      },
                      flatlistScrollEnd: true,
                    });
                  }}
                  onViewableItemsChanged={this.onViewableItemsChanged}
                  viewabilityConfig={{
                    itemVisiblePercentThreshold: 80,
                  }}
                />
              </View>
            )}

            {typeof boundCount === "undefined" && (
              <View
                style={{
                  marginHorizontal: 20,
                  marginBottom: 25,
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              >
                <TextButton
                  onClick={() => {
                    this.setDumyData();
                  }}
                >
                  {strings.buttonRegisterBound}
                </TextButton>
              </View>
            )}
          </View>
        )}

        <BottomPopup
          visible={modalAddressVisible}
          onRequestClose={() => {
            this.setState({ modalAddressVisible: false });
          }}
        >
          <View style={styles.bottomView}>
            <Address
              type={Constants.TYPE_ADD_BOUND}
              onClose={() => {
                this.setState({ modalAddressVisible: false });
              }}
              selectedAddress={""}
              onCheckLocation={(region, userLocation) =>
                this.onCheckLocation(region, userLocation).bind(this)
              }
              onFindLocation={this.onFindLocation.bind(this)}
            />
          </View>
        </BottomPopup>
        <BottomPopup
          visible={modalMapFindVisible}
          onRequestClose={() => {
            this.setState({ modalMapFindVisible: false });
          }}
        >
          <View style={styles.bottomView}>
            <Map
              typeMap={Constants.TYPE_ADD_BOUND}
              onClose={() => {
                this.setState({ modalMapFindVisible: false });
              }}
              onSelectLocation={(userLocation, region) =>
                this.onSelectLocation(userLocation, region)
              }
              type={typeOpenMap}
            />
          </View>
        </BottomPopup>

        <BottomPopup
          visible={modalMapCheckVisible}
          onRequestClose={() => {
            this.setState({ modalMapCheckVisible: false });
          }}
        >
          <View style={styles.bottomView}>
            <Map
              typeMap={Constants.TYPE_ADD_BOUND}
              onClose={() => {
                this.setState({ modalMapCheckVisible: false });
              }}
              onSelectBound={this.onSelectBound.bind(this)}
              type={typeOpenMap}
              formattedLocation={userLocation}
              region={region}
            />
          </View>
        </BottomPopup>

        <BottomPopup
          visible={modalEditVisible}
          onRequestClose={() => {
            this.setState({ modalEditVisible: false });
          }}
        >
          <View style={styles.bottomView}>
            <Bound
              item={selectedBound}
              onClose={() => {
                this.setState({ modalEditVisible: false });
              }}
              onDelete={(item) => this.onDeleteBound(item)}
            />
          </View>
        </BottomPopup>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: Metrics.screenWidth * 0.85,
    height: 160,
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    justifyContent: "space-around",
    shadowColor: Colors.shadowsColor,
    alignSelf: "center",
    shadowRadius: 5,
    borderRadius: 6,
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
  bottomView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
    height: 200,
  },
});
