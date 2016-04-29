/** This function return the % progressBar and the time, calculated in base to window's width
 * @method getProgress
 * @param  {Object} event -Event dispatcher
 * @param  {Number} duration - Duration of audio
 * @return {Object} { progress : Number, time : Number }
 */

export default function (event, duration) {
  const progressBar = (event.clientX  * 100) / window.innerWidth
  const time =  Math.round( ((duration * ((event.clientX  * 100) / window.innerWidth))) / 100 )

  return {
    progress : progressBar,
    time : time
  }
}
