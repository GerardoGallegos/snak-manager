jest.disableAutomock()

import Reducers from '../index'
import STORE from '../../store/snak-store'
import * as ACTIONS from '../../actions/snak-actions'
import { REGION_TEST } from './helpers'


describe('Reducers', ()=>{

  it('Should add Image[region]', ()=>{
    // Initial State
    expect(STORE.getState().snak.runList.length).toEqual(0)
    // Add Regions code
    STORE.dispatch(ACTIONS.addRegion(REGION_TEST.IMAGE))

    const FAKE_IMG_ARR = ['file']
    // Add Image
    STORE.dispatch(ACTIONS.addImage(REGION_TEST.IMAGE, FAKE_IMG_ARR))
    // expect
    expect(STORE.getState().snak.runList.length).toEqual(1)
    expect(STORE.getState().snak.runList[0].image.file).toEqual('file')
  })

})
