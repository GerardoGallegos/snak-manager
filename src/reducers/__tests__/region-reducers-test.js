jest.disableAutomock()

import Reducers from '../index'
import STORE from '../../store/snak-store'
import * as ACTIONS from '../../actions/snak-actions'
import { REGION_TEST } from './helpers'


describe('Reducers', ()=>{

  it('Should add Region Reducer', ()=>{
    // Initial State
    expect(STORE.getState().snak.runList.length).toEqual(0)
    // Add Regions
    STORE.dispatch(ACTIONS.addRegion(REGION_TEST.IMAGE))
    STORE.dispatch(ACTIONS.addRegion(REGION_TEST.CODE))
    STORE.dispatch(ACTIONS.addRegion(REGION_TEST.INSTRUCTIONS))
    // Three Regions added
    expect(STORE.getState().snak.runList.length).toEqual(3)
    // expects
    expect(STORE.getState().snak.runList[0]).toEqual(REGION_TEST.IMAGE)
    expect(STORE.getState().snak.runList[1]).toEqual(REGION_TEST.CODE)
    expect(STORE.getState().snak.runList[2]).toEqual(REGION_TEST.INSTRUCTIONS)

  })


  it('Should click Region', ()=>{

    // Initial State Three Regions it's added for previous test
    expect(STORE.getState().snak.runList.length).toEqual(3)
    expect(STORE.getState().snak.regionInFocus.type).toEqual('default')

    // click in instructions
    STORE.dispatch(ACTIONS.clickRegion(REGION_TEST.INSTRUCTIONS))
    expect(STORE.getState().snak.regionInFocus.type).toEqual('instructions')

    // click in code
    STORE.dispatch(ACTIONS.clickRegion(REGION_TEST.CODE))
    expect(STORE.getState().snak.regionInFocus.type).toEqual('code')

    // click in image
    STORE.dispatch(ACTIONS.clickRegion(REGION_TEST.IMAGE))
    expect(STORE.getState().snak.regionInFocus.type).toEqual('image')

  })

  it('Shoud drag Region', ()=>{
    // Initial State Three Regions it's added for previous test
    expect(STORE.getState().snak.runList.length).toEqual(3)
    expect(STORE.getState().snak.regionInFocus.type).toEqual('image')

    // drag region code
    STORE.dispatch(ACTIONS.clickRegion(REGION_TEST.CODE))
    STORE.dispatch(ACTIONS.dragRegion(REGION_TEST.CODE))
    expect(STORE.getState().snak.regionInFocus.type).toEqual('code')

  })

})
