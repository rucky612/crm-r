import React, { Component } from 'react'
import {backgroundColor, textColor, switchColor, switchButtonSize} from '../../constants'
import styled, { css } from 'styled-components'
import {darken} from 'polished'

const Button = styled.button`
  display: ${props => props.displayBlock ? "block" : "inline-block"};
  ${props => props.displayBlock && css`width: 100%`}
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  border: 1px solid transparent;
  color: ${props => textColor(props.color, props.outline)};
  border-color: ${props => switchColor(props.color)};
  background-color: ${props => backgroundColor(props.color, props.outline)};
  border-radius: .25rem;
  padding: ${props => switchButtonSize(props.size)};
  font-size: 1rem;
  line-height: 1.25;
  ${props =>
    !props.disabled ? css`
    &:hover {
      cursor: pointer;
      color: ${props => textColor(props.color)};
      border-color: ${props => 
      props.outline ? switchColor(props.color) : darken(0.20, switchColor(props.color))};
      background-color: ${props => 
      props.outline ? switchColor(props.color) : darken(0.20, backgroundColor(props.color, props.outline))};
    }
    ` : css`
    &:hover {
      cursor: no-drop;
    }
    `
  }
`
class Index extends Component {
  static defaultProps = {
    color: "",
    text: "",
    size: "",
    disabled: false,
    outline: false,
    displayBlock: false
  }

  render() {
    return (
      <Button {...this.props}>
        {this.props.text}
        {this.props.children}
      </Button>
    )
  }
}

export default Index