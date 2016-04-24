import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Components
import Topbar from './Topbar/Topbar.jsx'
import Wave from './Wave/Wave'
import MediumBar from './Mediumbar/MediumBar.jsx'
import Runlist from './Runlist/Runlist.jsx'
import Tools from './Tools/Tools.jsx'

import './Working-area.scss'


export default class WorkingArea extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    //console.log(this.props.state.show.workingArea)
    const CLASS = this.props.state.show.workingArea ? 'WorkingArea WorkingArea-in' : 'WorkingArea WorkingArea-out'

    return (
      <div className={ CLASS } >
        <Topbar />
        <Runlist />
        <Tools />
        <Topbar />
        <Wave />
        <MediumBar />
      </div>
    )
  }
}


function mapStateToProps(state, props) {
  return {
    state : state.snak
  }
}

export default connect(mapStateToProps)(WorkingArea)
