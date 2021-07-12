import React, { Component } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { Touchable } from '../Components'
import { Colors, Fonts } from '../Theme'

class TextButton extends Component {
  render() {
    const { selected, onClick, children, style = {}, disabled = false, longPress} = this.props
    const {
      flex = 0,
      height = 55,
      color = Colors.white,
      selectedColor = Colors.white,
      borderRadius = 4,
      borderWidth = 0,
      fontSize = 20,
      lineHeight = 24,
      borderColor = Colors.borderColor,
      fontFamily = Fonts.family.Bold,
      selectedFontFamily = Fonts.family.Bold,
      backgroundColor = Colors.coral,
      backgroundColorDisable = Colors.lightPeriwinkle,
      colorDisable = Colors.coolGrey,
      ...others
    } = style
    return (
      <TouchableHighlight style={{ height, flex, alignSelf: 'stretch' }} onPress={onClick} onLongPress={() => {longPress&&longPress()}} disabled={disabled}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: borderWidth,
            borderRadius,
            borderColor,
            backgroundColor: disabled ? backgroundColorDisable : backgroundColor,
            shadowColor: disabled ? backgroundColorDisable : backgroundColor,
            shadowOpacity: 0.35,
            shadowOffset: {width: 2, height:2},
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: selected ? selectedFontFamily : fontFamily,
              fontSize,
              lineHeight,
              color: disabled ? colorDisable : color,
              ...others,
            }}
          >
            {children}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

export default TextButton
