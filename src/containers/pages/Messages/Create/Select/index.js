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
            errorMsg: "",
            activeIndex: 1,
            rows: [],
            limit: 15,
            count: 0
        }
    }

    componentDidMount() {
        this.props.fetchGetTemplates(`limit=10000&sortCreatedAt=desc`)
        if(this.props.messageForm.row.hasOwnProperty("id")) {
            this.props.resetTemplate()
        }
    }

    componentWillReceiveProps(nextProps) {
        const {rows, limit, activeIndex, visible, count} = this.state
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
            authorId,
        }
        this.props.selectTemplate(data, cell)
    }

    validButton = () => {
        if (!this.props.messageForm.row.hasOwnProperty("id")) {
            return <button className={`btn btn-secondary d-inline-block float-right`}>X</button>
        } else {
            return <button className={`btn btn-primary d-inline-block float-right`}
                           onClick={this.onRedicrect}>다음</button>
        }
    }

    pageMove = (direction) => {
        const {activeIndex, limit, count} = this.state
        if (direction === "left" && activeIndex > 1) {
            this.setState({
                ...this.state,
                activeIndex: 1,
                rows: [
                    ...this.props.messageForm.rows.slice(0, 1 * limit)
                ]
            })
        } else if (direction === "right" && activeIndex < count) {
            this.setState({
                ...this.state,
                activeIndex: count,
                rows: [
                    ...this.props.messageForm.rows.slice((count - 1) * limit, count * limit)
                ],
            })
        }
    }

    pageOnClick = (index) => {
        const {limit} = this.state
        this.setState({
            ...this.state,
            activeIndex: index + 1,
            rows: [
                ...this.props.messageForm.rows.slice(index * limit, (index + 1) * limit)
            ]
        })
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
                    <SelectTempTable dataSource={this.state.rows}
                                     onDoubleClick={this.getTemplateOne}/>
                    <Pagination pages={this.state.count}
                                activeCurrent={this.state.activeIndex}
                                onLeft={() => this.pageMove("left")}
                                onRight={() => this.pageMove("right")}
                                onClick={this.pageOnClick}/>
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
    selectTemplate: bindActionCreators(actions.selectTemplate, dispatch),
    resetTemplate: bindActionCreators(actions.resetTemplate, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)