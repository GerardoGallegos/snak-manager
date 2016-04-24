import { getBodyObj } from '../util/util'

export function showWorkingArea(state, action) {

  const STATE = Object.assign({}, state)

  STATE.show.workingArea = true
  STATE.show.preview = false

  return STATE
}


export function showPreview(state, action) {

  const STATE = Object.assign({}, state)

  STATE.show.workingArea = false
  STATE.show.preview = true

  return STATE
}
