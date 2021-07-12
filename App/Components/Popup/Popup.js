import React, { PureComponent } from 'react'
import Dialog, { DialogContent, SlideAnimation } from 'react-native-popup-dialog'
import styled from 'styled-components'
import { Colors, Fonts } from '../../Theme'
import Touchable from '../Touchable'

const Container = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
const HSeperator = styled.View`
  width: 315px;
  height: 1px;
  background-color: ${Colors.borderColorDateTime};
`
const ButtonText = styled.Text`
  width: 100%;
  font-family: ${Fonts.family.Regular};
  font-size: 19px;
  padding-top: 16px;
  color: ${(props) => (props.isRight ? Colors.lightishBlue : Colors.darkGrey)};
  text-align:${(props) => (props.isRight ? 'right' : 'left')};
`
const ButtonContainer = styled.View`
  height: 55px;
  flex-direction: row;
  justify-content: space-between;
`
const Button = ({ onPress, isRight, children }) => (
  <Touchable style={{ flex: 1 }} onPress={onPress}>
    <ButtonText isRight={isRight}>{children}</ButtonText>
  </Touchable>
)
export default class Popup extends PureComponent {
  render() {
    const { visible = false, onClose, buttons, children } = this.props
    return (
      <Dialog style={{zIndex:-1, position:'absolute'}} onTouchOutside={() => onClose()} width={320} visible={visible}>
        <DialogContent
          style={{
            borderRadius: 6,
            borderWidth: 0,
            padding: 0,
            margin: 0,
            marginBottom: 0,
            paddingBottom: 0,
          }}
        >
          <Container>
            {children}
            <HSeperator />
            <ButtonContainer>
              {buttons.map(({ text, onPress }, idx) => [
                <Button key={text} onPress={onPress} isRight={idx === buttons.length - 1}>
                  {text}
                </Button>,
              ])}
            </ButtonContainer>
          </Container>
        </DialogContent>
      </Dialog>
    )
  }
}
