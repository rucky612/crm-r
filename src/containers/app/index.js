import React from 'react'
import { Route } from 'react-router'

import Header from '../layouts/Header/index'
import Aside from '../layouts/Aside/index'
import Templates from '../pages/Templates/index'
import Messages from '../pages/Messages/index'
import Utils from '../pages/Utils/index'

const App = () => (
  <div className={"sgsg-layout"}>
    <Header/>
    <Aside/>
    <main className={`sgsg-pages`}>
      <Route path="/templates" component={Templates} />
      <Route path="/messages" component={Messages} />
      <Route path="/utils" component={Utils} />
    </main>
  </div>
)

export default App
