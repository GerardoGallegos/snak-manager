jest.disableAutomock()

import React, { Component } from 'react'
import { shallow, mount, render  } from 'enzyme'
import ConnectTopbar, { Topbar } from '../Topbar.jsx'

import STORE from '../../../../store/snak-store'
import { clickRegion, addRegion } from '../../../../actions/snak-actions'


describe('Component <Topbar />', () => {

  let topbar_componentConnect

  beforeEach(()=> {
    topbar_componentConnect = mount(
      <ConnectTopbar store={STORE}/>
    )
  })

  it('Render Component' , () => {
    expect(topbar_componentConnect.hasClass('Topbar'))
  })

  it('Initial State', ()=>{
    expect(topbar_componentConnect.props().store.getState().snak.regionInFocus.type).toEqual('default')
    expect(topbar_componentConnect.props().store.getState().snak.wave.zoom).toEqual(38)
    expect(topbar_componentConnect.props().store.getState().snak.runList).toEqual([])
  })

})
