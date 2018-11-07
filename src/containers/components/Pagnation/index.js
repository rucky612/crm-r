import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

class Index extends Component {

    static defaultProps = {
        onClick: () => {},
        onLeft: () => {},
        onRight: () => {}
    }

    activeIndex = (num = 1, index) => {
        return num === index ? "active" : ""
    }

    renderPages = (pages = 0) => {
        return Array.from({length: pages}, (item, index) => {
            return <li key={index} className={`page-item ${this.activeIndex(this.props.activeCurrent, index+1)}`} onClick={() => this.props.onClick(index)}>
                <span className="page-link">{index + 1}</span>
            </li>
        })
    }

    render() {
        return (
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <span className="page-link" onClick={this.props.onLeft}>
                            <span>&laquo;</span>
                            <span className="sr-only">Previous</span>
                        </span>
                    </li>
                    {this.renderPages(this.props.pages)}
                    <li className="page-item">
                        <span className="page-link" onClick={this.props.onRight}>
                            <span>&raquo;</span>
                            <span className="sr-only">Next</span>
                        </span>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default withRouter(Index);