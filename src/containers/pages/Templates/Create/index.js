import React, { Component } from 'react'
import Input from '../../../components/Input'
import Textarea from '../../../components/Input/Textarea'
import Modal from '../../../components/Modal'
import Alerts from '../../../components/Alerts'
import Replacements from '../Replacements'
import { bindActionCreators } from 'redux'
import * as actions from '../../../../actions'
import connect from 'react-redux/es/connect/connect'
import * as validate from '../../../../utils/validate'

class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      errorCode: 0,
      inputStateColor: {
        title: "",
        body: ""
      },
      inputHelp: {
        title: "",
        body: ""
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errorData.code !== 0 && this.state.errorCode === 0) {
      return this.setState({
        ...this.state,
        visible: true,
        errorCode: nextProps.errorData.code,
      }, () => this.setState({
        ...this.state,
        inputStateColor: {
          title: nextProps.errorData.response.title.stateColor,
          body: nextProps.errorData.response.body.stateColor
        },
        inputHelp: {
          title: nextProps.errorData.response.title.message,
          body: nextProps.errorData.response.body.message
        }
      }))
    }
  }

  toggleErrorModal = () => {
    return this.setState({
      ...this.state,
      visible: !this.state.visible
    })
  }

  createNewTemplate = () => {
    this.setState({
      ...this.state,
      errorCode: 0
    }, () => this.props.postTemplate(this.props.createTemplate))
  }

  onInputValidate = ({name, value}, replacements) => {
    let data = {}
    switch (name) {
      case "title":
        data = validate.validateTitle(value)
        break;
      case "body":
        data = validate.validateBody(value, replacements)
        break;
      default:
        break;
    }
    return data
  }

  changeInputState = (inputValid, name) => {
    return this.setState({
      ...this.state,
      inputStateColor: {
        ...this.state.inputStateColor,
        [name]: inputValid.stateColor
      },
      inputHelp: {
        ...this.state.inputHelp,
        [name]: inputValid.message
      }
    })
  }

  onInputChange = (target, replacements) => {
    const inputValid = this.onInputValidate(target, replacements)
    this.changeInputState(inputValid, target.name)
    this.props.fixTemplate(target)
  }

  render() {
    return (
      <section className={``}>
        <Modal visible={this.state.visible}
               onOk={this.toggleErrorModal}
               onCancel={this.toggleErrorModal}>
          <Alerts strong={this.props.errorData.message}
                  state={"danger"}/>
        </Modal>
        <div className={`row`}>
          <div className={`col-4 sgsg-border--right`}>
            <div className={`mb-3`}>
              <Input name={'title'}
                     label={'템플릿 제목'}
                     help={this.state.inputHelp.title}
                     value={this.props.createTemplate.title}
                     valid={this.state.inputStateColor.title}
                     onChange={(e) => {
                       this.onInputChange(e.target)
                     }}/>
            </div>
            <div className={`mb-3`}>
              <Textarea name={'body'}
                        rows={18}
                        label={'내용'}
                        help={this.state.inputHelp.body}
                        value={this.props.createTemplate.body}
                        valid={this.state.inputStateColor.body}
                        onChange={(e) => {
                          this.onInputChange(e.target, this.props.createTemplate.replacements)
                        }}/>
            </div>
            <div className={`mb-3`}>
              <Input name={'memo'}
                     label={'메모'}
                     help={'키값이 올바르지 않습니다.'}
                     value={this.props.createTemplate.memo}
                     onChange={(e) => {
                       this.props.fixTemplate(e.target)
                     }}/>
            </div>
          </div>
          <div className={`col-8`}>
            <Replacements errorCode={this.state.errorCode}/>
          </div>
        </div>
        <button className={`btn btn-primary te`} onClick={this.createNewTemplate}>생성</button>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  createTemplate: state.createTemplate,
  errorData: state.errorHandle
})

const mapDispatchToProps = (dispatch) => ({
  fixTemplate: bindActionCreators(actions.fixTemplate, dispatch),
  postTemplate: bindActionCreators(actions.postTemplate, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)