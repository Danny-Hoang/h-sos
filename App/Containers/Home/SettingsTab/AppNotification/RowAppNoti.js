import React, {Component} from 'react'
import {Image, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import {Colors, Fonts, Images} from "../../../../Theme";

export class RowAppNoti extends Component{

    render() {
        const { name, value } = this.props;
        return <TouchableOpacity onPress={() => this.setState({})}>
            <View style={styles.item}>
                <Text style={styles.textItem}>{name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.mode}>{value}</Text>
                    <Image source={Images.btnArrowRight} style={styles.imageItem} />
                </View>
            </View>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    item: {
        height: 60,
        paddingLeft: 20,
        paddingRight: 13,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.white,
    },
    textItem: {
        fontFamily: Fonts.family.Medium,
        fontSize: Fonts.size.regular,
        color: Colors.darkGrey,
    },
    imageItem: {
        height: 24,
        width: 24,
        alignSelf: "center",
    },
    mode: {
        fontSize: 18,
        color: Colors.slateGrey
    }
});