jest.disableAutomock()

import React, { Component } from 'react'
import { shallow, mount, render  } from 'enzyme'
import { Provider } from 'react-redux'

import STORE from '../../../store/snak-store'
import { clickRegion, addRegion } from '../../../actions/snak-actions'

import ConnectWorkingArea, { WorkingArea } from '../Working-area.jsx'

describe('Component <WorkingArea />', () => {

  let workingArea_componentConnect

  beforeEach(()=> {
    workingArea_componentConnect = mount(
      <Provider store={STORE}>
        <ConnectWorkingArea />
      </Provider>
    )
  })

  it('Render Components' , () => {
    expect(workingArea_componentConnect.hasClass('WorkingArea WorkingArea-in'))
    expect(workingArea_componentConnect.find('div').length).toEqual(7)
    expect(workingArea_componentConnect.find('.Topbar').length).toEqual(2)
    expect(workingArea_componentConnect.find('.Runlist').length).toEqual(1)
    expect(workingArea_componentConnect.find('.audioWave').length).toEqual(1)
    expect(workingArea_componentConnect.find('.MediumBar').length).toEqual(1)

  })

  it('Initial State', ()=>{
    expect(workingArea_componentConnect.props().store.getState().snak.regionInFocus.type).toEqual('default')
    expect(workingArea_componentConnect.props().store.getState().snak.wave.zoom).toEqual(38)
    expect(workingArea_componentConnect.props().store.getState().snak.runList).toEqual([])
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

    workingArea_componentConnect.props().store.dispatch(addRegion(REGION_DATA_FAKE_1))
    workingArea_componentConnect.props().store.dispatch(addRegion(REGION_DATA_FAKE_2))
    expect(workingArea_componentConnect.props().store.getState().snak.runList.length).toEqual(2)

    workingArea_componentConnect.props().store.dispatch(clickRegion(REGION_DATA_FAKE_1))
    expect(workingArea_componentConnect.find('textarea').length).toEqual(1)


    workingArea_componentConnect.props().store.dispatch(clickRegion(REGION_DATA_FAKE_2))
    expect(workingArea_componentConnect.find('img').length).toEqual(1)
  })

})
