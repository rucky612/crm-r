import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as actions from '../../../../actions/messages'
import Loader from '../../../components/Loader'
import Modal from '../../../components/Modal'
import Alerts from '../../../components/Alerts'
import ReceiverPagination from './ReceiverPagination'
import ReceiverSearch from './ReceiverSearch'
import ReceiverTable from './ReceiverTable'

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
            this.props.fetchGetReceivers(this.props.match.params.id, "limit=10&offset=0")
        } else {
            this.props.fetchGetReceivers(this.props.match.params.id, this.props.location.search.slice(1))
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.location.search.length === 0) {
            this.props.fetchGetReceivers(this.props.match.params.id, nextProps.location.search.slice(1))
        } else if (nextProps.location.search !== this.props.location.search && nextProps.location.search.length !== 0) {
            this.props.fetchGetReceivers(this.props.match.params.id, nextProps.location.search.slice(1))
        }
        if(nextProps.receiversList.error !== null && !this.state.visible) {
            this.setState({
                ...this.state,
                visible: true,
                errorMsg: nextProps.receiversList.error
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
        if(this.props.location.search.length === 0) {
            return <Redirect to={"?limit=10&offset=0"}/>
        }
        return (
            <section>
                <Modal visible={this.state.visible}
                       onOk={this.toggleErrorModal}
                       onCancel={this.toggleErrorModal}>
                    <Alerts strong={this.state.errorMsg}
                            state={"danger"}/>
                </Modal>
                <ReceiverSearch/>
                <div className={`position-relative`}>
                    {this.visibleLoader(this.props.receiversList.isLoading)}
                    <ReceiverTable receiversList={this.props.receiversList.rows}
                                   fetchGetReceivers={this.props.fetchGetReceivers}/>
                    <ReceiverPagination count={this.props.receiversList.count}
                                        paramId={this.props.match.params.id}
                                        fetchGetReceivers={this.props.fetchGetReceivers}/>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    receiversList: state.receiversList
})

const mapDispatchToProps = (dispatch) => ({
    fetchGetReceivers: bindActionCreators(actions.fetchGetReceivers, dispatch),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)