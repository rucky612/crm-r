import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as actions from '../../../../actions/messages'
import Loader from '../../../components/Loader'
import Modal from '../../../components/Modal'
import Alerts from '../../../components/Alerts'
import HomePagination from './HomePagination'
import HomeTable from './HomeTable'
import HomeSearch from './HomeSearch'

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            errorMsg: null,
        }
    }

    componentDidMount() {
        if(this.props.location.search.length === 0) {
            this.props.fetchGetMessages("limit=10&offset=0&sort=desc")
        } else {
            this.props.fetchGetMessages(this.props.location.search.slice(1))
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.receiversList)
        if(this.props.location.search.length === 0) {
            this.props.fetchGetMessages(nextProps.location.search.slice(1))
        } else if (nextProps.location.search !== this.props.location.search && nextProps.location.search.length !== 0) {
            this.props.fetchGetMessages(nextProps.location.search.slice(1))
        }
        if(nextProps.messageList.error !== null && !this.state.visible) {
            this.setState({
                ...this.state,
                visible: true,
                errorMsg: nextProps.messageList.error
            })
        }
    }

    visibleLoader = (isLoading = false) => {
        if (isLoading) {
            return <Loader/>
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
            return <Redirect to={"/messages/home?limit=10&offset=0&sort=desc"}/>
        }
        return (
            <section>
                <Modal visible={this.state.visible}
                       onOk={this.toggleErrorModal}
                       onCancel={this.toggleErrorModal}>
                    <Alerts strong={this.state.errorMsg}
                            state={"danger"}/>
                </Modal>
                <HomeSearch/>
                <div className={`position-relative`}>
                    {this.visibleLoader(this.props.messageList.isLoading)}
                    <HomeTable messageList={this.props.messageList.rows}
                               fetchGetReceivers={this.props.fetchGetReceivers}/>
                    <HomePagination count={this.props.messageList.count}
                                    fetchGetMessages={this.props.fetchGetMessages}/>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    messageList: state.messageList,
    receiversList: state.receiversList
})

const mapDispatchToProps = (dispatch) => ({
    fetchGetMessages: bindActionCreators(actions.fetchGetMessages, dispatch),
    fetchGetReceivers: bindActionCreators(actions.fetchGetReceivers, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)