import React, {Component} from 'react'
import Table from '../../../../components/Table'
import {withRouter} from 'react-router-dom'
import moment from 'moment'

class Index extends Component {
    constructor(props) {
        super(props)

        this.columns = [
            {
                title: '수신자 번호',
                dataIndex: 'phoneNum',
            },
            {
                title: '제목',
                dataIndex: 'title',
            },
            {
                title: '내용',
                dataIndex: 'body',
            },
            {
                title: '발송상태',
                render: ({rowData}) => {
                    return <span className={`badge badge-${this.sendState(rowData)}`}>{this.stateString(rowData)}</span>
                }
            },
            {
                title: '최근발송일',
                dataIndex: 'updatedAt',
            },
        ]
    }

    stateString = (cell) => {
        if(cell.status === "receiverStatusPending") {
            return "Pending"
        } else if(cell.status === "receiverStatusSuccess") {
            return "Success"
        } else if(cell.status === "receiverStatusFail") {
            return "Fail"
        } else {
            return "No Status"
        }
    }

    sendState = (cell) => {
        if(cell.status === "receiverStatusPending") {
            return "info"
        } else if(cell.status === "receiverStatusSuccess") {
            return "success"
        } else if(cell.status === "receiverStatusFail") {
            return "danger"
        } else {
            return "secondary"
        }
    }

    formatData = (dataSource) => {
        return dataSource.map(item => {
            const created = new Date(Math.ceil(item.createdAt/1000))
            const updated = new Date(Math.ceil(item.updatedAt/1000))
            return {
                ...item,
                createdAt: moment(created).format('YY년 MM일 DD일'),
                updatedAt: moment(updated).format('YY년 MM일 DD일'),
            }
        })
    }

    render() {
        return (
            <Table columns={this.columns}
                   dataSource={this.formatData(this.props.receiversList)}
                   align={`center`}>
            </Table>
        )
    }
}

export default withRouter(Index)