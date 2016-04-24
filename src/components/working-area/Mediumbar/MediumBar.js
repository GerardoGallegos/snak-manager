import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import styles from './MediumBar.scss'


class Mediumbar extends Component {

  // constructor(props) {
  //   super(props)
  // }

  render() {
    const CLASES = this.props.regionType ? `MediumBar MediumBar-${this.props.regionType}`: 'MediumBar'
    return(
      <div className={CLASES} ></div>
    )
  }
}


function mapStateToProps(state, props) {
  return {
    regionType : state.snak.regionInFocus.type
  }
}

export default connect(mapStateToProps)(Mediumbar)
