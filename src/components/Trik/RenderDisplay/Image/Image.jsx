import React, { Component } from 'react'

class Image extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <img className="image" src={this.props.source}/>
    )
  }

}

export default Image
