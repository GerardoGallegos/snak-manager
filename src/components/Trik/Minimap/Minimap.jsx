import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import formatTime from '../util/formatTime'

// styles
import './Minimap.scss'


class Minimap extends Component {
  constructor(props) {
    super(props)

    const METHODS = [
      'updateMinimap',
      'mapWork'
    ]

    METHODS.forEach((method)=>{
      this[method] = this[method].bind(this)
    })
    this.PROGRESS_TIME
    this.DATA = []
    this.RENDER_MINIMAP = null
    this.ROCK = {
      name : 'Joan Gerardo',
      age: 25,
      country: 'Mexico'
    }

  }


  styles() {
    return {
      'default': {
        modal: {
          background: 'red',
          width: '600px',
          height: '600px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, .48)'
        }
      }
    }
  }


  updateMinimap(){
    const EL = ReactDOM.findDOMNode(this.refs.map)

    if(this.PROGRESS_TIME<5) {
      this.POSX =  this.props.posX
    }
    else {
      this.POSX =  this.props.posX - (EL.clientWidth / 2)
    }

    EL.style.left =  `${this.POSX}px`

  }

  componentWillReceiveProps(nextProps) {
    this.mapWork()
    if(nextProps.posX !== this.props.posX) {
      // Update this.DATA
      this.DATA = this.props.state.runList
      this.updateMinimap()
    }
  }



  renderMinimap(item) {
    switch (item.type) {
    case 'instructions':
      let TEXT
      if(item.instructions.text) {

        if(item.instructions.text.length === 0) {
          TEXT = '[ Empty text ]'
        }

        else if(item.instructions.text.length > 80) {
          TEXT = item.instructions.text.substring(0, 80) + ' ...'
        }

        else {
          TEXT = item.instructions.text
        }
      }
      else{
        TEXT = '[ Empty text ]'
      }

      this.RENDER_MINIMAP = < div className = "Minimap__instructions" >{ TEXT }< /div>
      this.forceUpdate()
      break

    case 'image':
      this.RENDER_MINIMAP = < div className = "Minimap__image"
        style = {
          {
            width: '100%',
            height: '100%',
            background: `url(${item.image.source})`,
            backgroundSize: 'cover'
          }

        } > < /div>
      this.forceUpdate()
      break

    case 'code':
      this.RENDER_MINIMAP = < div className = "Minimap__code" > < /div>
      this.forceUpdate()
      break

    default:
      this.RENDER_MINIMAP = <div></div>
    }

    this.forceUpdate()
  }

  mapWork(){

    for(let i = 0; i < this.DATA.length; i++) {
      // Renderiza el modulo de la region
      if(this.PROGRESS_TIME >= this.DATA[i].from && this.PROGRESS_TIME <= this.DATA[i].to) {
        // Render Minimap
        this.renderMinimap(this.DATA[i])
        i = this.DATA.length
      }
      else {
        // Render Minimap Empty
        this.renderMinimap({})
      }

    }
  }

  render() {
    this.PROGRESS_TIME = this.props.posX <= 0 ? 0 : Math.round((this.props.posX * 100) / window.innerWidth)
    const TIME = formatTime(this.PROGRESS_TIME)
    const DISPLAY = this.props.display ? 'block' : 'none'

    return(
      <div>
        <div is="modal"></div>
        <div ref="map" className="Minimap" style={{ display : DISPLAY}}>
            {
              this.RENDER_MINIMAP
            }
          <span className="Minimap__timer"> { TIME } </span>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    state : state.snak
  }
}

export { Minimap }
export default connect(mapStateToProps)(Minimap)
