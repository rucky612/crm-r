import React, { Component } from 'react'

class Index extends Component {

  renderHelp = (state) => {
    if(state === "danger") {
      return <p className={`sgsg-input__help sgsg-input__help--danger`}>
        {this.props.help}
      </p>
    }
  }

  inputColor = (state) => {
    if(state === "danger") {
      return "sgsg-input--danger"
    } else if(state === "success") {
      return "sgsg-input--success"
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
      <div className="input-group mb-3">
        <label>{this.props.label}</label>
        <input type={this.props.type ? this.props.type : "text"}
               name={this.props.name}
               value={this.props.value}
               className={`sgsg-input ${this.inputColor(this.props.valid)}`}
               onFocus={this.onFocus}
               onBlur={this.onBlur}
               onChange={this.props.onChange}
               placeholder={this.props.placeholder} />
        {this.renderHelp(this.props.valid)}
      </div>
    )
  }
}

export default Index