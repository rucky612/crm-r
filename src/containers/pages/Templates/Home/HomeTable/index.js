import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Table from '../../../../components/Table'
import moment from 'moment'
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as actions from '../../../../../actions'

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
                title: 'SMS / LMS',
                render: ({rowData}) => this.badgeState(rowData)

            },
            {
                title: '생성일',
                dataIndex: 'createdAt',
            },
            {
                title: '수정일',
                dataIndex: 'updatedAt',
            },
            {
                title: '최근발송일',
                dataIndex: '',
            },
            {
                title: '수정',
                dataIndex: '',
                render: ({rowData}) => {
                    return <button className={`btn btn-success btn-sm`}
                                   onClick={() => {
                                       this.fixTemplateBtn(rowData)
                                   }}>수정</button>
                }
            },
            {
                title: '삭제',
                dataIndex: '',
                render: ({rowData}) => {
                    return <button className={`btn btn-danger btn-sm`}
                                   onClick={() => {
                                       this.removeTemplateBtn(rowData)
                                   }}>삭제</button>
                }
            },
        ]
    }

    fixTemplateBtn = (cell) => {
        this.props.history.push(`/templates/modify/${cell.id}`)
    }

    removeTemplateBtn = (cell) => {
        this.props.removeOneTemplate(cell.id, this.props.router.location.search)
    }

    formatDate = (dataSource) => {
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
                   dataSource={this.formatDate(this.props.templateList.rows)}
                   align={`center`}>
            </Table>
        )
    }
}


const mapStateToProps = (state) => ({
    templateList: state.templateList,
    router: state.router
})

const mapDispatchToProps = (dispatch) => ({
    removeOneTemplate: bindActionCreators(actions.fetchRequestDelete, dispatch)
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Index))