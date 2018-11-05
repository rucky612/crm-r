import React, {Component} from 'react';

class Index extends Component {
    render() {
        return (
            <div className="sgsg-popover">
                <div className="sgsg-popover__arrow"></div>
                {/*<h3 className="sgsg-popover__header"></h3>*/}
                <div className="sgsg-popover__body">{this.props.bodyText}</div>
            </div>
        );
    }
}

export default Index;