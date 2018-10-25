import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import * as actions from '../../../../../actions'
import connect from 'react-redux/es/connect/connect'
import Table from '../../../../components/Table'
import Input from '../../../../components/Input'
import { validate } from '../../../../../utils/validate'

class Index extends Component {
  constructor(props) {
    super(props)

    this.columns = [
      {
        title: '사용중',
        render: () => <input type='checkbox'/>
      },
      {
        title: '제목',
        dataIndex: 'title',
        render: ({ cell, name, rowIndex }) => {
          const valid = validate.replacement(name, cell) ? "" : "danger"
          return <Input name={name}
                        value={cell}
                        valid={valid}
                        onChange={(e) => this.onInputChange(e, rowIndex)}/>
        }
      },
      {
        title: '키워드',
        dataIndex: 'keyword',
        render: ({ cell, name, rowIndex }) => {
          const valid = validate.replacement(name, cell) ? "" : "danger"
          return <Input name={name}
                        value={cell}
                        valid={valid}
                        onChange={(e) => this.onInputChange(e, rowIndex)}/>
        }

      },
      {
        title: '최대 Byte',
        dataIndex: 'maxByte',
        render: ({ cell, name, rowIndex }) => {
          const valid = validate.replacement(name, cell) ? "" : "danger"
          return <Input name={name}
                        value={cell}
                        valid={valid}
                        placeholder={"숫자만 입력가능합니다"}
                        onChange={(e) => this.onInputChange(e, rowIndex)}/>
        }

      },
      {
        title: '기본값',
        dataIndex: 'defaultValue',
        render: ({ cell, name, rowIndex }) => {
          const valid = validate.replacement(name, cell) ? "" : "danger"
          return <Input name={name}
                        value={cell}
                        valid={valid}
                        onChange={(e) => this.onInputChange(e, rowIndex)}/>
        }

      },
      {
        title: '삭제',
        render: ({ rowIndex }) => {
          return <button className={`btn btn-danger btn-sm`}
                         onClick={() => {
                           this.props.removeReplacement(rowIndex)
                         }}>삭제</button>
        }
      }
    ]
  }

  onInputChange = ({target}, index) => {
    this.props.validateReplacement(target, index)
  }

  render() {
    return (
      <Table columns={this.columns}
             dataSource={this.props.newReplacements}
             align={`center`}>
      </Table>
    )
  }
}

const mapStateToProps = (state) => ({
  newReplacements: state.createTemplate.replacements
})

const mapDispatchToProps = (dispatch) => ({
  removeReplacement: bindActionCreators(actions.removeReplacement, dispatch),
  validateReplacement: bindActionCreators(actions.validateReplacement, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)