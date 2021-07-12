import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { Colors, Fonts, Images } from '../../../../Theme';

class EditOrderCard extends Component {

    render() {
        const { item, drag, isActive } = this.props;
        const scale = isActive ? 1.05 : 1
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onLongPress={drag}>
                <Animated.View style={{
                    transform: [{ scaleX: scale }, { scaleY: scale }]
                }}>
                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={styles.image} source={Images.trump} />
                            <Text style={styles.text}>{item.name}</Text>
                        </View>
                        <Image style={styles.imageOrder} source={Images.btnOrder} />
                    </View>
                </Animated.View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        marginHorizontal: 20,
        marginBottom: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        height: 80,
        borderColor: '#d8dce0',
        borderWidth: 1,
        borderRadius: 8,
    },
    text: {
        fontWeight: "500",
        fontSize: 20,
        color: '#333333',
        fontFamily: Fonts.family.Medium
    },
    image: {
        aspectRatio: 1,
        height: 54,
        width: 54,
        borderRadius: 32,
        margin: 10
    },
    imageOrder: {
        aspectRatio: 1,
        height: 24,
        width: 24,
        marginRight: 13
    },
})

export default EditOrderCard;