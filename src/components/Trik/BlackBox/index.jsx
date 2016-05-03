import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

// Components
import BlackBox from './BlackBox.jsx'
import EditorCode from './Editor-code.jsx'
// actions
import {
  editCodeBlackBox
} from '../../../actions/snak-actions'


class BlackBoxIndex extends Component {

  constructor(props) {
    super(props)

    const METHODS = [
    ]

    METHODS.forEach((method)=>{
      this[method] = this[method].bind(this)
    })
  }



  render() {
    // const MODE = this.props.state.blackBox.itemInFocus.fileType ? this.props.state.blackBox.itemInFocus.fileType : 'javascript'
    // const VALUE = this.props.state.blackBox.itemInFocus.body ? this.props.state.blackBox.itemInFocus.body : ''
    return (
      <div>
        <BlackBox />
        <EditorCode />
      </div>
    )
  }

}

function mapStateToProps(state, props) {
  return {
    state : state.snak
  }
}

export { BlackBoxIndex }
export default connect(mapStateToProps)(BlackBoxIndex)
