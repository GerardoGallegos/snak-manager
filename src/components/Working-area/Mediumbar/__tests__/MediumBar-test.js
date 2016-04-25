jest.disableAutomock()

import React, { Component } from 'react'
import { shallow, mount, render  } from 'enzyme'
import ConnectMediumbar, { Mediumbar } from '../MediumBar.jsx'

import STORE from '../../../../store/snak-store'
import { clickRegion, addRegion } from '../../../../actions/snak-actions'


describe('Component <MediumBar />', () => {

  let conectMediumbar

  beforeEach(()=> {
    conectMediumbar = mount(
      <ConnectMediumbar store={STORE}/>
    )
  })

  it('Render Component' , () => {
    expect(conectMediumbar.html()).toEqual('<div class="MediumBar MediumBar-default"></div>')
    expect(conectMediumbar.props().store.getState().snak.regionInFocus.type).toEqual('default')
  })

  it('Change state of Component' , () => {

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

    conectMediumbar.props().store.dispatch(addRegion(REGION_DATA_FAKE_1))
    conectMediumbar.props().store.dispatch(addRegion(REGION_DATA_FAKE_2))
    conectMediumbar.props().store.dispatch(clickRegion(REGION_DATA_FAKE_1))

    //By changing the state inside store, will change the component class
    expect(conectMediumbar.props().store.getState().snak.regionInFocus.type).toEqual('instructions')
    expect(conectMediumbar.html()).toEqual('<div class="MediumBar MediumBar-instructions"></div>')

    conectMediumbar.props().store.dispatch(clickRegion(REGION_DATA_FAKE_2))
    expect(conectMediumbar.props().store.getState().snak.regionInFocus.type).toEqual('code')
    expect(conectMediumbar.html()).toEqual('<div class="MediumBar MediumBar-code"></div>')

  })


})
