import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Colors, Fonts, Images, Strings } from '../../../../Theme';

const strings = Strings.contactus

class ChooseType extends Component {
    render() {
        const {type} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.titleName}>{strings.type}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{...styles.field, color:type==''?Colors.coolGrey:Colors.black}}>
                        {type==''?strings.select:type}
                    </Text>
                    <Image style={styles.image} source={Images.btnArrowDown}/>
                </View>
                <View style={styles.underline} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 20
    },
    underline: {
        height:1.5,
        backgroundColor: Colors.darkGreyTwo,
        marginTop: 10
    },
    titleName: {
        fontFamily: Fonts.family.Regular,
        fontSize: 16,
        color: Colors.darkGrey,
        marginBottom: 10
    },
    image: {
        width: 24,
        height: 24,
    },
    field: {
        color: Colors.coolGrey,
        fontSize: 18,
        fontFamily: Fonts.family.Regular
    }
});

export default ChooseType;