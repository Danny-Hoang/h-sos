import React,  { Component, useRef } from 'react'
import {
    Image,
    Linking,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import { BottomPopup } from '../../Components';
import Configs from '../../Configs';
import { Colors, Fonts, Images, Strings } from '../../Theme';
import ActionView from './Components/ActionView';
import Header from './Components/Header';
import HistoryView from './Components/HistoryView';
import Map from './Components/Map';
import ListPhone from './Components/ListPhone';
import StateSOSView from './Components/StateSOSView';
import ApiService from "../../Services/ApiService";
import Metrics from "../../Theme/Metrics";
import styled from 'styled-components'
import Loading from "../../Components/Loading";
import Constants from "../../Constants";
import MapView, {Marker} from "react-native-maps";
import MapBound from '../../Components/Map/MapBound';

const strings = Strings.sos

const ContainerLoading = styled.View`
  width: ${Metrics.screenWidth - 50}px;
  height: 800px
  position: relative;
`

class SOS extends Component {

    refMap = React.createRef()

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isMapReady: false,
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
                accuracy: 1.0
            },
            currentLoc: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
                accuracy: 1.0
            },
            accidentLoc: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
                accuracy: 1.0
            },
            sMapReady: false,
            userLocation: "",
            modalVisible: false,
            seniorName: 'N/A',
            action: Constants.ACTION_TYPES.ALERT,
            history: [],
            activityId: '',
            visible: true,
            countVisible: 0,
            blinkRegion: null,
            phoneNumber: '0123456789'
        }
        this.fetchAddress();
    }

    componentWillUnmount() {
		clearInterval(this.interval);
	}

    async componentDidMount() {
        const {navigation} = this.props
        const activityId = navigation.getParam('activityId', 'a52996fe-9339-495d-8ad7-f73438617197');
        console.log('Activity id: ', activityId)
        this.setState(
            {
                loading: true,
                activityId: activityId
            }
        )

        let count = 0;
        await this.getActivityDetail(activityId)
        this.interval = setInterval(() => {
            if(this.state.countVisible <=5){
              this.setState((state, props) => {
              return {
                visible: !state.visible,
                countVisible: state.countVisible + 1
              };
            });
            }

            count++;
            if (count === (2*60*1000 / 500)) {
                count = 0;
                console.log('Update location every 2 minutes');
                this.getActivityDetail(activityId);
            }
          }, 500);
    }

    onRegionChange = (region) => {
        this.setState(
            {
                region: region,
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
                if (responseJson.results[0] != null) {
                    const userLocation = responseJson.results[0].formatted_address;
                    this.setState({
                        userLocation: userLocation,
                        regionChangeProgress: false,
                    });
                }
            });
    };

    getActivityDetail = async (activityId) => {
        let params = {
            activityId: activityId,
            excludeFilters: Constants.ACTION_TYPES.LOC_DEVICE_INFO_MSG
        }
        const res = await ApiService.activity.getActivityDetail(params)

        this.setState( {
            loading: false,
            seniorName: res.data[0].device.deviceName,
            history: res.data,
            action: res.data[0].action,
            currentLoc: {
                latitude: res.data[0].location.lat,
                longitude: res.data[0].location.lng,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
                accuracy: res.data[0].location.accuracy,
            },
            blinkRegion: {
                latitude: res.data[0].location.lat,
                longitude: res.data[0].location.lng,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
                accuracy: res.data[0].location.accuracy,
            },
            accidentLoc: {
                latitude: res.data[res.data.length - 1].location.lat,
                longitude: res.data[res.data.length - 1].location.lng,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
                accuracy: res.data[res.data.length - 1].location.accuracy
            }
        })

        // get latest device location
        ApiService.activity.getActivityDetail({activityId}).then( (result) => {
            if (result != null) {
                this.setState({
                    currentLoc: {
                        latitude: result.data[0].location.lat,
                        longitude: result.data[0].location.lng,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                        accuracy: result.data[0].location.accuracy
                    },
                    region: {
                        latitude: result.data[0].location.lat,
                        longitude: result.data[0].location.lng,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                        accuracy: result.data[0].location.accuracy
                    },
                    blinkRegion: {
                        latitude: result.data[0].location.lat,
                        longitude: result.data[0].location.lng,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                        accuracy: result.data[0].location.accuracy
                    },
                }, () => {
                    if (this.refMap.current) {
                        this.refMap.current.animateToRegion(this.state.currentLoc, 0);
                    }
                    this.fetchAddress()
                })
            }
        })

        this.onRegionChange({
            latitude: res.data[0].location.lat,
            longitude: res.data[0].location.lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
            accuracy: res.data[0].location.accuracy
        })
    }

    animate(region){
        if (this.refMap.current) {
            this.refMap.current.animateToRegion(region, 1000);
        }
    }

    onPressMap = () =>  {
        this.setState({
            userLocation: ''
        })
    }

    render() {
        const {blinkRegion, visible, region, currentLoc, accidentLoc, modalVisible, userLocation, loading, seniorName, action, history, activityId, phoneNumber } = this.state;
        return <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.coral }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <StatusBar barStyle='light-content' />
                {loading && <ContainerLoading style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Loading  />
                </ContainerLoading>}
                {!loading &&
                <View style={styles.container}>
                    <Header navigation={this.props.navigation} name={seniorName}/>
                    <View style={{flex: 1}}>
                        {/*<Map*/}
                        {/*    ref={this.refMap}*/}
                        {/*    region={region} currentLoc={currentLoc} accidentLoc={accidentLoc}*/}
                        {/*/>*/}
                        <MapView
                            style={{flex:1}}
                            ref = {this.refMap}
                            initialRegion={region}
                            onPanDrag={this.onPressMap}

                            // pitchEnabled={true}
                            // showsCompass={true}
                            // liteMode={false}
                            // showsBuildings={true}
                            // showsTraffic={true}
                            // showsIndoors={true}
                        >
                            <Marker
                                coordinate={{
                                    latitude: currentLoc.latitude,
                                    longitude: currentLoc.longitude,
                                }}
                                title={"Current Location"}
                                draggable={false}>
                                <View style={styles.mapMarkerContainer}>
                                    <Image
                                        style={{ height: 40, width: 30 }}
                                        source={Images.icCurrentLocation}
                                    />
                                </View>
                            </Marker>
                            {visible && blinkRegion != null && <MapBound region={blinkRegion} bound={500} unit = {1} />}

                            <Marker
                                coordinate={{
                                    latitude: accidentLoc.latitude,
                                    longitude: accidentLoc.longitude,
                                }}
                                title={"Accident Location"}
                                draggable={false}>
                                <View style={styles.mapMarkerContainer}>
                                    <Image
                                        style={{ height: 40, width: 30 }}
                                        source={Images.icCurrentLocation}
                                    />
                                </View>
                            </Marker>
                        </MapView>

                        <StateSOSView
                            onPress={ (value ) => {
                                this.setState({visible: true, countVisible: 0, blinkRegion: value ? currentLoc: accidentLoc})
                                if (value) {
                                    this.animate(currentLoc)
                                    this.onRegionChange(currentLoc)
                                } else {
                                    this.animate(accidentLoc)
                                    this.onRegionChange(accidentLoc)
                                }
                            }}
                        />
                        <ActionView userLocation={userLocation} action={action}
                            callPress={() => {
                                this.setState({modalVisible: true})}
                            }
                            takenPress={ async () => {
                                console.log('Send api taken')
                                await ApiService.activity.takeCare(activityId)
                                await this.getActivityDetail(activityId)
                            }}
                            resolvePress={ async () => {
                                console.log('Send api resolve')
                                await ApiService.activity.takeResolve(activityId, 'Everything is ok now')
                                await this.getActivityDetail(activityId)
                            }}
                        />
                        <HistoryView dataSource={history}/>
                    </View>
                </View>
                }
            </SafeAreaView>
            <BottomPopup
                visible={modalVisible}
                onRequestClose={() => {
                    this.setState({ modalVisible: false });
                }}>
                <View>
                    <ListPhone
                        phoneNumber={phoneNumber}
                        onClose={() => {
                            this.setState({ modalVisible: false });
                        }}
                        onPress={(value) => {
                            this.setState({ modalVisible: false });
                            Linking.openURL('tel:' + value)
                        }}
                    />
                </View>
            </BottomPopup>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },
})

export default SOS;
