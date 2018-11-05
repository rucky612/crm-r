import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import SubMenuItem from '../SubMenuItem/index'

class Index extends Component {

  constructor(props) {
    super(props)

    this.subMenuRef = React.createRef()
    this.state = {
      check: false,
      isOpen: props.isOpen
    }
  }

  componentDidMount() {
    this.openMenu(this.props.isOpen)
  }

  componentWillReceiveProps(nextProps) {
    this.openMenu(nextProps.isOpen)
  }

  openMenu = (check) => {
    const el = this.subMenuRef.current
    if(check) {
      el.classList.add("sgsg-submenu--expanded")
    } else {
      el.classList.remove("sgsg-submenu--expanded")
    }
  }

  render() {
    return (
      <ul ref={this.subMenuRef} className={`sgsg-submenu`}>
        {this.props.children.map((child, index) => {
          return <SubMenuItem key={index} {...child}/>
        })}
      </ul>
    )
  }
}


export default withRouter(Index)