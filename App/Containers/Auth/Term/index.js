import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import { Colors, Fonts, Images, Metrics, Strings } from '../../../Theme';

class TermScreen extends Component {
    render() {

        const { onClose, title, content } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { onClose() }}>
                        <View style={styles.closeView}>
                            <Image source={Images.icCloseBlack} style={styles.imageClose} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={{marginHorizontal: 20}}>
                    <Text style={styles.content}>{content}</Text>
                    {/* <WebView source={{ uri: 'https://haduong825.github.io/privacy/' }} />; */}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight - 50,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
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
    },
    content: {
        fontFamily: Fonts.family.Regular,
        fontSize: 16,
        color: Colors.charcoalGreyTwo
    }
})

export default TermScreen;