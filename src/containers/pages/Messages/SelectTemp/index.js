import React, {Component} from 'react'
import connect from 'react-redux/es/connect/connect'
import {bindActionCreators} from "redux";
import * as actions from '../../../../actions'
import Alerts from '../../../components/Alerts'
import SelectTempTable from './SelectTempTable'
import SelectTempSearch from './SelectTempSearch'
import SelectTempForm from './SelectTempForm'

class Index extends Component {

    componentDidMount() {
        this.props.fetchRequest(`?limit=15&offset=0&sortCreatedAt=desc`)
    }

    renderWarning = () => {
        if (this.props.templateList.rows.length === 0) {
            return <Alerts strong={`경고! `}
                           plain={`조건에 해당하는 템플릿이 없습니다.`}
                           state={`warning`}/>
        }
    }

    onRedicrect = () => {
        this.props.history.push(`/messages/create/receivers`)
    }

    render() {
        return (
            <div className={`row`}>
                <div className={`col-8`}>
                    <SelectTempSearch searchFetch={this.props.fetchRequest}/>
                    <SelectTempTable dataSource={this.props.templateList.rows}/>
                    {this.renderWarning()}
                </div>
                <div className={`col-4`}>
                    <SelectTempForm/>
                </div>
                <div className={`col-12`}>
                    <button className={`btn btn-primary d-inline-block float-right`} onClick={this.onRedicrect}>다음</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    templateList: state.templateList,
})

const mapDispatchToProps = (dispatch) => ({
    fetchRequest: bindActionCreators(actions.fetchRequestGet, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)