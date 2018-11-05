import React, {Component} from 'react'
import Table from '../../../../components/Table'

class Index extends Component {
    constructor(props) {
        super(props)

        this.columns = [
            {
                title: '템플릿 키',
                dataIndex: 'key',
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
                title: '종류',
                render: ({rowData}) => this.badgeState(rowData)

            },
            {
                title: '메모',
                dataIndex: 'memo',
            },
        ]
    }

    badgeState = (cell) => {
        let sliceBody = cell.body
        let totalKeywordByte = 0
        cell.replacements.forEach((item) => {
            if (cell.body.includes(`:${item.keyword}:`)) {
                sliceBody.replace(`:${item.keyword}:`, "");
                totalKeywordByte += Number(item.maxByte)
            }
        })
        const nowByte = Buffer.byteLength(sliceBody, 'utf8') + Number(totalKeywordByte)
        if (nowByte < 80) {
            return <span className={`badge badge-primary`}>SMS</span>
        } else {
            return <span className={`badge badge-danger`}>LMS</span>
        }
    }

    render() {
        return (
            <Table columns={this.columns}
                   dataSource={this.props.dataSource}
                   align={`center`}>
            </Table>
        )
    }
}

export default Index