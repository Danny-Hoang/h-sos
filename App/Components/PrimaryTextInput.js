import React, { Component } from 'react'
import { TextInput, View } from 'react-native'
import { Colors, Fonts } from '../Theme';
import _ from 'lodash';

export default class PrimaryTextInput extends Component {
  constructor(props) {
    super(props)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.blur = this.blur.bind(this)
    this.clear = this.clear.bind(this)
    this.state = {
      focused: false,
      text: this.props.text,
      error: undefined,
      stamp: undefined,
      secureTextEntry: props.password
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   const { text } = props
  //   if (props.stamp !== state.stamp) {
  //   return {
  //     text,
  //     stamp: props.stamp
  //   }
  //   }
  //   return null
  // }

  onChangeText(text) {
    const { editable = true, onChange } = this.props
    if (onChange) {
      onChange(text)
    }
    if (editable) {
      this.setState({
        text,
      })
    }
  }

  blur() {
    this.textInput.blur()
  }

  onFocus() {
    this.setState({
      focused: true,
      error: undefined,
      stamp: new Date().getTime()
    })
  }

  onBlur() {
    const { checkOnBlur = false } = this.props
    this.setState({
      focused: true,
    }, () => checkOnBlur && this.validate())
  }

  clear() {
    this.textInput.clear()
    this.setState({
      text: '',
      error: undefined
    })
  }

  validate(text) {
    const {
      validate = () => {
      }
    } = this.props
    const error = validate(text || this.state.text)
    if (error) {
      this.setState({
        error,
        secureTextEntry: false,
        focused: false
      })
      return false
    } else {
      return true
    }
  }

  getValue = () => {
    const { text } = this.state
    return text
  }

  flipSecurityText = () => {
    this.setState({
      secureTextEntry: !this.state.secureTextEntry
    })
  }

  render() {
    const {
      style = {},
      placeholder = '',
      checkOnSubmit = false,
      focusable = true,
      // Icon,
      password = false,
      maxLength = undefined,
      menuHidden = false,
      typeInput = 'default',
      font = Fonts.family.Regular
    } = this.props
    const {
      errorColor = Colors.coral,
      backgroundColor = Colors.white,
      fontSize = 18,
      paddingHorizontal = 0,
      fontFamily = font,
      color = Colors.coolGrey,
      selectedColor = '#000000',
      underlineColorAndroid = Colors.black,
      ...containerStyles
    } = style
    const { focused, error, text, secureTextEntry } = this.state
    return (
      <View removeClippedSubviews={menuHidden} 
      style={{
        ...containerStyles,
        paddingHorizontal,
        backgroundColor,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <TextInput
          ref={(ref) => this.textInput = ref}
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          onChangeText={this.onChangeText}
          onSubmitEditing={({ nativeEvent: { text } }) => checkOnSubmit && this.validate(text)}
          placeholder={placeholder}
          allowFontScaling={false}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          underlineColorAndroid={underlineColorAndroid}
          focused={focused}
          secureTextEntry={secureTextEntry}
          selectionColor={Colors.backgroundCompleteScreen}
          keyboardType={typeInput}
          style={{
            height: 40,
            flex: 1,
            fontSize,
            fontFamily,
            textAlign: 'left',
            color: selectedColor,
            padding: 0,
          }}
          placeholderTextColor={color}
          value={_.isString(error) ? error : text}
          editable={focusable}
          selectTextOnFocus={focusable}
          maxLength={maxLength}
          contextMenuHidden={menuHidden}
        />
        {/* {Icon && (<Icon />)} */}
        {/* {
          password && (
            <IconComponent
              style={{ width: 20, height: 16 }}
              onPress={() => this.flipSecurityText()}
              source={secureTextEntry ? Images.passwordShow : Images.passwordHide}
            />
          )
        } */}
      </View>
    )
  }
}
