
import React, {Component} from "react"
import {Text, View} from "react-native";
import {Colors, Fonts} from "../../../Theme";

export class Row extends Component{
    render() {

        const {name, value, isSub = false, sub} = this.props

        return <View style={styles.address}>
            <Text
                style={{
                    flex: 1,
                    ...styles.textField,
                }}
            >
                {name}
            </Text>
            <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                    flex: 2,
                    fontFamily: Fonts.family.Medium,
                    fontSize: Fonts.size.regular,
                    color: Colors.darkGreyTwo,
                }}
            >
                {value}
            </Text>
            {isSub && <Text style={styles.sub}>{sub}</Text>}
        </View>
    }
}

const styles = {
    address: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColorDateTime,
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20,
        marginRight: 20,
    },
    textField: {
        color: Colors.darkGrey,
        fontSize: 16,
    },
    sub: {
        fontFamily: Fonts.family.Medium,
        fontSize: 17,
        color: Colors.slateGrey,
        textAlign: 'right'
    },
};