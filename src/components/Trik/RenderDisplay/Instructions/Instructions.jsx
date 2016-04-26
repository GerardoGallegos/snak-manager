import React, { Component } from 'react'
import ReactDOM from 'react-dom'



class Instructions extends Component {
  constructor(props) {
    super(props)
    this.CLASS = this.props.item.animation ? `instructions ${this.props.item.animation.in}` : 'instructions'
  }

  componentDidMount() {
    // [ In verification ]
    // ReactDOM.findDOMNode(this.refs.text).onCSSAnimationEnd(()=>{
    //   this.CLASS = "instructions"
    //   this.forceUpdate()
    // })
  }


  componentWillReceiveProps(nextProps) {
    this.CLASS = "instructions"
    if(nextProps.item.instructions.text != this.props.item.instructions.text) {
      this.CLASS = nextProps.item.animation ? `instructions ${nextProps.item.animation.in}` : 'instructions'
    }
    return false
  }


  render() {
    const fontSize = Math.round(innerWidth/20)

    return(
      <div className="boxInstructions">
        <span ref="text" className={this.CLASS} style={{color : '#4CAF50', fontSize : fontSize}}>
          {
            this.props.item.instructions.text
          }
        </span>
      </div>
    )
  }
}

export default Instructions
