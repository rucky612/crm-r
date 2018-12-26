import React, { Component } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import queryString from 'query-string'
import HomeTable from './HomeTable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../../../actions/template'
import Loader from '../../../components/Loader'
import Modal from '../../../components/Modal'
import Alerts from '../../../components/Alerts'
import HomePagination from './HomePagination'
import HomeSearch from './HomeSearch'
import _isEqual from 'lodash/isEqual'

const HomeContent = styled.div`
  position: relative;
  margin-bottom: 1rem;
`

class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      searchOptions: {
        offset: '0',
        limit: '10',
        sortCreatedAt: 'desc'
      },
      errorMsg: null
    }
    if (props.location.search.length !== 0) {
      const queryObj = queryString.parse(props.location.search)
      this.state = {
        ...this.state,
        searchOptions: {
          ...queryObj
        }
      }
    }
  }

  componentDidMount() {
    const { search } = this.props.location
    const query = search.length === 0 ? `?${queryString.stringify(this.state.searchOptions)}` : search
    this.props.fetchRequest(query)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.templateList.error !== this.state.errorMsg && !this.state.visible) {
      this.setState({
        ...this.state,
        errorMsg: nextProps.templateList.error,
        visible: true
      })
    }
    if (nextProps.location.search.length !== 0) {
      const { searchOptions } = this.state
      const queryObj = queryString.parse(nextProps.location.search)
      if (!_isEqual(searchOptions, queryObj)) {
        this.setState({
          ...this.state,
          searchOptions: {
            ...queryObj
          }
        }, () => this.props.fetchRequest(`?${queryString.stringify(queryObj)}`))
      }
    }
  }

  visibleLoader = (isLoading = false) => {
    if (isLoading) {
      return <Loader/>
    } else {
      return
    }
  }

  toggleErrorModal = () => {
    return this.setState({
      ...this.state,
      visible: false,
      errorMsg: null
    })
  }

  render() {
    if (this.props.location.search.length === 0) {
      return <Redirect to={'?limit=10&offset=0&sortCreatedAt=desc'}/>
    }
    return (
      <section>
        <HomeSearch/>
        <HomeContent>
          {this.visibleLoader(this.props.templateList.isLoading)}
          <HomeTable/>
          <HomePagination/>
        </HomeContent>
        <Modal visible={this.state.visible}
               onOk={this.toggleErrorModal}
               onCancel={this.toggleErrorModal}>
          <Alerts strong={this.state.errorMsg}
                  state={'danger'}/>
        </Modal>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  templateList: state.templateList
})

const mapDispatchToProps = (dispatch) => ({
  fetchRequest: bindActionCreators(actions.fetchRequestGet, dispatch),
  removeOneTemplate: bindActionCreators(actions.fetchRequestDelete, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)