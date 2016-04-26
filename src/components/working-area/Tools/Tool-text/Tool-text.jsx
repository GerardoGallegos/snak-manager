import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateInstruction } from '../../../../actions/snak-actions'



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
    if (typeof el.selectionStart == 'number') {
      el.selectionStart = el.selectionEnd = el.value.length
    } else if (typeof el.createTextRange != 'undefined') {
      el.focus()
      var range = el.createTextRange()
      range.collapse(false)
      range.select()
    }
  }

  render() {
    const REGION_IN_FOCUS = this.props.state.regionInFocus ?  this.props.state.regionInFocus : {}
    const TEXT = this.props.state.regionInFocus.instructions.text ? this.props.state.regionInFocus.instructions.text : ''
    const _ID = `textarea-${REGION_IN_FOCUS.regionId}`

    setTimeout(()=>{
      const txt = document.getElementById(_ID)
      this.moveCursorToEnd(txt)
    }, 1)

    return (
      <div className="Tools__panel-instructions">
        <textarea id={ _ID } value={ TEXT }  onChange={ this.onChangeText }></textarea>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    state : state.snak
  }
}

export default connect(mapStateToProps)(ToolText)
