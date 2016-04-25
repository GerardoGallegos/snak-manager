import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

import STORE from '../../../store/snak-store'
import {  showPreview, changeSyntax } from '../../../actions/snak-actions'
import { optionsCode, optionsImage } from './tools-config'

import RockSelect from '../../Commons/RockSelect'

import styles from './Topbar.scss'


class Topbar extends Component {
  constructor(props){
    super(props)
    const METHODS = [
      'consoleStade',
      'logJson',
      'showPrev',
      'showToolOptions',
      'changeCodeSyntax'
    ]

    METHODS.forEach(method => {
      this[method] = this[method].bind(this)
    })
    this.optionTool = optionsCode

  }

  consoleStade() {
    console.log(STORE.getState())
  }

  logJson() {
    console.log(JSON.stringify(STORE.getState()))
  }

  showPrev() {
    this.props.dispatch(showPreview())
  }

  run(e){
    console.log(e.target.value)
  }


  changeCodeSyntax(syntax) {
    console.log('CODE SYNTAX ' + syntax)
    this.props.dispatch(changeSyntax(this.props.state.regionInFocus, syntax))
  }

  changeCodeEffect(e) {
    alert()
    console.log( 'Code Effects ' + e.target.value)
  }

  changeCodeSpeed(e) {
    console.log( ' CODE SPEED ' + e.target.value)
  }

  changeCodeSize(e) {
    console.log( 'CODE SIZE ' + e.target.value)
  }

  showToolOptions() {
    const TYPE = this.props.state.regionInFocus.type

    switch (TYPE) {
      case 'code':
        //const CLASS = "ToolsPanel slideTop-in"
        console.log(this.props.state.regionInFocus.code.fileType)
        return (
          <div className="ToolsPanel slideTop-in">
              <RockSelect
                  defaultValue ={this.props.state.regionInFocus.code.fileType}
                  iconClass="icon-code"
                  options={['javascript', 'css', 'html']}
                  generalClick={(syntax)=>{this.changeCodeSyntax(syntax)}}
              />
          </div>
        )
        break

      case 'image':
        return (
          <div className="ToolsPanel slideTop-in">
              <RockSelect
                  defaultValue = 'Effects'
                  iconClass="icon-image"
                  options={['Effects', 'FX', 'DDS']}
                  generalClick={(syntax)=>{console.log(syntax)}}
              />
              <RockSelect
                  defaultValue = 'Effects'
                  iconClass="icon-image"
                  options={['Effects', 'FX', 'DDS']}
                  generalClick={(syntax)=>{console.log(syntax)}}
              />
              <RockSelect
                  defaultValue = 'Effects'
                  iconClass="icon-image"
                  options={['Effects', 'FX', 'DDS']}
                  generalClick={(syntax)=>{console.log(syntax)}}
              />
          </div>
          )
          break
      default:
    }
  }

  render() {

    return(
      <div className="Topbar">
        <button onClick={ this.consoleStade }>DEBUG STATE *</button>
        <button onClick={ this.logJson }>DEBUG JSON</button>
        <button onClick={ this.showPrev }>SHOW PREVIEW</button>
        {
          this.showToolOptions()
        }
        <span className="Topbar__timer" id="timer"></span>
        <span className="Topbar__timer">{this.props.state.wave.zoom}</span>
      </div>
    )
  }
}


function mapStateToProps(state, props) {
  return {
    state : state.snak
  }
}

export default connect(mapStateToProps)(Topbar)
