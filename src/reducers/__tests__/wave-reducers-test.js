jest.disableAutomock()

import Reducers from '../index'
import STORE from '../../store/snak-store'
import * as ACTIONS from '../../actions/snak-actions'
import { REGION_TEST } from './helpers'


describe('Reducers', ()=>{

  it('Should Zoom', ()=>{
    // Initial zoom
    expect(STORE.getState().snak.wave.zoom).toEqual(38)
    // Changing zoom
    STORE.dispatch(ACTIONS.zoomWave(+1))
    // expect
    expect(STORE.getState().snak.wave.zoom).toEqual(39)
    // Changing zoom
    STORE.dispatch(ACTIONS.zoomWave(-1))
    expect(STORE.getState().snak.wave.zoom).toEqual(38)
  })


  it('Should change audioProgres', ()=>{
    // Initial time
    expect(STORE.getState().snak.wave.time).toEqual('00:00')
    // Changing time
    STORE.dispatch(ACTIONS.audioProgress(125.25))
    // expect
    expect(STORE.getState().snak.wave.time).toEqual('02:05')
  })


})
