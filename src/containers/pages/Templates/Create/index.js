import React, {Component} from 'react'
import Input from '../../../components/Input'
import Textarea from '../../../components/Input/Textarea'
import Modal from '../../../components/Modal'
import Alerts from '../../../components/Alerts'
import Replacements from './Replacements'
import {bindActionCreators} from 'redux'
import * as actions from '../../../../actions'
import connect from 'react-redux/es/connect/connect'
import templateValidate from '../../../../utils/validate'

class Index extends Component {

    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            errorMsg: null,
            invalidInput: {
                title: {
                    color: "",
                    msg: ""
                },
                body: {
                    color: "",
                    msg: ""
                },
                replacements: []
            },
        }
    }

    componentDidMount() {
        if (this.props.match.params.hasOwnProperty('id')) {
            this.props.getTemplate(this.props.match.params.id)
        } else {
            this.props.initTemplate()
        }
    }

    componentWillReceiveProps(nextProps) {
        this.inputState(nextProps.template)
        if (nextProps.template.error !== this.state.errorMsg && !this.state.visible) {
            this.setState({
                ...this.state,
                visible: true,
                errorMsg: nextProps.template.error
            })
        }
        if(nextProps.template.hasOwnProperty("createdAt") && !nextProps.match.params.hasOwnProperty("id")) {
            this.props.initTemplate()
        } else if(!nextProps.template.hasOwnProperty("createdAt") && nextProps.match.params.hasOwnProperty("id") && !nextProps.template.isLoading) {
            this.props.getTemplate(nextProps.match.params.id)
        }
    }

    inputState = (template) => {
        const {errorData} = templateValidate(template)
        this.setState({
            ...this.state,
            invalidInput: {
                ...this.state.invalidInput,
                ...errorData
            }
        })
    }

    toggleErrorModal = () => {
        return this.setState({
            ...this.state,
            visible: !this.state.visible,
            errorMsg: null
        })
    }

    renderBadge = (body = "", replacements = []) => {
        let sliceBody = body
        let totalKeywordByte = 0
        replacements.forEach((item) => {
            if (body.includes(`:${item.keyword}:`)) {
                while(sliceBody.indexOf(`:${item.keyword}:`) !== -1) {
                    sliceBody = sliceBody.replace(`:${item.keyword}:`, "");
                    totalKeywordByte += Number(item.maxByte)
                }
            }
        })
        const nowByte = Buffer.byteLength(sliceBody, 'utf8') + Number(totalKeywordByte)
        const maxByte = nowByte < 80 ? 80 : 1000
        const stateColor = nowByte < 80 ? "primary" : "danger"
        const mailType = nowByte < 80 ? "SMS" : "LMS"
        return <span className={`badge badge-${stateColor} sgsg-absolute sgsg-absolute--top sgsg-absolute--right`}>
                {`${mailType} : ${nowByte}/${maxByte}byte`}</span>
    }

    buttonChange = (template) => {
        const {finalPass} = templateValidate(template)
        if(!finalPass) {
            return <button className={`btn btn-secondary`} disabled={true}>X</button>
        } else if (this.props.match.params.hasOwnProperty("id")) {
            return <button className={`btn btn-primary`}
                           onClick={() => this.props.fixTemplate(this.props.template.id, this.props.template)}>수정</button>
        } else {
            return <button className={`btn btn-primary`}
                           onClick={() => this.props.addTemplate(this.props.template)}>생성</button>
        }
    }

    render() {
        const {title, body, replacements} = this.state.invalidInput
        return (
            <section>
                <Modal visible={this.state.visible}
                       onOk={this.toggleErrorModal}
                       onCancel={this.toggleErrorModal}>
                    <Alerts strong={this.state.errorMsg}
                            state={"danger"}/>
                </Modal>
                <div className={`row`}>
                    <div className={`col-4 sgsg-border--right`}>
                        <div className={`mb-3`}>
                            <Input name={'title'}
                                   label={'템플릿 제목'}
                                   value={this.props.template.title}
                                   valid={title.color}
                                   help={title.msg}
                                   onChange={this.props.editTemplate}/>
                        </div>
                        <div className={`mb-3 position-relative`}>
                            <Textarea name={'body'}
                                      rows={18}
                                      label={'내용'}
                                      value={this.props.template.body}
                                      valid={body.color}
                                      help={body.msg}
                                      onChange={this.props.editTemplate}/>
                            {this.renderBadge(this.props.template.body, this.props.template.replacements)}
                        </div>
                        <div className={`mb-3`}>
                            <Input name={'memo'}
                                   label={'메모'}
                                   value={this.props.template.memo}
                                   onChange={this.props.editTemplate}/>
                        </div>
                        {this.buttonChange(this.props.template)}
                    </div>
                    <div className={`col-8`}>
                        <Replacements replacementsValid={replacements}/>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    template: state.templateForm
})

const mapDispatchToProps = (dispatch) => ({
    getTemplate: bindActionCreators(actions.fetchRequestGet, dispatch),
    editTemplate: bindActionCreators(actions.editTemplate, dispatch),
    addTemplate: bindActionCreators(actions.fetchRequestPost, dispatch),
    initTemplate: bindActionCreators(actions.fetchRequestInitPost, dispatch),
    fixTemplate: bindActionCreators(actions.fetchRequestPut, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)