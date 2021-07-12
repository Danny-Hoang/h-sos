import React, { Component } from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors, Fonts, Images, Metrics, Strings } from '../../../Theme';
import Constants from "../../../Constants";
import moment from "moment";

const strings = Strings.sos;

class HistoryView extends Component {
    state = {
        isOpened: false,
        data: []
    }

    static getDerivedStateFromProps(props, prevState) {
        const { dataSource } = props
        let data = [];
        dataSource && dataSource.map((item) => {
            if (item.action === Constants.ACTION_TYPES.ALERT) {
                data.push({title: strings.no_one_response, time: moment(item.createdDate).format('LT L')})
            }
            if (item.action === Constants.ACTION_TYPES.TAKEN) {
                data.push({title: item.user.nickName + " is taking care now", time: moment(item.createdDate).format('LT L')})
            }
            if (item.action === Constants.ACTION_TYPES.RESOLVED) {
                data.push({title: "Resolved the SOS", time: moment(item.createdDate).format('LT L')})
            }
            if (item.action === Constants.ACTION_TYPES.CANCEL) {
                data.push({title: item.device.deviceName + " is canceled", time: moment(item.createdDate).format('LT L')})
            }
        });

        return {
            data
        }
    }

    renderFirstItem = () => {
        const { isOpened, data } = this.state
        return <View style={styles.itemContainer}>
            <View style={styles.contentHistory}>
                <Text style={styles.titleHistory}>{data[0].title}</Text>
                <View style={{ height: 10 }} />
                <Text style={styles.timeText}>{data[0].time}</Text>
            </View>
            <TouchableOpacity onPress={() => { this.setState({ isOpened: !isOpened }) }} style={{ justifyContent: 'center', marginHorizontal: 18 }}>
                <Image
                    style={[styles.imageDropdown, { transform: [{ rotate: isOpened ? '180deg' : '0deg' }] }]}
                    source={Images.btnOvalArrowDown} />
            </TouchableOpacity>
        </View>
    }

    renderItem = (item) => {
        return <View style={styles.itemContainer}>
            <View style={styles.contentHistory}>
                <Text style={styles.titleHistory}>{item.title}</Text>
                <View style={{ height: 10 }} />
                <Text style={styles.timeText}>{item.time}</Text>
            </View>
        </View>
    }

    ItemSeparator = () => {
		return (
			<View
				style={{
					height: 1,
					width: "100%",
					backgroundColor: Colors.athensGray,
				}}
			/>
		);
	}

    render() {
        const { isOpened, data } = this.state

        return (
            <FlatList
                data={data}
                style={{ ...styles.container, height: isOpened ? 80 * (data.length < 5 ? data.length : 4) + data.length-1 : 80 }}
                scrollEventThrottle={16}
                scrollEnabled={isOpened}
                keyExtractor={(item, index) => item + index}
                ItemSeparatorComponent={this.ItemSeparator}
                renderItem={({ item, index, separators }) => {
                    if (index === 0) {
                        return this.renderFirstItem();
                    }
                    return this.renderItem(item);
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: Metrics.screenWidth,
        backgroundColor: Colors.white
    },
    itemContainer: {
        backgroundColor: Colors.white,
        top: 0,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: 'rgba(120, 122, 124, 0.15)',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.15
    },
    contentHistory: {
        flex: 1,
        justifyContent: 'space-evenly',
        paddingLeft: 18
    },
    imageDropdown: {
        width: 42,
        height: 42
    },
    titleHistory: {
        fontFamily: Fonts.family.Medium,
        fontSize: 20,
        color: Colors.darkGrey
    },
    timeText: {
        fontSize: 16,
        color: Colors.coolGrey
    }
})

export default HistoryView;