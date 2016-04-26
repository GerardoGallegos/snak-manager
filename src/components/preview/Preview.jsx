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
      <Trik audioSource='/assets/audio/audio_test_01.mp3' />
    )
  }
}

function mapStateToProps(state, props) {
  return {
    state: state.snak
  }
}

export default connect(mapStateToProps)(Preview)



/*

<div className = "preview" >
  <button onClick = { this.click } > Show Working Area </button>
  <pre className = "preview__json" > { _state } < /pre>
</div>

*/
