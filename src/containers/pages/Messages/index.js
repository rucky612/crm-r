import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Select from './Create/Select'
import Receivers from './Create/Receivers'

class Index extends Component {

    redirect = () => {
    }

    render() {
        return (
            <article className={`sgsg-page`}>
                <header className={`sgsg-page__header`}>
                    <h3>메시지 발송</h3>
                </header>
                <div className={`sgsg-page__section`}>
                    <Switch>
                        <Route path="/messages/create/select" component={Select}/>
                        <Route path="/messages/create/receivers" component={Receivers}/>
                        <Redirect from="/messages/create" to="/messages/create/select"/>
                    </Switch>
                </div>
            </article>
        )
    }
}

export default Index