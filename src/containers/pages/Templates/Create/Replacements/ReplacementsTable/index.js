import React, {Component} from 'react'
import Table from '../../../../../components/Table'
import Input from '../../../../../components/Input'

class Index extends Component {
    constructor(props) {
        super(props)

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
                                  valid={this.inputState(cell).color}
                                  onChange={(e) => this.props.onInputChange(e, cell.rowIndex)}/>
                }
            },
            {
                title: '키워드',
                dataIndex: 'keyword',
                render: (cell) => {
                    return <Input name={cell.name}
                                  value={cell.value}
                                  valid={this.inputState(cell).color}
                                  onChange={(e) => this.props.onInputChange(e, cell.rowIndex)}/>
                }
            },
            {
                title: '최대 Byte',
                dataIndex: 'maxByte',
                render: (cell) => {
                    return <Input name={cell.name}
                                  value={this.onlyNumber(cell.value)}
                                  valid={this.inputState(cell).color}
                                  onChange={(e) => this.props.onInputChange(e, cell.rowIndex)}/>
                }
            },
            {
                title: '기본값',
                dataIndex: 'defaultValue',
                render: (cell) => {
                    return <Input name={cell.name}
                                  value={cell.value}
                                  onChange={(e) => this.props.onInputChange(e, cell.rowIndex)}/>
                }
            },
            {
                title: '삭제',
                render: ({rowIndex}) => {
                    return <button className={`btn btn-danger btn-sm`}
                                   onClick={() => {
                                       this.props.removeReplacement(rowIndex)
                                   }}>삭제</button>
                }
            }
        ]
    }

    inputState = (cell) => {
        const {dataValids} = this.props
        return dataValids.length !== 0 ? dataValids[cell.rowIndex][cell.name] : ""
    }

    onlyNumber = (value) => {
        if(new RegExp(/[^0-9]/g).test(Number(value))) {
            return ""
        } else {
            return value
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