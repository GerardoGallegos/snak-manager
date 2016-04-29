import { combineReducers } from 'redux'
import uid from 'uid'

import { audioProgress, zoomWave, zoomSleep } from './wave-reducers'
import { addRegion, dragRegion, clickRegion } from './region-reducers'
import { updateInstruction } from './instructions-reducers'
import { updateCode, changeSyntax } from './code-reducers'
import { addImage } from './image-reducers'
import { setProgressBar, setTime, showMinimap, setPosX, setDuration, setAudioStatus } from './trik-reducers'

import { showPreview, showWorkingArea } from './preview-reducers'

const INITIALSTATE = {
  show : {
    workingArea : true,
    preview : false
  },
  wave : {
    _id : 'wave_' + uid(12),
    audioSource : '/assets/audio/audio_test_02.mp3',
    zoom : 38,
    time : '00:00',
  },
  runList : [],
  regionInFocus : {
    type : 'default'
  },
  trik : {
    progressBar : 0,
    time : 0,
    showMinimap : false,
    posX : 0,
    duration : 0,
    audio_status : 'load'
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

// TRIK__________________________________
  case 'SET_PROGRESS_BAR':
    return setProgressBar(state, action)

  case 'SET_TIME':
    return setTime(state, action)

  case 'SET_DURATION':
    return setDuration(state, action)

  case 'SHOW_MINIMAP':
    return showMinimap(state, action)

  case 'SET_POSX':
    return setPosX(state, action)

  case 'SET_AUDIO_STATUS':
    return setAudioStatus(state, action)

  default:
    return state
  }

}


const snakReducers = combineReducers({
  snak : snak
})

export default snakReducers
