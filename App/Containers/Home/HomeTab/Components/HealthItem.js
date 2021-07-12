import React from 'react';
import { View, Image, Text } from "react-native"
import { Colors, Fonts } from "../../../../Theme"

const HealthItem = ({ image, value, unit }) => {
    return (<View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
        <Image source={image} style={{ width: 28, height: 28 }} />
        {!unit && <View style={{ height: 15 }} />}
        <Text style={{ color: Colors.darkGreyTwo, fontSize: Fonts.size.h3 }}>{value}</Text>
        {unit && <Text style={{ color: Colors.slateGrey, fontSize: 15 }}>{unit}</Text>}
    </View>)
}
export default HealthItem;