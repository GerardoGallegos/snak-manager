import { getBodyObj } from '../util/util'

export function updateInstruction(state, action) {

  const STATE = Object.assign({}, state)
  const TEXT = action.text

  // Iterates in the Array to search the regionId position
  for(let i=0; i<STATE.runList.length; i++) {
    if(STATE.runList[i].regionId === action.regionData.regionId) {
      // Active Item
      STATE.runList[i].active = true
      // Update text in instructions
      STATE.runList[i]['instructions'] = {
        text : TEXT
      }
      // Update regionInFocus
      STATE.regionInFocus = STATE.runList[i]

    }
  }

  return STATE
}
