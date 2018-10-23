import React, { Component } from 'react'

class Index extends Component {

  rowCheckbox = () => {
    if(this.props.rowSelection) {
      return <th>
        <input type="checkbox"/>
      </th>
    }
  }

  CheckboxCell = () => {
    if(this.props.rowSelection){
      return <td>
        <input type="checkbox"></input>
      </td>
    }
  }

  tableHeader = (columns) => {
    if(!this.props.columns) return;
    return columns.map((item, index) => {
      return <th key={index} ref={el => { this[item.dataIndex] = el }} scope="col-1">{item.title}</th>
    })
  }

  tableRows = (dataSource) => {
    if(!dataSource) return;
    return dataSource.map((item, index) => {
      return <tr key={index}>
        {this.CheckboxCell()}
        {this.tableCells(item)}
      </tr>
    })
  }

  tableCells = (cell) => {
    if(!this.props.columns) return;
    return this.props.columns.map((name, index) => {
      console.log(cell[name.dataIndex])
      if(name.render){
        return <td  key={index}>
          {name.render()}
        </td>
      }
      return <td key={index}>{cell[name.dataIndex]}</td>
    })
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead className="thead-dark">
          <tr>
            {this.rowCheckbox()}
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