import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { switchColor, sgsgColor } from '../../constants'
import { lighten } from 'polished'
import CheckBox from '../../components/CheckBox'

const Table = styled.table`
  width: 100%;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${props => switchColor(props.headBgColor)};
  & tr:hover {
    background-color: ${lighten(0.1, sgsgColor.gray)}
  }
  & td, & th {
    padding: 0.75rem;
    vertical-align: middle;
    border-top: 1px solid ${sgsgColor.gray};
    ${props =>
  props.tableBorder &&
  css`
        border: 1px solid ${switchColor(props.tableBorder)}
      `
  }
  }
  & th {
    text-align: inherit;
    color: ${props => props.headBgColor ? sgsgColor.white : sgsgColor.black };
    background-color: ${props => switchColor(props.headBgColor, sgsgColor.white)};
    border-bottom: 2px solid ${props => props.tableBorder ? switchColor(props.tableBorder) : sgsgColor.gray};
  }
  & td {
    text-align: center;
  }
`

class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      checkedRows: []
    }
  }

  static defaultProps = {
    columns: [],
    dataSource: [],
    headBgColor: '',
    tableBorder: '',
    clickRow: () => {
    }
  }

  rowSelectionHead = (rowSelection, selectAll) => {
    function renderCheckbox(selectAll) {
      if (selectAll) {
        return <CheckBox type={`checkbox`}
        />
      }
    }
    if (rowSelection) {
      return <th>
        {renderCheckbox(selectAll)}
      </th>
    }
  }

  rowSelectionCell = (rowSelection, cell, index) => {
    if (rowSelection) {
      return <td style={{fontSize: '0'}}>
        <CheckBox type="checkbox"
               onChange={() => this.changeCheckeds(index, rowSelection.onChange)}
               checked={this.state.checkedRows.includes(index)}
        />
      </td>
    }
  }

  changeCheckeds = (index, callback) => {
    const { checkedRows } = this.state
    if (checkedRows.includes(index)) {
      const filterd = checkedRows.filter(item => !(item === index))
      this.setState({
        checkedRows: [...filterd]
      }, () => callback(this.state.checkedRows))
    } else {
      this.setState({
        checkedRows: [
          ...checkedRows,
          index
        ]
      }, () => callback(this.state.checkedRows))
    }
  }

  tableHeader = (columns) => {
    return columns.map((item, index) => {
      return <th key={index}>
        {item.title}
      </th>
    })
  }

  tableRows = (dataSource, rowSelection) => {
    return dataSource.map((cell, index) => {
      return <tr key={index}
                 onClick={() => this.props.clickRow(cell)}
      >
        {this.rowSelectionCell(rowSelection, cell, index)}
        {this.tableCells(cell, index)}
      </tr>
    })
  }

  tableCells = (cell, rowIndex) => {
    return this.props.columns.map((name, index) => {
      if (name.render) {
        return <td key={index}>
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
    const { rowSelection, headBgColor, tableBorder, columns, dataSource, selectAll } = this.props
    return (
      <div>
        <Table headBgColor={headBgColor}
               tableBorder={tableBorder}
        >
          <thead>
          <tr>
            {this.rowSelectionHead(rowSelection, selectAll)}
            {this.tableHeader(columns)}
          </tr>
          </thead>
          <tbody>
          {this.tableRows(dataSource, rowSelection)}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Index