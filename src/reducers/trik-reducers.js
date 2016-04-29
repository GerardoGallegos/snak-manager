/**
 * Set The progressBar from Trik
 * @method setProgressBar
 * @param   {Object} state - General state
 * @param   {Object} action - { type : String, progress : Number }
 * @returns {Object} new State
 */
export function setProgressBar (state, action) {
  const STATE = Object.assign({}, state)
  STATE.trik.progressBar = action.progress
  return STATE
}

/**
 * @method setTime
 * @param   {Object} state - General state
 * @param   {Object} action - { type : String, time : Number }
 * @returns {Object} new State
 */
export function setTime (state, action) {
  const STATE = Object.assign({}, state)
  STATE.trik.time = action.time
  return STATE
}

/**
 * @method showMinimap
 * @param   {Object} state - General state
 * @param   {Object} action - { type : String, show : Boolean }
 * @returns {Object} new State
 */
export function showMinimap (state, action) {
  const STATE = Object.assign({}, state)
  STATE.trik.showMinimap = action.show
  return STATE
}


/**
 * @method setPosX
 * @param   {Object} state - General state
 * @param   {Object} action - { type : String, posX : Number }
 * @returns {Object} new State
 */
export function setPosX (state, action) {
  const STATE = Object.assign({}, state)
  STATE.trik.posX = action.posX
  return STATE
}


/**
 * @method setDuration
 * @param   {Object} state - General state
 * @param   {Object} action - { type : String, duration : Number }
 * @returns {Object} new State
 */
export function setDuration (state, action) {
  const STATE = Object.assign({}, state)
  STATE.trik.duration = action.duration
  return STATE
}


/**
 * @method setAudioStatus
 * @param   {Object} state - General state
 * @param   {Object} action - { type : String, audioStatus : String }
 * @returns {Object} new State
 */
export function setAudioStatus (state, action) {
  const STATE = Object.assign({}, state)
  STATE.trik.audio_status = action.audioStatus
  return STATE
}
