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
**********************/
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
