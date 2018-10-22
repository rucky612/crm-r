import React, { Component } from 'react'
import MenuItem from '../MenuItem'

class Index extends Component {
  render() {
    return (
      <ul className={`sgsg-menu`}>
        {this.props.children.map((child, index) => {
          return <MenuItem key={index} {...child}/>
        })}
      </ul>
    )
  }
}

export default Index
