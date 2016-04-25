import React, { Component } from 'react'
//import { render } from 'react-dom'
import { Provider } from 'react-redux'
// import { createStore } from 'redux'
import STORE from '../store/snak-store'


import Preview from './Preview/Preview.jsx'
import WorkingArea from './Working-area/Working-area.jsx'



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
