import React from 'react'
import { Layout } from 'antd'
import Header from '../layouts/Header'
import Aside from '../layouts/Aside'
import Content from '../layouts/Content'
import Footer from  '../layouts/Footer'

const App = () => {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Aside/>
        <Layout>
          <Header/>
          <Content/>
          <Footer/>
        </Layout>
      </Layout>
    );
}

export default App
