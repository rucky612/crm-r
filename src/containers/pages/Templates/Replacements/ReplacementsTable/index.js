import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import * as actions from '../../../../../actions'
import connect from 'react-redux/es/connect/connect'
import Table from '../../../../components/Table'
import Input from '../../../../components/Input'
import * as validate from '../../../../../utils/validate'

class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errorCode: 0,
      replacements: [],
      errors: []
    }
    this.columns = [
      {
        title: '사용중',
        render: () => <input type='checkbox'/>
      },
      {
        title: '제목',
        dataIndex: 'title',
        render: (cell) => {
          return <Input name={cell.name}
                        value={cell.value}
                        valid={this.inputStateColor(cell.rowData.error, cell.name)}
                        onChange={(e) => {
                          console.log(cell,'dfdf')
                          this.onInputChange(e, cell)
                        }}/>
        }
      },
      {
        title: '키워드',
        dataIndex: 'keyword',
        render: (cell) => {
          return <Input name={cell.name}
                        value={cell.value}
                        valid={this.inputStateColor(cell.rowData.error, cell.name)}
                        onChange={(e) => this.onInputChange(e, cell)}/>
        }
      },
      {
        title: '최대 Byte',
        dataIndex: 'maxByte',
        render: (cell) => {
          return <Input name={cell.name}
                        value={cell.value}
                        valid={this.inputStateColor(cell.rowData.error, cell.name)}
                        onChange={(e) => this.onInputChange(e, cell)}/>
        }
      },
      {
        title: '기본값',
        dataIndex: 'defaultValue',
        render: (cell) => {
          return <Input name={cell.name}
                        value={cell.value}
                        valid={this.inputStateColor(cell.rowData.error, cell.name)}
                        onChange={(e) => this.onInputChange(e, cell)}/>
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


  componentWillReceiveProps(nextProps) {
    if (nextProps.errorData.code !== 0 && this.props.errorCode === 0) {
      return this.setState({
        ...this.state,
        replacements: nextProps.newReplacements.map((item, index) => {
          return {
            ...item,
            error: nextProps.errorReplacements[index]
          }
        })
      })
    } else if(nextProps.newReplacements > this.s) {
      return this.setState({
        ...this.state,
        replacements: nextProps.newReplacements.map((item, index) => {
          return {
            ...item,
            error: this.state.errors
          }
        })
      })
    }
  }

  changeErrorState = (error, name) => {
    this.setState({
      ...this.state,
      replacements: this.props.newReplacements.map(item => {
        return {
          ...item,
          error: {
            [name]: error
          }
        }
      })
    })
  }

  inputValidate = ({ name, value }) => {
    switch (name) {
      case 'title':
        return validate.validateRepalcementTitle(value)
      case 'keyword':
        return validate.validateReplacementKeyword(value)
      case 'maxByte':
        return validate.validateReplacementMaxByte(value)
      default:
        break
    }
  }

  inputStateColor = (error, name) => {
    if (error === undefined) {
      return ""
    } else if(!Object.keys(error).includes(name)) {
      return ""
    } else {
      return error[name].stateColor
    }
  }

  onInputChange = ({ target }, cell) => {
    const changeError = this.inputValidate(target)
    this.changeErrorState(changeError, target.name)
    this.props.fixReplacement(target, cell.rowIndex)
  }

  render() {
    console.log(this.state.replacements)
    return (
      <Table columns={this.columns}
             dataSource={this.state.replacements}
             align={`center`}>
      </Table>
    )
  }
}

const mapStateToProps = (state) => ({
  newReplacements: state.createTemplate.replacements,
  errorData: state.errorHandle,
  errorReplacements: state.errorHandle.response.replacements
})

const mapDispatchToProps = (dispatch) => ({
  removeReplacement: bindActionCreators(actions.removeReplacement, dispatch),
  fixReplacement: bindActionCreators(actions.fixReplacements, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)