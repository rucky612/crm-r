import React, {Component} from 'react';

class Index extends Component {

    optionsList = (options = []) => {
        return options.map((item, index) => {
            return <option key={index} defaultValue={item}>{item}</option>
        })
    }

    visibleLabel = (visible = false) => {
        if (visible) {
            return <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Options</label>
            </div>
        }
    }

    render() {
        return (
            <div className="input-group mb-3">
                {this.visibleLabel(this.props.visibleLabel)}
                <select className="custom-select"
                        name={this.props.name}
                        value={this.props.selected ? this.props.selected : ""}
                        onChange={this.props.onSelect}>
                    {this.optionsList(this.props.options)}
                </select>
            </div>
        );
    }
}

export default Index;