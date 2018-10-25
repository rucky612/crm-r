import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../../../actions'
import Alerts from '../../../components/Alerts'
import ReplacementsTable from './ReplacementsTable'

class Index extends Component {

  createReplacement = () => {
    const replacement = {
      title: '',
      maxByte: '',
      defaultValue: '',
      keyword: ''
    }
    this.props.createReplacement(replacement)
  }

  visibleAlerts = (tableData) => {
    if (tableData.length === 0) {
      return <Alerts state={'warning'}
                     strong={'경고! '}
                     plain={'변환자를 입력하세요.'}/>
    }
  }

  render() {
    return (
      <section className={`sgsg-templates__replacements`}>
        <header>
          <h5>템플릿 변환자</h5>
        </header>
        <section className={`sgsg-replacements__section`}>
          {this.visibleAlerts(this.props.createTemplate.replacements)}
          <ReplacementsTable errorCode={this.props.errorCode}/>
          <button onClick={this.createReplacement}
                  className={`btn btn-info btn-block mt-4`}>변환자 추가
          </button>
        </section>
        <footer className={`sgsg-replacements__footer`}>
          <button onClick={this.createReplacement} className={`btn btn-primary float-right`}>생성</button>
          <button onClick={this.props.resetReplacements}
                  className={`btn btn-secondary sgsg-m-5--right float-right`}>초기화
          </button>
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
  resetReplacements: bindActionCreators(actions.resetReplacements, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)