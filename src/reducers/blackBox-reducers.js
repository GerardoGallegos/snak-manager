/**
 * @method showBlackBox
 * @param   {Object} state - General state
 * @param   {Object} action - { type : String, show : Boolean }
 * @returns {Object} new State
 */
export function showBlackBox (state, action) {
  const STATE = Object.assign({}, state)
  STATE.blackBox.show = action.show
  return STATE
}

/**
 * @method addItemBlackBox
 * @param   {Object} state - General state
 * @param   {Object} action - { type : String, data : Object }
 * @returns {Object} new State
 */
export function addItemBlackBox (state, action) {
  const STATE = Object.assign({}, state)
  STATE.blackBox.items.push(action.data)
  return STATE
}

/**
 * @method deleteItemBlackBox
 * @param   {Object} state - General state
 * @param   {Object} action - { type : String, data : Object }
 * @returns {Object} new State
 */
export function deleteItemBlackBox (state, action) {
  const STATE = Object.assign({}, state)

  // Iterates in the Array for search the id to remove
  for(let i=0; i<STATE.blackBox.items.length; i++) {
    if(STATE.blackBox.items[i].id === action.data.id) {
      // Remove the item
      STATE.blackBox.items.splice(i, 1)
      // exit to Iterate
      i = STATE.blackBox.items.length
    }
  }

  return STATE
}
