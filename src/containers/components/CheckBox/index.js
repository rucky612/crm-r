import React, { Component } from 'react'
import styled from 'styled-components'
import {sgsgColor} from '../../constants'

const CheckBoxWrapper = styled.label`
  display: inline-block;
  cursor: pointer;
  color: ${sgsgColor.textGray};
  margin: 0;
  padding: 0;
`

const CheckBox = styled.span`
  position: relative;
  display: inline-block;
  line-height: 1;
  font-size: 1rem;
  color: ${sgsgColor.textGray};
`

class Index extends Component {
  render() {
    return (
      <CheckBoxWrapper>
        <CheckBox>
          <input type={'checkbox'}/>
        </CheckBox>

      </CheckBoxWrapper>
    )
  }
}

export default Index