import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import SubMenu from '../SubMenu'
import connect from 'react-redux/es/connect/connect'

class Index extends Component {

  constructor(props) {
    super(props)

    this.menuRef = React.createRef()
    this.state = {
      isOpen: false
    }
  }

  componentDidMount() {
    const correctRoute = this.props.pathname.includes(this.props.url)
    if(correctRoute) {
      this.menuRef.current.classList.add("sgsg-menu__item--active")
      this.setState({
        isOpen: true
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    this.toggleSubMenu()
  }

  toggleSubMenu = () => {
    const urlCheck = this.props.history.location.pathname === this.props.url
    if(urlCheck) {
      this.setState({
        ...this.state,
        isOpen: !this.state.isOpen
      })
    }
  }

  toggleClass = () => {
    const urlCheck = this.props.history.location.pathname === this.props.url
    const liClassList = this.menuRef.current.classList
    if(liClassList.contains("sgsg-menu__item--active") && urlCheck) {
      liClassList.remove("sgsg-menu__item--active")
    } else {
      liClassList.add("sgsg-menu__item--active")
    }
  }

  render() {
    return (
      <li ref={this.menuRef} onClick={() => {this.toggleSubMenu(); this.toggleClass()}} className={`sgsg-menu__item`}>
        <NavLink className={`sgsg-menu__link`}  to={`${this.props.url}`}>
          <span className={`sgsg-menu__text`}>{this.props.name}</span>
        </NavLink>
        <SubMenu children={this.props.children} isOpen={this.state.isOpen}/>
      </li>
    )
  }
}


const mapStateToProps = ({router}) => {
  return {
    pathname: router.location.pathname
  }
}

export default withRouter(connect(
  mapStateToProps
)(Index))