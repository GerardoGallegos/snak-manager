import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

// styles
import './Code.scss'

// Editor ACE
import brace from 'brace'
import AceEditor from './react-ace.jsx'
import 'brace/mode/javascript'
import 'brace/mode/css'
import 'brace/mode/html'
import 'brace/theme/monokai'


class CodeClient extends Component {
  constructor(props){
    super(props)
  }

  getFileIco (fileType) {
    switch(fileType){
    case 'javascript':
      return 'JS'
      break

    case 'html':
      return '</>'
      break

    case 'css':
      return '#'
      break

    default:
      return 'File'
    }
  }

  render() {

    return (
      <div className="Code-panel">
        <div className="Code-panel__top">
          <div className='Code-panel__top__ball Code_color-pink'></div>
          <div className='Code-panel__top__ball Code_color-orange'></div>
          <div className='Code-panel__top__ball Code_color-purple'></div>
          <span className="Code-panel__top__fileName">
            { this.props.code.fileName }
            <span className={`Code-panel__top__fileIco color-${this.props.code.fileType}`}>
              { this.getFileIco(this.props.code.fileType) }
            </span>
          </span>
        </div>
        <div className="Code-panel__code">
          <AceEditor
            showGutter={false}
            mode={this.props.code.fileType}
            theme="monokai"
            name="AceCodeEditorClient"
            fontSize={20}
            width="100%"
            height="90%"
            value={this.props.code.text}
            editorProps={
              {
                $blockScrolling: true,
                mode: 'javascript'
              }
            }
            enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
          />
        </div>
      </div>
    )
  }
}


export default CodeClient
