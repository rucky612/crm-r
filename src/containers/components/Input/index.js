import React, {Component} from 'react'
import Popover from '../Popover'

class Index extends Component {

    static defaultProps = {
        onChange: () => {
        },
        readOnly: false
    }

    renderPopover = (string = "") => {
        if (string.length !== 0) {
            return <Popover bodyText={string}/>
        } else {
            return;
        }
    }

    renderHelp = (state) => {
        if (state === "danger") {
            return <p className={`sgsg-input__help sgsg-input__help--danger`}>
                {this.props.help}
            </p>
        } else if (state === "warning") {
            return <p className={`sgsg-input__help sgsg-input__help--warning`}>
                {this.props.help}
            </p>
        }
    }

    inputSize = (size) => {
        if (size === "large") {
            return "sgsg-input--large"
        } else if (size === "middle") {
            return "sgsg-input--middle"
        } else if (size === "small") {
            return "sgsg-input--small"
        } else {
            return ""
        }
    }

    inputColor = (state) => {
        if (state === "danger") {
            return "sgsg-input--danger"
        } else if (state === "success") {
            return "sgsg-input--success"
        } else if (state === "warning") {
            return "sgsg-input--warning"
        } else {
            return ""
        }
    }

    onFocus = ({target}) => {
        if (!this.props.readOnly) target.classList.add("sgsg-input--brand")
        if (this.props.onFocus) this.props.onFocus()
    }

    onBlur = ({target}) => {
        target.classList.remove("sgsg-input--brand")
        if (this.props.onBlur) this.props.onBlur()
    }

    render() {
        return (
            <div className="input-group">
                <label>{this.props.label}</label>
                <input type={this.props.type ? this.props.type : "text"}
                       spellCheck={false}
                       name={this.props.name}
                       value={this.props.value ? this.props.value : ""}
                       readOnly={this.props.readOnly}
                       className={`sgsg-input ${this.inputColor(this.props.valid)} ${this.inputSize(this.props.size)}`}
                       onFocus={this.onFocus}
                       onBlur={this.onBlur}
                       onChange={this.props.onChange}
                       placeholder={this.props.placeholder}/>
                {this.renderHelp(this.props.valid)}
                {this.renderPopover(this.props.popover)}
            </div>
        )
    }
}

export default Index