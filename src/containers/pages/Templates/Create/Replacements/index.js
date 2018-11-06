import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import * as actions from '../../../../../actions/template'
import Alerts from '../../../../components/Alerts'
import ReplacementsTable from './ReplacementsTable'
import connect from 'react-redux/es/connect/connect'

class Index extends Component {
    
    visibleAlerts = (tableData) => {
        if (tableData.length === 0) {
            return <Alerts state={'warning'}
                           strong={'경고! '}
                           plain={'변환자를 입력하세요.'}/>
        }
    }

    render() {
        return (
            <section  className={`sgsg-templates__replacements`}>
                <header>
                    <h5>템플릿 변환자</h5>
                </header>
                <section className={`sgsg-replacements__section`}>
                    {this.visibleAlerts(this.props.template.replacements)}
                    <ReplacementsTable removeReplacement={this.props.removeReplacement}
                                       dataSource={this.props.template.replacements}
                                       dataValids={this.props.replacementsValid}
                                       onInputChange={this.props.editReplacement}/>
                    <button onClick={this.props.addReplacement}
                            className={`btn btn-info btn-block mt-4`}>
                        변환자 추가
                    </button>
                </section>
                <footer className={`sgsg-replacements__footer`}>
                    <button onClick={this.props.addReplacement} className={`btn btn-primary float-right`}>생성</button>
                    <button onClick={this.props.resetReplacement}
                            className={`btn btn-secondary sgsg-m-5--right float-right`}>초기화
                    </button>
                </footer>
            </section>
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
    resetReplacement: bindActionCreators(actions.resetReplacement, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)