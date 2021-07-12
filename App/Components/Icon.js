import React, { Component } from 'react';
import { Image } from 'react-native';

class PrimaryIcon extends Component {
    render() {
        const {source} = this.props
        return (
            <Image style={{width: 24, height: 24}} source={source}/>
        );
    }
}

export default PrimaryIcon;