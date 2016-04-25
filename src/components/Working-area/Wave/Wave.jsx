import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import uid from 'uid'
import Mousetrap from 'mousetrap'

import addRegion from './addRegion'
import WaveSurfer from '../../../lib/wavesurfer.js'

import styles from './Wave.scss'


class Wave extends Component {
  constructor(props){
    super(props)
    this.WS = null
  }

  playPause () {
    this.WS.playPause()
  }

  componentDidMount () {
    this.WS = WaveSurfer(this.props.state.wave._id)
    Mousetrap.bind('space', this.playPause.bind(this))
    Mousetrap.bind('i i i', this.addNewRegion.bind(this, 'image'))
    Mousetrap.bind('t t t', this.addNewRegion.bind(this, 'instructions'))
    Mousetrap.bind('c c c', this.addNewRegion.bind(this, 'code'))
  }

  addNewRegion(type) {
    addRegion(this.WS, type)
  }

  render() {
    return(
      <div>
        <div id={ this.props.state.wave._id } className="audioWave"></div>
      </div>
    )
  }
}

const mapStateToProps = (state, props)=> {
  return {
    state : state.snak
  }
}

export { Wave }
export default connect(mapStateToProps)(Wave)
