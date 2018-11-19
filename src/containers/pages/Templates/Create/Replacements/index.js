import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import * as actions from '../../../../../actions/template'
import Alerts from '../../../../components/Alerts'
import Button from '../../../../components/Button'
import ReplacementsTable from './ReplacementsTable'
import connect from 'react-redux/es/connect/connect'

const Replacement = styled.section`
  position: relative;
  min-height: 50rem;
`
const ReplacementHead = styled.h2`
  display: inline-block;
`
const ReplacementHeaderBtn = styled(Button)`
  float: right;
`

class Index extends Component {

  visibleAlerts = (tableData) => {
    if (tableData.length === 0) {
      return <Alerts state={'warning'}
                     strong={'경고!'}
                     plain={'변환자를 입력하세요.'}
      />
    }
  }

  render() {
    return (
      <Replacement>
        <header style={{ marginBottom: '4px' }}>
          <ReplacementHead>템플릿 변환자</ReplacementHead>
          <ReplacementHeaderBtn text={'초기화'}
                                color={'metal'}
                                size={'small'}
                                onClick={this.props.resetReplacement}
          />
        </header>
        <section>
          {this.visibleAlerts(this.props.template.replacements)}
          <ReplacementsTable removeReplacement={this.props.removeReplacement}
                             dataSource={this.props.template.replacements}
                             dataValids={this.props.replacementsValid}
                             onInputChange={this.props.editReplacement}
          />
          <Button text={'변환자 추가'}
                  color={'success'}
                  displayBlock={true}
                  onClick={this.props.addReplacement}
          />
        </section>
      </Replacement>
    )
  }
}


const mapStateToProps = (state) => ({
  template: state.templateForm
})

const mapDispatchToProps = (dispatch) => ({
  editReplacement: bindActionCreators(actions.editReplacement, dispatch),
  addReplacement: bindActionCreators(actions.addReplacement, dispatch),
  removeReplacement: bindActionCreators(actions.removeReplacement, dispatch),
  resetReplacement: bindActionCreators(actions.resetReplacement, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)