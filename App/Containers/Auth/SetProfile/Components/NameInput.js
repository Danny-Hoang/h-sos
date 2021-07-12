import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { PrimaryTextInput } from '../../../../Components';
import { Colors, Fonts } from '../../../../Theme';

class NameInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
        }
    }

    updateState = (value) => {
        const { onChange } = this.props
        this.setState({
            inputValue: value,
        }, () => {
            onChange(value)
        })
    }

    render() {
        const { titleName, placeholder } = this.props;
        const { inputValue } = this.state
        return (
            <View style={{ justifyContent: 'flex-start', paddingHorizontal: 20 }}>
                <View style={{flexDirection: 'row', justifyContent:'center', alignItems: 'center'}}>
                <Text style={styles.titleName}>
                    Name
                    <Text style={{...styles.titleName, color: Colors.coral}}>*</Text>
                </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Enter Name'
                    onChangeText={text => this.updateState(text)}
                    value={inputValue}
                />
                </View>
                
                <View style={styles.underline} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    underline: {
        height: 3,
        backgroundColor: Colors.darkGreyTwo
    },
    titleName: {
        fontFamily: Fonts.family.Regular,
        fontSize: 16,
        color: Colors.darkGrey
    },
    textInput:{ 
        height: 40, 
        flex: 1, 
        fontFamily: Fonts.family.Medium, 
        fontSize: 18, 
        color: Colors.darkGreyTwo,
        paddingLeft: 20
    }
})

export default NameInput;