jest.disableAutomock()

import Reducers from '../index'
import STORE from '../../store/snak-store'
import * as ACTIONS from '../../actions/snak-actions'
import { REGION_TEST } from './helpers'


describe('Reducers', ()=>{

  it('Should add Image[region]', ()=>{
    // Initial State
    expect(STORE.getState().snak.runList.length).toEqual(0)
    // Add Regions instructions
    STORE.dispatch(ACTIONS.addRegion(REGION_TEST.INSTRUCTIONS))

    // expect
    expect(STORE.getState().snak.runList.length).toEqual(1)
    expect(STORE.getState().snak.runList[0].instructions.text).toEqual(REGION_TEST.INSTRUCTIONS.instructions.text)

    // dispatch updateInstruction
    const EXPECT_NEW_TEXT = 'The new asome text!'

    STORE.dispatch(ACTIONS.updateInstruction(REGION_TEST.INSTRUCTIONS, EXPECT_NEW_TEXT))
    expect(STORE.getState().snak.runList[0].instructions.text).toEqual(EXPECT_NEW_TEXT)

  })

})
