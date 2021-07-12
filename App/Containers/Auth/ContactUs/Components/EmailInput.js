import { values } from 'lodash';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors, Fonts, Strings } from '../../../../Theme';

const strings = Strings.contactus

class EmailInput extends Component {
    state = {value: ''}
    render() {
        const {value} = this.state
        const {onChangeText} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.titleName}>{strings.email}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                    <TextInput
                        style={styles.phoneNumber}
                        onChangeText={text => {
                            this.setState({value:text})
                            onChangeText(value)
                        }}
                        placeholder={strings.enterYourEmail}
                        placeholderTextColor='#999'
                        value={value}
                        autoCompleteType='off'
                    />
                </View>
                <View style={styles.underline} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 20
    },
    phoneNumber:{
        color: Colors.darkGreyTwo,
        alignSelf: 'stretch',
        fontSize: 19,
        width: 200, 
        flex: 1
    },
    underline: {
        height:1.5,
        backgroundColor: Colors.darkGreyTwo
    },
    time: {
        color: Colors.cloudyBlue,
        fontSize: 16,

    },
    titleName: {
        fontFamily: Fonts.family.Regular,
        fontSize: 16,
        color: Colors.darkGrey
    }
});

export default EmailInput;