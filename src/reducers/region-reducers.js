import { setOrderList } from '../util/util'


//  'ADD_REGION' action.regionType ( code  | instructions | image )
//   Adds new Region to the RunList's Array
export function addRegion (state, action) {
  const STATE = Object.assign({}, state)
  STATE.runList.push(action.regionData)
  return STATE
}

// 'DRAG_REGION'
export function dragRegion (state, action) {
  const STATE = Object.assign({}, state)
  // Iterates in the Array to search the regionId position
  for(let i=0; i<STATE.runList.length; i++) {
    if(STATE.runList[i].regionId === action.regionData.regionId) {
      // Update item
      STATE.runList[i] = Object.assign({}, STATE.runList[i], {
        from : action.regionData.from,
        to : action.regionData.to,
        active : true
      })
      // If apply, update the regionInFocus [ BUGG ]
      if(STATE.runList[i].regionId === STATE.regionInFocus.regionId) {
        STATE.regionInFocus = STATE.runList[i]
      }
    }
    else {
      STATE.runList[i].active = false
    }
  }

  // Orders Array in the actual state
  setOrderList(STATE.runList)

  return STATE
}

// 'CLICK_REGION'
export function clickRegion (state, action) {
  const STATE = Object.assign({}, state)
  // Iterates in the Array to search the regionId position
  for(let i=0; i<STATE.runList.length; i++) {
    if(STATE.runList[i].regionId === action.regionData.regionId) {
      // Active ELement
      STATE.runList[i].active = true
      // Update the regionInFocus
      STATE.regionInFocus = STATE.runList[i]
    }
    else {
      STATE.runList[i].active = false
    }
  }

  // Orders Array in the actual state
  setOrderList(STATE.runList)

  return STATE
}
