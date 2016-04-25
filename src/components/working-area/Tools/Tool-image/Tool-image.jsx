import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { addImage } from '../../../../actions/snak-actions'

// Components
import Dropzone from 'react-dropzone'


class ToolImage extends Component {
  constructor(props){
    super(props)
    this.onDrop = this.onDrop.bind(this)
  }

  onDrop(file) {
    console.log(file)
    this.props.dispatch(addImage(this.props.state.regionInFocus, file))
    //console.log('Received files: ', file);
    //console.log(this.props.state.regionInFocus)
  }

  render() {

    const SIZE = [
      'Small',
      'Medium',
      'Big'
    ]
    const STYLE_PREVIEW = this.props.state.regionInFocus.image.file.preview ? {display: 'block'} : {display: 'none'}
    const CLASS_DROPZONE = this.props.state.regionInFocus.image.file.preview ? 'Tools__panel-image__dropzone Tools__panel-image__dropzone-inactive' : 'Tools__panel-image__dropzone'

    const PREVIEW = this.props.state.regionInFocus.image.file.preview ? this.props.state.regionInFocus.image.file.preview : this.props.state.regionInFocus.image.file
    return (
      <div className="Tools__panel-image facewin">
          <Dropzone multiple={false} className={CLASS_DROPZONE} onDrop={this.onDrop}>
              <div style={STYLE_PREVIEW}>
                <img src={PREVIEW} className="Tools__panel-image__preview"/>
              </div>
          </Dropzone>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    state : state.snak
  }
}

export default connect(mapStateToProps)(ToolImage)
