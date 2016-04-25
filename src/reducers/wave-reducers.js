
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
  const dotPos = String(action.time).search(/\./g)
  const time = parseFloat(String(action.time).substring(0, dotPos + 1))

  // Hours, minutes and seconds
  const hrs = ~~(time / 3600)
  const mins = ~~((time % 3600) / 60)
  const secs = time % 60

  // Filled to format time
  const filledMin = mins <60 ? '0' : ''
  const filledSec = secs <60 ? '0' : ''

  // return the format time such as 00:00:00
  const getTimeFormat = () => {
    return `${filledMin}${mins}:${filledSec}${secs}`
  }

  const STATE = Object.assign({}, state, {
    wave : {
      time : getTimeFormat()
    }
  })
  return STATE
}
