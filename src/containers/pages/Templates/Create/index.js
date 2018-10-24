import React, { Component } from 'react'
import Input from '../../../components/Input'
import Textarea from '../../../components/Input/Textarea'
import Replacements from '../Replacements'
import { bindActionCreators } from 'redux'
import * as actions from '../../../../actions'
import connect from 'react-redux/es/connect/connect'

class Index extends Component {

  validateInput = () => {

  }

  render() {
    console.log(this.props.createTemplate)
    return (
      <section className={``}>
        <div className={`row`}>
          <div className={`col-4 sgsg-border--right`}>
            <div className={`mb-3`}>
              <Input name={'key'}
                     label={'템플릿 키'}
                     help={'키값은 필수 입력사항입니다.'}
                     valid={this.props.createTemplate.key}
                     onChange={(e) => {
                       this.props.validateTemplate(e.target)
                     }}/>
            </div>
            <div className={`mb-3`}>
              <Input name={'title'}
                     label={'템플릿 제목'}
                     help={'제목은 필수 입력사항입니다.'}
                     valid={this.props.createTemplate.title}
                     onChange={(e) => {
                       this.props.validateTemplate(e.target)
                     }}/>
            </div>
            <div className={`mb-3`}>
              <Textarea name={'body'}
                        rows={18}
                        label={'내용'}
                        help={'내용을 입력해야 합니다.'}
                        valid={this.props.createTemplate.body}
                        onChange={(e) => {
                          this.props.validateTemplate(e.target)
                        }}/>
            </div>
            <div className={`mb-3`}>
              <Input name={'memo'}
                     label={'메모'}
                     help={'키값이 올바르지 않습니다.'}
                     valid={this.props.createTemplate.memo}
                     onChange={(e) => {
                       this.props.validateTemplate(e.target)
                     }}/>
            </div>
          </div>
          <div className={`col-8`}>
            <Replacements/>
          </div>
        </div>
        <button className={`btn btn-primary te`} onClick={this.props.validateTemplate}>생성</button>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  createTemplate: state.createTemplate
})

const mapDispatchToProps = (dispatch) => ({
  validateTemplate: bindActionCreators(actions.validTemplate, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)