import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
import { Flex } from '../../../Components';
import { Colors, Fonts, Images } from '../../../Theme';
import { CarerState } from '../../../Utils';

class CarerCard extends Component {

    buildTrashImage() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={Images.icDelete} style={{ width: 32, height: 32 }} />
            </View>)
    }

    buildAcceptRow(item) {
        return (
            <View style={{ flex: 1, marginLeft: 20, justifyContent: 'space-evenly' }}>
                <View>
                    <Text style={styles.nameText}>Master Yi</Text>
                </View>
                <View>
                    <Text style={{ ...styles.nameText, fontSize: 18 }}>{item.phoneNumber}</Text>
                </View>
            </View>
        );
    }

    buildRow(item) {
        return (
            <View style={{ flex: 1, marginLeft: 20, justifyContent: 'space-evenly' }}>
                <View>
                    <Text style={styles.phonePending}>{item.phoneNumber}</Text>
                </View>
                <View style={{ ...styles.statusView, borderColor: item.state == CarerState.PENDING ? Colors.coral : Colors.coolGrey }}>
                    <Text style={{ ...styles.statusText, color: item.state == CarerState.PENDING ? Colors.coral : Colors.coolGrey }}>{item.state.value}</Text>
                </View>
            </View>
        );
    }

    render() {
        const { item, pressMore, deleteItem } = this.props;
        var swipeoutBtns = [
            {
                type: 'delete',
                component: this.buildTrashImage(item),
                onPress: function(){deleteItem(item)}
            }
        ]
        return (
            <Swipeout autoClose={true} right={swipeoutBtns}>
                <View style={styles.container}>
                    {item.state == CarerState.ACCEPTED ? this.buildAcceptRow(item) : this.buildRow(item)}
                    <TouchableOpacity onPress={()=>{pressMore(item)}}>
                        <View style={{ marginRight: 13, marginTop: 13 }}>
                            <Image
                                style={styles.moreImage}
                                source={Images.btnArrowMore} />
                        </View>
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.underline} />
            </Swipeout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        height: 90,
        flexDirection: 'row',
    },
    moreView: {
        paddingRight: 13
    },
    moreImage: {
        width: 24,
        height: 24
    },
    phoneDeactive: {
        color: Colors.coolGrey,
        fontSize: 20,
        fontFamily: Fonts.family.Medium
    },
    phonePending: {
        color: Colors.slateGrey,
        fontSize: 20,
        fontFamily: Fonts.family.Medium
    },
    deleteImage: {
        width: 32,
        height: 32
    },
    nameText: {
        fontFamily: Fonts.family.Medium,
        fontSize: 20,
        color: Colors.darkGreyTwo
    },
    underline: {
        backgroundColor: Colors.paleGrey,
        height: 1
    },
    statusView: {
        paddingHorizontal: 8,
        borderWidth: 1.5,
        alignSelf: 'flex-start',
        height: 25,
        borderRadius: 12.5,
        justifyContent: 'center'
    },
    statusText: {
        fontFamily: Fonts.family.Medium,
        fontSize: 15,
    }
});


export default CarerCard;