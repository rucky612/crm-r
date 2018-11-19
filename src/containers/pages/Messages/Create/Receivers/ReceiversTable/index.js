import React, { Component } from 'react'
import Table from '../../../../../components/Table'
import Button from '../../../../../components/Button'
import Input from '../../../../../components/Input'
import checkReceiver from '../receiverValid'

class Index extends Component {

  constructor(props) {
    super(props)

    this.columns = [
      {
        title: '수신자 번호',
        dataIndex: 'phoneNum',
        render: (cell) => {
          return <Input name={cell.name}
                        value={cell.value}
                        placeholder={`-없이 숫자로 10자리 이상 입력해주세요`}
                        valid={this.checkValid(this.props.inputValids, cell)}
                        onChange={({ target }) => this.inputChange(target, cell, props.replacements.map(item => {
                          return item.maxByte
                        }))}/>
        }
      },
      {
        title: '삭제',
        render: (cell) => {
          return <Button color={'danger'}
                         text={'삭제'}
                         size={'small'}
                         onClick={() => this.props.removeReceiver(cell.rowIndex)}
          />
        }
      }
    ]
    if (props.replacements.length !== 0) {
      props.replacements.forEach(item => {
        this.columns.splice(this.columns.length - 1, 0, {
          title: item.defaultValue ? item.keyword : `${item.keyword}*`,
          dataIndex: item.keyword,
          render: (cell) => {
            return <Input name={cell.name}
                          value={cell.value}
                          valid={this.checkValid(this.props.inputValids, cell)}
                          placeholder={item.defaultValue ? '' : '필수 입력입니다.'}
                          onChange={({ target }) => this.inputChange(target, cell, props.replacements.map(item => {
                            return item.maxByte
                          }))}/>
          }
        })
      })
    }
  }

  checkValid = (inputValids, cell) => {
    if (inputValids.length === 0) {
      return ''
    } else if (inputValids[cell.rowIndex].hasOwnProperty(cell.name)) {
      return inputValids[cell.rowIndex][cell.name]
    } else {
      return ''
    }
  }

  inputChange = (target, cell, maxBytes) => {
    if (cell.name === 'phoneNum' && new RegExp(/[^0-9]/g).test(Number(target.value))) return
    const targetRow = {
      ...cell.rowData,
      [target.name]: target.value
    }
    const checkRow = checkReceiver(targetRow, maxBytes)
    this.props.inputStateChange(checkRow.row, cell.rowIndex)
    this.props.editReceiver(target, cell.rowIndex)
  }

  render() {
    return (
      <Table columns={this.columns}
             dataSource={this.props.receivers}
             align={`center`}>
      </Table>
    )
  }
}

export default Index