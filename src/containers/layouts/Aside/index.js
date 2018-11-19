import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { AsideInfo } from './constants'
import { Layout, Menu, Icon } from 'antd'
import styled from 'styled-components'

const { Sider } = Layout
const SubMenu = Menu.SubMenu

const Logo = styled.div`
  padding: 32px
`

class Index extends Component {

  constructor(props) {
    super(props)

    const splitUrl = this.props.location.pathname.split('/')
    const selectUrl = this.props.location.pathname
    this.state = {
      collapsed: false,
      urlKeys: [splitUrl[1]],
      selectUrl: [selectUrl]
    }
  }

  onCollapse = (collapsed) => {
    this.setState({
      ...this.state,
      collapsed
    })
  }

  renderSubMenu = (AsideInfo = []) => AsideInfo.map(item => {
    if (item.children.length !== 0) {
      return <SubMenu
        key={item.url.slice(1)}
        title={<span><Icon type={item.icon}/><span>{item.name}</span></span>}
      >
        {this.renderMenuItem(item.children)}
      </SubMenu>
    } else {
      return <Menu.Item key={item.url}>
        <Link to={item.url}>
          <Icon type={item.icon}/>
          <span>{item.name}</span>
        </Link>
      </Menu.Item>
    }
  })

  renderMenuItem = (children = []) => children.map(item => {
    return <Menu.Item key={item.url}>
      <Link to={item.url}>
        <span>{item.name}</span>
      </Link>
    </Menu.Item>
  })

  render() {
    const { urlKeys, selectUrl } = this.state
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <Logo/>
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={urlKeys}
          defaultSelectedKeys={selectUrl}
          onClick={this.handleClick}
        >
          {this.renderSubMenu(AsideInfo)}
        </Menu>
      </Sider>
    )
  }
}

export default withRouter(Index)