import React, { PureComponent } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Colors } from '../Theme';

class Button extends PureComponent {
  render() {
    const { selected, onClick, children, style = {}, disabled = false } = this.props
    const {
      flex = 0,
      width = 154,
      height = 52,
      borderColor = 'rgba(196, 196, 196, 0.8)',
      selectedBorderColor = 'rgba(78, 83, 112, 0.8)',
      backgroundColor = !disabled ? Colors.white : 'rgba(196, 196, 196, 0.8)',
      borderRadius = 8,
      borderWidth = 2,
      ...others
    } = style
    return (
      <TouchableOpacity
        style={{ width, height, flex }}
        activeOpacity={disabled ? 1 : 0.7}
        onPress={() => {
          if(!disabled){
            onClick(!selected)
          }
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderColor: selected ? selectedBorderColor : borderColor,
            backgroundColor,
            borderWidth: selected ? borderWidth : Math.min(borderWidth, 1),
            borderRadius,
            flex: 1,
            ...others
          }}>
          {children}
        </View>
      </TouchableOpacity>
    )
  }
}

export default Button
