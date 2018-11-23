import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import AppRouter from '../../../router/AppRouter'

export const pageHeads = {
  template: {
    home: "템플릿 내역",
    create: "템플릿 생성",
    modify: "템플릿 수정"
  },
  message: {
    homeReceivers: "수신자 리스트",
    home: "메시지 내역",
    create: "메시지 발송"
  }
}

const Main = styled.div`
  background: #fff;
  min-height: 360px;
`
const MainHeader = styled.header`
  padding: 24px 24px 0 24px;
`
const MainSection = styled.section`
  position: relative;
  padding: 24px;
`

class Index extends Component {
  renderHead = () => {
    const path = this.props.location.pathname
    if (path.includes('/templates/home')) {
      return <h2>{pageHeads.template.home}</h2>
    } else if (path === '/templates/create') {
      return <h2>{pageHeads.template.create}</h2>
    } else if (path.includes('/templates/modify')) {
      return <h2>{pageHeads.template.modify}</h2>
    } else if (path.includes("/messages/home/receivers")) {
      return <h2>{pageHeads.message.homeReceivers}</h2>
    } else if (path.includes(`/messages/home`)) {
      return <h2>{pageHeads.message.home}</h2>
    } else if (path.includes(`/messages/create`)) {
      return <h2>{pageHeads.message.create}</h2>
    }
  }
  
  render() {
    return (
      <Main>
        <MainHeader>
          {this.renderHead()}
        </MainHeader>
        <MainSection>
          <AppRouter/>
        </MainSection>
      </Main>
    )
  }
}

export default withRouter(Index)