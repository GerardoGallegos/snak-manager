import React, { Component } from 'react'
import ReactDOM from 'react-dom'



class Instructions extends Component {
  constructor(props) {
    super(props)
    this.CLASS = this.props.item.animation ? `instructions ${this.props.item.animation.in}` : 'instructions'
  }

  componentDidMount() {
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







// (function(document, window, index) {
//   var s = document.body || document.documentElement,
//     s = s.style,
//     prefixAnimation = '',
//     prefixTransition = ''
//
//   if (s.WebkitAnimation == '') prefixAnimation = '-webkit-'
//   if (s.MozAnimation == '') prefixAnimation = '-moz-'
//   if (s.OAnimation == '') prefixAnimation = '-o-'
//
//   if (s.WebkitTransition == '') prefixTransition = '-webkit-'
//   if (s.MozTransition == '') prefixTransition = '-moz-'
//   if (s.OTransition == '') prefixTransition = '-o-'
//
//   Object.prototype.onCSSAnimationEnd = function(callback) {
//     var runOnce = function(e) {
//       callback()
//       e.target.removeEventListener(e.type, runOnce)
//     }
//     this.addEventListener('webkitAnimationEnd', runOnce)
//     this.addEventListener('mozAnimationEnd', runOnce)
//     this.addEventListener('oAnimationEnd', runOnce)
//     this.addEventListener('oanimationend', runOnce)
//     this.addEventListener('animationend', runOnce)
//     if ((prefixAnimation == '' && !('animation' in s)) || getComputedStyle(this)[prefixAnimation + 'animation-duration'] == '0s') callback()
//     return this
//   }
//
//   Object.prototype.onCSSTransitionEnd = function(callback) {
//     var runOnce = function(e) {
//       callback()
//       e.target.removeEventListener(e.type, runOnce)
//     }
//     this.addEventListener('webkitTransitionEnd', runOnce)
//     this.addEventListener('mozTransitionEnd', runOnce)
//     this.addEventListener('oTransitionEnd', runOnce)
//     this.addEventListener('transitionend', runOnce)
//     this.addEventListener('transitionend', runOnce)
//     if ((prefixTransition == '' && !('transition' in s)) || getComputedStyle(this)[prefixTransition + 'transition-duration'] == '0s') callback()
//     return this
//   }
// }(document, window, 0))
