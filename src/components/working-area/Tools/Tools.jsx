import React, {  Component,  PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {  connect } from 'react-redux'

import ToolText from './Tool-text/Tool-text.jsx'
import ToolCode from './Tool-code/Tool-code.jsx'
import ToolImage from './Tool-image/Tool-image.jsx'

import styles from './Tools.scss'


class Tools extends Component {
  constructor(props) {
    super(props)
  }


  render() {
    let provideTool = (regionInFocus) => {
      switch (regionInFocus.type) {
          case 'code':
            return <ToolCode / >

          case 'image':
            return <ToolImage / >

          case 'instructions':
            return <ToolText / >

          default:
            return <h1 >No Tool for this regionType< /h1>
      }
    }

    return ( < div > {
        provideTool(this.props.regionInFocus)
    } < /div>)
  }
}


function mapStateToProps (state, props) {
  return {
    regionInFocus: state.snak.regionInFocus
  }
}

export { Tools }
export default connect(mapStateToProps)(Tools)
