import React from 'react'
import { Layout, Breadcrumb } from 'antd'
import styled from 'styled-components'
import Main from './Main'

const { Content } = Layout

const StyledContent = styled(Content)`
    margin: 0 16px
`
const StyledBread = styled(Breadcrumb)`
    margin: 16px!important
`

const Index = () => {
  return (
    <StyledContent>
      <StyledBread>
        <Breadcrumb.Item>User</Breadcrumb.Item>
      </StyledBread>
      <Main/>
    </StyledContent>
  )
}

export default Index