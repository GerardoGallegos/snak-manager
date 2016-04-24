import { getBodyObj } from '../util/util'

export function updateCode(state, action) {

  const STATE = Object.assign({}, state)
  const BODYOBJ = getBodyObj(action.objData.body) //objData.body

  // Iteramos en la lista para buscar posicion de regionId
  for(let i=0; i<STATE.runList.length; i++) {
    if(STATE.runList[i].regionId === action.regionData.regionId) {
      // Elemento activo
      STATE.runList[i].active = true

      //action.regionData.type
      STATE.runList[i]['code'] = {
        title : BODYOBJ.title,
        text : BODYOBJ.body,
        body : action.objData.body,
        fileType : action.objData.fileType
      }
      // Actualizo elemento en foco [ BUGG ]
      STATE.regionInFocus = STATE.runList[i]
    }
  }

  return STATE
}






export function changeSyntax(state, action) {

  const STATE = Object.assign({}, state)

  // Iteramos en la lista para buscar posicion de regionId
  for(let i=0; i<STATE.runList.length; i++) {
    if(STATE.runList[i].regionId === action.regionData.regionId) {
      // Elemento activo
      STATE.runList[i].active = true
      //console.log(STATE.runList[i]['code'])
      //action.regionData.type
      STATE.runList[i]['code'] = {
        title : STATE.runList[i]['code'].title,
        text : STATE.runList[i]['code'].text,
        body : STATE.runList[i]['code'].body,
        fileType : action.textSyntax
      }
      // Actualizo elemento en foco [ BUGG ]
      STATE.regionInFocus = STATE.runList[i]
    }
  }

  return STATE
}
