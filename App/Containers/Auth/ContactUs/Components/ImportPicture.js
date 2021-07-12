import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts, Images, Strings } from '../../../../Theme';
import { launchImageLibrary } from 'react-native-image-picker';

const strings = Strings.contactus

class ImportPicture extends Component {
    buildContent = () => {
        const { images, chooseImage } = this.props
        var imageViews = []

        for (let i = 0; i < images.length; i++) {
            imageViews.push(
                <View style={styles.boxAdd}>
                    <Image style={styles.image} source={{uri: images[i].url}} />
                </View>
            )
            imageViews.push(<View style={{width: 10}}/>)
        }


        if (images.length < 3) {
            imageViews.push(
                <TouchableOpacity onPress={() => { chooseImage() }}>
                    <View style={styles.boxAdd}>
                        <Image style={styles.iconPlus} source={Images.icPlus} />
                    </View>
                </TouchableOpacity>
            )
        }

        return <View style={{ flexDirection: 'row' }}>{imageViews}</View>;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleSection}>
                    <Image style={styles.camera} source={Images.icCamera} />
                    <Text style={styles.title}>{strings.picture}</Text>
                </View>
                {this.buildContent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 20
    },
    titleSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },
    camera: {
        width: 24,
        height: 24,
        marginRight: 10
    },
    title: {
        color: Colors.darkGrey,
        fontSize: 16,
        fontFamily: Fonts.family.Regular
    },
    boxAdd: {
        width: 72,
        height: 72,
        borderStyle: 'dotted',
        borderWidth: 1,
        borderRadius: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconPlus: {
        width: 24,
        height: 24,
    },
    image: {
        width: 72,
        height: 72,
    }
})

export default ImportPicture;