import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
import { Flex } from '../../../Components';
import { Colors, Fonts, Images } from '../../../Theme';
import { CarerState, getImage } from '../../../Utils';

class ReminderCard extends Component {

    buildTrashImage() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={Images.icDelete} style={{ width: 32, height: 32 }} />
            </View>)
    }

    buildRow(pressDetail, item) {
        return (
            <TouchableOpacity style={{ flex: 1, marginLeft: 20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
                onPress={() => { pressDetail(item) }}>
                <Image source = {getImage(item.type)} style={{width: 40, height: 40, marginRight: 20}}/>
                <View>
                    <View>
                        <Text style={styles.titleReminder}>{item.title}</Text>
                    </View>
                    <View>
                        <Text style={styles.timeReminder}>{item.time}</Text>
                    </View>
                    <View>
                        <Text style={{ ...styles.timeReminder, fontFamily: Fonts.family.Regular }}>{item.repeat}</Text>
                    </View>
                </View>

            </TouchableOpacity>

        );
    }

    render() {
        const { item, pressDetail, deleteItem } = this.props;
        var swipeoutBtns = [
            {
                type: 'delete',
                component: this.buildTrashImage(item),
                onPress: function () { deleteItem(item) }
            }
        ]
        return (
            <Swipeout autoClose={true} right={swipeoutBtns}>
                <View style={styles.container}>
                    {this.buildRow(pressDetail, item)}
                </View>
                <View style={styles.underline} />
            </Swipeout>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        height: 100,
        flexDirection: 'row',
    },
    moreView: {
        paddingRight: 13
    },
    moreImage: {
        width: 24,
        height: 24
    },
    titleReminder: {
        color: Colors.darkGreyTwo,
        fontSize: 19,
        fontFamily: Fonts.family.Bold,
        marginBottom: 5
    },
    timeReminder: {
        color: Colors.slateGrey,
        fontSize: 17,
        fontFamily: Fonts.family.Bold
    },
    deleteImage: {
        width: 32,
        height: 32
    },
    underline: {
        backgroundColor: Colors.paleGrey,
        height: 1
    },
});


export default ReminderCard;