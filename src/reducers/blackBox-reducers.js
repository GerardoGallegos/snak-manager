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


/**
 * @method showEditorBlackBox
 * @param   {Object} state - General state
 * @param   {Object} action - { type : String, show : Boolean }
 * @returns {Object} new State
 */
export function showEditorBlackBox (state, action) {
  const STATE = Object.assign({}, state)
  STATE.blackBox.showEditor = action.show
  return STATE
}



/**
 * @method setItemFocusBlackBox
 * @param   {Object} state - General state
 * @param   {Object} action - { type : String, data : Object }
 * @returns {Object} new State
 */
export function setItemFocusBlackBox (state, action) {
  const STATE = Object.assign({}, state)

  // Iterates in the Array to search the id position
  for(let i=0; i<STATE.blackBox.items.length; i++) {
    // find
    if(STATE.blackBox.items[i].id === action.data.id) {
      STATE.blackBox.itemInFocus = STATE.blackBox.items[i]
      i = STATE.blackBox.items.length
    }
  }
  return STATE
}


/**
 * @method editCodeBlackBox
 * @param   {Object} state - General state
 * @param   {Object} action - { type : String, data : Object } {
   body : CONTENT_TEXT,
   fileName : this.getCodeInFocus().code.fileName,
   fileType : this.getCodeInFocus().code.fileType,
   id : 'bb_' + uid(12)
 }
 * @returns {Object} new State
 */
export function editCodeBlackBox(state, action) {
  const STATE = Object.assign({}, state)

  // Iterates in the Array to search the id position
  for (let i = 0; i < STATE.blackBox.items.length; i++) {
    // find
    if (STATE.blackBox.items[i].id === action.data.id) {
      STATE.blackBox.items[i] = action.data
      STATE.blackBox.itemInFocus = STATE.blackBox.items[i]
      //i = STATE.blackBox.items.length
    }

  }
  return STATE
}
