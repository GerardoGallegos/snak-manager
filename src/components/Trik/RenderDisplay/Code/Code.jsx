import React, { Component } from 'react'

class Instructions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="Code-panel">
        <div className="Code-panel__top">
          <span className="Code-panel__top__fileName">{ this.props.code.fileName }</span>
        </div>
        <pre className="Code-panel__code">
          {
            this.props.code.text
          }
        </pre>
      </div>
    )
  }

}

export default Instructions
