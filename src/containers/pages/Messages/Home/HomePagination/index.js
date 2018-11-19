import React, {Component} from 'react';
import queryString from 'query-string'
import {withRouter} from 'react-router-dom'
import Pagination from '../../../../components/Pagnation'

class Index extends Component {

    activeIndex = () => {
        const queryObj = queryString.parse(this.props.location.search)
        return Math.ceil(queryObj.offset / queryObj.limit) + 1
    }

    countPage = () => {
        const queryObj = queryString.parse(this.props.location.search)
        return Math.ceil(this.props.count / queryObj.limit) - 1
    }

    movePage = (index) => {
        const queryObj = queryString.parse(this.props.location.search)
        queryObj.offset = (index) * queryObj.limit
        const query = queryString.stringify(queryObj)
        this.props.history.push(`/messages/home?${query}`)
    }

    render() {
        return (
            <Pagination pages={this.countPage()}
                        activeCurrent={this.activeIndex()}
                        onChange={this.movePage}/>
        );
    }
}

export default withRouter(Index)