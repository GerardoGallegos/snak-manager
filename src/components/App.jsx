import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import STORE from '../store/snak-store'


import Preview from './preview/Preview.jsx'
import WorkingArea from './working-area/Working-area.jsx'



export default class App extends Component {
  render() {
    return (
      <Provider store={ STORE }>
          <div>
            <WorkingArea />
            <Preview />
          </div>
      </Provider>
    )
  }
}
