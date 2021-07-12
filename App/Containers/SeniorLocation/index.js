import React, {Component} from "react";
import {ActivityIndicator, Image, StyleSheet, Text, View} from "react-native";
import {Colors, Fonts, Images, Strings} from "../../Theme";
import {HeaderWithBack} from "../../Components";
import MapView from "react-native-maps";
import PrimaryIcon from "../../Components/Icon";
import Configs from "../../Configs";

const strings = Strings.home;

export default class SeniorLocation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isMapReady: false,
            region: {
                latitude: 21.01667336106592,
                longitude: 105.78196210320247,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
            },
            sMapReady: false,
            marginBottom: 1,
            userLocation: "",
        }
    }

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

    render() {
        const { navigation } = this.props;
        const {
            loading,
            region,
            marginBottom
        } = this.state

        return (
            <View style={{flex: 1}}>
                <HeaderWithBack navigation={navigation} title={strings.location}/>
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
                                    style={{ ...styles.map, marginBottom: marginBottom }}
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
                    </View>
                )}
                <View style={styles.detailSection}>
                    <View style={styles.row}>
                        <PrimaryIcon source={Images.icLocationHome}/>
                        <Text style={styles.title}>{strings.bottomTabBar.home}</Text>
                    </View>
                    <Text numberOfLines={2} style={styles.locationText}>
                        {this.state.userLocation}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: Colors.athensGray,
    },
    map: {
        flex: 1,
    },
    mapMarkerContainer: {
        left: "47%",
        position: "absolute",
        top: "42%",
    },
    detailSection: {
        height: 140,
        backgroundColor: Colors.white,
        padding: 23,
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
    locationText: {
        fontSize: 19,
        fontFamily: Fonts.family.Regular,
        textAlign: 'left'
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.family.Medium,
        color: Colors.darkGrey,
        padding: 6
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
