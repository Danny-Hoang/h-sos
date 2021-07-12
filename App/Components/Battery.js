import React, {Component} from 'react'
import {View} from 'react-native'

export default class Battery extends Component {
    render() {
        const {percent} = this.props
        const backgroundColorHead = percent < 100 ? '#9DA2A7' : '#333435'
        return <View style={{width: 13, height: 20, marginRight: 5}}>
            <View style={{width: 5, height: 2, alignSelf: 'center', backgroundColor: backgroundColorHead}}>

            </View>
            <View style={{flex: 1, flexDirection: 'column-reverse', backgroundColor: '#9DA2A7', borderRadius: 1.5}}>
                <View style={{height: percent + '%', backgroundColor: "#333435", borderRadius: 1.5}}/>
            </View>
        </View>
    }
}
