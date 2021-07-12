import React, { Component } from 'react';
import { BackHandler, Image, StyleSheet, Text, View } from 'react-native';
import { TextButton } from '../../../Components';
import { RouterName } from '../../../Navigator/RouteName';
import NavigationService from '../../../Services/NavigationService';
import { Colors, Fonts, Images, Strings } from '../../../Theme';

const strings = Strings.carer.complete

class CompleteAddCarer extends Component {
    constructor(props) {
        super(props);

    }

    onComplete = () => {
        const {navigation} = this.props;
        const phoneNumber = navigation.getParam('phoneNumber', '');
        // navigation.pop();
        NavigationService.navigate(RouterName.Carer, {phoneNumber: phoneNumber});
    }

    UNSAFE_componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick = () => {
        return true;
    };

    render() {
        const { navigation } = this.props
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', backgroundColor: "#ff7271" }}>
                <View style={styles.contentTop}>
                    {<Image source={Images.icCompleteConnect} style={styles.image} />}
                    <Text style={[styles.title, { marginBottom: 17 }]}>{strings.complete}</Text>
                    <Text style={styles.message}>{strings.content}</Text>
                    <Text style={styles.phone}>{navigation.getParam('phoneNumber', '')}</Text>
                </View>
                <View style={styles.contentBottom}>
                    <TextButton style={styles.button} onClick={this.onComplete}>{Strings.common.done} </TextButton>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: Fonts.family.Bold,
        fontSize: 28,
        textAlign: 'center',
        color: Colors.white,
    },
    message: {
        fontFamily: Fonts.family.Regular,
        fontSize: 18,
        textAlign: 'center',
        color: Colors.white,
        opacity: 0.7,
    },
    contentTop: {
        flex: 5,
        paddingTop: 156,
        justifyContent: 'center'
    },
    contentBottom: {
        flex: 5,
        justifyContent: 'flex-end',
        paddingBottom: 27,
        paddingHorizontal: 20
    },
    image: {
        height: 80,
        width: 80,
        alignSelf: 'center',
        marginBottom: 27,
    },
    button: {
        backgroundColor: Colors.white,
        color: Colors.darkGrey,
        borderWidth: 0,
    },
    phone:{
        marginTop: 10,
        fontFamily: Fonts.family.Medium,
        fontSize: 22,
        color: Colors.white,
        textAlign: 'center',
    }
});

export default CompleteAddCarer;