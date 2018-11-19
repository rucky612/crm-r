import React, { Component } from 'react'
import styled from 'styled-components'
import {switchColor, sgsgColor} from '../../constants'

const Badge = styled.span`
  background-color: ${props => switchColor(props.state)};
  color: ${props => props.state ? sgsgColor.white : sgsgColor.textGray};
  font-size: 0.8rem;
  line-height: 20px;
  min-height: 20px;
  min-width: 20px;
  vertical-align: middle;
  text-align: center;
  display: inline-block;
  padding: 0 6px;
  border-radius: 4px;
`

class Index extends Component {

  static defaultProps = {
    text: '',
    state: ''
  }

  render() {
    return (
      <Badge {...this.props}>
        {this.props.text}
      </Badge>
    )
  }
}

export default Index