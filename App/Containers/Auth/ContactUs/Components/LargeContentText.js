import React, { Component, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Colors, Fonts, Strings } from '../../../../Theme';

const strings = Strings.contactus

class LargeContentText extends Component {
    state = { value: '' }
    render() {
        return (
            <TouchableOpacity onPress={() => { this.ref.focus(); }}>
                <View style={styles.container}>
                    <TextInput
                        ref={ref => this.ref = ref}
                        placeholder={strings.contents}
                        style={styles.input}
                        value={this.state.value}
                        onChangeText={text => {
                            this.setState({ value: text })
                        }}
                        multiline={true}
                        underlineColorAndroid='transparent'
                    />
                    <Text style={{...styles.input, alignSelf:'flex-end', color: Colors.coolGrey}}>{this.state.value.length}/1000</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 270,
        borderColor: Colors.lightBlueGrey,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingBottom: 10,
        justifyContent: 'space-between'
    },
    input: {
        fontSize: 18,
        fontFamily: Fonts.family.Regular,
    }
})

export default LargeContentText;