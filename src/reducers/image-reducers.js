// 'ADD_IMAGE'

export function addImage(state, action) {

  const STATE = Object.assign({}, state)

  // Iterates in the Array to search the regionId position
  for(let i=0; i<STATE.runList.length; i++) {
    if(STATE.runList[i].regionId === action.regionData.regionId) {
      // Active Element
      // Add or update image
      STATE.runList[i]['image'] = {
        source :  action.objData[0].preview,
        size: action.objData[0].size,
        type: action.objData[0].type,
      }
      // Update regionInFocus
      STATE.regionInFocus = STATE.runList[i]

    }
  }

  return STATE
}
