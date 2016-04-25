// 'ADD_IMAGE'
// param {action} Object - regionData, objData{ flag : String, file : FileDataObj }
//


export function addImage(state, action) {

  const STATE = Object.assign({}, state)

  // Iteramos en la lista para buscar posicion de regionId
  for(let i=0; i<STATE.runList.length; i++) {
    if(STATE.runList[i].regionId === action.regionData.regionId) {
      // Elemento activo
      // STATE.runList[i].active = true
      // action.regionData.type
      // console.log('FILE', action.objData[0])
      STATE.runList[i]['image'] = {
        file :  action.objData[0]
      }
      // Actualizo elemento en foco [ BUGG ]
      STATE.regionInFocus = STATE.runList[i]

    }
  }

  return STATE
}
