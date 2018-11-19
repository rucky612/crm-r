import React, { Component } from 'react'
import Badge from '../../../../../components/Badge'
import Table from '../../../../../components/Table'

class Index extends Component {
  
  static defaultProps = {
    dataSource: [],
    selectedRowKeys: [],
    onSelectRow: () => {}
  }
  
  constructor(props) {
    super(props)

    this.columns = [
      {
        title: '템플릿 키',
        dataIndex: 'key'
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
        title: '종류',
        render: ({ rowData }) => this.badgeState(rowData)
      },
      {
        title: '메모',
        dataIndex: 'memo'
      }
    ]
  }

  badgeState = (cell) => {
    let sliceBody = cell.body
    let totalKeywordByte = 0
    cell.replacements.forEach((item) => {
      if (cell.body.includes(`:${item.keyword}:`)) {
        sliceBody.replace(`:${item.keyword}:`, '')
        totalKeywordByte += Number(item.maxByte)
      }
    })
    const nowByte = Buffer.byteLength(sliceBody, 'utf8') + Number(totalKeywordByte)
    return <Badge state={nowByte < 80 ? 'info' : 'danger'}
                    text={nowByte < 80 ? 'SMS' : 'LMS'}
    />
  }

  render() {
    const {selectedRowKeys, onClickRow, dataSource} = this.props
    const rowSelection = {
      selectedRowKeys,
      onChange: () => {}
    }
    return (
      <Table columns={this.columns}
             rowSelection={rowSelection}
             clickRow={onClickRow}
             dataSource={dataSource}
             align={`center`}>
      </Table>
    )
  }
}

export default Index