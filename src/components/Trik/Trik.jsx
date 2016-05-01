import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'

// Styles
import './Trik.scss'
// Components
import ProgressBar from './ProgressBar/ProgressBar.jsx'
import PlayButton from './PlayButton/PlayButton.jsx'
import RenderDisplay from './RenderDisplay/RenderDisplay.jsx'
import BlackBox from './BlackBox/BlackBox.jsx'
// utils
import formatTime from './util/formatTime'
// Actions
import {
   showWorkingArea,
   setDuration,
   setTime, setProgressBar,
   setAudioStatus
} from '../../actions/snak-actions'



class Trik extends Component {
  constructor(props) {
    super(props)

    this.time = 0
    this.tick = null
    this.audio = null
    this.SHOW_NOW = null

    const METHODS = [
      'tickPlay',
      'thickPause',
      'work',
      'showWorkingArea',
      'changeTime'

    ].forEach((method)=>{
      this[method] = this[method].bind(this)
    })
  }

  componentDidMount() {
    this.DATA = this.props.state.runList
    this.audio = ReactDOM.findDOMNode(this.refs.audio)
    this.time = this.props.state.trik.time

    setTimeout(()=>{
      this.props.dispatch(setDuration(this.audio.duration))
    }, 100)
  }

  componentWillReceiveProps(nextProps) {
    // Change time
    if(nextProps.state.trik.time !== this.time) {
      this.time = nextProps.state.trik.time
      this.work()
    }

  }

  changeTime(){
    this.audio.currentTime = this.props.state.trik.time
  }

  showWorkingArea() {
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
          i = this.DATA.length
        }
        // No Blocking
        else {
          this.SHOW_NOW = this.DATA[i]
          // RenderDisplay
          i = this.DATA.length
        }
      }
      else {
        // RenderDisplay Empty
        this.SHOW_NOW = {}
      }
    }
  }


  tickPlay(){
    this.props.dispatch(setAudioStatus('play'))
    if(this.tick === null){
      this.audio.play()
      this.tick = setInterval(()=>{
        this.time ++
        this.props.dispatch(setTime(this.time))
        this.props.dispatch(setProgressBar( (this.time * 100)/ this.props.state.trik.duration ) )
        this.work()
      }, 1000)
    }
  }

  thickPause(){
    clearInterval(this.tick)
    this.tick = null
    this.audio.pause()
    this.props.dispatch(setAudioStatus('pause'))
    this.forceUpdate()
  }


  render() {
    return(
      <div>
        <BlackBox />
        <span className="Seconds">{ formatTime(this.time) }</span>
        <PlayButton play={ this.tickPlay } stop={ this.thickPause } />
        <audio ref="audio">
          <source src={ this.props.audioSource } type="audio/mp3" />
        </audio>
        <RenderDisplay showNow={ this.SHOW_NOW } />
        <ProgressBar changeTime={ this.changeTime }/>
        <button onClick={ this.showWorkingArea } style={ {'position': 'absolute', 'bottom': 0 }}>WorkingArea</button>
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
