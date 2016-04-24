import React, { Component } from 'react'
import { connect } from 'react-redux'

import RunlistItem from './Runlist-item'

import styles from './Runlist.scss'

class Runlist extends Component {

  render() {
    return (
      <ul className="Runlist">
          {
            this.props.state.runList.map((item, i) => {
              return <RunlistItem  key={i} data={item} />
            })
          }
      </ul>
    )
  }
}


let mapStateToProps = (state, props)=> {
  return {
    state : state.snak
  }
}

export default connect(mapStateToProps)(Runlist)
