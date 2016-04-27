import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'

// styles
import './Code.scss'

// Editor ACE
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/mode/css'
import 'brace/mode/html'
import 'brace/theme/monokai'


class CodeClient extends Component {
  constructor(props){
    super(props)
    this.onChangeCode = this.onChangeCode.bind(this)
  }

  onChangeCode(newCodeValue){
    // Action to do
  }

  render() {

    return (
      <div className="Code-panel">
        <div className="Code-panel__top">
          <div className='Code-panel__top__ball'></div>
          <div className='Code-panel__top__ball'></div>
          <div className='Code-panel__top__ball'></div>
          <span className="Code-panel__top__fileName">
            { this.props.code.fileName }
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
