import React, { Component } from 'react'
import { Colors } from '../Theme'
import { Platform, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

const TouchableAndroid = (props) => (
  <TouchableHighlight
    activeOpacity={0.7}
    underlayColor={Colors.transparent}
    {...props} />
)

export default Platform.OS === 'ios' ? TouchableOpacity : TouchableAndroid