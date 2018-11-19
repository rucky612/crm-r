import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from 'antd'
import { sgsgColor } from '../../constants'

const Pagination = styled.ul`
  font-size: 1rem;
  line-height: 1.5;
  color: ${sgsgColor.textGray}
  list-style: none;
  box-sizing: border-box;
`

const PaginationItem = styled.li`
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  min-width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
`

const PaginationSpan = styled.span`
  display: block;
  height: 100%;
  text-align: center;
  border: ${props => props.noBorder ? `none` : `1px solid #e4e9f0`};
  color: ${props => props.active ? sgsgColor.white : sgsgColor.textGray}
  background-color: ${props => props.active ? sgsgColor.info : sgsgColor.white};
  border-radius: 4px;
  -webkit-transition: all .3s;
  -o-transition: all .3s;
  transition: all .3s;
  &:hover {
    color: ${props => props.noBorder ? sgsgColor.info : sgsgColor.white};
    background-color: ${props => props.noBorder ? `inherit` : sgsgColor.brand};
  }
`

class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeIndex: props.defaultIndex
    }
  }

  static defaultProps = {
    pages: 0,
    limit: 5,
    defaultIndex: 1,
    onChange: () => {
    }
  }

  onChangeIndex = (index) => {
    this.setState({
      ...this.state,
      activeIndex: index
    })
    this.props.onChange(index)
  }

  jump5index = (direction) => {
    const {activeIndex} = this.state
    const {limit, pages} = this.props
    let index
    if(direction === 'left') {
      index = activeIndex - limit < 1 ? 1 : activeIndex - limit
    } else {
      index = activeIndex + limit > pages ? pages : activeIndex + limit
    }
    this.onChangeIndex(index)
  }

  currentIndex = (index, limit, pages) => {
    const showPages = Math.floor(limit / 2)
    let current = index - showPages
    if (current <= 1) {
      current = 1
    } else if (current + limit - 1 >= pages) {
      current = pages - limit + 1
    }
    return current
  }

  renderPages = (pages, activeIndex, limit) => {
    const current = this.currentIndex(activeIndex, limit, pages)
    return Array.from({ length: limit }, (item, index) => {
      return <PaginationItem key={index}
                             onClick={() => this.onChangeIndex(current + index)}
      >
        <PaginationSpan active={activeIndex === current+index}>{current + index}</PaginationSpan>
      </PaginationItem>
    })
  }

  rednerArrow = (pages, activeIndex, limit, direction) => {
    const current = this.currentIndex(activeIndex, limit, pages)
    if (current > 1 && direction === 'left') {
      return <PaginationItem onClick={() => this.jump5index(direction)}>
        <PaginationSpan>
          <Icon type={direction}/>
        </PaginationSpan>
      </PaginationItem>
    } else if (current < pages - limit + 1 && direction === 'right') {
      return <PaginationItem onClick={() => this.jump5index(direction)}>
        <PaginationSpan>
          <Icon type={direction}/>
        </PaginationSpan>
      </PaginationItem>
    }
  }

  renderJumper = (pages, activeIndex, limit) => {
    return <React.Fragment>
      {this.rednerArrow(pages, activeIndex, limit, 'left')}
      {this.renderPages(pages, activeIndex, limit)}
      {this.rednerArrow(pages, activeIndex, limit, 'right')}
    </React.Fragment>
  }

  render() {
    return (
      <nav>
        <Pagination>
          <PaginationItem>
            <PaginationSpan onClick={() => this.onChangeIndex(1)}>
              <Icon type="double-left"/>
            </PaginationSpan>
          </PaginationItem>
          {this.renderJumper(this.props.pages, this.state.activeIndex, this.props.limit)}
          <PaginationItem>
            <PaginationSpan onClick={() => this.onChangeIndex(this.props.pages)}>
              <Icon type="double-right"/>
            </PaginationSpan>
          </PaginationItem>
        </Pagination>
      </nav>
    )
  }
}

export default withRouter(Index)