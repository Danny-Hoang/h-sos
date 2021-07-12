import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomPopup, HeaderWithBack } from '../../Components';
import NavigationService from '../../Services/NavigationService';
import { Colors, Fonts, Strings } from '../../Theme';
import AddCarer from './Components/AddCarer';
import ListCarer from './Components/ListCarer';
import { CarerState } from '../../Utils'
import CarerDetail from './Components/CarerDetail';
import { PhoneNumber } from 'google-libphonenumber';
import CenterPopup from '../../Components/CenterPopup';

const strings = Strings.carer

class Carer extends Component {
    state = {
        listCarer: [],
        addCarerVisible: false,
        carerDetailVisible: false,
        carerRemoveVisible: false,
        carerRemoveDoneVisible: false,
        carerAddError: false,
        selectedItem: null
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { navigation } = nextProps;
        const { listCarer } = prevState;
        const phoneNumber = navigation.getParam('phoneNumber', '');
        if(phoneNumber==''){return null}
        if (JSON.stringify(listCarer).includes(phoneNumber)) { 
            navigation.setParams({ phoneNumber: '' })
            return {carerAddError: true} 
        }
        var newList = []
        if (phoneNumber != '') {
            newList.push({ phoneNumber: phoneNumber, state: CarerState.PENDING })
        }
        for (let i = 0; i < listCarer.length; i++) {
            if (i % 4 == 0) { newList.push({ phoneNumber: listCarer[i].phoneNumber, state: CarerState.ACCEPTED }) }
            if (i % 4 == 1) { newList.push({ phoneNumber: listCarer[i].phoneNumber, state: CarerState.EXPIRED }) }
            if (i % 4 == 2) { newList.push({ phoneNumber: listCarer[i].phoneNumber, state: CarerState.REJECTED }) }
            if (i % 4 == 3) { newList.push({ phoneNumber: listCarer[i].phoneNumber, state: CarerState.PENDING }) }
        }
        navigation.setParams({ phoneNumber: '' })
        return { listCarer: newList };
    }

    addAction() {
        this.setState({
            addCarerVisible: true
        })
    }

    inviteAction = (phone) => {
        const {listCarer} = this.state;
        this.setState({ addCarerVisible: false })
        if (!JSON.stringify(listCarer).includes(phone)) { 
            NavigationService.pushToNewScreen("CompleteAddCarer", { phoneNumber: phone })
        } else {
            this.setState({
                carerAddError: true
            })
        }
    }

    moreAction(item) {
        this.setState({ carerDetailVisible: true, selectedItem: item })
    }

    resend() {
        const { selectedItem } = this.state;
        this.setState({ carerDetailVisible: false })
        NavigationService.pushToNewScreen("CompleteAddCarer", { phoneNumber: selectedItem.phoneNumber })
    }

    remove(item) {
        const { listCarer, selectedItem } = this.state;
        if (item == null) {
            let newList = listCarer.filter(x => x.phoneNumber != selectedItem.phoneNumber || x.state.value != selectedItem.state.value);
            this.setState({ listCarer: newList, carerDetailVisible: false });
        } else {
            let newList = listCarer.filter(x => x.phoneNumber != item.phoneNumber || x.state.value != item.state.value);
            this.setState({ listCarer: newList, carerDetailVisible: false });
        }
    }

    render() {
        const { navigation } = this.props
        const { listCarer, addCarerVisible, carerDetailVisible, 
            carerRemoveVisible, carerRemoveDoneVisible, carerAddError } = this.state
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <HeaderWithBack navigation={navigation} title={strings.title} />
                        <TouchableOpacity onPress={() => this.addAction()}>
                            <View style={{padding: 10}}>
                                <Text style={styles.addText}>{strings.add}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {listCarer.length == 0
                        ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={styles.noCarerText}>{strings.noCarer}</Text>
                        </View>
                        : <ListCarer listCarer={listCarer}
                            deleteItem={(item) => { this.remove(item) }}
                            pressMore={(item) => { this.moreAction(item) }} />
                    }
                    <BottomPopup visible={addCarerVisible} onRequestClose={() => { this.setState({ addCarerVisible: false }) }}>
                        <View style={styles.bottomView}>
                            <AddCarer
                                onClose={() => { this.setState({ addCarerVisible: false }); }} inviteAction={(phone) => { this.inviteAction(phone) }} />
                        </View>
                    </BottomPopup>
                    <BottomPopup
                        visible={carerDetailVisible}
                        onRequestClose={() => {
                            this.setState({ carerDetailVisible: false });
                        }}>
                        <View style={styles.bottomView}>
                            <CarerDetail
                                onClose={() => {
                                    this.setState({ carerDetailVisible: false });
                                }}
                                resend={() => { this.resend() }}
                                remove={() => { this.setState({ carerDetailVisible:false, carerRemoveVisible: true }) }}
                            />
                        </View>
                    </BottomPopup>
                    <CenterPopup
                        visible={carerRemoveVisible}
                        cancelAction={() => { this.setState({ carerRemoveVisible: false }) }}
                        doneAction={() => { 
                            this.setState({ carerRemoveVisible: false, carerRemoveDoneVisible: true });
                            this.remove();
                        }}
                        doneTitle={strings.remove}
                        title={strings.delete.title}
                        canBack={false}
                        content={strings.delete.question + "Master Yi" + "?\n\n" + "Master Yi " + strings.delete.desc} />
                    <CenterPopup
                        visible={carerRemoveDoneVisible}
                        doneAction={() => { 
                            this.setState({ carerRemoveDoneVisible: false });
                        }}
                        doneTitle={Strings.common.popup.ok}
                        title={strings.delete.title}
                        canBack={false}
                        content={"Master Yi" + strings.delete.doneDesc} />
                    <CenterPopup
                        visible={carerAddError}
                        doneAction={() => {
                            this.setState({ carerAddError: false });
                        }}
                        doneTitle={Strings.common.popup.ok}
                        title={strings.error.title}
                        canBack={false}
                        content={strings.error.desc} />
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

export default Carer;