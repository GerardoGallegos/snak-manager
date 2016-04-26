import { getBodyObj } from '../util/util'

export function updateCode(state, action) {

  const STATE = Object.assign({}, state)
  const BODYOBJ = getBodyObj(action.objData.body)

  // Iterates in the Array to search the regionId position
  for(let i=0; i<STATE.runList.length; i++) {
    if(STATE.runList[i].regionId === action.regionData.regionId) {
      // Active Item
      STATE.runList[i].active = true
      // Update Region code
      //  Examples
      // "fileName": "script.js",
      // "text": "var name"
      // "body": "/// script.js\n\nvar name"
      // "fileType": "javascript"
      STATE.runList[i]['code'] = {
        fileName : BODYOBJ.title,
        text : BODYOBJ.body,
        body : action.objData.body,
        fileType : action.objData.fileType
      }
      // Update regionInFocus
      STATE.regionInFocus = STATE.runList[i]
    }
  }

  return STATE
}



export function changeSyntax(state, action) {

  const STATE = Object.assign({}, state)

  // Iterates in the Array to search the regionId position
  for(let i=0; i<STATE.runList.length; i++) {
    if(STATE.runList[i].regionId === action.regionData.regionId) {
      // Active item
      STATE.runList[i].active = true
      // Update Syntax
      STATE.runList[i]['code'] = {
        title : STATE.runList[i]['code'].title,
        text : STATE.runList[i]['code'].text,
        body : STATE.runList[i]['code'].body,
        fileType : action.textSyntax
      }
      // Update regionInFocus
      STATE.regionInFocus = STATE.runList[i]
    }
  }

  return STATE
}
