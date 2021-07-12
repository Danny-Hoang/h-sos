import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors, Fonts, Images, Strings } from '../../../../Theme';

const strings = Strings.home

class InvitedCard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Image style={styles.icon} source={Images.trump} />
                    <View style={{ marginHorizontal: 12, flex: 1, }}>
                        <Text numberOfLines={3}>
                            <Text style={{ fontSize: 20, fontFamily: Fonts.family.Medium }} >Tom Browm</Text>
                            <Text style={{ fontSize: 20 }} >{strings.inviteText}</Text>
                            <Text style={{ fontSize: 20, fontFamily: Fonts.family.Medium }} >Tom Browm</Text>
                        </Text>
                        <Text style={{ fontSize: 15, fontFamily: Fonts.family.Regular, color: Colors.coolGrey }} >3 days ago</Text>
                    </View>
                </View>
                <View  style={{...styles.row, justifyContent:'flex-end'}}>
                    <TouchableOpacity>
                        <View style={{...styles.acceptButton, backgroundColor: Colors.transparent}}>
                            <Text style={styles.rejectText}>{strings.reject}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.acceptButton}>
                            <Text style={styles.acceptText}>{strings.accept}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderRadius: 6,
        justifyContent: 'space-evenly',
        paddingHorizontal: 15,
        height: 135,
        backgroundColor: Colors.white,
        shadowColor: 'rgba(174, 174, 174, 0.25)',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    icon:{
        width: 54,
        height: 54,
        borderRadius: 27,
        alignSelf: 'flex-start'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    acceptButton:{
        width: 100, 
        height: 40, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#4c6ef510',
        borderRadius: 6
    },
    acceptText:{
        color: Colors.lightishBlue,
        fontFamily: Fonts.family.Bold,
        fontSize: 18
    },
    rejectText:{
        fontFamily: Fonts.family.Regular,
        fontSize: 18
    },
    inviteText: {
        fontSize: 20,
    }
})

export default InvitedCard;