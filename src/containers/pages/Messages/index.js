import React, {Component} from 'react'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import Select from './Create/Select'
import Receivers from './Create/Receivers'
import Home from './Home'
import Receiver from './Receiver'

class Index extends Component {

    renderHead = () => {
        if (this.props.location.pathname.includes("home/receivers")) {
           return <h3>수신자 리스트</h3>
        } else if (this.props.location.pathname.includes(`home`)) {
            return <h3>메시지 내역</h3>
        } else if (this.props.location.pathname.includes(`create`)) {
            return <h3>메시지 발송</h3>
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
                        <Route path="/messages/create/select" component={Select}/>
                        <Route path="/messages/create/receivers" component={Receivers}/>
                        <Route path="/messages/home/receivers/:id" component={Receiver}/>
                        <Route path="/messages/home" component={Home}/>
                        <Redirect from="/messages/create" to="/messages/create/select"/>
                    </Switch>
                </div>
            </article>
        )
    }
}

export default withRouter(Index)