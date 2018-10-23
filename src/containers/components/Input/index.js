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
    } else if(state === "brand") {
      return "sgsg-input--brand"
    } else {
      return ""
    }
  }

  render() {
    return (
      <div className="input-group mb-3">
        <label>{this.props.label}</label>
        <input type="text"
               name={this.props.name}
               className={`sgsg-input ${this.inputColor(this.props.valid)}`}
               onFocus={this.props.onFocus}
               onBlur={this.props.onBlur}
               onChange={this.props.onChange}
               placeholder={this.props.placeholder} />
        {this.renderHelp(this.props.valid)}
      </div>
    )
  }
}

export default Index