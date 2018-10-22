import React, { Component } from 'react'
import { AsideInfo } from './constants'
import Menu from '../../components/Menu'

class Index extends Component {

  render() {
    return (
      <aside className={`sgsg-aside`}>
        <Menu children={AsideInfo}/>
      </aside>
    )
  }
}

export default Index