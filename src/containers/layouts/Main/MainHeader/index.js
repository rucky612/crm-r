import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Index extends Component {

  mainHeadName = (urlPath) => {
    if(urlPath.includes("/templates")) {
      return <h3>템플릿 관리</h3>
    } else if(urlPath.includes("/messages")) {
      return <h3>메시지 관리</h3>
    } else {
      return <h3>NO header</h3>
    }
  }

  render() {
    return (
      <header className={`sgsg-main__header`}>
        {this.mainHeadName(this.props.location.pathname)}
      </header>
    )
  }
}

export default withRouter(Index)