import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import uid from 'uid'

// styles
import './BlackBox.scss'
// Components
import BlackBoxItems from './BlackBox-items.jsx'
import EditorCode from './Editor-code.jsx'
// actions
import {
  addItemBlackBox,
  deleteItemBlackBox
} from '../../../actions/snak-actions'

class BlackBox extends Component {

  constructor(props) {
    super(props)

    const METHODS = [
      'handleDrop',
      'handleDropOver',
      'handleDropLeave',
      'getCodeInFocus'
    ]

    METHODS.forEach((method)=>{
      this[method] = this[method].bind(this)
    })

    //this.CONTENT_TEXT = ''
    this.CLASES = {
      dropZone : 'BlackBox__dropZone',
      dropZoneBall : 'BlackBox__dropZone__ball'
    }

  }

  handleDropOver(e) {
    e.preventDefault()
    this.CLASES = {
      dropZone : 'BlackBox__dropZone BlackBox__dropZone-active',
      dropZoneBall : 'BlackBox__dropZone__ball BlackBox__dropZone__ball-active'
    }
    this.forceUpdate()
  }

  handleDropLeave(){
    this.CLASES = {
      dropZone : 'BlackBox__dropZone',
      dropZoneBall : 'BlackBox__dropZone__ball'
    }
    this.forceUpdate()
  }

  getCodeInFocus() {
    const RUNLIST = this.props.state.runList
    const TIME = this.props.state.trik.time

    for(let i = 0; i<RUNLIST.length; i++) {
      if(TIME >= RUNLIST[i].from && TIME <= RUNLIST[i].to ) {
        return RUNLIST[i]
      }
    }
  }

  handleDrop(e) {
    e.preventDefault()
    const CONTENT_TEXT = e.dataTransfer.getData('text')
    // Add Item to BlackBox
    this.props.dispatch(addItemBlackBox({
      body : CONTENT_TEXT,
      fileName : this.getCodeInFocus().code.fileName,
      fileType : this.getCodeInFocus().code.fileType,
      id : 'bb_' + uid(12)
    }))
    // Set clases
    this.CLASES = {
      dropZone : 'BlackBox__dropZone',
      dropZoneBall : 'BlackBox__dropZone__ball'
    }
    this.forceUpdate()
  }


  render() {
    const STYLES = {
      display : this.props.state.blackBox.show ? 'block' : 'none'
    }

    const CLS = this.props.state.blackBox.show ? 'BlackBox BlackBox__show' : 'BlackBox'

    return(
      <div className={CLS}  >
        <div
          onDragOver={this.handleDropOver}
          onDrop={this.handleDrop}
          onDragLeave={this.handleDropLeave}
          className={ this.CLASES.dropZone }
        ></div>
        <div className={ this.CLASES.dropZoneBall }></div>
        <BlackBoxItems />
      </div>
    )
  }

}

function mapStateToProps(state, props) {
  return {
    state : state.snak
  }
}

export { BlackBox }
export default connect(mapStateToProps)(BlackBox)
