import React, {Component} from 'react'
import connect from 'react-redux/es/connect/connect'
import {bindActionCreators} from "redux";
import * as actions from '../../../../actions/messages'
import Alerts from '../../../components/Alerts'
import SelectTempTable from './SelectTempTable'
import SelectTempSearch from './SelectTempSearch'
import SelectTempForm from '../SelectTempForm'

class Index extends Component {

    componentDidMount() {
        this.props.fetchGetTemplates(`limit=15&offset=0&sortCreatedAt=desc`)
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
        this.props.editMessage(data, cell)
    }
    
    validButton = () => {
        if(this.props.messageForm.templateKey.length === 0) {
            return <button className={`btn btn-secondary d-inline-block float-right`}>X</button>
        } else {
            return <button className={`btn btn-primary d-inline-block float-right`} onClick={this.onRedicrect}>다음</button>
        }
    }

    render() {
        console.log(this.props)
        return (
            <div className={`row`}>
                <div className={`col-8`}>
                    <SelectTempSearch searchTemplates={this.props.searchTemplate}
                                      fetchGetTemplates={this.props.fetchGetTemplates}
                                      templates={this.props.messageForm.rows}/>
                    <SelectTempTable dataSource={this.props.messageForm.rows}
                                     onDoubleClick={this.getTemplateOne}/>
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
    editMessage: bindActionCreators(actions.editMessages, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)