import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'


class Index extends Component {

    activeClass = () => {
        if(this.props.url.includes("/templates/home") && this.props.location.pathname.includes("/templates/home")) {
            return "sgsg-submenu__link--active"
        } else if(this.props.location.pathname.includes(this.props.url)) {
            return "sgsg-submenu__link--active"
        } else {
            return ""
        }
    }

    render() {
        return (
            <li className={`sgsg-submenu__item`}>
                <NavLink className={`sgsg-submenu__link ${this.activeClass()}`} exact to={`${this.props.url}`}>
                    <span className={`sgsg-submenu__text`}>{this.props.name}</span>
                </NavLink>
            </li>
        )
    }
}

export default  withRouter(Index)