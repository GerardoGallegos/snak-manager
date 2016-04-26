
import React, { Component } from 'react'
import { connect } from 'react-redux'
// Actions
import { showWorkingArea } from '../../actions/snak-actions'
// Styles
import './Trik.scss'
// Components
import ProgressBar from './ProgressBar/ProgressBar.jsx'
import PlayButton from './PlayButton/PlayButton.jsx'
import RenderDisplay from './RenderDisplay/RenderDisplay.jsx'
// utils
import formatTime from './util/formatTime'





class Trik extends Component {
  constructor(props) {
    super(props)

    this.time = 0
    this.tick = null
    this.audio = null
    this.audio_status = 'pause'
    this.duration = 100
    this.SHOW_NOW = null

    const METHODS = [
      'tickPlay',
      'thickPause',
      'work',
      'updateTime',
      'click'

    ].forEach((method)=>{
      this[method] = this[method].bind(this)
    })
  }

  componentDidMount() {
    this.DATA = this.props.state.runList
    this.audio = document.getElementById('audio')
  }

  click() {
    this.props.dispatch(showWorkingArea())
  }

  work () {
    for(let i = 0; i < this.DATA.length; i++) {
      // Renderize the module's region
      if(this.time >= this.DATA[i].from && this.time <= this.DATA[i].to) {
        // Blocking
        if(Math.round(this.DATA[i].to - 1) === this.time && this.DATA[i].blocker === true) {
          //
          this.SHOW_NOW = this.DATA[i]
          // RenderDisplay Blocking
          this.thickPause()
          this.forceUpdate()
          i = this.DATA.length
        }
        // No Blocking
        else {
          this.SHOW_NOW = this.DATA[i]
          // RenderDisplay
          this.forceUpdate()
          i = this.DATA.length
        }
      }
      else {
        // RenderDisplay Empty
        this.SHOW_NOW = {}
        this.forceUpdate()
      }
    }
  }

  updateTime(t) {
    this.time = Math.round(t)
    this.audio.currentTime = Math.round(t)
    this.work()
    this.forceUpdate()
  }

  tickPlay(){
    this.audio_status = 'play'
    if(this.tick === null){
      this.audio.play()

      this.duration = this.audio.duration
      this.tick = setInterval(()=>{
        this.time ++
        this.work()
      }, 1000)
    }
  }

  thickPause(){
    clearInterval(this.tick)
    this.tick = null
    this.audio.pause()
    this.audio_status = 'pause'
    this.forceUpdate()
  }


  render() {
    const  PROGRESS = (this.duration / 100) * this.time

    return(
      <div>

        <span className="Seconds">{ formatTime(this.time) }</span>
        <PlayButton play={this.tickPlay} stop={this.thickPause} audioStatus={this.audio_status} />
        <audio id="audio">
          <source src={this.props.audioSource} type="audio/mp3" />
        </audio>
        <RenderDisplay showNow={ this.SHOW_NOW } />
        <ProgressBar progress={PROGRESS} time={this.time} updateTime={this.updateTime}/>
        <button onClick={this.click} style={ {
          'position': 'absolute',
          'bottom': 0
        }}>WorkingArea</button>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    state : state.snak
  }
}

export { Trik }
export default connect(mapStateToProps)(Trik)
