import React, { Component } from 'react'
import styled from 'styled-components'
import { switchColor } from '../../../constants'

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  color: ${props => switchColor(props.valid, "text")};
  border: 1px solid ${props => switchColor(props.valid)};
  border-radius: 3px;
  padding: 1rem;
  outline: none;
  &:focus {
      border: 1px solid #716aca;
      border-radius: 3px;
      box-shadow: 2px 2px 5px #716aca;
  }
`

const TextareaHelp = styled.p`
  font-weight: 500;
  color: ${props => switchColor(props.valid, "text")};
`

class Index extends Component {

  static defaultProps = {
    name: '',
    value: '',
    valid: '',
    readOnly: false,
    onBlur: () => {},
    onFocus: () => {},
    onChange: () => {}
  }

  renderHelp = (state = "") => {
    return <TextareaHelp valid={state}>
      {this.props.help === "success" ? "" : this.props.help}
    </TextareaHelp>
  }

  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <Textarea {...this.props}/>
        {this.renderHelp(this.props.valid)}
      </div>
    )
  }
}

export default Index