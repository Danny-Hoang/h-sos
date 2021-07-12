import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Fonts, Metrics, Strings } from '../../Theme';

class CenterPopup extends React.PureComponent {
    render() {
        const { onRequestClose, visible, title, content, 
            cancelAction, doneAction, canBack = true, 
            doneTitle=Strings.common.done } = this.props
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    if(canBack){
                        onRequestClose()
                    }
                }}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={{ margin: 20 }}>
                            <Text style={styles.titleText}>{title}</Text>
                        </View>
                        <View style={{ marginHorizontal: 20, marginBottom: 30 }}>
                            <Text style={styles.contentText}>{content}</Text>
                        </View>
                        <View style={styles.underline} />
                        <View style={styles.footer}>
                            {cancelAction && <TouchableOpacity onPress={() => { cancelAction() }}>
                                <Text style={styles.textCancel}>{Strings.common.popup.cancel}</Text>
                            </TouchableOpacity>}
                            <View/>
                            {doneAction && <TouchableOpacity onPress={() => { doneAction() }}>
                                <Text style={styles.textDone}>{doneTitle}</Text>
                            </TouchableOpacity>}
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    content: {
        width: Metrics.screenWidth - 80,
        backgroundColor: Colors.white,
        borderRadius: 6
    },
    underline: {
        height: 0.5,
        backgroundColor: Colors.darkGreyTwo
    },
    titleText: {
        fontSize: 18,
        fontFamily: Fonts.family.Medium,
        color: '#15171a',
    },
    contentText: {
        fontSize: 18,
        fontFamily: Fonts.family.Regular,
        color: Colors.charcoalGreyTwo
    },
    footer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 15
    },
    textCancel: {
        fontSize: 19,
        color: Colors.darkGrey
    },
    textDone: {
        fontSize: 19,
        fontFamily: Fonts.family.Medium,
        color: Colors.lightishBlue
    }
})

export default CenterPopup;