// RunlistItem
import React, { Component } from 'react'
import { clickRegion } from '../../../actions/snak-actions'
import STORE from '../../../store/snak-store'


export default class RunlistItem extends Component {

  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  onPress () {
    STORE.dispatch(clickRegion(this.props.data))
  }

  render() {
    const ITEM = this.props.data
    let type = ITEM.type
    let fileTypeClass = ITEM.code  ? `Runlist__item__blockImg Runlist__item__blockImg-${ITEM.code.fileType}` : `Runlist__item__blockImg Runlist__item__blockImg-${ITEM.type}`
    let fileName = ITEM.code ? ITEM.code.fileName : ITEM.type
    let from = Math.round( ITEM.from )
    let to = Math.round( ITEM.to )
    let time = to - from

    let classes = (()=> {
      if(ITEM.active === true) {
        if(ITEM.type === 'code') {
          return `Runlist__item active-${ITEM.type}`
        }
        return `Runlist__item active-${ITEM.type}`
      }
      else {
        return 'Runlist__item'
      }
    })()

    return (
      <li className={classes} onClick={ this.onPress }>
        <div className={fileTypeClass} ></div>
        <div className="Runlist__item__blockType">
          <span className="Runlist__item__blockType-title">
            { fileName }
          </span>
          <span className="Runlist__item__blockType-range">
            [ {from} - {to} ]
          </span>
        </div>
        <div className="Runlist__item__blockTime">
          { time } Seconds
        </div>
      </li>
    )
  }
}
