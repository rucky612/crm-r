import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'
import Pagnation from '../../../../components/Pagnation'
import connect from 'react-redux/es/connect/connect'

class Index extends Component {

  pageCount = () => {
    const query = queryString.parse(this.props.location.search)
    return Math.ceil(this.props.templateList.count / query.limit)
  }

  pageOffset = (index) => {
    const queryObj = queryString.parse(this.props.location.search)
    queryObj.offset = queryObj.limit * (index-1)
    const query = queryString.stringify(queryObj)
    this.props.history.push(`/templates/home/?${query}`)
  }

  render() {
    const {offset, limit} = queryString.parse(this.props.location.search)
    const defaultIndex = Math.ceil(offset / limit) + 1
    return (
      <Pagnation pages={this.pageCount()}
                 defaultIndex={defaultIndex}
                 onChange={this.pageOffset}
                 />
    )
  }
}

const mapStateToProps = (state) => ({
  templateList: state.templateList
})

export default withRouter(connect(mapStateToProps)(Index))