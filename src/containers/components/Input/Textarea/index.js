import React, {Component} from 'react'

class Index extends Component {

    renderHelp = (state) => {
        if (state === "danger") {
            return <p className={`sgsg-input__help sgsg-input__help--danger`}>
                {this.props.help}
            </p>
        } else if(state === "warning") {
            return <p className={`sgsg-input__help sgsg-input__help--warning`}>
                {this.props.help}
            </p>
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
        target.classList.add("sgsg-input--brand")
    }

    onBlur = ({target}) => {
        target.classList.remove("sgsg-input--brand")
    }

    render() {
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <textarea className={`sgsg-input ${this.inputColor(this.props.valid)}`}
                          name={this.props.name}
                          value={this.props.value}
                          readOnly={this.props.readOnly ? this.props.readOnly : false}
                          rows={this.props.rows}
                          onBlur={this.onBlur}
                          onFocus={this.onFocus}
                          onChange={this.props.onChange}/>
                {this.renderHelp(this.props.valid)}
            </div>
        )
    }
}

export default Index