import React, { Component } from 'react'
import MenuItem from './MenuItem/index'

class Index extends Component {

  CheckChildren = (children) => {
    return children.map((child, index) => {
      return <MenuItem key={index} child={child}/>
    })
  }

  render() {
    return (
      <ul className={`sgsg-menu`}>
        {this.CheckChildren(this.props.info)}
      </ul>
    )
  }
}

export default Index