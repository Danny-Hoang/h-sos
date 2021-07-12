import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, Animated, Text, Easing } from 'react-native';
import { Colors, Fonts, Metrics, Strings } from '../../../../../Theme';

class FilterRange extends Component {
    state = {
        range: 'day'
    }

    render() {
        const {range} = this.state
        return (
            <View style={styles.container}>
                <View style={{ position: 'absolute', flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity style={{flex: 1}} onPress={() => this.setState({range: 'day'})}>
                        <View style={range == 'day' ? styles.activeView : styles.statusView}>
                            <Text style={styles.inactiveText}>Day</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex: 1}} onPress={() => this.setState({range: 'week'})}>
                        <View style={range == 'week' ? styles.activeView : styles.statusView}>
                            <Text style={styles.inactiveText}>Week</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1}} onPress={() => this.setState({range: 'month'})}>
                        <View style={range == 'month' ? styles.activeView : styles.statusView}>
                            <Text style={styles.inactiveText}>Month</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1}} onPress={() => this.setState({range: 'year'})}>
                        <View style={range == 'year' ? styles.activeView : styles.statusView}>
                            <Text style={styles.inactiveText}>Year</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Metrics.screenWidth - 20,
        height: 50,
        alignSelf: 'center',
        backgroundColor: "#e4e6e8",
        borderRadius: 25
    },
    activeView: {
        flex: 1,
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
    },
    statusView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    }
})

export default FilterRange;