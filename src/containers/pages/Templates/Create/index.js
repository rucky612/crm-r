import React, { Component } from 'react'
import Input from '../../../components/Input'
import Textarea from '../../../components/Input/Textarea'
import Replacements from '../Replacements'
import { validate } from '../../../../utils/validate'

class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      template: {
        authorId: 0,
        key: '',
        title: '',
        body: '',
        memo: '',
        replacements: []
      },
      inputValid: {
        key: '',
        title: '',
        body: '',
        memo: ''
      }
    }
  }

  sendTemplate = () => {
    const clone = {}
    Object.keys(this.state.inputValid).map((target) => {
      if (!validate.template(target, this.state.template[target])) {
        return clone[target] = 'danger'
      } else {
        return clone[target] = 'success'
      }
    })
    this.setState({
      ...this.state,
      inputValid: {
        ...this.state.inputValid,
        ...clone
      }
    })
  }

  getInputValue = ({ target }) => {
    if (!target.name) {
      console.warn('input에 name을 설정해주세요')
      return
    }
    return this.setState({
      ...this.state,
      template: {
        ...this.state.template,
        [target.name]: target.value
      }
    })
  }

  render() {
    return (
      <section className={``}>
        <div className={`row`}>
          <div className={`col-4 sgsg-border--right`}>
            <Input name={'key'}
                   label={'템플릿 키'}
                   help={'키값은 필수 입력사항입니다.'}
                   valid={this.state.inputValid.key}
                   onChange={this.getInputValue}/>
            <Input name={'title'}
                   label={'템플릿 제목'}
                   help={'제목은 필수 입력사항입니다.'}
                   valid={this.state.inputValid.title}
                   onChange={this.getInputValue}/>
            <Textarea name={'body'}
                      rows={18}
                      label={'내용'}
                      help={'내용을 입력해야 합니다.'}
                      valid={this.state.inputValid.body}
                      onChange={this.getInputValue}/>
            <Input name={'memo'}
                   label={'메모'}
                   help={'키값이 올바르지 않습니다.'}
                   valid={this.state.inputValid.memo}
                   onChange={this.getInputValue}/>
          </div>
          <div className={`col-8`}>
            <Replacements/>
          </div>
        </div>
        <button className={`btn btn-primary te`} onClick={this.sendTemplate}>생성</button>
      </section>
    )
  }
}

export default Index