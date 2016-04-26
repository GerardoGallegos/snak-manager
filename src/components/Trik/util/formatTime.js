/*
 * formatTime - Export strings in format time
 * @params {Number} seconds - Number of sectonds example: 125
 * @return {String} example 01:32
*/
export default function (seconds) {
  const hrs = ~~(seconds / 3600)
  const mins = ~~((seconds % 3600) / 60)
  const secs = seconds % 60

  if(secs<10) {
    return `${mins}:0${secs}`
  }
  else {
    return `${mins}:${secs}`
  }
}
