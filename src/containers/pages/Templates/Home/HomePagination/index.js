import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import queryString from 'query-string'
import Pagnation from '../../../../components/Pagnation'
import connect from "react-redux/es/connect/connect";

class Index extends Component {

    pageCount = () => {
        const query = queryString.parse(this.props.location.search)
        return Math.ceil(this.props.templateList.count / query.limit)
    }

    pageOffset = (num) => {
        const queryObj = queryString.parse(this.props.location.search)
        queryObj.offset = queryObj.limit * num
        const query = queryString.stringify(queryObj)
        this.props.history.push(`/templates/home/?${query}`)
    }

    onMove = (direction) => {
        const queryObj = queryString.parse(this.props.location.search)
        if (direction === "left" && queryObj.offset > 0) {
            queryObj.offset = Number(queryObj.offset) - Number(queryObj.limit)
            const query = queryString.stringify(queryObj)
            this.props.history.push(`/templates/home/?${query}`)
        } else if (direction === "right" && queryObj.offset < this.props.templateList.count - queryObj.limit) {
            queryObj.offset = Number(queryObj.offset) + Number(queryObj.limit)
            const query = queryString.stringify(queryObj)
            this.props.history.push(`/templates/home/?${query}`)
        }
    }

    activePageIndex = (query = 1) => {
        if (typeof query === 'string' && query.length !== 0) {
            const queryObj = queryString.parse(query)
            return queryObj.offset / queryObj.limit + 1
        } else {
            return 1
        }
    }

    render() {
        return (
            <Pagnation pages={this.pageCount()}
                       activeCurrent={this.activePageIndex(this.props.location.search)}
                       onLeft={() => this.onMove('left')}
                       onRight={() => this.onMove('right')}
                       onClick={this.pageOffset}/>
        );
    }
}

const mapStateToProps = (state) => ({
    templateList: state.templateList,
})

export default withRouter(connect(mapStateToProps)(Index))