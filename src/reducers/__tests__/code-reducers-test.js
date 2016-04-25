jest.disableAutomock()

import Reducers from '../index'
import STORE from '../../store/snak-store'
import * as ACTIONS from '../../actions/snak-actions'
import { REGION_TEST } from './helpers'


describe('Reducers', ()=>{

  it('Should Change code Region', ()=>{
    // Initial State
    expect(STORE.getState().snak.runList.length).toEqual(0)
    // Add Regions code
    STORE.dispatch(ACTIONS.addRegion(REGION_TEST.CODE))
    // expect
    expect(STORE.getState().snak.runList.length).toEqual(1)
    expect(STORE.getState().snak.runList[0].code.text).toEqual('let name = "snak cool"')
    expect(STORE.getState().snak.runList[0].code.fileType).toEqual('javascript')

    // Ation updateCode
    const CODE_EXPECT = {
      body : '<h1>Hello World!</h1>',
      fileType : 'html'
    }

    STORE.dispatch(ACTIONS.updateCode(REGION_TEST.CODE, CODE_EXPECT))

    expect(STORE.getState().snak.runList[0].code.text).toEqual('<h1>Hello World!</h1>')
    expect(STORE.getState().snak.runList[0].code.fileType).toEqual('html')

  })

  it('Should change Syntax', ()=>{

    // The syntax is html for previus test
    expect(STORE.getState().snak.runList[0].code.fileType).toEqual('html')

    // Dispatch action changeSyntax
    STORE.dispatch(ACTIONS.changeSyntax(REGION_TEST.CODE, 'javascript'))

    // Now the syntax should be javascript
    expect(STORE.getState().snak.runList[0].code.fileType).toEqual('javascript')

  })

})
