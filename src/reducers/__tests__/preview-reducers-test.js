jest.disableAutomock()

import Reducers from '../index'
import STORE from '../../store/snak-store'
import * as ACTIONS from '../../actions/snak-actions'
import { REGION_TEST } from './helpers'


describe('Reducers', ()=>{

  it('Should show workingArea', ()=>{
    // Initial State
    expect(STORE.getState().snak.show.preview).toEqual(false)
    expect(STORE.getState().snak.show.workingArea).toEqual(true)

    STORE.dispatch(ACTIONS.showPreview())
    // expect
    expect(STORE.getState().snak.show.preview).toEqual(true)
    expect(STORE.getState().snak.show.workingArea).toEqual(false)
  })

  it('Should show preview', ()=>{
    // Show preview for previus test
    STORE.dispatch(ACTIONS.showWorkingArea())
    // now show workingArea
    expect(STORE.getState().snak.show.preview).toEqual(false)
    expect(STORE.getState().snak.show.workingArea).toEqual(true)
  })

})
