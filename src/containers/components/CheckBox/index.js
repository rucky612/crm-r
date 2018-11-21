import React, { Component } from 'react'
import styled from 'styled-components'
import {sgsgColor} from '../../constants'

const CheckBoxWrapper = styled.label`
  display: inline-block;
  cursor: pointer;
  margin: 0;
  padding: 0;
`
const CheckBox = styled.span`
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid ${sgsgColor.gray};
  border-radius: 2px;
  background-color: ${sgsgColor.white};
  color: ${sgsgColor.textGray};
  -webkit-transition: all .3s;
  transition: all .3s;
  &+span {
    padding: 0 8px;
  }
  & input[type='checkbox'] {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    opacity: 0;
  }
`
const CheckBoxInner = styled.div`
  position: absolute;
  display: 'block';
`

class Index extends Component {

  static defaultProps = {
    checked: false,
    text: '',
    onChange: () => {}
  }

  renderText = (text) => {
    if(text) {
      return <span>{text}</span>
    }
  }

  render() {
    const {checked, text, onChange} = this.props
    return (
      <CheckBoxWrapper>
        <CheckBox>
          <input type={'checkbox'} checked={checked} onChange={onChange}/>
          <CheckBoxInner checked/>
        </CheckBox>
        {this.renderText(text)}
      </CheckBoxWrapper>
    )
  }
}

export default Index