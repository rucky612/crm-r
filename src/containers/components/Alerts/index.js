import React, { Component } from 'react'
import styled from 'styled-components'
import {switchColor, sgsgColor} from '../../constants'

const Alert = styled.div`
  position: relative;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 4px;
  font-weight: 400;
  color: ${sgsgColor.black};
  border-color: ${props => switchColor(props.color)};
  background-color: ${props => switchColor(props.color)};
`

class Index extends Component {
  static defaultProps = {
    state: "",
    strong: "",
    plain: ""
  }

  render() {
    return (
      <Alert color={this.props.state}>
        <strong>{this.props.strong}</strong>
        {this.props.plain}
      </Alert>
    )
  }
}

export default Index