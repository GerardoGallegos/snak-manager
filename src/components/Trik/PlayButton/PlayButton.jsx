import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
// Actions
import {
   setAudioStatus
} from '../../../actions/snak-actions'

class PlayButton extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.CLASS = 'PlayButton PlayButton__play'
  }

  handleClick(e) {
    if(this.CLASS === 'PlayButton PlayButton__play') {
      this.CLASS = 'PlayButton PlayButton__pause'
      this.props.play()
      this.props.dispatch(setAudioStatus('play'))
      this.forceUpdate()
    }
    else {
      this.CLASS = 'PlayButton PlayButton__play'
      this.props.stop()
      this.props.dispatch(setAudioStatus('stop'))
      this.forceUpdate()
    }

  }

  render() {
    return(
      <div className={ this.CLASS } onClick={ this.handleClick }></div>
    )
  }

}

function mapStateToProps(state, props) {
  return {
    state : state.snak.trik
  }
}

export { PlayButton }
export default connect(mapStateToProps)(PlayButton)
