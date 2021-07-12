import React, { Component } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomPopup, HeaderWithBack } from '../../Components';
import NavigationService from '../../Services/NavigationService';
import { Colors, Fonts, Images, Strings } from '../../Theme';
import AddCarer from '../Carer/Components/AddCarer';
import { CarerState } from '../../Utils'
import CarerDetail from '../Carer/Components/CarerDetail';
import { PhoneNumber } from 'google-libphonenumber';
import CenterPopup from '../../Components/CenterPopup';
import ListReminder from './Components/ListReminder';
import AddReminder from './Components/AddReminder';
import Constants from '../../Constants';

const strings = Strings.carer

class Reminder extends Component {
    state = {
        listReminder: [
            { title: 'Pills', time: 'Mon 10/11/20 4:00PM', repeat: 'Everyday', type: Constants.TYPE_REMINDER.MEDICINE },
            { title: 'Meal', time: 'Mon 10/11/20 4:00PM', repeat: 'Everyday', type: Constants.TYPE_REMINDER.MEAL },
            { title: 'Workout', time: 'Mon 10/11/20 4:00PM', repeat: 'Everyday', type: Constants.TYPE_REMINDER.WORKOUT },
            { title: 'General', time: 'Mon 10/11/20 4:00PM', repeat: 'Everyday', type: Constants.TYPE_REMINDER.GENERAL },
            { title: 'Hospital', time: 'Mon 10/11/20 4:00PM', repeat: 'Everyday', type: Constants.TYPE_REMINDER.HOSPITAL },
        ],
        selectedItem: null,
        isShowPastReminder: false,
        isShowAddReminderModel: false,
    }


    addAction() {
        this.setState({
            isShowAddReminderModel: true
        })
    }


    moreAction(item) {
        this.setState({ selectedItem: item })
    }

    remove(item) {
        const { listReminder, selectedItem } = this.state;
        if (item == null) {
            let newList = listReminder.filter(x => x.title != selectedItem.title);
            this.setState({ listReminder: newList});
        } else {
            let newList = listReminder.filter(x => x.title != item.title);
            this.setState({ listReminder: newList});
        }
    }

    render() {
        const { navigation } = this.props
        const { listReminder, isShowPastReminder, isShowAddReminderModel } = this.state
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <HeaderWithBack navigation={navigation} title='Reminder' />
                        <TouchableOpacity onPress={() => this.addAction()}>
                            <View style={{ padding: 10 }}>
                                <Text style={styles.addText}>{strings.add}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{
                        width: 220, height: 45, backgroundColor: (isShowPastReminder) ? Colors.redOpacity : Colors.white, alignItems: 'center', borderWidth: 1, paddingLeft: 18,
                        borderColor: (isShowPastReminder) ? Colors.red : Colors.lightBlueGrey, borderRadius: 6, marginLeft: 13, marginBottom: 15,
                        flexDirection: 'row'
                    }}
                        onPress={() => { this.setState({ isShowPastReminder: !isShowPastReminder }) }}>
                        <Image source={isShowPastReminder ? Images.icTickOn : Images.icTick} style={{ width: 14, height: 9, marginRight: 10 }} />
                        <Text style={{ color: isShowPastReminder ? Colors.red : Colors.slateGrey, fontSize: 17 }}>Show past reminder</Text>

                    </TouchableOpacity>
                    {listReminder.length == 0
                        ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.noCarerText}>{strings.noCarer}</Text>
                        </View>
                        : <ListReminder listReminder={listReminder}
                            deleteItem={(item) => { this.remove(item) }}
                            pressDetail={(item) => { this.moreAction(item) }} />
                    }

                    <BottomPopup
                        visible={isShowAddReminderModel}
                        onRequestClose={() => {
                            this.setState({ isShowAddReminderModel: false });
                        }}
                    >
                        <View style={styles.bottomView}>
                            <AddReminder
                                onClose={() => {
                                    this.setState({ isShowAddReminderModel: false });
                                }}
                            />
                        </View>
                    </BottomPopup>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: Colors.athensGray,
    },
    header: {
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    noCarerText: {
        fontSize: 20,
        fontFamily: Fonts.family.Regular,
        color: Colors.slateGrey
    },
    addText: {
        fontSize: 20,
        fontFamily: Fonts.family.Medium,
        color: Colors.lightishBlue,
    },
    bottomView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22,
    },
})

export default Reminder;