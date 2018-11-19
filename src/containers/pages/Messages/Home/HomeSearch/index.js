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
      templateTitle: '',
      templateKey: '',
      receiverPhoneNum: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const queryObj = queryString.parse(nextProps.location.search)
    if (!nextProps.location.search.includes('templateTitle')) queryObj.templateTitle = ''
    if (!nextProps.location.search.includes('templateKey')) queryObj.templateKey = ''
    if (!nextProps.location.search.includes('receiverPhoneNum')) queryObj.receiverPhoneNum = ''
    this.setState(queryObj)
  }

  onSearch = () => {
    const searchOptions = this.state
    searchOptions.offset = 0
    searchOptions.limit = 10
    const query = queryString.stringify(searchOptions)
    this.props.history.push(`/messages/home/?${query}`)
  }

  onInputChange = ({ target }) => {
    this.setState({
      ...this.state,
      [target.name]: target.value
    })
  }

  resetTable = () => {
    this.props.history.replace('?limit=10&offset=0&sort=desc')
  }

  render() {
    return (
      <Mb3>
        <Row>
          <Col span={6}>
            <Input size="small"
                   name={'templateTitle'}
                   value={this.state.templateTitle}
                   onChange={this.onInputChange}
                   placeholder={'템플릿 제목'}/>
          </Col>
          <Col span={6}>
            <Input size="small"
                   name={'templateKey'}
                   value={this.state.templateKey}
                   onChange={this.onInputChange}
                   placeholder={'템플릿 키'}/>
          </Col>
          <Col span={6}>
            <Input size="small"
                   name={'receiverPhoneNum'}
                   value={this.state.receiverPhoneNum}
                   onChange={this.onInputChange}
                   placeholder={'수신자 번호'}/>
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