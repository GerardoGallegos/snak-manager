jest.disableAutomock()

import React, { Component } from 'react'
import { shallow, mount, render  } from 'enzyme'
import ConnectWave, { Wave } from '../Wave.jsx'

import STORE from '../../../../store/snak-store'
import { clickRegion, addRegion } from '../../../../actions/snak-actions'


describe('Component <Wave />', () => {

  let wave_componentConnect

  beforeEach(()=> {
    wave_componentConnect = shallow(
      <ConnectWave store={STORE}/>
    )
  })

  it('Render Component' , () => {
    expect(wave_componentConnect.last().text()).toEqual('<Wave />')
    expect(wave_componentConnect.hasClass('audioWave'))
  })

  it('Initial State', ()=>{
    expect(wave_componentConnect.props().store.getState().snak.regionInFocus.type).toEqual('default')
    expect(wave_componentConnect.props().store.getState().snak.wave.zoom).toEqual(38)
    expect(wave_componentConnect.props().store.getState().snak.runList).toEqual([])
  })

})
