import React, {Component} from 'react'
import Table from '../../../../../components/Table'
import Input from '../../../../../components/Input'

class Index extends Component {

    constructor(props) {
        super(props)

        this.state = {}
        this.columns = [
            {
                title: '수신자 번호',
                dataIndex: 'phoneNum',
                render: (cell) => {
                    return <Input name={cell.name}
                                  value={cell.value}
                                  valid={this.inputValid(this.state, cell)}
                                  placeholder={`-없이 숫자로 10자리 이상 입력해주세요`}
                                  onChange={({target}) => this.onlyNumber(target.value, cell)}
                    />
                }
            },
            {
                title: '삭제',
                render: (cell) => {
                    return <button className={`btn-sm btn-danger`}
                                   onClick={() => this.props.removeReceivers(cell.rowIndex)}>삭제</button>
                }
            }
        ]
        if(props.receivers.length !== 0) {
            if(props.receivers[0].replacements.length !== 0) {
                props.receivers[0].replacements.forEach(item => {
                    this.columns.splice(this.columns.length - 1, 0,{
                        title: item.key,
                        dataIndex: item.key,
                        render: (cell) => {
                            return <Input name={item.name}
                                          readOnly={true}
                                          value={item.value}/>
                        }
                    })
                })
            }
        }
    }

    inputValid = (state, cell) => {
        return state.hasOwnProperty(`${cell.name}${cell.rowIndex}`) ? this.state[`${cell.name}${cell.rowIndex}`] : ""
    }

    onlyNumber = (value, cell) => {
        if(new RegExp(/[^0-9]/g).test(Number(value))) {
            this.setState({
                [cell.name + cell.rowIndex]: "danger"
            })
        } else {
            if(value.length <= 11 && value.length >= 10) {
                this.setState({
                    [cell.name + cell.rowIndex]: "success"
                })
            } else {
                this.setState({
                    [cell.name + cell.rowIndex]: "danger"
                })
            }
            this.props.editReceiverPhone(value, cell.rowIndex)
        }
    }

    fixDataSource = () => {
        if(this.props.receivers.length !== 0) {
            const data = this.props.receivers.map(item => {
                return {
                    phoneNum: item.phoneNum
                }
            })
            if(this.props.receivers[0].replacements.length === 0) {
                return data
            } else {
                this.props.receivers.forEach(item => {
                    this.props.receivers[0].replacements.forEach(item => {
                        data[0][item.key] = item.value
                    })
                })
                return data
            }
        }
    }

    render() {
        return (
            <Table columns={this.columns}
                   dataSource={this.fixDataSource()}
                   align={`center`}>
            </Table>
        )
    }
}

export default Index