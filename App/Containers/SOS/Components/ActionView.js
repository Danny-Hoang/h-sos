import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors, Fonts, Metrics, Strings } from '../../../Theme';
import Constants from "../../../Constants";

const strings = Strings.sos;

class ActionView extends Component {
    render() {
        const { callPress, takenPress, resolvePress, userLocation, action = Constants.ACTION_TYPES.ALERT, isMeTaken = true } = this.props;
        return (
            <View style={styles.container}>
                {userLocation !== '' && <Text style={styles.addressText}>{userLocation}</Text>}
                {action === Constants.ACTION_TYPES.ALERT && <View style={{ flexDirection: 'row', marginTop: 16 }}>
                    <View style={{ flex: 1, paddingRight: 10 }}>
                        <TouchableOpacity onPress={callPress}>
                            <View style={styles.callView}>
                                <Text style={{ fontSize: 20, fontFamily: Fonts.family.Medium, color: Colors.darkGrey }}>{strings.call}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={takenPress}>
                            <View style={styles.willHelpView}>
                                <Text style={{ fontSize: 20, fontFamily: Fonts.family.Medium, color: Colors.white }}>{strings.i_will_help}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>}
                {action === Constants.ACTION_TYPES.TAKEN && <View style={{ flexDirection: 'row', marginTop: 16 }}>
                    <View style={{ flex: 1, paddingRight: 10 }}>
                        <TouchableOpacity onPress={callPress}>
                            <View style={styles.callView}>
                                <Text style={{ fontSize: 20, fontFamily: Fonts.family.Medium, color: Colors.darkGrey }}>{strings.call}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {isMeTaken && <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={resolvePress}>
                            <View style={styles.resolveView}>
                                <Text style={{ fontSize: 20, fontFamily: Fonts.family.Medium, color: Colors.white }}>Resolve</Text>
                            </View>
                        </TouchableOpacity>
                    </View>}
                    {!isMeTaken && <View style={{ flex: 1 }}>
                        <TouchableOpacity>
                            <View style={styles.resolvedView}>
                                <Text style={{ fontSize: 20, fontFamily: Fonts.family.Medium, color: Colors.coolGrey }}>Helping now</Text>
                            </View>
                        </TouchableOpacity>
                    </View>}
                </View>}
                {action === Constants.ACTION_TYPES.RESOLVED && <View style={{ flexDirection: 'row', marginTop: 16 }}>
                    <View style={{ flex: 1, paddingRight: 10 }}>
                        <TouchableOpacity >
                            <View style={styles.resolvedView}>
                                <Text style={{ fontSize: 20, fontFamily: Fonts.family.Medium, color: Colors.coolGrey }}>Resolved</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>}
                {action === Constants.ACTION_TYPES.CANCEL && <View style={{ flexDirection: 'row', marginTop: 16 }}>
                    <View style={{ flex: 1, paddingRight: 10 }}>
                        <TouchableOpacity>
                            <View style={styles.resolvedView}>
                                <Text style={{ fontSize: 20, fontFamily: Fonts.family.Medium, color: Colors.coolGrey }}>Canceled SOS</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: Metrics.screenWidth,
        backgroundColor: Colors.white,
        bottom: 0,
        padding: 20,
    },
    callView: {
        backgroundColor: Colors.white,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: Colors.coolGrey,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resolvedView: {
      backgroundColor: Colors.lightPeriwinkle,
      borderRadius: 3,
      height: 55,
      justifyContent: 'center',
      alignItems: 'center'
    },
    resolveView: {
      backgroundColor: Colors.green,
      borderRadius: 3,
      height: 55,
      justifyContent: 'center',
      alignItems: 'center'
    },
    willHelpView: {
        borderRadius: 3,
        backgroundColor: Colors.coral,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addressText: {
        color: Colors.darkGrey,
        fontSize: 19,
    }
})

export default ActionView;