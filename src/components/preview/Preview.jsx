import React from 'react'
import { connect } from 'react-redux'

import Trik from '../Trik/Trik.jsx'


import { showWorkingArea } from '../../actions/snak-actions'

export default class Preview extends React.Component {

  constructor(props) {
    super(props)
    this.click = this.click.bind(this)
  }

  click() {
    this.props.dispatch(showWorkingArea())
  }

  render() {

    const classes = this.props.type ? `Selectlist Selectlist-${this.props.type}` : 'Selectlist'
    const _state = JSON.stringify(this.props.state, undefined, 2)

    return (
      <Trik audioSource={this.props.state.wave.audioSource} />
    )
  }
}

function mapStateToProps(state, props) {
  return {
    state: state.snak
  }
}

export default connect(mapStateToProps)(Preview)
