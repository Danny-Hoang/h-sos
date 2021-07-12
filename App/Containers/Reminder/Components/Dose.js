import React, { Component } from "react";
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import styled from "styled-components";
import { BottomPopup } from "../../../Components";
import { Colors, Fonts, Images, Metrics, Strings } from "../../../Theme";
import DatePickerComponent from "../../SetProfile/AdditionalInfo/DatePicker";

const strings = Strings.reminder;
class Dose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{ time: "10:00" }],
            isShowPopupTimer: false,
            modifyItemIndex: undefined,
            selectedTime: ''
        };
    }

    renderItem = ({ item }) => {
        return (

            <TouchableOpacity onPress={() => {
                this.setState({ modifyItemIndex: this.state.data.indexOf(item), isShowPopupTimer: true },
                    () => { console.log("MONICA click: ", this.state.modifyItemIndex) })
            }}
                style={{ flexDirection: 'row', height: 65, justifyContent: 'space-between', alignItems: 'center', borderBottomColor: Colors.lightBlueGrey, borderBottomWidth: 1 }}>
                <Text style={{ fontSize: 16, fontFamily: Fonts.family.Regular }}>Time {this.state.data.indexOf(item) + 1}</Text>
                <Text style={{ fontSize: 18, fontFamily: Fonts.family.Bold }}>{item.time}</Text>
            </TouchableOpacity>
        );
    };
    render() {
        const { onClose, onDoneSettingDose } = this.props;
        const { data, isShowPopupTimer, modifyItemIndex } = this.state
        const title = data.length > 1 ? "times" : "time"
        return (<View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => { onClose() }}>
                    <View style={styles.closeView}>
                        <Image source={Images.icCloseBlack} style={styles.imageClose} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => { onDoneSettingDose(data) }}>
                    <Text style={{ fontFamily: Fonts.family.Bold, fontSize: 20, color: Colors.blue, textAlign: 'center' }}>{strings.done}</Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignSelf: "stretch", flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', height: 70, marginTop: 20 }}>
                <TouchableOpacity onPress={() => { this.setState({ data: data.slice(0, -1) }) }}
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={Images.icSub} style={{ width: 42, height: 42 }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 21, fontFamily: Fonts.family.Bold }}>{data.length} {title} </Text>
                <TouchableOpacity onPress={() => { this.setState({ data: [...this.state.data, { time: "10:00" }] }) }}
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={Images.icPlus2} style={{ width: 42, height: 42 }} />
                </TouchableOpacity>
            </View>
            <FlatList style={{ paddingHorizontal: 20, alignSelf: "stretch" }}
                data={data}
                keyExtractor={(item, index) => index}
                renderItem={this.renderItem}

            />
            <BottomPopup visible={isShowPopupTimer} onRequestClose={() => { this.setState({ isShowPopupTimer: false }) }}>
                <View style={styles.bottomViewDate}>
                    <DatePickerComponent
                        onChange={(value) => {
                            this.setState({ data: [...data.slice(0, modifyItemIndex), { time: value.toLocaleTimeString().substr(0, 5) }, ...data.slice(modifyItemIndex + 1)] }, () => {
                                console.log(this.state.data)
                            })
                        }}
                        maximumDate={null} date={new Date()}
                        onClose={() => { this.setState({ isShowPopupTimer: false }) }}
                        mode={'time'} />
                </View>
            </BottomPopup>
        </View>)
    }
}

const styles = StyleSheet.create({
  bottomViewDate: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: 325,
  },
  imageClose: {
    width: 24,
    height: 24,
  },
  closeView: {
    height: 65,
    width: 65,
    justifyContent: "center",
  },
  header: {
    alignSelf: "stretch",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: Colors.lightBlueGrey,
    marginHorizontal: 20,
    borderBottomWidth: 1,
  },
  container: {
    width: Metrics.screenWidth,
    flex: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingBottom: 30,
  },
});
export default Dose;