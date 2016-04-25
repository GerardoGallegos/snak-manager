import { createStore } from 'redux'
import reducers from '../reducers/index'

const STORE = createStore(reducers)

export default STORE
