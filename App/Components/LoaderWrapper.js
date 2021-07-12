import styled from 'styled-components'
import { Metrics } from '../Theme'

export const LoaderWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: ${Metrics.screenWidth};
  height: ${Metrics.screenHeight};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`