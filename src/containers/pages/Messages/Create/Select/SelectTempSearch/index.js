import React, { Component } from 'react'
import styled from 'styled-components'
import Input from '../../../../../components/Input'
import Button from '../../../../../components/Button'
import _filter from 'lodash/filter'
import { Row, Col } from 'antd'

const RowMb3 = styled(Row)`
  margin-bottom: 1rem;
`

class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      searchValue: '',
      buttonValue: false
    }
  }

  onInputChange = ({ target }) => {
    this.setState({
      ...this.state,
      searchValue: target.value
    })
  }

  onReset = () => {
    this.props.fetchGetTemplates(`limit=10000&sortCreatedAt=desc`)
    this.setState({
      ...this.state,
      buttonValue: false
    })
  }

  onSearch = () => {
    const data = _filter(this.props.templates, (item) => {
      return item.key.includes(this.state.searchValue) || item.title.includes(this.state.searchValue)
    })
    this.props.searchTemplates(data)
    this.setState({
      ...this.state,
      searchValue: '',
      buttonValue: true
    })
  }

  onButton = () => {
    if (!this.state.buttonValue) {
      return <Button size={'small'}
                     color={'info'}
                     text={'검색'}
                     onClick={this.onSearch}/>
    } else {
      return <Button size={'small'}
                     color={'metal'}
                     text={'초기화'}
                     onClick={this.onReset}/>
    }
  }

  render() {
    return (
      <RowMb3>
        <Col span={16}>
          <Input size={`small`}
                 value={this.state.searchValue}
                 onChange={this.onInputChange}
                 placeholder={`키 또는 제목 입력`}/>
        </Col>
        <Col span={8}>
          {this.onButton()}
        </Col>
      </RowMb3>
    )
  }
}

export default Index