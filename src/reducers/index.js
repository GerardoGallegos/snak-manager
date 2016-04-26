import { combineReducers } from 'redux'
import uid from 'uid'

import { audioProgress, zoomWave, zoomSleep } from './wave-reducers'
import { addRegion, dragRegion, clickRegion } from './region-reducers'
import { updateInstruction } from './instructions-reducers'
import { updateCode, changeSyntax } from './code-reducers'
import { addImage } from './image-reducers'

import { showPreview, showWorkingArea } from './preview-reducers'

const INITIALSTATE = {
  show : {
    workingArea : true,
    preview : false
  },
  wave : {
    _id : 'wave_' + uid(12),
    zoom : 38,
    time : '00:00',
  },
  runList : [],
  regionInFocus : {
    type : 'default'
  }
}

function snak(state = INITIALSTATE, action) {

  switch (action.type) {

    case 'AUDIO_PROGRESS':
      return audioProgress(state, action)

    case 'ZOOM_WAVE':
      return zoomWave(state, action)

    case 'ADD_REGION':
      return addRegion(state, action)

    case 'DRAG_REGION':
      return dragRegion(state, action)

    case 'CLICK_REGION':
      return clickRegion(state, action)

    case 'UPDATE_INSTRUCTION':
      return updateInstruction(state, action)

    case 'UPDATE_CODE':
      return updateCode(state, action)

    case 'CHANGE_SYNTAX':
        return changeSyntax(state, action)

    case 'ADD_IMAGE':
        return addImage(state, action)

    case 'SHOW_PREVIEW':
        return showPreview(state, action)

   case 'SHOW_WORKING_AREA':
        return showWorkingArea(state, action)

    default:
      return state
  }

}


const snakReducers = combineReducers({
  snak : snak
})

export default snakReducers
