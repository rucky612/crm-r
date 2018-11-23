import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../../../../actions/messages'
import Alerts from '../../../../components/Alerts'
import Button from '../../../../components/Button'
import Modal from '../../../../components/Modal'
import ReceiversTable from './ReceiversTable'
import SelectTempForm from '../SelectForm'
import checkReceiver from './receiverValid'
import {Row, Col} from 'antd'

class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      errorMsg: '',
      inputValids: [{}]
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.messageForm.error !== null && !this.state.visible) {
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

  renderWarning = (warning = '') => {
    if (this.props.messageForm.receivers.length === 0) {
      return <Alerts strong={`경고! `}
                     plain={`수신자를 등록해주세요.`}
                     state={`warning`}/>
    }
  }

  renderAddReceivers = (data) => {
    if (!data.hasOwnProperty('id')) {
      return <Button disabled={true}>X</Button>
    } else {
      return <Button color={'info'}
                     text={'수신자 추가'}
                     size={'small'}
                     onClick={this.addReceiver}
      />
    }
  }

  sendMessage = (message) => {
    let boolean = false
    let msg = '번호를 확인해주세요'
    const { replacements } = this.props.messageForm.row
    const maxBytes = replacements.map(item => item.maxByte)
    const send = {
      templateKey: message.templateKey,
      memo: message.memo,
      authorId: message.authorId,
      receivers: [
        ...message.receivers.filter(item => {
          if (item.phoneNum.length >= 10 && item.phoneNum.length <= 11) {
            boolean = true
            return true
          }
          return false
        }).map((item, index) => {
          if (!checkReceiver(item, maxBytes).boolean) {
            boolean = false
            msg = '변환자를 확인해주세요'
          }
          return {
            phoneNum: `+82${item.phoneNum.slice(1)}`,
            replacements: [
              Object.keys(item).filter((item, index) => {
                if (index === 0) return false
                else return true
              }).map((replace, index) => {
                return {
                  key: replace,
                  value: item[replace]
                }
              })
            ]
          }
        })
      ]
    }
    boolean ? this.props.fetchPostMessage(send) : alert(msg)
  }

  addReceiver = () => {
    this.setState({
      ...this.state,
      inputValids: [
        ...this.state.inputValids,
        {}
      ]
    })
    this.props.addReceivers()
  }

  removeReceiver = (index) => {
    this.setState({
      ...this.state,
      inputValids: [
        ...this.state.inputValids.slice(0, index),
        ...this.state.inputValids.slice(index + 1)
      ]
    })
    this.props.removeReceivers(index)
  }

  inputStateChange = (stateRow, index) => {
    this.setState({
      ...this.state,
      inputValids: [
        ...this.state.inputValids.slice(0, index),
        {
          ...stateRow
        },
        ...this.state.inputValids.slice(index + 1)
      ]
    })
  }

  render() {
    if (!this.props.messageForm.row.hasOwnProperty('id')) {
      return <Redirect to={`/messages/create/select`}/>
    }
    return (
      <Row gutter={8}>
        <Modal visible={this.state.visible}
               onOk={this.toggleErrorModal}
               onCancel={this.toggleErrorModal}>
          <Alerts strong={this.state.errorMsg}
                  state={'danger'}/>
        </Modal>
        <Col span={16}>
          <ReceiversTable receivers={this.props.messageForm.receivers}
                          replacements={this.props.messageForm.row.replacements}
                          inputStateChange={this.inputStateChange}
                          editReceiver={this.props.editReceiver}
                          inputValids={this.state.inputValids}
                          removeReceiver={this.removeReceiver}/>
          {this.renderWarning()}
          {this.renderAddReceivers(this.props.messageForm.row)}
        </Col>
        <Col span={8}>
          <SelectTempForm/>
          <Button color={'primary'}
                  text={"전송"}
                  size={'small'}
                  onClick={() => this.sendMessage(this.props.messageForm)}
          />
          <Button color={'metal'}
                  text={"뒤로"}
                  size={'small'}
                  onClick={this.props.history.goBack}
          />
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state) => ({
  messageForm: state.messageForm
})

const mapDispatchToProps = (dispatch) => ({
  addReceivers: bindActionCreators(actions.addReceivers, dispatch),
  removeReceivers: bindActionCreators(actions.removeReceivers, dispatch),
  editReceiver: bindActionCreators(actions.editReceiver, dispatch),
  fetchPostMessage: bindActionCreators(actions.fetchPostMessage, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)