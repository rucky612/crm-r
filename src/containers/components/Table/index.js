import React, { Component } from 'react'

class Index extends Component {

  rowSelection = () => {
    if(this.props.rowSelection) {
      return <th>
        <input type="checkbox"/>
      </th>
    }
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead className="thead-dark">
          <tr>
            {this.rowSelection()}
            {this.props.columns.map((item, index) => {
              return <th key={index} scope="col">{item.title}</th>
            })}
          </tr>
          </thead>
          <tbody>
          {/*<tr>*/}
            {/*<th scope="row">1</th>*/}
            {/*<td>Mark</td>*/}
            {/*<td>Otto</td>*/}
            {/*<td>@mdo</td>*/}
          {/*</tr>*/}

          </tbody>
        </table>
      </div>
    )
  }
}

export default Index