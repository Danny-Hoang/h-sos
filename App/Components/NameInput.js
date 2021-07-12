import React, { PureComponent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PrimaryTextInput } from '.';
import { Colors, Fonts } from '../Theme';

class NameInput extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isDisable: false,
            inputValue: this.props.initialValue,
            countText: 0,
        }
    }

    updateState = (value) => {
        const { onChange } = this.props
        this.setState({
            inputValue: value,
            countText: parseInt(value.length)
        }, () => {
            onChange(value)
        })
    }

    render() {

        const {
            style = {},
            placeholder = '',
            maxLength = undefined,
            titleName = undefined,
            containUnderline = true,
        } = this.props
        const {
            fontFamily = Fonts.family.Bold,
            ...containerStyles
          } = style
        const { countText, inputValue } = this.state
        return (
            <View style={{...containerStyles,}}>
                {titleName && <Text style={styles.titleName}>{titleName}</Text>}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                    <PrimaryTextInput style={{ underlineColorAndroid: Colors.transparent, flex: 1, fontFamily }}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        text={inputValue}
                        onChange={text => this.updateState(text)} />
                    {/*<Text style={{ color: Colors.cloudyBlue }}>{countText + "/" + maxLength}</Text>*/}
                </View>
                {containUnderline && <View style={styles.underline} />}
            </View>
        );
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
    }
});

export default NameInput;
