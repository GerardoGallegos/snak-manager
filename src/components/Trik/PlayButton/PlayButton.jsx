import React, { Component } from 'react'
import ReactDOM from 'react-dom'


export default class PlayButton extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.CLASS = 'PlayButton PlayButton__play'
  }

  handleClick(e) {
    if(this.CLASS === 'PlayButton PlayButton__play') {
      this.CLASS = 'PlayButton PlayButton__pause'
      this.props.play()
      this.forceUpdate()
    }
    else {
      this.CLASS = 'PlayButton PlayButton__play'
      this.props.stop()
      this.forceUpdate()
    }

  }

  render() {
    return(
      <div className={ this.CLASS } onClick={ this.handleClick }></div>
    )
  }

}
