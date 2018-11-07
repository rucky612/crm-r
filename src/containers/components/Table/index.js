import React, {Component} from 'react'

class Index extends Component {

    static defaultProps = {
        columns: [],
        dataSource: [],
        align: "",
        selectRow: () => {}
    }

    cellClassName = (align) => {
        if (align === 'center') {
            return 'text-align--center'
        } else {
            return ''
        }
    }

    tableHeader = (columns) => {
        if (!this.props.columns) return
        return columns.map((item, index) => {
            return <th key={index}
                       scope="col-1">{item.title}</th>
        })
    }

    tableRows = (dataSource) => {
        if (!dataSource) return
        return dataSource.map((cell, index) => {
            return <tr key={index} onDoubleClick={() => this.props.selectRow(cell)}>
                {this.tableCells(cell, index)}
            </tr>
        })
    }

    tableCells = (cell, rowIndex) => {
        if (!this.props.columns) return
        return this.props.columns.map((name, index) => {
            if (name.render) {
                return <td className={`vertical-align--center position-relative ${this.cellClassName(this.props.align)}`}
                           key={index}>
                    {name.render({
                        value: cell[name.dataIndex],
                        name: name.dataIndex,
                        title: name.title,
                        index,
                        rowData: cell,
                        rowIndex
                    })}
                </td>
            }
            return <td key={index}>{cell[name.dataIndex]}</td>
        })
    }

    render() {
        return (
            <div>
                <table className="table table-hover">
                    <thead className="thead-dark">
                    <tr>
                        {this.tableHeader(this.props.columns)}
                    </tr>
                    </thead>
                    <tbody>
                    {this.tableRows(this.props.dataSource)}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Index