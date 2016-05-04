import ace from 'brace'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// styles
import '../../../../assets/icons/icons.scss'
import './Editor-code.scss'

// actions
import {
  showEditorBlackBox,
  editCodeBlackBox,
  deleteItemBlackBox
} from '../../../actions/snak-actions'

import EditorCode from 'react-ace'


class ReactAce extends Component {
  constructor(props) {
    super(props);
    [
      'hideEditor',
      'onChangeCode',
      'deleteItemBlackBox',
      'getFileIco'
    ]
    .forEach(method => {
      this[method] = this[method].bind(this)
    })
  }

  hideEditor() {
    this.props.dispatch(showEditorBlackBox(false))
  }

  onChangeCode(newCodeValue){
    this.props.dispatch(editCodeBlackBox({
      body : newCodeValue,
      fileName : this.props.state.blackBox.itemInFocus.fileName,
      fileType : this.props.state.blackBox.itemInFocus.fileType,
      id : this.props.state.blackBox.itemInFocus.id
    }))
  }

  deleteItemBlackBox() {
    this.props.dispatch(deleteItemBlackBox(this.props.state.blackBox.itemInFocus))
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
    const { name, className, width, height } = this.props
    const divStyle = { width, height }
    const CLASE_EDITOR = this.props.state.blackBox.showEditor ? 'EditorCode EditorCode-show' : 'EditorCode'
    const MODE = this.props.state.blackBox.itemInFocus.fileType ? this.props.state.blackBox.itemInFocus.fileType : 'javascript'
    const VALUE = this.props.state.blackBox.itemInFocus.body ? this.props.state.blackBox.itemInFocus.body : ''

    return (
      <div className={ CLASE_EDITOR }>
        <div className="EditorCode__bg"></div>
        <div className="EditorCode__tools">
          <div onClick={ this.deleteItemBlackBox } className="EditorCode__tools__button icon-delete"></div>
          <span className="EditorCode__tools__fileName">{ this.props.state.blackBox.itemInFocus.fileName }</span>
          <span className="EditorCode__tools__fileName">{ this.props.state.blackBox.itemInFocus.fileType }
            <span className={`color-${this.props.state.blackBox.itemInFocus.fileType}`}>
              { this.getFileIco(this.props.state.blackBox.itemInFocus.fileType) }
            </span>
          </span>
          <div onClick={ this.hideEditor } className="EditorCode__tools__button icon-exit"></div>

        </div>
        <EditorCode
            onChange={ this.onChangeCode }
            showGutter={false}
            mode={MODE}
            theme="monokai"
            name="AceCodeEditorClient_blackBox"
            fontSize={17}
            height="100%"
            width="100%"
            value={this.props.state.blackBox.itemInFocus.body}
            editorProps={
              {
                $blockScrolling: true,
                mode: 'javascript'
              }
            }
        />
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    state : state.snak
  }
}

export { ReactAce }
export default connect(mapStateToProps)(ReactAce)
