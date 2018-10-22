import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Create from './Create'
import Home from './Home'

class Index extends Component {

  render() {
    // console.log(this.props)
    return (
      <article className={`sgsg-page`}>
        <header>
          <h3></h3>
        </header>
        <Switch>
          <Route path="/templates/create" component={Create}/>
          <Route path="/templates" component={Home}/>
        </Switch>
      </article>
    )
  }
}

export default withRouter(Index)