import { getBodyObj } from '../util/util'

export function updateInstruction(state, action) {

  const STATE = Object.assign({}, state)
  const BODYOBJ = getBodyObj(action.text)

  // Iteramos en la lista para buscar posicion de regionId
  for(let i=0; i<STATE.runList.length; i++) {
    if(STATE.runList[i].regionId === action.regionData.regionId) {
      // Elemento activo
      STATE.runList[i].active = true
      //action.regionData.type
      STATE.runList[i]['instructions'] = {
        title : BODYOBJ.title,
        text : BODYOBJ.body,
        body : action.text
      }
      // Actualizo elemento en foco [ BUGG ]
      STATE.regionInFocus = STATE.runList[i]

    }
  }

  return STATE
}
