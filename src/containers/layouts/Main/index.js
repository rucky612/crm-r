import React, {Component} from 'react'
import {Route, Switch, withRouter, Redirect} from 'react-router'
import Templates from '../../pages/Templates'
import Messages from '../../pages/Messages'
import Utils from '../../pages/Setting'
import MainHeader from './MainHeader'

class Index extends Component {
    render() {
        return (
            <main className={`sgsg-main`}>
                <MainHeader/>
                <div className={`sgsg-main__section`}>
                    <Switch>
                        <Route path="/templates" component={Templates}/>
                        <Route path="/messages" component={Messages}/>
                        <Route path="/utils" component={Utils}/>
                        <Redirect from={`*`} to={"/templates/home"}/>
                    </Switch>
                </div>
            </main>
        )
    }
}

export default withRouter(Index)