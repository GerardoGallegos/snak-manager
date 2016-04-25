jest.disableAutomock()

import React, { Component } from 'react'
import { shallow, mount, render  } from 'enzyme'
import ConnectTools, { Runlist } from '../Tools.jsx'

import STORE from '../../../../store/snak-store'
import { clickRegion, addRegion } from '../../../../actions/snak-actions'
import { Provider } from 'react-redux'

describe('Component <Tools />', () => {

  let tool_componentConnect

  beforeEach(()=> {
    tool_componentConnect = mount(
      <Provider store={STORE}>
          <ConnectTools />
      </Provider>
    )
  })

  it('Render Component' , () => {
    expect(tool_componentConnect.text()).toEqual(' No Tool for this regionType ')
  })

  it('Check the initial State', ()=>{
    expect(tool_componentConnect.props().store.getState().snak.regionInFocus.type).toEqual('default')
    expect(tool_componentConnect.props().store.getState().snak.wave.zoom).toEqual(38)
    expect(tool_componentConnect.props().store.getState().snak.runList).toEqual([])
    expect(tool_componentConnect.props().store.getState().snak.runList.length).toEqual(0)
  })

  it('Change the component state', ()=>{
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
      'type': 'image',
      'from': 21.197037535271342,
      'to': 26.197037535271342,
      'regionId': 'k27ri91',
      'image': {
        'file': {
          'preview': 'blob:http%3A//localhost%3A3000/72286512-9d9b-4b80-9795-4790fe7b6c8d'
        }
      },
      'active': true
    }

    tool_componentConnect.props().store.dispatch(addRegion(REGION_DATA_FAKE_1))
    tool_componentConnect.props().store.dispatch(addRegion(REGION_DATA_FAKE_2))
    expect(tool_componentConnect.props().store.getState().snak.runList.length).toEqual(2)
    expect(tool_componentConnect.text()).toEqual(' No Tool for this regionType ')


    tool_componentConnect.props().store.dispatch(clickRegion(REGION_DATA_FAKE_1))
    expect(tool_componentConnect.find('textarea').length).toEqual(1)

    tool_componentConnect.props().store.dispatch(clickRegion(REGION_DATA_FAKE_2))
    expect(tool_componentConnect.find('img').length).toEqual(1)
  })

})
