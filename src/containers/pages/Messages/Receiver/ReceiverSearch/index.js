import React, { Component } from 'react'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import Mb3 from '../../../../components/Grid/Margin'
import { Row, Col } from 'antd'

class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      phoneNum: '',
      status: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const queryObj = queryString.parse(nextProps.location.search)
    if (!nextProps.location.search.includes('phoneNum')) queryObj.phoneNum = ''
    if (!nextProps.location.search.includes('status')) queryObj.status = ''
    this.setState(queryObj)
  }

  onSearch = () => {
    const searchOptions = this.state
    searchOptions.offset = 0
    searchOptions.limit = 10
    const query = queryString.stringify(searchOptions)
    this.props.history.push(`?${query}`)
  }

  onInputChange = ({ target }) => {
    this.setState({
      ...this.state,
      [target.name]: target.value
    })
  }

  resetTable = () => {
    this.props.history.replace('?limit=10&offset=0')
  }

  render() {
    return (
      <Mb3>
        <Row>
          <Col span={6}>
            <Input size="small"
                   name={'phoneNum'}
                   value={this.state.phoneNum}
                   onChange={this.onInputChange}
                   placeholder={'수신자 번호'}
            />
          </Col>
          <Col span={6}>
            <Input size="small"
                   name={'status'}
                   value={this.state.status}
                   onChange={this.onInputChange}
                   placeholder={'발신 상태'}
            />
          </Col>
          <Col span={6}>
            <Button color={'info'}
                    text={'검색'}
                    size={'small'}
                    onClick={this.onSearch}
            />
            <Button color={'metal'}
                    text={'초기화'}
                    size={'small'}
                    onClick={this.resetTable}
            />
          </Col>
        </Row>
      </Mb3>
    )
  }
}

export default withRouter(Index)