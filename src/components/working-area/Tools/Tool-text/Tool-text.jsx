import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { updateInstruction } from '../../../../actions/snak-actions'
//import storage from '../../../store/snak-store'

//import Selectlist from '../../Selectlist'



class ToolText extends Component {
  constructor(props){
    super(props)
    this.onChangeText = this.onChangeText.bind(this)
  }

  // Bind Event Change textarea
  onChangeText(e){
    this.props.dispatch(updateInstruction(this.props.state.regionInFocus, e.target.value))
  }

  moveCursorToEnd(el) {
    el.focus()
    // if (typeof el.selectionStart == "number") {
    //   el.selectionStart = el.selectionEnd = el.value.length;
    // } else if (typeof el.createTextRange != "undefined") {
    //   el.focus();
    //   var range = el.createTextRange();
    //   range.collapse(false);
    //   range.select();
    // }
  }

  render() {
    let objectData = this.props.state.regionInFocus ?  this.props.state.regionInFocus : {}
    let body = this.props.state.regionInFocus.instructions.body ? this.props.state.regionInFocus.instructions.body : ''
    let _id = `textarea-${objectData.regionId}`
    setTimeout(()=>{
      let txt = document.getElementById(_id)
      //txt.focus()
      this.moveCursorToEnd(txt)
    }, 100)

    const EFFECTS = [
      'Typing',
      'BounseIn',
      'Zoom3d'
    ]

    const SPEED = [
      'Slow',
      'Medium',
      'Fast'
    ]

    const SIZE = [
      'Small',
      'Medium',
      'Big'
    ]
    /*


    */
    return (

      <div className="Tools__panel-instructions">
        <textarea id={_id} value={body}  onChange={ this.onChangeText }></textarea>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    state : state.snak
  }
}

export default connect(mapStateToProps)(ToolText);
