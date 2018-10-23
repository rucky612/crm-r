import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Create from './Create'
import Home from './Home'

class Index extends Component {

  renderHead = () => {
    const path = this.props.location.pathname
    if (path === '/templates') {
      return <h3>템플릿 내역</h3>
    } else {
      return <h3>템플릿 생성</h3>
    }
  }

  render() {
    return (
      <article className={`sgsg-page`}>
        <header className={`sgsg-page__header`}>
          {this.renderHead()}
        </header>
        <div className={`sgsg-page__section`}>
          <Switch>
            <Route path="/templates/create" component={Create}/>
            <Route path="/templates" component={Home}/>
          </Switch>
        </div>
      </article>
    )
  }
}

export default withRouter(Index)