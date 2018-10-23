import React from 'react'

export const columns = [
  {
    title: '제목',
    dataIndex: 'title'
  },
  {
    title: '키워드',
    dataIndex: 'keyword'
  },
  {
    title: '최대 Byte',
    dataIndex: 'maxByte'
  },
  {
    title: '기본값',
    dataIndex: 'defaultValue'
  },
  {
    title: '삭제',
    render: () => <button className={`btn btn-danger btn-sm`}>삭제</button>
  }
]


export const rowSelection = {
  onChange: () => {
    console.log('dfdf')
  }
}