import React, {Component} from 'react'
import connect from 'react-redux/es/connect/connect'
import {bindActionCreators} from "redux";
import * as actions from '../../../../../actions/messages'
import Alerts from '../../../../components/Alerts'
import Modal from '../../../../components/Modal'
import Pagination from '../../../../components/Pagnation'
import SelectTempTable from './SelectTempTable'
import SelectTempSearch from './SelectTempSearch'
import SelectTempForm from '../SelectForm'

class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            errorMsg: ""
        }
    }
    
    componentDidMount() {
        this.props.fetchGetTemplates(`limit=15&offset=0&sortCreatedAt=desc`)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.messageForm.error !== null && !this.state.visible) {
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
        const {key, memo, authorId} = cell
        const data = {
            templateKey: key,
            memo,
            authorId
        }
        this.props.selectTemplate(data, cell)
    }
    
    validButton = () => {
        if(this.props.messageForm.templateKey.length === 0) {
            return <button className={`btn btn-secondary d-inline-block float-right`}>X</button>
        } else {
            return <button className={`btn btn-primary d-inline-block float-right`} onClick={this.onRedicrect}>다음</button>
        }
    }

    pageOnClick = (index) => {
        this.props.fetchGetTemplates(`limit=15&offset=${index*15}&sortCreatedAt=desc`)
    }

    render() {
        return (
            <div className={`row`}>
                <Modal visible={this.state.visible}
                       onOk={this.toggleErrorModal}
                       onCancel={this.toggleErrorModal}>
                    <Alerts strong={this.state.errorMsg}
                            state={"danger"}/>
                </Modal>
                <div className={`col-8`}>
                    <SelectTempSearch searchTemplates={this.props.searchTemplate}
                                      fetchGetTemplates={this.props.fetchGetTemplates}
                                      templates={this.props.messageForm.rows}/>
                    <SelectTempTable dataSource={this.props.messageForm.rows}
                                     onDoubleClick={this.getTemplateOne}/>
                    <Pagination pages={this.props.messageForm.count / 15} onClick={this.pageOnClick}/>
                    {this.renderWarning()}
                </div>
                <div className={`col-4`}>
                    <SelectTempForm template={this.props.messageForm.row}/>
                </div>
                <div className={`col-12`}>
                    {this.validButton()}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    messageForm: state.messageForm,
})

const mapDispatchToProps = (dispatch) => ({
    fetchGetTemplates: bindActionCreators(actions.fetchGetTemplates, dispatch),
    searchTemplate: bindActionCreators(actions.searchTemplates, dispatch),
    selectTemplate: bindActionCreators(actions.selectTemplate, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)