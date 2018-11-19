import React, { Component } from 'react'
import styled from 'styled-components'
import connect from 'react-redux/es/connect/connect'
import { bindActionCreators } from 'redux'
import * as actions from '../../../../../actions/messages'
import Alerts from '../../../../components/Alerts'
import Modal from '../../../../components/Modal'
import Button from '../../../../components/Button'
import Pagination from '../../../../components/Pagnation'
import SelectTempTable from './SelectTempTable'
import SelectTempSearch from './SelectTempSearch'
import SelectTempForm from '../SelectForm'
import { Row, Col } from 'antd'

const BtnFloatRight = styled(Button)`
  float: right;
`

class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      errorMsg: '',
      activeIndex: 1,
      rows: [],
      limit: 15,
      count: 0,
    }
  }

  componentDidMount() {
    this.props.fetchGetTemplates(`limit=10000&sortCreatedAt=desc`)
    if (this.props.messageForm.row.hasOwnProperty('id')) {
      this.props.resetTemplate()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { rows, limit, activeIndex, visible, count } = this.state
    if (nextProps.messageForm.rows.length !== 0 && rows.length === 0) {
      this.setState({
        ...this.state,
        rows: [
          ...nextProps.messageForm.rows.slice(0, limit)
        ],
        count: Math.ceil(nextProps.messageForm.count / limit)
      })
    } else if (nextProps.messageForm.count !== this.props.messageForm.count) {
      this.setState({
        ...this.state,
        activeIndex: 1,
        rows: [
          ...nextProps.messageForm.rows.slice(0, limit)
        ],
        count: Math.ceil(nextProps.messageForm.count / limit)
      })
    }
    if (nextProps.messageForm.error !== null && !visible) {
      this.setState({
        ...this.state,
        visible: true,
        errorMsg: nextProps.messageForm.error
      })
    }
  }

  toggleErrorModal = () => {
    this.setState({
      ...this.state,
      visible: !this.state.visible,
      errorMsg: ''
    })
  }

  renderWarning = () => {
    if (this.props.messageForm.rows.length === 0) {
      return <Alerts strong={`경고! `}
                     plain={`조건에 해당하는 템플릿이 없습니다.`}
                     state={`warning`}/>
    }
  }

  onRedicrect = () => {
    this.props.history.push(`/messages/create/receivers`)
  }

  getTemplateOne = (cell) => {
    const { key, memo, authorId } = cell
    const data = {
      templateKey: key,
      memo,
      authorId
    }
    this.props.selectTemplate(data, cell)
  }

  validButton = () => {
    if (!this.props.messageForm.row.hasOwnProperty('id')) {
      return <BtnFloatRight disabled={true}
                            text={'X'}
      />
    } else {
      return <BtnFloatRight color={'primary'}
                            text={'다음'}
                            onClick={this.onRedicrect}
      />
    }
  }

  pageOnClick = (index) => {
    const { limit } = this.state
    this.setState({
      ...this.state,
      activeIndex: index,
      rows: [
        ...this.props.messageForm.rows.slice((index-1) * limit, (index) * limit)
      ]
    })
  }

  render() {
    return (
      <Row gutter={16}>
        <Modal visible={this.state.visible}
               onOk={this.toggleErrorModal}
               onCancel={this.toggleErrorModal}>
          <Alerts strong={this.state.errorMsg}
                  state={'danger'}/>
        </Modal>
        <Col span={16}>
          <SelectTempSearch searchTemplates={this.props.searchTemplate}
                            fetchGetTemplates={this.props.fetchGetTemplates}
                            templates={this.props.messageForm.rows}
          />
          <SelectTempTable dataSource={this.state.rows}
                           selectedRowKeys={this.state.selectedRowKeys}
                           onClickRow={this.getTemplateOne}
          />
          <Pagination pages={this.state.count}
                      activeCurrent={this.state.activeIndex}
                      onChange={this.pageOnClick}
          />
          {this.renderWarning()}
        </Col>
        <Col span={8}>
          <SelectTempForm template={this.props.messageForm.row}
          />
          {this.validButton()}
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => ({
  messageForm: state.messageForm
})

const mapDispatchToProps = (dispatch) => ({
  fetchGetTemplates: bindActionCreators(actions.fetchGetTemplates, dispatch),
  searchTemplate: bindActionCreators(actions.searchTemplates, dispatch),
  selectTemplate: bindActionCreators(actions.selectTemplate, dispatch),
  resetTemplate: bindActionCreators(actions.resetTemplate, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)