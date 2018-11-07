import React, {Component} from 'react';
import Input from '../../../../../components/Input'
import _filter from 'lodash/filter'

class Index extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchValue: "",
            buttonValue: false
        }
    }

    onInputChange = ({target}) => {
        this.setState({
            ...this.state,
            searchValue: target.value,
        })
    }
    
    onReset = () => {
        this.props.fetchGetTemplates(`limit=10000&sortCreatedAt=desc`)
        this.setState({
            ...this.state,
            buttonValue: false
        })
    }

    onSearch = () => {
        const data = _filter(this.props.templates, (item) => {
            return item.key.includes(this.state.searchValue) || item.title.includes(this.state.searchValue)
        })
        this.props.searchTemplates(data)
        this.setState({
            ...this.state,
            searchValue: "",
            buttonValue: true
        })
    }

    onButton = () => {
        if(!this.state.buttonValue) {
            return <button className={`btn btn-primary d-inline-block`}
                           onClick={this.onSearch}>검색</button>
        } else {
            return <button className={`btn btn-secondary d-inline-block`}
                           onClick={this.onReset}>초기화</button>
        }
    }

    render() {
        return (
            <div className={`row no-gutters mb-3`}>
                <div className={`col-sm-8`}>
                    <Input size={`small`}
                           value={this.state.searchValue}
                           onChange={this.onInputChange}
                           placeholder={`키 또는 제목 입력`}/>
                </div>
                <div className={`col-sm-2`}>
                    {this.onButton()}
                </div>
            </div>
        );
    }
}

export default Index;