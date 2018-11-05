import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import SubMenu from '../SubMenu/index'

class Index extends Component {

    constructor(props) {
        super(props)

        const isOpen = props.history.location.pathname.includes(props.url)
        this.state = {
            isOpen: isOpen,
            active: 'sgsg-menu__item--active'
        }
    }

    toggleSubMenu = () => {
        this.setState({
            ...this.state,
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <li className={`sgsg-menu__item ${this.state.isOpen ? this.state.active : ''}`}>
                <div onClick={this.toggleSubMenu} className={`sgsg-menu__link`}>
                    <span className={`sgsg-menu__text`}>{this.props.name}</span>
                </div>
                <SubMenu children={this.props.children} isOpen={this.state.isOpen}/>
            </li>
        )
    }
}


export default withRouter(Index)