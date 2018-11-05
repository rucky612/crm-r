import React, {Component} from 'react'
import connect from 'react-redux/es/connect/connect'
import {bindActionCreators} from "redux";
import * as actions from '../../../../actions'
import Alerts from '../../../components/Alerts'
import ReceiversForm from './ReceiversForm'
import ReceiversTable from './ReceiversTable'


class Index extends Component {

    renderWarning = () => {
        if (this.props.messageForm.receivers.length === 0) {
            return <Alerts strong={`경고! `}
                           plain={`수신자를 등록해주세요.`}
                           state={`warning`}/>
        }
    }

    render() {
        console.log(this.props.messageForm)
        return (
            <div className={`row`}>
                <div className={`col-8`}>
                    <ReceiversTable receivers={this.props.messageForm.receivers}/>
                    {this.renderWarning()}
                    <button
                            className={`btn btn-info btn-block mt-4`}>
                        수신자추가
                    </button>
                </div>
                <div className={`col-4`}>
                    <ReceiversForm/>
                </div>
                <div className={`col-12`}>
                    <button className={`btn btn-primary d-inline-block float-right`} >전송</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    messageForm: state.messageForm,
})

const mapDispatchToProps = (dispatch) => ({
    fetchRequest: bindActionCreators(actions.fetchRequestGet, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)