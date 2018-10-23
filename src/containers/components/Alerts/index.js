import React, { Component } from 'react'

class Index extends Component {

  stateColor = () => {
    switch (this.props.state) {
      case "success":
        return "sgsg-alerts--success"
      case "danger":
        return "sgsg-alerts--danger"
      case "warning":
        return "sgsg-alerts--warning"
    }
  }

  render() {
    return (
      <div className={`sgsg-alerts ${this.stateColor()}`}>
        <strong>{this.props.strong}</strong>
        {this.props.plain}
      </div>
    )
  }
}

export default Index