
export function zoomWave (state, action) {

  let STATE = Object.assign({}, state)

  if (STATE.wave.zoom >= 38 && STATE.wave.zoom < 75) {
    STATE.wave.zoom += action.deltaY
  }

  else if (STATE.wave.zoom <= 37) {
    STATE.wave.zoom = 38
  }

  else if (STATE.wave.zoom >= 75) {
    STATE.wave.zoom = 74
  }

  return STATE
}



export function audioProgress(state, action) {
  let dotPos = String(action.time).search(/\./g)
  let time = parseFloat(String(action.time).substring(0, dotPos + 1))

  // Hours, minutes and seconds
  let hrs = ~~(time / 3600)
  let mins = ~~((time % 3600) / 60)
  let secs = time % 60

  // return the format time such as 00:00:00
  let getTimeFormat = () => {
    return `${mins}:${secs}`
  }

  let STATE = Object.assign({}, state, {
    time : getTimeFormat()
  })
  return STATE
}
