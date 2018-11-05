import React, {Component} from 'react'
import Table from '../../../../components/Table'

class Index extends Component {
    constructor(props) {
        super(props)

        this.columns = [
            {
                title: '수신자 번호',
                dataIndex: 'key',
            },
            {
                title: 'key1',
                dataIndex: 'title',
            },
            {
                title: 'key2',
                dataIndex: 'body',
            },
            {
                title: 'key3',
                dataIndex: 'memo',
            },
        ]
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