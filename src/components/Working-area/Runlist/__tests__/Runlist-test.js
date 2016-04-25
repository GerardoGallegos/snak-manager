jest.disableAutomock()

import React, { Component } from 'react'
import { shallow, mount, render  } from 'enzyme'
import ConnectRunlist, { Runlist } from '../Runlist.jsx'

import STORE from '../../../../store/snak-store'
import { clickRegion, addRegion } from '../../../../actions/snak-actions'


describe('Component <Runlist />', () => {

  let runlist_componentConnect

  beforeEach(()=> {
    runlist_componentConnect = mount(
      <ConnectRunlist store={STORE}/>
    )
  })

  it('Render Component' , () => {
    expect(runlist_componentConnect.html()).toEqual('<ul class="Runlist"></ul>')
    expect(runlist_componentConnect.hasClass('Runlist'))
  })

  it('Check the initial State', ()=>{
    expect(runlist_componentConnect.props().store.getState().snak.regionInFocus.type).toEqual('default')
    expect(runlist_componentConnect.props().store.getState().snak.wave.zoom).toEqual(38)
    expect(runlist_componentConnect.props().store.getState().snak.runList).toEqual([])
    expect(runlist_componentConnect.props().store.getState().snak.runList.length).toEqual(0)
  })

  it('Change the initial state', ()=>{
    const REGION_DATA_FAKE_1 = {
      'type': 'instructions',
      'from': 7.187273370679402,
      'to': 12.187273370679403,
      'regionId': 'wn5dddi',
      'instructions': {
        'body': 'testing',
        'title': 'testing body'
      },
      'active': true
    }

    const REGION_DATA_FAKE_2 = {
      'type': 'code',
      'from': 15.13370679402,
      'to': 20.273370679403,
      'regionId': 'kx5ddde',
      'instructions': {
        'body': 'testing',
        'title': 'testing var x = "x"'
      },
      'active': true
    }

    runlist_componentConnect.props().store.dispatch(addRegion(REGION_DATA_FAKE_1))
    expect(runlist_componentConnect.props().store.getState().snak.runList).toEqual([REGION_DATA_FAKE_1])
    expect(runlist_componentConnect.props().store.getState().snak.runList.length).toEqual(1)

    runlist_componentConnect.props().store.dispatch(addRegion(REGION_DATA_FAKE_2))
    expect(runlist_componentConnect.props().store.getState().snak.runList).toEqual([REGION_DATA_FAKE_1, REGION_DATA_FAKE_2])
    expect(runlist_componentConnect.props().store.getState().snak.runList.length).toEqual(2)
  })

})
