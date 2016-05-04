import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
// styles
import './ProgressBar.scss'
// Components
import Minimap from '../Minimap/Minimap.jsx'
// Util
import getProgress from '../util/getProgress'
// actions
import {
  setProgressBar,
  setTime,
  showMinimap,
  setPosX
} from '../../../actions/snak-actions'



class ProgressBar extends Component {

  constructor(props) {
    super(props)

    const METHODS = [
      'handleClick',
      'handlePickerDrag',
      'handleProgressOver',
      'handleMouseLeave',
      'updateProgress'
    ]

    METHODS.forEach((method)=>{
      this[method] = this[method].bind(this)
    })

  }

  handleClick(event) {
    this.updateProgress(event)
    this.props.changeTime()
  }


  handlePickerDrag(event){
    this.updateProgress(event)
  }

  handleProgressOver(event){
    this.POSX = event.clientX
    this.DISPLAY_MINIMAP = true
    this.forceUpdate()
  }

  handleMouseLeave(event) {
    this.DISPLAY_MINIMAP = false
    this.forceUpdate()
  }

  updateProgress(event) {
    const progressBar = getProgress(event, this.props.state.trik.duration).progress
    const time = getProgress(event, this.props.state.trik.duration).time

    this.props.dispatch(showMinimap(false))
    if(event.clientX > 0){
      this.props.dispatch(setProgressBar(progressBar))
      this.props.dispatch(setTime(time))
    }
  }


  render() {
    return(
      <div  className="progress"  onMouseDown={ this.handleClick }  onMouseMove ={this.handleProgressOver} onMouseLeave={this.handleMouseLeave}>
        <div className="progress__bar" style={ {width : `${ this.props.state.trik.progressBar }%`} }>
          <div draggable="true" style={ {width : '100%'}}
               className="progress__bar__picker"
               onDrag={this.handlePickerDrag}
          >
          </div>
        </div>

        <Minimap display={this.DISPLAY_MINIMAP} posX={this.POSX}/>
      </div>
    )
  }

}

function mapStateToProps(state, props) {
  return {
    state : state.snak
  }
}

export { ProgressBar }
export default connect(mapStateToProps)(ProgressBar)
