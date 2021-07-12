import React from 'react'
import styled from 'styled-components'

export default styled.View`
  height: ${props => props.height || 0};
  width: ${props => props.width || 0};
`