import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../../../actions'
import Table from '../../../components/Table'
import Alerts from '../../../components/Alerts'
import Modal from '../../../components/Modal'
import Input from '../../../components/Input'
import { validate } from '../../../../utils/validate'
import { columns, rowSelection } from './columns'

class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      replacement: {
        title: '',
        maxByte: '',
        defaultValue: '',
        keyword: ''
      },
      replacementInvalid: {
        title: '',
        maxByte: '',
        keyword: '',
        defaultValue: ''
      }
    }
  }

  createReplacements = () => {
    const { validation, children } = validate.replacement(this.state.replacement)
    if (validation) {
      this.props.createReplacement(this.state.replacement)
    } else {
      return this.setState({
        ...this.state,
        replacementInvalid: {
          ...this.state.replacementInvalid,
          title: children.title === true ? 'success' : 'danger',
          maxByte: children.maxByte === true ? 'success' : 'danger',
          keyword: children.keyword === true ? 'success' : 'danger',
          defaultValue: children.defaultValue === true ? 'success' : 'danger'
        }
      })
    }
  }

  toggleModal = () => {
    return this.setState({
      ...this.state,
      visible: !this.state.visible,
      replacementInvalid: {
        title: '',
        keyword: '',
        maxByte: '',
        defaultValue: ''
      }
    })
  }

  getInputValues = ({ target }) => {
    if (!target.name) {
      console.log('input에 name을 설정해주세요')
      return
    }
    const regexp = /^[0-9]*$/
    if (target.name === 'maxByte') {
      if (!regexp.test(target.value)) {
        return
      } else {
        return this.setState({
          ...this.state,
          replacement: {
            ...this.state.replacement,
            [target.name]: Number(target.value)
          }
        })
      }
    }
    return this.setState({
      ...this.state,
      replacement: {
        ...this.state.replacement,
        [target.name]: target.value
      }
    })
  }

  render() {
    console.log(this.props.createTemplate, 'df')
    return (
      <section className={`sgsg-templates__replacements`}>
        <header>
          <h5>템플릿 변환자</h5>
        </header>
        <section className={`sgsg-replacements__section`}>
          <Alerts state={'warning'}
                  strong={'경고! '}
                  plain={'변환자를 입력하세요.'}/>
          <Table rowSelection={rowSelection}
                 dataSource={this.props.createTemplate.replacements}
                 columns={columns}/>

          <button onClick={() => {
            this.toggleModal()
          }}
                  className={`btn btn-info btn-block mt-4`}>변환자 추가
          </button>

          <Modal visible={this.state.visible}
                 title={'변환자 생성'}
                 okText={'생성'}
                 cancelText={'취소'}
                 onOk={() => {
                   this.toggleModal()
                   this.createReplacements()
                 }}
                 onCancel={this.toggleModal}>
            <Input name={'title'}
                   label={'변환자 제목'}
                   help={'제목은 필수 입력사항입니다.'}
                   valid={this.state.replacementInvalid.title}
                   onChange={this.getInputValues}/>
            <Input name={'keyword'}
                   label={'키워드'}
                   help={'키워드는 필수 입력사항입니다.'}
                   valid={this.state.replacementInvalid.keyword}
                   onChange={this.getInputValues}/>
            <Input name={'maxByte'}
                   label={'최대 바이트'}
                   value={this.state.replacement.maxByte}
                   help={'최대바이트는 숫자를 입력해야 합니다.'}
                   valid={this.state.replacementInvalid.maxByte}
                   onChange={this.getInputValues}/>
            <Input name={'defaultValue'}
                   label={'기본값'}
                   valid={this.state.replacementInvalid.defaultValue}
                   onChange={this.getInputValues}/>
          </Modal>
        </section>
        <footer className={`sgsg-replacements__footer`}>
          <button className={`btn btn-primary float-right`}>생성</button>
          <button className={`btn btn-secondary sgsg-m-5--right float-right`}>초기화</button>
        </footer>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  createTemplate: state.createTemplate
})

const mapDispatchToProps = (dispatch) => ({
  createReplacement: bindActionCreators(actions.createReplacement, dispatch),
  removeReplacement: bindActionCreators(actions.removeReplacement, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)