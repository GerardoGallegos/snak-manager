import ace from 'brace'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// styles
import './Editor-code.scss'
// actions
import {
  showEditorBlackBox
} from '../../../actions/snak-actions'


const editorOptions = [
  'minLines',
  'maxLines',
  'readOnly',
  'highlightActiveLine',
  'tabSize',
  'enableBasicAutocompletion',
  'enableLiveAutocompletion',
  'enableSnippets '
]

class ReactAce extends Component {
  constructor(props) {
    super(props);
    [
      'onChange',
      'onFocus',
      'hideEditor'
    ]
    .forEach(method => {
      this[method] = this[method].bind(this)
    })
  }

  componentDidMount() {
    const {
      name,
      onBeforeLoad,
      mode,
      theme,
      fontSize,
      value,
      cursorStart,
      showGutter,
      wrapEnabled,
      showPrintMargin,
      onLoad,
      commands,
    } = this.props

    this.editor = ace.edit(name)
    const PROPS = this.props

    this.editor.$mouseHandler.drag = function(e) {

      this.cancelDrag = false
      var editor = this.editor
      var target = this.editor.container
      target.draggable = true
      this.editor.renderer.$cursorLayer.setBlinking(false)
      this.editor.setStyle('ace_dragging')
      // DRAG START

      target.addEventListener('dragend', (e)=>{
        // DRAG END
        // Handle dragend
        //PROPS.dispatch(showBlackBox(false))
      }, false)

      target.addEventListener('dragstart', (e)=>{
        // Handle dragstart
        // DRAGSTART
        // Create custom image drag only for testing
        const IMG = document.createElement('img')
        IMG.src = '/assets/img/trik/code.svg'
        IMG.style.width = '50px'
        e.dataTransfer.setDragImage(IMG, 0, 0)
      }, false)

    }


    const editorProps = Object.keys(this.props.editorProps)
    for (let i = 0; i < editorProps.length; i++) {
      this.editor[editorProps[i]] = this.props.editorProps[editorProps[i]]
    }

    this.editor.getSession().setMode(`ace/mode/${mode}`)
    this.editor.setTheme(`ace/theme/${theme}`)
    this.editor.setFontSize(fontSize)
    this.editor.setValue(value, cursorStart)
    this.editor.renderer.setShowGutter(showGutter)
    this.editor.getSession().setUseWrapMode(wrapEnabled)
    this.editor.setShowPrintMargin(showPrintMargin)
    this.editor.on('focus', this.onFocus)
    this.editor.on('change', this.onChange)

    for (let i = 0; i < editorOptions.length; i++) {
      const option = editorOptions[i]
      this.editor.setOption(option, this.props[option])
    }

  }

  componentWillReceiveProps(nextProps) {
    const oldProps = this.props

    for (let i = 0; i < editorOptions.length; i++) {
      const option = editorOptions[i]
      if (nextProps[option] !== oldProps[option]) {
        this.editor.setOption(option, nextProps[option])
      }
    }

    if (nextProps.mode !== oldProps.mode) {
      this.editor.getSession().setMode('ace/mode/' + nextProps.mode)
    }
    if (nextProps.theme !== oldProps.theme) {
      this.editor.setTheme('ace/theme/' + nextProps.theme)
    }
    if (nextProps.fontSize !== oldProps.fontSize) {
      this.editor.setFontSize(nextProps.fontSize)
    }
    if (nextProps.wrapEnabled !== oldProps.wrapEnabled) {
      this.editor.getSession().setUseWrapMode(nextProps.wrapEnabled)
    }
    if (nextProps.showPrintMargin !== oldProps.showPrintMargin) {
      this.editor.setShowPrintMargin(nextProps.showPrintMargin)
    }
    if (nextProps.showGutter !== oldProps.showGutter) {
      this.editor.renderer.setShowGutter(nextProps.showGutter)
    }
    if (this.editor.getValue() !== nextProps.value) {
      // editor.setValue is a synchronous function call, change event is emitted before setValue return.
      this.silent = true
      this.editor.setValue(nextProps.value, nextProps.cursorStart)
      this.silent = false
    }
  }

  componentWillUnmount() {
    this.editor.destroy()
    this.editor = null
  }

  onChange() {
    if (this.props.onChange && !this.silent) {
      const value = this.editor.getValue()
      this.props.onChange(value)
    }
  }

  onFocus() {
    if (this.props.onFocus) {
      this.props.onFocus()
    }
  }

  hideEditor() {
    this.props.dispatch(showEditorBlackBox(false))
  }


  render() {
    const { name, className, width, height } = this.props
    const divStyle = { width, height }
    const CLASE_EDITOR = this.props.state.blackBox.showEditor ? 'EditorCode EditorCode-show' : 'EditorCode'
    return (
      <div className={CLASE_EDITOR}>
        <div className="EditorCode__bg"></div>
        <div className="EditorCode__tools">
          <button>Delete</button>
          <span >{ this.props.state.blackBox.itemInFocus.fileName }</span>
          <button>{ this.props.state.blackBox.itemInFocus.fileType }</button>
          <button onClick={ this.hideEditor }>X</button>
        </div>
        <div
          id={name}
          className='EditorCode__code'
          style={divStyle}
        >
        </div>
      </div>
    )
  }
}

ReactAce.propTypes = {
  mode: PropTypes.string,
  theme: PropTypes.string,
  name: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  fontSize: PropTypes.number,
  showGutter: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.string,
  maxLines: PropTypes.number,
}

ReactAce.defaultProps = {
  name: 'brace-editor',
  mode: '',
  theme: '',
  height: '500px',
  width: '500px',
  value: '',
  fontSize: 12,
  showGutter: true,
  onChange: null,
}


function mapStateToProps(state, props) {
  return {
    state : state.snak
  }
}

export { ReactAce }
export default connect(mapStateToProps)(ReactAce)
