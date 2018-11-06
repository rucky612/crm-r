import React, {Component} from 'react'

class Index extends Component {

    static defaultProps = {
        cancelText: "Cancel",
        okText: "Ok",
        onCancel: () => {},
        onOk: () => {},
        title: ""
    }

    render() {
        if (!this.props.visible) {
            return <div></div>
        }
        return (
            <div>
                <div className={`modal-backdrop fade show`}></div>
                <div className={`modal fade show`}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{this.props.title}</h5>
                                <button type="button"
                                        className="close"
                                        onClick={this.props.onCancel}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.props.children}
                            </div>
                            <div className="modal-footer">
                                <button type="button"
                                        className="btn btn-secondary"
                                        onClick={this.props.onCancel}>{this.props.cancelText}</button>
                                <button type="button"
                                        className="btn btn-primary"
                                        onClick={this.props.onOk}>{this.props.okText}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Index