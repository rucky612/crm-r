import React, { Component } from 'react'
import Menu from '../index'
import { Link } from 'react-router-dom'

class Index extends Component {
  constructor(props) {
    super(props)

    this.itemRef = React.createRef()
  }


  onHover = () => {
    const listItem = this.itemRef.current
    console.log(listItem)
    if(listItem.classList.contains("sgsg-menu__item--hover")) {
      listItem.classList.add("sgsg-menu__item--hover")
    } else {
      listItem.classList.remove("sgsg-menu__item--hover")
    }
  }

  ChildList = ({children}) => {
    if(children) {
      return <Menu info={children}/>
    }
  }

  RouteLink = ({url, name}) => {
    if(url) {
      return <Link to={`${url}`}>
        <span>{name}</span>
      </Link>
    } else {
      return <span>{name}</span>
    }
  }

  render() {
    return (
      <li ref={this.itemRef} className={`sgsg-menu__item`} onMouseEnter={this.onHover}>
        {this.RouteLink(this.props.child)}
        {this.ChildList(this.props.child)}
      </li>
    )
  }
}

export default Index