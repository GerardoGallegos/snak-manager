import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
// styles
import './BlackBox.scss'

class BlackBox extends Component {

  constructor(props) {
    super(props)

    const METHODS = [
      'handleDrop',
      'handleDropOver',
      'handleDropLeave'
    ]

    METHODS.forEach((method)=>{
      this[method] = this[method].bind(this)
    })

    this.CONTENT_TEXT = ''
    this.CLASES = {
      dropZone : 'BlackBox__dropZone',
      dropZoneBall : 'BlackBox__dropZone__ball'
    }

  }

  handleDropOver(e) {
    e.preventDefault()
    this.CLASES = {
      dropZone : 'BlackBox__dropZone BlackBox__dropZone-active',
      dropZoneBall : 'BlackBox__dropZone__ball BlackBox__dropZone__ball-active'
    }
    this.forceUpdate()
  }

  handleDropLeave(){
    this.CLASES = {
      dropZone : 'BlackBox__dropZone',
      dropZoneBall : 'BlackBox__dropZone__ball'
    }
    this.forceUpdate()
  }

  handleDrop(e) {
    e.preventDefault()
    this.CONTENT_TEXT = e.dataTransfer.getData('text')
    this.CLASES = {
      dropZone : 'BlackBox__dropZone',
      dropZoneBall : 'BlackBox__dropZone__ball'
    }
    this.forceUpdate()
  }


  render() {
    const STYLES = {
      display : this.props.state.blackBox.show ? 'block' : 'none'
    }

    const CLS = this.props.state.blackBox.show ? 'BlackBox BlackBox__show' : 'BlackBox'
    console.log(CLS)

    return(
      <div className={CLS}  >
        <div
          onDragOver={this.handleDropOver}
          onDrop={this.handleDrop}
          onDragLeave={this.handleDropLeave}
          className={ this.CLASES.dropZone }
        >
        <pre>
          {
            this.CONTENT_TEXT
          }
        </pre>
        </div>
        <div className={ this.CLASES.dropZoneBall }></div>
      </div>
    )
  }

}

function mapStateToProps(state, props) {
  return {
    state : state.snak
  }
}

export { BlackBox }
export default connect(mapStateToProps)(BlackBox)
