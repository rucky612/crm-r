import React, {Component} from 'react';
import queryString from 'query-string'
import {withRouter} from 'react-router-dom'
import Input from '../../../../components/Input'

class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            phoneNum: "",
            status: "",
        }
    }

    componentWillReceiveProps(nextProps) {
        const queryObj = queryString.parse(nextProps.location.search)
        if (!nextProps.location.search.includes("phoneNum")) queryObj.phoneNum = ""
        if (!nextProps.location.search.includes("status")) queryObj.status = ""
        this.setState(queryObj)
    }

    onSearch = () => {
        const searchOptions = this.state
        searchOptions.offset = 0
        searchOptions.limit = 10
        const query = queryString.stringify(searchOptions)
        this.props.history.push(`?${query}`)
    }

    onInputChange = ({target}) => {
        this.setState({
            ...this.state,
            [target.name]: target.value
        })
    }

    resetTable = () => {
        this.props.history.replace("?limit=10&offset=0")
    }

    render() {
        return (
            <div className="row mb-5 no-gutters">
                <div className="col-sm-3">
                    <Input size="small"
                           name={"phoneNum"}
                           value={this.state.phoneNum}
                           onChange={this.onInputChange}
                           placeholder={"수신자 번호"}/>
                </div>
                <div className="col-sm-3">
                    <Input size="small"
                           name={"status"}
                           value={this.state.status}
                           onChange={this.onInputChange}
                           placeholder={"발신 상태"}/>
                </div>
                <div className="col-sm-2">
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
        );
    }
}

export default withRouter(Index)