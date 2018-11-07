import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'
import {bindActionCreators} from "redux";
import * as actions from '../../../../../actions/messages'
import Alerts from '../../../../components/Alerts'
import Modal from '../../../../components/Modal'
import ReceiversTable from './ReceiversTable'
import SelectTempForm from '../SelectForm'

class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            errorMsg: ""
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
            errorMsg: ""
        })
    }

    renderWarning = (warning = "") => {
        if (this.props.messageForm.receivers.length === 0) {
            return <Alerts strong={`경고! `}
                           plain={`수신자를 등록해주세요.`}
                           state={`warning`}/>
        }
    }

    renderAddReceivers = (data) => {
        if (!data.hasOwnProperty("id")) {
            return <button className={`btn btn-secondary btn-block`} disabled={true}>X</button>
        } else {
            return <button className={`btn btn-info btn-block mt-4`}
                           onClick={this.props.addReceivers}>
                수신자추가
            </button>
        }
    }

    sendMessage = (message) => {
        let boolean = false
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
                }).map(item => {
                    return {
                        phoneNum: `+82${item.phoneNum.slice(1)}`,
                        authorId: item.authorId,
                        memo: item.memo,
                        receivers: [
                            item.receivers
                        ]
                    }
                })
            ]
        }
        boolean ? this.props.fetchPostMessage(send) : alert("번호를 확인해주세요")
    }

    render() {
        if (!this.props.messageForm.row.hasOwnProperty("id")) {
            return <Redirect to={`/messages/create/select`}/>
        }
        return (
            <div className={`row`}>
                <Modal visible={this.state.visible}
                       onOk={this.toggleErrorModal}
                       onCancel={this.toggleErrorModal}>
                    <Alerts strong={this.state.errorMsg}
                            state={"danger"}/>
                </Modal>
                <div className={`col-8`}>
                    <ReceiversTable receivers={this.props.messageForm.receivers}
                                    editReceiverPhone={this.props.editReceiverPhone}
                                    removeReceivers={this.props.removeReceivers}/>
                    {this.renderWarning()}
                    {this.renderAddReceivers(this.props.messageForm.row)}
                </div>
                <div className={`col-4`}>
                    <SelectTempForm/>
                </div>
                <div className={`col-12`}>
                    <button className={`btn btn-primary d-inline-block float-right`}
                            onClick={() => this.sendMessage(this.props.messageForm)}>전송
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    messageForm: state.messageForm,
})

const mapDispatchToProps = (dispatch) => ({
    addReceivers: bindActionCreators(actions.addReceivers, dispatch),
    removeReceivers: bindActionCreators(actions.removeReceivers, dispatch),
    editReceiverPhone: bindActionCreators(actions.editReceiverPhone, dispatch),
    fetchPostMessage: bindActionCreators(actions.fetchPostMessage, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)