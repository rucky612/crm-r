import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import MessageSelect from '../../pages/Messages/Create/Select'
import MessageReceivers from '../../pages/Messages/Create/Receivers'
import MessageHome from '../../pages/Messages/Home'
import MessageReceiver from '../../pages/Messages/Receiver'
import TemplateCreate from '../../pages/Templates/Create'
import TemplateHome from '../../pages/Templates/Home'
import Setting from '../../pages/Setting'

const Index = () => {
  return (
    <div>
      <Switch>
        <Route path="/templates/create" component={TemplateCreate}/>
        <Route path="/templates/modify/:id" component={TemplateCreate}/>
        <Route path="/templates/home" component={TemplateHome}/>
        <Route exact path="/messages/create" render={() => <Redirect to={`/messages/create/select`}/>}/>
        <Route path="/messages/create/select" component={MessageSelect}/>
        <Route path="/messages/create/receivers" component={MessageReceivers}/>
        <Route path="/messages/home/receivers/:id" component={MessageReceiver}/>
        <Route path="/messages/home" component={MessageHome}/>
        <Route path="/utils" component={Setting}/>
        {/*<Redirect from="/" to={'/templates/home'}/>*/}
      </Switch>
    </div>
  )
}

export default Index