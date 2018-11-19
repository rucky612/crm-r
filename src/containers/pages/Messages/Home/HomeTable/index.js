import React, { Component } from 'react'
import Table from '../../../../components/Table'
import Button from '../../../../components/Button'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

class Index extends Component {
  constructor(props) {
    super(props)

    this.columns = [
      {
        title: '템플릿 키',
        dataIndex: 'templateKey'
      },
      {
        title: '템플릿 제목',
        dataIndex: 'title'
      },
      {
        title: '내용',
        dataIndex: 'body'
      },
      {
        title: '메모',
        dataIndex: 'memo'
      },
      {
        title: '최근발송일',
        dataIndex: 'updatedAt'
      },
      {
        title: '삭제',
        dataIndex: '',
        render: ({ rowData }) => {
          return <Button color={'danger'}
                         text={'삭제'}
                         size={'small'}
                         onClick={() => {
                           this.deleteMessage(rowData)
                         }}/>
        }
      }
    ]
  }

  deleteMessage = (cell) => {
    this.props.fetchDelteMessages(cell.id, this.props.location.search)
  }

  formatData = (dataSource) => {
    return dataSource.map(item => {
      const created = new Date(Math.ceil(item.createdAt / 1000))
      const updated = new Date(Math.ceil(item.updatedAt / 1000))
      return {
        ...item,
        templateKey: item.template.key,
        title: item.template.title,
        body: item.template.body,
        createdAt: moment(created).format('YY년 MM일 DD일'),
        updatedAt: moment(updated).format('YY년 MM일 DD일')
      }
    })
  }

  rowSelect = (cell) => {
    this.props.history.push(`/messages/home/receivers/${cell.id}`)
  }

  render() {
    return (
      <Table columns={this.columns}
             dataSource={this.formatData(this.props.messageList)}
             selectRow={this.rowSelect}
             align={`center`}>
      </Table>
    )
  }
}

export default withRouter(Index)