import React, { Component } from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import connect from 'react-redux/es/connect/connect'
import { Row, Col } from 'antd'

const Mb5 = styled.div`
  margin-bottom: 2rem;
`

class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    const queryObj = queryString.parse(nextProps.location.search)
    if (!nextProps.location.search.includes('title')) queryObj.title = ''
    if (!nextProps.location.search.includes('key')) queryObj.key = ''
    this.setState(queryObj)
  }

  onSearch = () => {
    const searchOptions = this.state
    searchOptions.offset = 0
    searchOptions.limit = 10
    const query = queryString.stringify(searchOptions)
    this.props.history.push(`/templates/home/?${query}`)
  }

  onInputChange = ({ target }) => {
    this.setState({
      ...this.state,
      [target.name]: target.value
    })
  }

  resetTable = () => {
    this.props.history.replace('?limit=10&offset=0&sortCreatedAt=desc')
  }

  render() {
    return (
      <Mb5>
        <Row>
          <Col span={8}>
            <Input size="small"
                   name={'title'}
                   value={this.state.title ? this.state.title : ''}
                   onChange={this.onInputChange}
                   placeholder={'템플릿 제목'}/>
          </Col>
          <Col span={8}>
            <Input size="small"
                   name={'key'}
                   value={this.state.key ? this.state.key : ''}
                   onChange={this.onInputChange}
                   placeholder={'템플릿 키'}/>
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
      </Mb5>
    )
  }
}

const mapStateToProps = (state) => ({
  templateList: state.templateList
})

export default withRouter(connect(mapStateToProps)(Index))