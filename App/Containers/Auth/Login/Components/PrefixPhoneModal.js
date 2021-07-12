import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Colors, Images, Metrics } from '../../../../Theme';
import CountryPhoneRow from './CountryPhoneRow';

const MOCK_DATA = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "Vietnam",
        countryCode: "VN",
        flag: Images.flagVietnam,
        code: '+84'
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Korea",
        countryCode: "KR",
        flag: Images.flagKorea,
        code: '+82'
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Japan",
        countryCode: "JP",
        flag: Images.flagJP,
        code: '+81'
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d73",
        title: "American",
        countryCode: "US",
        flag: Images.flagUS,
        code: '+1'
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d74",
        title: "British",
        countryCode: "UK",
        flag: Images.flagUK,
        code: '+44'
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d75",
        title: "China",
        countryCode: "CN",
        flag: Images.flagChina,
        code: '+86'
    },
    // {
    //     id: "58694a0f-3da1-471f-bd96-145571e29d76",
    //     title: "Third Item",
    //     flag: Images.flagVietnam,
    //     code: '+86'
    // },
    // {
    //     id: "58694a0f-3da1-471f-bd96-145571e29d77",
    //     title: "Third Item",
    //     flag: Images.flagVietnam,
    //     code: '+86'
    // },
];

class PrefixPhoneModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            scrollOffset: 0,
            visible: true,
        }
    }

    

    renderItem = ({ item }) => {
        const { onClose, selectedItem } = this.props;
        return (
            <CountryPhoneRow
                item={item}
                onPress={(event) => { 
                    selectedItem(item)
                    onClose() 
                }}
            />
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
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
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
        // opacity: 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
        marginBottom: 5,
        borderRadius: 20
    }
});

export default PrefixPhoneModal;