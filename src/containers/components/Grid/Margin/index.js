import React, { Component } from 'react'
import styled from 'styled-components'

const Mb3 = styled.div`
  margin-bottom: 1rem;
`

class Index extends Component {
  render() {
    return (
      <Mb3>
        {this.props.children}
      </Mb3>
    )
  }
}

export default Index