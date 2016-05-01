export function audioProgress(time) {
  return {
    type: 'AUDIO_PROGRESS',
    time : time
  }
}

// REGION ACCTIONS
export function addRegion(regionData) {
  return {
    type: 'ADD_REGION',
    regionData : regionData
  }
}

export function clickRegion(regionData) {
  return {
    type: 'CLICK_REGION',
    regionData : regionData
  }
}

export function dragRegion(regionData) {
  return {
    type: 'DRAG_REGION',
    regionData : regionData
  }
}

export function zoomWave(deltaY) {
  return {
    type: 'ZOOM_WAVE',
    deltaY : deltaY
  }
}

export function updateInstruction(regionData, text) {
  return {
    type: 'UPDATE_INSTRUCTION',
    regionData : regionData,
    text : text
  }
}


export function updateCode(regionData, objData) {
  return {
    type: 'UPDATE_CODE',
    regionData : regionData,
    objData : objData
  }
}

export function changeSyntax(regionData, textSyntax) {
  return {
    type: 'CHANGE_SYNTAX',
    regionData : regionData,
    textSyntax : textSyntax
  }
}

// IMAGES ACTIONS

export function addImage(regionData, file) {
  return {
    type: 'ADD_IMAGE',
    regionData : regionData,
    objData : file
  }
}


/*  PREVIEW WORKING AREA
*********************************/
export function showPreview() {
  return {
    type: 'SHOW_PREVIEW'
  }
}

export function showWorkingArea() {
  return {
    type: 'SHOW_WORKING_AREA'
  }
}



/*   TRIK
*******************************/
export function setProgressBar(progress) {
  return {
    type: 'SET_PROGRESS_BAR',
    progress : progress
  }
}

export function setTime(time) {
  return {
    type: 'SET_TIME',
    time : time
  }
}

export function setDuration(num) {
  return {
    type: 'SET_DURATION',
    duration : num
  }
}

export function showMinimap(bool) {
  return {
    type: 'SHOW_MINIMAP',
    show : bool
  }
}

export function setPosX(num) {
  return {
    type: 'SET_POSX',
    posX : num
  }
}

export function setAudioStatus(audioStatus) {
  return {
    type: 'SET_AUDIO_STATUS',
    audioStatus : audioStatus
  }
}


/*   BlackBox
*******************************/

export function showBlackBox(bool) {
  return {
    type: 'SHOW_BLACKBOX',
    show : bool
  }
}

export function addItemBlackBox(data) {
  return {
    type: 'ADD_ITEM_BLACKBOX',
    data : data
  }
}

export function deleteItemBlackBox(data) {
  return {
    type: 'DELETE_ITEM_BLACKBOX',
    data : data
  }
}
