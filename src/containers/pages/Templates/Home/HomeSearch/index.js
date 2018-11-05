import React, {Component} from 'react';
import queryString from 'query-string'
import {withRouter} from 'react-router-dom'
import Input from '../../../../components/Input'
import connect from "react-redux/es/connect/connect";

class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    componentWillReceiveProps(nextProps) {
        const queryObj = queryString.parse(nextProps.location.search)
        if(!nextProps.location.search.includes("title")) queryObj.title = ""
        if(!nextProps.location.search.includes("key")) queryObj.key = ""
        this.setState(queryObj)
    }

    onSearch = () => {
        const searchOptions = this.state
        searchOptions.offset = 0
        searchOptions.limit = 10
        const query = queryString.stringify(searchOptions)
        this.props.history.push(`/templates/home/?${query}`)
    }

    onInputChange = ({target}) => {
        this.setState({
            ...this.state,
            [target.name]: target.value
        })
    }

    resetTable = () => {
        this.props.history.replace("?limit=10&offset=0&sortCreatedAt=desc")
    }

    render() {
        return (
            <div className="row mb-5">
                <div className="col-6">
                    <div className="mb-3">
                        <div className="row no-gutters">
                            <div className="col-sm-4">
                                <Input size="small"
                                       name={"title"}
                                       value={this.state.title ? this.state.title : ""}
                                       onChange={this.onInputChange}
                                       placeholder={"템플릿 제목"}/>
                            </div>
                            <div className="col-sm-4">
                                <Input size="small"
                                       name={"key"}
                                       value={this.state.key ? this.state.key : ""}
                                       onChange={this.onInputChange}
                                       placeholder={"템플릿 키"}/>
                            </div>
                            <div className="col-sm-3">
                                <button className="btn btn-primary h-auto d-inline-block"
                                        onClick={this.onSearch}>
                                    검색
                                </button>
                                <button className="btn btn-secondary h-auto d-inline-block"
                                        onClick={this.resetTable}>
                                    초기화
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    templateList: state.templateList,
})

export default withRouter(connect(mapStateToProps)(Index))