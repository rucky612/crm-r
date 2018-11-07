import React, {Component} from 'react';
import queryString from 'query-string'
import {withRouter} from 'react-router-dom'
import Input from '../../../../components/Input'

class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            templateTitle: "",
            templateKey: "",
            receiverPhoneNum: "",
        }
    }

    componentWillReceiveProps(nextProps) {
        const queryObj = queryString.parse(nextProps.location.search)
        if (!nextProps.location.search.includes("templateTitle")) queryObj.templateTitle = ""
        if (!nextProps.location.search.includes("templateKey")) queryObj.templateKey = ""
        if (!nextProps.location.search.includes("receiverPhoneNum")) queryObj.receiverPhoneNum = ""
        this.setState(queryObj)
    }

    onSearch = () => {
        const searchOptions = this.state
        searchOptions.offset = 0
        searchOptions.limit = 10
        const query = queryString.stringify(searchOptions)
        this.props.history.push(`/messages/home/?${query}`)
    }

    onInputChange = ({target}) => {
        this.setState({
            ...this.state,
            [target.name]: target.value
        })
    }

    resetTable = () => {
        this.props.history.replace("?limit=10&offset=0&sort=desc")
    }

    render() {
        return (
            <div className="row mb-5 no-gutters">
                <div className="col-sm-3">
                    <Input size="small"
                           name={"templateTitle"}
                           value={this.state.templateTitle}
                           onChange={this.onInputChange}
                           placeholder={"템플릿 제목"}/>
                </div>
                <div className="col-sm-3">
                    <Input size="small"
                           name={"templateKey"}
                           value={this.state.templateKey}
                           onChange={this.onInputChange}
                           placeholder={"템플릿 키"}/>
                </div>
                <div className="col-sm-3">
                    <Input size="small"
                           name={"receiverPhoneNum"}
                           value={this.state.receiverPhoneNum}
                           onChange={this.onInputChange}
                           placeholder={"수신자 번호"}/>
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