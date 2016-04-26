import React, { Component } from 'react'

import Image from './Image/Image.jsx'
import Code from './Code/Code.jsx'
import Instructions from './Instructions/Instructions.jsx'


import { connect } from 'react-redux'

class RenderDisplay extends Component {
  constructor(props) {
    super(props)
  }

  renderModule(item) {
    if(item) {
      switch (item.type) {

      case 'instructions':
        this.display = <Instructions item={item} />
        this.forceUpdate()
        break

      case 'image':
        this.display = <Image source={item.image.source} />
        break

      case 'code':
        this.display = <Code code={item.code} />
        break

      default:
        this.display = <div></div>
      }
    }

  }

  componentWillReceiveProps(nextProps) {
    // Update the renderModule in every Change
    this.renderModule(nextProps.showNow)
  }

  render() {

    return(
      <div>{ this.display }</div>
    )
  }

}

function mapStateToProps(state, props) {
  return {
    state : state.snak
  }
}


export { RenderDisplay }
export default connect(mapStateToProps)(RenderDisplay)
