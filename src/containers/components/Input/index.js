import React, { Component } from 'react'
import Popover from '../Popover'
import styled from 'styled-components'
import {switchColor, switchSize} from '../../constants'

const Input = styled.input`
  position: relative;
  display: block;
  width: 100%;
  padding: ${props => switchSize(props.size)};
  color: ${props => switchColor(props.valid, "text")};
  border: 1px solid ${props => switchColor(props.valid)};
  border-radius: 3px;
  outline: none;
  &:focus {
      border: 1px solid #716aca;
      border-radius: 3px;
      box-shadow: 2px 2px 5px #716aca;
  }
`
const InputHelp = styled.p`
  font-weight: 500;
  color: ${props => switchColor(props.valid, "text")};
`

class Index extends Component {
  static defaultProps = {
    type: 'text',
    name: '',
    size: '',
    value: '',
    readOnly: false,
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
    placeholder: '',
    valid: '',
    help: '',
    popover: ''
  }

  renderPopover = (string = '') => {
    if (string.length !== 0) {
      return <Popover bodyText={string}/>
    } else {
      return
    }
  }

  renderHelp = (state = "", help = "") => {
      if(help) {
        return <InputHelp valid={state}>
          {help}
        </InputHelp>
      }
  }

  render() {
    return (
      <div className="input-group">
        <label>{this.props.label}</label>
        <Input {...this.props}/>
        {this.renderHelp(this.props.valid, this.props.help)}
        {this.renderPopover(this.props.popover)}
      </div>
    )
  }
}

export default Index