import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


class Index extends Component {

  render() {
    return (
      <li className={`sgsg-submenu__item`}>
        <NavLink activeClassName={`sgsg-submenu__link sgsg-submenu__link--active`} className={`sgsg-submenu__link`} exact to={`${this.props.url}`}>
          <span className={`sgsg-submenu__text`}>{this.props.name}</span>
        </NavLink>
      </li>
    )
  }
}

export default Index