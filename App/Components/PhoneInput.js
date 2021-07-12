import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Colors, Images } from '../Theme';

class PhoneInput extends Component {
    state = { value: "" }
    render() {
        const {value} = this.state;
        const {chooseNumber, onChangeText, selectedCountryCodeText} = this.props;
        return (
            <View style={styles.container}>
            <View style={{ flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => {chooseNumber()}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', width: 87,height: 60 }}>
                        <Text style={styles.prefixPhoneNumber}>{selectedCountryCodeText}</Text>
                        <Image style={{ width: 24, height: 24 }} source={Images.btnArrowDown} />
                    </View>
                </TouchableOpacity>
                <View style={{ marginLeft: 16, flex: 1, height: 60, alignItems:'center', justifyContent: 'center'}}>
                    <TextInput
                        style={styles.phoneNumber}
                        onChangeText={text => {
                            onChangeText(text);
                            this.setState({value: text})
                        }}
                        placeholder='Without "-"'
                        placeholderTextColor='#999'
                        value={value}
                        autoCompleteType='off'
                        keyboardType={'numeric'}
                    />
                </View>
            </View>
            <View style={styles.underline} />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        marginTop: 12,
        marginBottom: 30
    },
    prefixPhoneNumber:{
        color: Colors.darkGreyTwo,
        fontSize: 19,
        justifyContent: 'center'
    },
    phoneNumber:{
        color: Colors.darkGreyTwo,
        alignSelf: 'stretch',
        fontSize: 19,
        flexWrap: 'wrap'
    },
    underline: {
        height:1.5,
        backgroundColor: Colors.darkGreyTwo
    }
});

export default PhoneInput;