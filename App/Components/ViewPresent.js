import React, { Component } from 'react';
import { Image, Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts, Images, Metrics } from '../Theme';

class ViewPresent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyboardSpace: 0
        };

        Keyboard.addListener('keyboardDidShow', (frames) => {
            if (!frames.endCoordinates) return;
            this.setState({ keyboardSpace: frames.endCoordinates.height });
        });
        Keyboard.addListener('keyboardDidHide', (frames) => {
            this.setState({ keyboardSpace: 0 });
        });
    }
    
    render() {
        const { onClose, title, children } = this.props;
        return (
            <View style={{
                width: Metrics.screenWidth,
                height: Metrics.screenHeight - 50 - this.state.keyboardSpace,
                backgroundColor: Colors.white,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
            }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { onClose() }}>
                        <View style={styles.closeView}>
                            <Image source={Images.icCloseBlack} style={styles.imageClose} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={{flex:1}}>
                    {children}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageClose: {
        width: 24,
        height: 24
    },
    closeView: {
        height: 65,
        width: 65,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: Fonts.family.Medium,
        fontSize: 22
    }
})

export default ViewPresent;