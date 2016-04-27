import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Minimap from '../Minimap/Minimap.jsx'

// styles
import './ProgressBar.scss'

class ProgressBar extends Component {
  constructor(props) {
    super(props)

    const METHODS = [
      'handleClick',
      'handlePickerDrag',
      'handleProgressOver',
      'handleMouseLeave'
    ]

    METHODS.forEach((method)=>{
      this[method] = this[method].bind(this)
    })

    this.PROGRESS
    this.POSX = 0
  }

  handleClick(e) {
    this.PROGRESS = (e.clientX * 100) / window.innerWidth
    this.props.updateTime(this.PROGRESS)
    this.forceUpdate()
  }


  handlePickerDrag(e){
    this.displayMinimap = false
    if(e.clientX > 0){
      this.PROGRESS = (e.pageX * 100) / window.innerWidth
      this.props.updateTime(this.PROGRESS)
    }
  }

  handleProgressOver(e){
    this.POSX =  e.clientX
    this.displayMinimap = true
    this.forceUpdate()
  }

  handleMouseLeave() {
    this.displayMinimap = false
    this.forceUpdate()
  }


  render() {
    // console.log(this.props.progress )
    return(
      <div className="progress" onMouseDown={ this.handleClick }  onMouseMove ={this.handleProgressOver} onMouseLeave={this.handleMouseLeave}>
        <div  className="progress__bar" style={ {width : `${ this.props.progress }%`} }>
          <div draggable="true"
               className="progress__bar__picker"
               onDrag={this.handlePickerDrag}
          >
          </div>
        </div>

        <Minimap posX={ this.POSX  } time={this.props.time} display={this.displayMinimap} />
      </div>
    )
  }

}

export default ProgressBar
