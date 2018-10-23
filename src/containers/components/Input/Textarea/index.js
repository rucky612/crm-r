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
      <div className="form-group">
        <label>{this.props.label}</label>
        <textarea className={`sgsg-input ${this.inputColor(this.props.valid)}`}
                  name={this.props.name}
                  rows={this.props.rows}
                  onBlur={this.props.onBlur}
                  onFocus={this.props.onFocus}
                  onChange={this.props.onChange}/>
        {this.renderHelp(this.props.valid)}
      </div>
    )
  }
}

export default Index