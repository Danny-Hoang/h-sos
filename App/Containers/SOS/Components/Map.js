import React, { Component } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps'
import { Images } from '../../../Theme'

class Map extends Component {

    render() {
        const { region, currentLoc, accidentLoc } = this.props
        return (
                    <MapView
                        style={styles.map}
                        initialRegion={region}>
                        <MapView.Marker
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
                        </MapView.Marker>
                        <MapView.Marker
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
                        </MapView.Marker>
                    </MapView>

        )
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    mapMarkerContainer: {
        left: "47%",
        position: "absolute",
        top: "42%",
    },
})

export default Map;