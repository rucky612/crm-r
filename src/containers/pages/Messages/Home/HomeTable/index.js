import React, {Component} from 'react'
import Table from '../../../../components/Table'
import {withRouter} from 'react-router-dom'
import moment from 'moment'

class Index extends Component {
    constructor(props) {
        super(props)

        this.columns = [
            {
                title: '템플릿 키',
                dataIndex: 'templateKey',
            },
            {
                title: '템플릿 제목',
                dataIndex: 'title',
            },
            {
                title: '내용',
                dataIndex: 'body',
            },
            {
                title: '메모',
                dataIndex: 'memo',
            },
            {
                title: '최근발송일',
                dataIndex: 'updatedAt',
            },
        ]
    }

    formatData = (dataSource) => {
        return dataSource.map(item => {
            const created = new Date(Math.ceil(item.createdAt/1000))
            const updated = new Date(Math.ceil(item.updatedAt/1000))
            return {
                ...item,
                templateKey: item.template.key,
                title: item.template.title,
                body: item.template.body,
                createdAt: moment(created).format('YY년 MM일 DD일'),
                updatedAt: moment(updated).format('YY년 MM일 DD일'),
            }
        })
    }

    rowSelect = (cell) => {
        console.log(cell.id)
        this.props.fetchGetReceivers(cell.id)
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