import React, { Component } from "react";
import {
    FlatList,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { BottomPopup, NameInput, TextButton } from "../../../Components";
import CenterPopup from "../../../Components/CenterPopup";
import Configs from "../../../Configs";
import NavigationService from "../../../Services/NavigationService";
import { Colors, Fonts, Images, Metrics, Strings } from "../../../Theme";
import { isValidNumber } from "../../../Utils";
import Dose from "./Dose";

const strings = Strings.reminder;

class AddReminder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            isOpenTypes: false,
            data: [
                { title: "Pills", image: Images.icMedicine },
                { title: "Hospital", image: Images.icHospital },
                { title: "General", image: Images.icGeneral },
                { title: "Meal", image: Images.icMeal },
                { title: "Workout", image: Images.icWorkout },
                { title: "Custome", image: Images.icCustome },
            ],
            isShowPopupDose: false,
            listDose: [{ time: "10:00" }],
            isEnableDone: false,
            itemSelected: undefined,
        };
    }

    renderItem = ({ item }) => {
        const { itemSelected } = this.state
        let isSelected = typeof itemSelected != 'undefined' && itemSelected.title == item.title
        return (
            <TouchableOpacity onPress={(event) => {
                this.setState({ isEnableDone: true, itemSelected: item })
            }}>
                <View style={{
                    width: (Metrics.screenWidth - 50) / 2, height: 100,
                    backgroundColor: (isSelected) ? Colors.redOpacity : Colors.white,
                    justifyContent: 'center', alignItems: 'center', margin: 5,
                    borderColor: (isSelected) ? Colors.red : Colors.lightBlueGrey, borderRadius: 4, borderWidth: 1
                }}>
                    <Image source={item.image} style={{ width: 40, height: 40 }} />
                    <Text style={{ fontSize: 18, fontFamily: Fonts.family.Regular, marginTop: 12 }}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    render() {
        const { onClose } = this.props;
        const { step, data, isOpenTypes, isShowPopupDose, listDose, isEnableDone, itemSelected } = this.state;
        let doseText = listDose.map((item) => item['time']).join('\n')
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.containerContent}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                onPress={() => {
                                    onClose();
                                }}>
                                <View style={styles.closeView}>
                                    <Image source={Images.icCloseBlack} style={styles.imageClose} />
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.title}>{strings.addReminder}</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{ flex: 1 }}>
                    {step == 1 && <View style={{ justifyContent: "space-between", flexDirection: 'column', flex: 1 }}>
                        <View>
                            <Text style={{ fontSize: 16, color: Colors.darkGrey, paddingHorizontal: 20 }}>{strings.type}</Text>
                            <FlatList style={{ marginTop: 16, paddingHorizontal: 15 }}
                                data={data}
                                numColumns={2}
                                keyExtractor={(item, index) => item.title}
                                renderItem={this.renderItem}

                            />
                        </View>

                        <View style={{ marginHorizontal: 20, marginBottom: 26 }}>
                            <TextButton
                                disabled={!isEnableDone}
                                onClick={() => {
                                    this.setState({ step: 2 })
                                }}
                            >
                                {strings.done}
                            </TextButton>
                        </View>

                    </View>}

                    {step == 2 && <View style={{ flexDirection: 'column', flex: 1, justifyContent: "space-between" }}>
                        <ScrollView>
                            <TouchableOpacity style={styles.row}
                                onPress={() => { this.setState({ isOpenTypes: !isOpenTypes }) }}>
                                <Text style={{ color: Colors.darkGrey, fontSize: 16, flex: 1 }}>{strings.type}</Text>
                                <Text style={{ flex: 2, color: Colors.darkGreyTwo, fontSize: 18, fontFamily: Fonts.family.Medium }}>{itemSelected.title}</Text>
                                <Image source={isOpenTypes ? Images.btnArrowUp : Images.btnArrowDown} style={{ width: 24, height: 24 }} />
                            </TouchableOpacity>
                            {isOpenTypes && <FlatList style={{ marginTop: 16, paddingHorizontal: 15 }}
                                data={data}
                                numColumns={2}
                                keyExtractor={(item, index) => item.title}
                                renderItem={this.renderItem}

                            />}
                            <View style={styles.row}>
                                <Text style={{ color: Colors.darkGrey, fontSize: 16, flex: 1 }} >{strings.title}</Text>
                                <NameInput
                                    style={{ flex: 2, fontFamily: Fonts.family.Regular }}
                                    placeholder={'ex, Insulin'}
                                    maxLength={15}
                                    containUnderline={false}
                                />
                            </View>
                            <Text style={{ marginTop: 10, fontSize: 16, marginHorizontal: 20, color: Colors.slateGrey }}>{strings.description}</Text>
                            <TouchableOpacity onPress={() => { this.setState({ isShowPopupDose: true }) }}
                                style={[styles.row, { height: 90 }]}>
                                <Text style={styles.textAtribute} >{strings.dose}</Text>
                                <View>
                                    <Text style={styles.textValue}>{listDose.length} {listDose.length > 1 ? "times" : "time"}</Text>
                                    <Text style={styles.textValue}>{doseText}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.row}>
                                <Text style={styles.textAtribute} >{strings.date}</Text>
                                <Text style={styles.textValue}>10/08/20</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.textAtribute} >{strings.repeat}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: Colors.slateGrey, fontSize: Fonts.size.regular }}>Never</Text>
                                    <Image source={Images.btnArrowRight} style={{ width: 24, height: 24 }} />
                                </View>
                            </View>
                        </ScrollView>
                        <View style={{ marginHorizontal: 20, marginBottom: 26 }}>
                            <TextButton
                                disabled={false}
                                onClick={() => {
                                }}
                            >
                                {strings.login}
                            </TextButton>
                        </View>
                    </View>}

                </View>

                <BottomPopup visible={isShowPopupDose} onRequestClose={() => { this.setState({ isShowPopupDose: false }) }}>
                    <View style={styles.bottomView}>
                        <Dose onClose={() => { this.setState({ isShowPopupDose: false }) }} onDoneSettingDose={(data) => this.setState({ listDose: data, isShowPopupDose: false })} />
                    </View>
                </BottomPopup>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight - 50,
        backgroundColor: Colors.white,
        flex: 1,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    imageClose: {
        width: 24,
        height: 24,
    },
    closeView: {
        height: 65,
        width: 65,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontFamily: Fonts.family.Medium,
        fontSize: 22,
    },
    containerContent: {
        backgroundColor: Colors.transparent,
    },
    textAtribute: { color: Colors.darkGrey, fontSize: 16 },
    textValue: { color: Colors.darkGreyTwo, fontSize: 18, fontFamily: Fonts.family.Bold },
    row: { flexDirection: 'row', marginHorizontal: 20, justifyContent: "space-between", height: 60, alignItems: 'center', borderBottomColor: Colors.paleGrey, borderBottomWidth: 1 },
    titleSignInText: {

    },
    modalView: {

    },
    contactText: {

    },
    contactView: {

    },
    bottomView: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flex: 0
    },
});

export default AddReminder;
