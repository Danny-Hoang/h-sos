import React, { Component } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Images, Metrics, Strings } from '../../../../Theme';

const strings = Strings.contactus;

const MOCK_DATA = [
    {
        id: "1",
        title: strings.typeContent.auth,
    },
    {
        id: "2",
        title: strings.typeContent.watch,
    },
    {
        id: "3",
        title: strings.typeContent.sos,
    },
    {
        id: "4",
        title: strings.typeContent.healthy,
    },
    {
        id: "5",
        title: strings.typeContent.error,
    },
    {
        id: "6",
        title: strings.typeContent.etc,
    },
];

class ListTypePopup extends Component {

    renderItem = ({ item }) => {
        const { onClose, selectedItem } = this.props;
        return (
            <TouchableOpacity onPress={(event)=>{
                selectedItem(item)
                onClose()
            }}>
                <View style={{height: 50}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>{item.title}</Text>
                    </View>
                    <View style={styles.underline} />
                </View>
            </TouchableOpacity>
        );
    };

    render() {
        const { onClose } = this.props;
        return (
            <View style={styles.scrollableModal}>
                <TouchableOpacity onPress={() => { onClose() }}>
                    <View style={styles.closeView}>
                        <Image style={styles.closeImage} source={Images.icClose} />
                    </View>
                </TouchableOpacity>
                <FlatList
                    data={MOCK_DATA}
                    style={styles.list}
                    renderItem={this.renderItem}
                    scrollEventThrottle={16}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollableModal: {
        height: 320,
        width: Metrics.screenWidth
    },
    list: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    closeImage: {
        width: 24,
        height: 24,
    },
    closeView: {
        width: 40,
        height: 40,
        backgroundColor: Colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
        marginBottom: 5,
        borderRadius: 20
    },
    underline: {
        backgroundColor: Colors.paleGrey,
        height: 1
    },
});

export default ListTypePopup;