import React, { Component } from 'react'
import Menu from '../../components/Menu/index'
import { AsideInfo } from './constants'

class Index extends Component {

  

  render() {
    return (
      <aside className={`sgsg-aside`}>
        <ul className={`sgsg-list`}>
          <li className={`sgsg-list__item`}>
            item
          </li>
        </ul>
      </aside>
    )
  }
}

export default Index