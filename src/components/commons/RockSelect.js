import React, { Component, PropTypes } from 'react'
import './RockSelect.scss'

export default class RockSelect extends Component {
  constructor(props) {
    super(props)

    const METHODS = [
      'toggleOptions',
      'onClickOption',
      'initOption'
    ]

    METHODS.forEach(method => {
      this[method] = this[method].bind(this)
    })

    // Default class
    this.CLASS_ALIAS = this.props.classAlias ? this.props.classAlias : 'RockMenu'

  }

  // Show and hide Options
  toggleOptions(){
    if(this.optionsVisible.display === 'none') {
      this.optionsVisible = {
        display : 'block'
      }
      this.classes.option = `${this.CLASS_ALIAS}__option ${this.CLASS_ALIAS}__option-animaIn`
      this.classes.selected = `${this.CLASS_ALIAS}__selected-active`
    }
    else {
      this.optionsVisible = {
        display : 'none'
      }
      this.classes.selected = `${this.CLASS_ALIAS}__selected`
    }
    this.forceUpdate()
  }

  // Hide Options
  hideOptions() {
    this.optionsVisible = {
      display: 'none'
    }
    this.classes.selected = `${this.CLASS_ALIAS}__selected`
    this.forceUpdate()
  }


  componentWillMount() {
    this.initOption()
    this.classes = {
      selected : `${this.CLASS_ALIAS}__selected`,
      option : `${this.CLASS_ALIAS}__option ${this.CLASS_ALIAS}__option-animaIn`
    }
    this.optionsVisible = {
      display : 'none'
    }
  }

  initOption(){
    // Set Default Select
    if(this.props.defaultValue) {
      this.optionSelected = this.props.defaultValue
    }
    // String Take the first element
    else if(typeof this.props.options[0] === 'string') {
      this.optionSelected = this.props.options[0]
    }
    // Object Take the first text from value key
    else if(typeof this.props.options[0] === 'object') {
      this.optionSelected = this.props.options[0].value
    }
  }

  // Trigger the click event
  onClickOption(event) {
    this.optionSelected = event.target.textContent
    this.classes.option = `${this.CLASS_ALIAS}__option`
    this.classes.selected = `${this.CLASS_ALIAS}__selected`

    // If generalClick Exist in the props
    if(typeof this.props.options[0] === 'string') {
      if(this.props.generalClick) {
        this.props.generalClick(event.target.textContent)
      }
    }
    else if(typeof this.props.options[0] === 'object') {

      // Iterate in the options list an Call the click key
      this.props.options.map((option) => {
        if (option.value === event.target.textContent) {
          option.click(event.target.textContent)
        }
      })
    }

    this.hideOptions()
    this.forceUpdate()
  }

 //  Renderice the options according to the context String Object in the List
  renderOptions(){
    if(typeof this.props.options[0] === 'string') {
      return (
        this.props.options.map((option)=>{
          return (
            <div key={option} className={this.classes.option} >
              <div  onClick={this.onClickOption} className={`${this.CLASS_ALIAS}__option__name`}>{option}</div>
            </div>
          )
        })
      )
    }

    else if(typeof this.props.options[0] === 'object') {
      return (
        this.props.options.map((option)=>{
          return (
            <div key={option.value} className={this.classes.option} >
              <div  onClick={this.onClickOption} className={`${this.CLASS_ALIAS}__option__name`}>{option.value}</div>
            </div>
          )
        })
      )
    }
  }

 // Update in every update default Value, avoid conflict with multiples RockSelects
  componentWillReceiveProps(nextProps) {
    if(nextProps.defaultValue !== this.props.defaultValue) {
      this.optionSelected = nextProps.defaultValue
      this.forceUpdate()
      console.log(this.optionSelected)
    }
  }

  render(){
    const ICON = this.props.iconClass ? `${this.CLASS_ALIAS}__selected__ico ${this.props.iconClass}` : `${this.CLASS_ALIAS}__selected__ico`
    return(
      <div className={`${this.CLASS_ALIAS}`}>
       <div className={`${this.CLASS_ALIAS}__line`}></div>
        <div className={this.classes.selected} onClick={this.toggleOptions}>
          <div className={ ICON }></div>
          <div className={`${this.CLASS_ALIAS}__selected__name`}>{this.optionSelected}</div>
        </div>
        <div  style={this.optionsVisible} >
          {
            this.renderOptions()
          }
        </div>
      </div>
    )
  }
}

// Add the proptypes

RockSelect.propTypes = {
  options : PropTypes.array.isRequired,
  defaultValue : PropTypes.string,
  generalClick : PropTypes.func,
  iconClass : PropTypes.string,
  classAlias : PropTypes.string,
}
