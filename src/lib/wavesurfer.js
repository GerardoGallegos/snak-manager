import WaveSurfer from 'wavesurfer.js'
import WaveSurferRegions from './wavesurfer.regions.js'
import Minimap from './wavesurfer.minimap.js'
import Mousetrap from 'mousetrap'
import Hamster from 'hamsterjs'
WaveSurferRegions(WaveSurfer)
Minimap(WaveSurfer)


import { zoomWave } from '../actions/snak-actions'
import storage from '../store/snak-store'

export default function (id) {
  const ID = id
  let timer = document.getElementById('timer')

  const WAVESURFER = WaveSurfer.create({
    container: '#' + ID,
    waveColor: '#1AE6C1',
    progressColor: '#49F7D7',
    cursorWidth: 2,
    cursorColor: '#FFF',
    hideScrollbar: true,
    autoCenter : false,
    height: 100
  })

  WAVESURFER.load(storage.getState().snak.wave.audioSource)

  WAVESURFER.on('audioprocess', (time) => {
    timer.textContent = String(time).substring(0,5)
  })

  WAVESURFER.initMinimap({
    showRegions: true,
    showOverview: true,
    fillParent: true,
    overviewBorderColor: 'rgb(255, 255, 255)',//'rgb(68, 129, 255)',
    overviewBorderSize: 2,
    height: 35,
    backgroundColor: 'rgba(176, 176, 176, 0.317647)'//'rgba(28, 120, 200, 0.28)'
  })

  Hamster(document.getElementById(ID)).wheel((event, delta, deltaX, deltaY) => {
    WAVESURFER.zoom(storage.getState().snak.wave.zoom)
    storage.dispatch(zoomWave(deltaY))
  })

  return WAVESURFER
}
