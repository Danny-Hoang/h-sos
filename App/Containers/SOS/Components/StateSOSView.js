import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Animated, Easing } from 'react-native';
import { Colors, Fonts, Metrics, Strings } from '../../../Theme';

const knobOffset = 130

const strings = Strings.sos;

class StateSOSView extends Component {
    state = {
        isOn: false,
        animatedValue: new Animated.Value(this.props.isOn ? knobOffset : 0),
    }

    toggleHandle() {
        this.setState(
            { isOn: !this.state.isOn },
            () => {
                Animated.timing(
                    this.state.animatedValue,
                    { 
                        toValue: this.state.isOn ? knobOffset : 0, 
                        duration: 200,
                        easing: Easing.elastic(0.1),
                        useNativeDriver: true
                    }
                ).start()
            }
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ position: 'absolute', flex: 1, flexDirection: 'row' }}>
                    <View style={{ left: 35, height: 50, position: 'absolute', top: 15, bottom: 0 }}>
                        <Text style={styles.inactiveText}>{strings.current}</Text>
                    </View>
                    <View style={{ left: 165, height: 50, position: 'absolute', top: 15, bottom: 0 }}>
                        <Text style={styles.inactiveText}>{strings.accident}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{
                        flex: 1,
                    }}
                    onPress={() => {
                        this.props.onPress(this.state.isOn);
                        this.toggleHandle()
                    }}>
                    <Animated.View style={{
                        transform: [{
                            translateX: this.state.animatedValue,
                        }]
                    }}>
                        <View style={styles.activeView}>
                            <Text style={styles.activeText}>{this.state.isOn ? strings.accident : strings.current}</Text>
                        </View>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 110,
        width: 280,
        height: 50,
        alignSelf: 'center',
        backgroundColor: "#e4e6e8",
        borderRadius: 25
    },
    activeView: {
        width: 150,
        height: 50,
        borderRadius: 25,
        borderColor: '#f03e3e',
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    activeText: {
        fontSize: 18,
        fontFamily: Fonts.family.Medium,
        color: '#f03e3e',
    },
    inactiveText: {
        fontSize: 18,
        fontFamily: Fonts.family.Medium,
        color: Colors.slateGrey,
    }
})

export default StateSOSView;